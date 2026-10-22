"""Bounded, reproducible import of retained public research. Never opens the crew DB."""
from contextlib import contextmanager
from datetime import datetime, timezone
from hashlib import sha256
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile
from uuid import uuid4
from .engine import ROOT, DomainError

CATALOG = ROOT / 'data/catalog/osd569-ingestion.json'
PARSER_FILES = ['packages/domain/src/cbc.mjs', 'packages/domain/src/domain.mjs',
                'scripts/research-bridge.mjs', 'api/src/chnai_api/research.py']

def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False)

def now():
    return datetime.now(timezone.utc).isoformat()

class ResearchStore:
    def __init__(self, directory, assets=None):
        self.directory = Path(directory).resolve()
        self.directory.mkdir(parents=True, exist_ok=True, mode=0o700)
        self.objects = self.directory / 'objects'
        self.objects.mkdir(exist_ok=True, mode=0o700)
        self.path = self.directory / 'research.sqlite3'
        self.assets = Path(assets or ROOT / 'web/public/data')
        with self.connection() as db:
            db.execute('PRAGMA journal_mode=WAL')
            db.execute('CREATE TABLE IF NOT EXISTS research_migrations (name TEXT PRIMARY KEY, sha256 TEXT NOT NULL)')
            for migration in sorted((ROOT / 'api/research_migrations').glob('*.sql')):
                source = migration.read_text()
                digest = sha256(source.encode()).hexdigest()
                db.execute('BEGIN IMMEDIATE')
                try:
                    previous = db.execute('SELECT sha256 FROM research_migrations WHERE name=?', (migration.name,)).fetchone()
                    if previous and previous[0] != digest:
                        raise RuntimeError('Applied research migration checksum changed.')
                    if not previous:
                        statement = ''
                        for line in source.splitlines(keepends=True):
                            statement += line
                            if sqlite3.complete_statement(statement):
                                db.execute(statement)
                                statement = ''
                        if statement.strip():
                            raise RuntimeError('Incomplete research migration.')
                        db.execute('INSERT INTO research_migrations VALUES (?,?)', (migration.name, digest))
                    db.commit()
                except Exception:
                    db.rollback()
                    raise
        self.path.chmod(0o600)

    @contextmanager
    def connection(self):
        db = sqlite3.connect(self.path, timeout=5, isolation_level=None)
        db.row_factory = sqlite3.Row
        db.execute('PRAGMA foreign_keys=ON')
        db.execute('PRAGMA synchronous=FULL')
        try:
            yield db
        finally:
            db.close()

    def catalog(self):
        return json.loads(CATALOG.read_text())

    def _parse(self, texts):
        try:
            result = subprocess.run(['node', str(ROOT / 'scripts/research-bridge.mjs')],
                input=json.dumps({'texts': texts}), text=True, capture_output=True,
                timeout=10, check=True)
            parsed = json.loads(result.stdout)
        except (OSError, subprocess.SubprocessError, ValueError) as exc:
            raise DomainError('research_parser_unavailable', 'The research parser did not complete. No research rows were accepted.') from exc
        if not parsed.get('ok'):
            raise DomainError('research_parse_rejected', parsed.get('error', 'Research parsing failed.'))
        return parsed

    def _retain_object(self, digest, content):
        target = self.objects / digest
        if target.exists() or target.is_symlink():
            if target.is_symlink() or sha256(target.read_bytes()).hexdigest() != digest:
                raise DomainError('research_object_corrupt', 'A retained raw object failed its integrity check. It was not overwritten.')
            return
        # A verified object is atomically linked without replacing any existing name.
        fd, temp_name = tempfile.mkstemp(prefix='pending-', dir=self.objects)
        try:
            with os.fdopen(fd, 'wb') as temporary:
                temporary.write(content)
                temporary.flush()
                os.fsync(temporary.fileno())
            try:
                os.link(temp_name, target)
            except FileExistsError:
                if target.is_symlink() or sha256(target.read_bytes()).hexdigest() != digest:
                    raise DomainError('research_object_corrupt', 'A retained raw object failed its integrity check. It was not overwritten.')
            target.chmod(0o400)
        finally:
            Path(temp_name).unlink(missing_ok=True)

    def _attempt(self, db, status, code, detail, job_id=None):
        attempt_id = 'RA-' + uuid4().hex
        db.execute('INSERT INTO ingestion_attempts VALUES (?,?,?,?,?,?)',
            (attempt_id, job_id, now(), status, code, canonical(detail)))
        return attempt_id

    def import_retained(self):
        source = self.catalog()
        observed = []
        try:
            contents = []
            for spec in source['files']:
                if Path(spec['filename']).name != spec['filename'] or spec['restricted'] or not spec['visible']:
                    raise DomainError('research_source_policy', 'The configured source is not an approved retained public file.')
                path = self.assets / spec['filename']
                if not path.is_file():
                    raise DomainError('research_source_missing', 'An allowlisted retained research file is missing: ' + spec['filename'])
                # Bounded read: an unexpectedly huge or altered file cannot exhaust the importer.
                with path.open('rb') as handle:
                    content = handle.read(spec['bytes'] + 1)
                actual = {'filename': spec['filename'], 'sha256': sha256(content).hexdigest(), 'bytesRead': len(content)}
                observed.append(actual)
                if len(content) != spec['bytes'] or actual['sha256'] != spec['sha256']:
                    raise DomainError('research_source_mismatch', 'Retained source bytes differ from the approved snapshot: ' + spec['filename'])
                contents.append(content)
            parsed = self._parse([content.decode('utf-8') for content in contents])
            report = parsed['report']
            if report['source']['namespace'] != source['namespace'] or report['hashes'] != [f['sha256'] for f in source['files']]:
                raise DomainError('research_parser_contract', 'The parser did not preserve the approved source namespace and hashes.')
            pipeline = {'version': parsed['parserVersion'], 'nodeVersion': parsed['nodeVersion'],
                'pythonVersion': sys.version.split()[0], 'artifacts': [
                    {'path': p, 'sha256': sha256((ROOT / p).read_bytes()).hexdigest()} for p in PARSER_FILES]}
            manifest = {'source': source, 'pipeline': pipeline, 'files': [
                {**spec, 'objectKey': 'objects/' + spec['sha256']} for spec in source['files']],
                'timeSemantics': 'Mission-relative source labels, not UTC or evenly spaced elapsed time',
                'normalization': report['normalization']}
            fingerprint = sha256(canonical(manifest).encode()).hexdigest()
            job_id = 'RI-' + fingerprint
            summary = {k: report[k] for k in ['rawRowCount', 'wideRowCount', 'wideColumns', 'subjects', 'analytes', 'times', 'normalization']}
            summary.update(acceptedRows=len(report['rows']), structuralQuarantine=len(report['quarantine']),
                unitConflicts=len(report['conflicts']), namespace=source['namespace'])
            for spec, content in zip(source['files'], contents):
                self._retain_object(spec['sha256'], content)
            with self.connection() as db:
                db.execute('BEGIN IMMEDIATE')
                try:
                    exists = db.execute('SELECT 1 FROM ingestion_jobs WHERE id=?', (job_id,)).fetchone() is not None
                    if not exists:
                        completed = now()
                        for spec in source['files']:
                            db.execute('INSERT OR IGNORE INTO raw_objects VALUES (?,?,?,?)',
                                (spec['sha256'], spec['bytes'], 'objects/' + spec['sha256'], completed))
                        db.execute('INSERT INTO ingestion_jobs VALUES (?,?,?,?,?,?,?,?,?)',
                            (job_id, fingerprint, source['datasetId'], source['namespace'], source['snapshotId'],
                             parsed['parserVersion'], completed, canonical(manifest), canonical(summary)))
                        for spec in source['files']:
                            db.execute('INSERT INTO job_files VALUES (?,?,?,?,?)',
                                (job_id, spec['role'], spec['sha256'], spec['filename'], spec['url']))
                        self._insert_records(db, job_id, report, source)
                    attempt_id = self._attempt(db, 'replayed' if exists else 'accepted', 'verified_retained_snapshot',
                        {'observedFiles': observed, 'fingerprint': fingerprint}, job_id)
                    db.commit()
                except Exception:
                    db.rollback()
                    raise
            return {'job': self.job(job_id), 'replayed': exists, 'attemptId': attempt_id}
        except (DomainError, OSError, UnicodeError) as exc:
            error = exc if isinstance(exc, DomainError) else DomainError('research_storage_unavailable', 'The research import could not access or retain its source files. No research rows were accepted.')
            with self.connection() as db:
                error.attempt_id = self._attempt(db, 'rejected', error.code,
                    {'message': error.message, 'observedFiles': observed, 'snapshotId': source['snapshotId']})
            raise error

    def _insert_records(self, db, job_id, report, source):
        submitted, transformed = source['files']
        for record in report['rows']:
            row = {**record, 'sourceObjectSha256': submitted['sha256'], 'jobId': job_id}
            db.execute('INSERT INTO research_observations VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                (job_id, row['id'], submitted['sha256'], row['sourceRow'], row['namespace'], row['subjectId'],
                 row['analyte'], row['relativeTime'], row['rawValue'], row['unit'], canonical(row)))
        issues = []
        for conflict in report['conflicts']:
            issues.append(('unit_conflict', conflict['submittedSourceRow'], {**conflict,
                'submittedObjectSha256': submitted['sha256'], 'transformedObjectSha256': transformed['sha256'],
                'submittedFile': submitted['filename'], 'transformedFile': transformed['filename']}))
        for quarantine in report['quarantine']:
            issues.append(('structural_quarantine', quarantine['row'], {**quarantine,
                'sourceObjectSha256': submitted['sha256'], 'sourceFile': submitted['filename']}))
        for i, (kind, row, issue) in enumerate(issues, start=1):
            db.execute('INSERT INTO quality_issues VALUES (?,?,?,?,?)', (job_id, i, kind, row, canonical(issue)))

    def job(self, job_id):
        with self.connection() as db:
            row = db.execute('SELECT * FROM ingestion_jobs WHERE id=?', (job_id,)).fetchone()
        if not row:
            raise DomainError('research_not_found', 'This research import does not exist.')
        return {'id': row['id'], 'fingerprint': row['fingerprint'], 'completedAt': row['completed_at'],
            'manifest': json.loads(row['manifest_json']), 'summary': json.loads(row['summary_json'])}

    def overview(self):
        with self.connection() as db:
            latest = db.execute('SELECT id FROM ingestion_jobs ORDER BY completed_at DESC,id DESC LIMIT 1').fetchone()
            attempt = db.execute('SELECT * FROM ingestion_attempts ORDER BY attempted_at DESC,id DESC LIMIT 1').fetchone()
            counts = {name: db.execute('SELECT count(*) FROM ' + table).fetchone()[0] for name, table in
                [('jobs', 'ingestion_jobs'), ('rawObjects', 'raw_objects'), ('attempts', 'ingestion_attempts')]}
        return {'catalog': self.catalog(), 'latestJob': self.job(latest[0]) if latest else None,
            'lastAttempt': ({'id': attempt['id'], 'jobId': attempt['job_id'], 'status': attempt['status'],
                'code': attempt['code'], 'attemptedAt': attempt['attempted_at'], 'detail': json.loads(attempt['detail_json'])} if attempt else None),
            'counts': counts, 'namespace': 'RESEARCH:OSD-569', 'operationalLink': None}

    def observations(self, job_id, *, subject=None, analyte=None, after=0, limit=50):
        self.job(job_id)
        clauses = ['job_id=?', 'source_row>?']; values = [job_id, after]
        for column, value in [('subject_id', subject), ('analyte', analyte)]:
            if value is not None:
                clauses.append(column + '=?'); values.append(value)
        with self.connection() as db:
            rows = db.execute('SELECT source_row,document_json FROM research_observations WHERE ' +
                ' AND '.join(clauses) + ' ORDER BY source_row LIMIT ?', (*values, limit + 1)).fetchall()
        return {'jobId': job_id, 'namespace': 'RESEARCH:OSD-569',
            'items': [json.loads(r['document_json']) for r in rows[:limit]],
            'nextAfter': rows[limit - 1]['source_row'] if len(rows) > limit else None}

    def issues(self, job_id, *, after=0, limit=50):
        self.job(job_id)
        with self.connection() as db:
            rows = db.execute('SELECT * FROM quality_issues WHERE job_id=? AND issue_id>? ORDER BY issue_id LIMIT ?',
                (job_id, after, limit + 1)).fetchall()
        return {'jobId': job_id, 'items': [dict(id=r['issue_id'], kind=r['kind'], sourceRow=r['source_row'],
            **json.loads(r['document_json'])) for r in rows[:limit]],
            'nextAfter': rows[limit - 1]['issue_id'] if len(rows) > limit else None}
