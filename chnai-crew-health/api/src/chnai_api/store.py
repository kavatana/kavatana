"""Single-writer local persistence. State, projections and outbox commit together."""
from contextlib import contextmanager
from datetime import datetime, timezone
from hashlib import sha256
import json
from pathlib import Path
import sqlite3
from .engine import ROOT, DomainError, call_engine

def encoded(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=False)

def timestamp():
    return datetime.now(timezone.utc).isoformat()

class Store:
    def __init__(self, path):
        self.path = Path(path).resolve()
        self.path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
        with self.connection() as db:
            db.execute('PRAGMA journal_mode=WAL')
            db.execute('CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, sha256 TEXT NOT NULL)')
            for migration in sorted((ROOT / 'api/migrations').glob('*.sql')):
                content = migration.read_text()
                digest = sha256(content.encode()).hexdigest()
                db.execute('BEGIN IMMEDIATE')
                try:
                    prior = db.execute('SELECT sha256 FROM schema_migrations WHERE name=?', (migration.name,)).fetchone()
                    if prior and prior['sha256'] != digest:
                        raise RuntimeError('Applied migration checksum changed; restore the original migration.')
                    if not prior:
                        statement = ''
                        for line in content.splitlines(keepends=True):
                            statement += line
                            if sqlite3.complete_statement(statement):
                                db.execute(statement)
                                statement = ''
                        if statement.strip():
                            raise RuntimeError('Incomplete migration statement.')
                        db.execute('INSERT INTO schema_migrations VALUES (?,?)', (migration.name, digest))
                    db.commit()
                except Exception:
                    db.rollback()
                    raise
            db.execute('BEGIN IMMEDIATE')
            try:
                if not db.execute('SELECT 1 FROM workspaces').fetchone():
                    state = call_engine('seed')['state']
                    for i in range(1, 7):
                        db.execute('INSERT INTO subjects VALUES (?,?)', (f'SIM-C{i:02}', 'SIM-CHNAI-01'))
                        db.execute('INSERT INTO actors VALUES (?,?)', (f'SIM-A{i:02}', 'crew_or_reviewer'))
                    for actor, role in [('SIM-GROUND-01', 'ground'), ('SIM-TECH-01', 'technical')]:
                        db.execute('INSERT INTO actors VALUES (?,?)', (actor, role))
                    db.execute('INSERT INTO source_references VALUES (?,?,?)', ('NASA-STD-3001 / V1 4003', 'https://www.nasa.gov/reference/4-0-human-performance/', 'Clinical applicability unreviewed'))
                    self._persist(db, state, insert=True)
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

    def _state(self, db):
        return json.loads(db.execute('SELECT state_json FROM workspaces WHERE id=?', ('assessment-day',)).fetchone()[0])

    def view(self, actor):
        with self.connection() as db:
            state = self._state(db)
        return call_engine('view', state=state, actor=actor)['view']

    def command(self, actor, request):
        body = request.model_dump()
        fingerprint = sha256(encoded(body).encode()).hexdigest()
        with self.connection() as db:
            db.execute('BEGIN IMMEDIATE')
            try:
                state = self._state(db)
                prior = db.execute('SELECT * FROM command_receipts WHERE actor_key=? AND idempotency_key=?', (actor, request.idempotencyKey)).fetchone()
                if prior:
                    if prior['request_sha256'] != fingerprint:
                        raise DomainError('idempotency_conflict', 'This retry key was already used for a different command.')
                    response = {'view': call_engine('view', state=state, actor=actor)['view'], 'receipt': {'committedVersion': prior['committed_version'], 'replayed': True, 'key': request.idempotencyKey}}
                    db.commit()
                    return response
                if state['version'] != request.expectedVersion:
                    raise DomainError('version_conflict', 'Another action changed this workspace. Refresh before submitting again.')
                result = call_engine('command', state=state, actor=actor, command=body['command'])
                self._persist(db, result['state'])
                db.execute('INSERT INTO command_receipts VALUES (?,?,?,?,?,?)', (actor, request.idempotencyKey, fingerprint, result['state']['version'], body['command']['name'], timestamp()))
                response = {'view': result['view'], 'receipt': {'committedVersion': result['state']['version'], 'replayed': False, 'key': request.idempotencyKey}}
                db.commit()
                return response
            except Exception:
                db.rollback()
                raise

    def _immutable(self, db, table, key, document, sql, params):
        prior = db.execute(f'SELECT document_json FROM {table} WHERE id=?', (key,)).fetchone()
        if prior:
            if prior[0] != encoded(document):
                raise DomainError('immutable_conflict', 'An immutable evidence record changed. No change was committed.')
        else:
            db.execute(sql, params)

    def _persist(self, db, state, insert=False):
        # All identifiers below are code-owned; caller strings are bound parameters.
        for r in state['records']:
            self._immutable(db, 'observations', r['id'], r,
                'INSERT INTO observations VALUES (?,?,?,?,?,?,?,?,?,?)',
                (r['id'], r['subjectId'], r['kind'], r['revision'], r['value'], r['unit'], r['method'], r['timeBasis'], r.get('supersedes'), encoded(r)))
        for ep in state['episodes']:
            db.execute('INSERT INTO episodes VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET owner_id=excluded.owner_id,state=excluded.state,document_json=excluded.document_json', (ep['id'], ep['subjectId'], ep['owner'], ep['state'], encoded(ep)))
            for f in ep['followUps']:
                db.execute('INSERT INTO followups VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET owner_id=excluded.owner_id,state=excluded.state,document_json=excluded.document_json', (f['id'], ep['id'], f['owner'], f['state'], encoded(f)))
        for d in state['drafts']:
            db.execute('INSERT INTO packet_drafts VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET stale=excluded.stale,released=excluded.released,document_json=excluded.document_json', (d['id'], d['subjectId'], int(d['stale']), int(d['released']), encoded(d)))
        for p in state['packets']:
            if sha256(p['bytes'].encode()).hexdigest() != p['hash']:
                raise DomainError('hash_conflict', 'Approved packet bytes failed integrity checking.')
            immutable = (p['id'], p['subjectId'], p['bytes'], p['hash'], p['approvedBy'], p['approvedAt'])
            prior = db.execute('SELECT * FROM packets WHERE id=?', (p['id'],)).fetchone()
            if prior and tuple(prior) != immutable:
                raise DomainError('immutable_conflict', 'An approved packet cannot be changed.')
            if not prior:
                db.execute('INSERT INTO packets VALUES (?,?,?,?,?,?)', immutable)
            db.execute('INSERT INTO outbox VALUES (?,?,?,?) ON CONFLICT(packet_id) DO UPDATE SET state=excluded.state,attempts=excluded.attempts,historical=excluded.historical', (p['id'], p['state'], p['attempts'], int(p['historical'])))
            if p['receipt']:
                db.execute('INSERT OR IGNORE INTO ground_receipts VALUES (?,?,?)', (p['id'], p['hash'], encoded(p['receipt'])))
            if p['groundReview']:
                db.execute('INSERT OR IGNORE INTO ground_reviews VALUES (?,?,?)', (p['id'], p['groundReview']['actor'], encoded(p['groundReview'])))
        for event in state['events']:
            self._immutable(db, 'audit_events', event['id'], event,
                'INSERT INTO audit_events VALUES (?,?,?,?,?)',
                (event['id'], event['subjectId'], event['actor'], event['code'], encoded(event)))
        if insert:
            db.execute('INSERT INTO workspaces VALUES (?,?,?,?)', ('assessment-day', state['version'], encoded(state), timestamp()))
        else:
            db.execute('UPDATE workspaces SET version=?,state_json=?,updated_at=? WHERE id=?', (state['version'], encoded(state), timestamp(), 'assessment-day'))

    def backup(self, destination):
        target = Path(destination)
        target.parent.mkdir(parents=True, exist_ok=True)
        # Exclusive reservation avoids overwriting an existing backup.
        with target.open('xb'):
            pass
        try:
            with self.connection() as source, sqlite3.connect(target) as backup:
                source.backup(backup)
                if backup.execute('PRAGMA integrity_check').fetchone()[0] != 'ok':
                    raise RuntimeError('Backup failed integrity check.')
            target.chmod(0o600)
        except Exception:
            target.unlink(missing_ok=True)
            raise
        return target
