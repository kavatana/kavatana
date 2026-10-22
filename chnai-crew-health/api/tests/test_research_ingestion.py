"""Actual retained CSV bytes, separate SQLite files and the shared Node parser."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
from pathlib import Path
import shutil
import sqlite3
import pytest
from fastapi.testclient import TestClient
from chnai_api.engine import ROOT, DomainError
from chnai_api.main import create_app
from chnai_api.research import ResearchStore

HEADERS = {'X-CHNAI-Actor': 'technical', 'X-CHNAI-Request': 'local-simulation'}
BODY = {'datasetId': 'OSD-569', 'snapshotId': 'retained-cbc-2026-10-21'}

@pytest.fixture
def research(tmp_path):
    assets = tmp_path / 'assets'
    shutil.copytree(ROOT / 'web/public/data', assets)
    return ResearchStore(tmp_path / 'research', assets=assets)

def counts(store):
    with store.connection() as db:
        return [db.execute('SELECT count(*) FROM ' + table).fetchone()[0] for table in
                ['ingestion_jobs', 'research_observations', 'quality_issues', 'raw_objects', 'ingestion_attempts']]

def test_verified_import_preserves_objects_and_source_locations(research):
    result = research.import_retained()
    job = result['job']
    assert counts(research) == [1, 553, 28, 2, 1]
    assert job['summary']['wideRowCount'] == 28
    assert job['summary']['subjects'] == ['C001', 'C002', 'C003', 'C004']
    assert job['manifest']['pipeline']['version'] == 'chnai-cbc/1'
    for source in job['manifest']['files']:
        original = (research.assets / source['filename']).read_bytes()
        stored = (research.directory / source['objectKey']).read_bytes()
        assert stored == original
        assert sha256(stored).hexdigest() == source['sha256']
    rows = research.observations(job['id'])['items']
    assert rows[0]['rawValue'] == '5.4'
    assert rows[0]['sourceRow'] == 2
    assert rows[0]['sourceObjectSha256'] == job['manifest']['files'][0]['sha256']
    issues = research.issues(job['id'])['items']
    assert len(issues) == 28
    assert all(i['submittedUnit'] == 'g/dL' and i['transformedUnit'] == '%' for i in issues)
    assert all(i['submittedSourceRow'] >= 2 and i['transformedSourceRow'] >= 2 for i in issues)

def test_repeat_and_restart_reuse_job_without_duplicate_rows(research):
    first = research.import_retained()
    reopened = ResearchStore(research.directory, assets=research.assets)
    second = reopened.import_retained()
    assert first['job'] == second['job']
    assert first['replayed'] is False and second['replayed'] is True
    assert counts(reopened) == [1, 553, 28, 2, 2]
    assert reopened.overview()['lastAttempt']['status'] == 'replayed'

def test_concurrent_imports_commit_one_job(research):
    with ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(lambda _: research.import_retained(), range(2)))
    assert sorted(r['replayed'] for r in results) == [False, True]
    assert results[0]['job']['id'] == results[1]['job']['id']
    assert counts(research) == [1, 553, 28, 2, 2]

def test_modified_source_rejects_whole_import_and_records_attempt(research):
    path = research.assets / research.catalog()['files'][0]['filename']
    content = path.read_bytes()
    path.write_bytes(content.replace(b'5.4', b'9.4', 1))
    with pytest.raises(DomainError) as raised:
        research.import_retained()
    assert raised.value.code == 'research_source_mismatch'
    assert raised.value.attempt_id
    assert counts(research) == [0, 0, 0, 0, 1]
    assert research.overview()['lastAttempt']['status'] == 'rejected'

def test_missing_source_does_not_invalidate_prior_accepted_history(research):
    first = research.import_retained()['job']
    (research.assets / research.catalog()['files'][1]['filename']).unlink()
    with pytest.raises(DomainError, match='missing'):
        research.import_retained()
    assert research.overview()['latestJob'] == first
    assert research.overview()['lastAttempt']['status'] == 'rejected'
    assert counts(research) == [1, 553, 28, 2, 2]

def test_corrupt_retained_object_is_detected_without_overwrite(research):
    first = research.import_retained()['job']
    path = research.directory / first['manifest']['files'][0]['objectKey']
    path.chmod(0o600)
    path.write_bytes(b'corrupted object')
    with pytest.raises(DomainError) as raised:
        research.import_retained()
    assert raised.value.code == 'research_object_corrupt'
    assert path.read_bytes() == b'corrupted object'
    assert counts(research) == [1, 553, 28, 2, 2]

def test_projection_failure_rolls_back_entire_job(research, monkeypatch):
    original = research._insert_records
    def fail(db, job_id, report, source):
        original(db, job_id, report, source)
        raise sqlite3.OperationalError('Injected transaction failure')
    monkeypatch.setattr(research, '_insert_records', fail)
    with pytest.raises(sqlite3.OperationalError):
        research.import_retained()
    assert counts(research) == [0, 0, 0, 0, 0]
    # Verified orphan objects may survive; no accepted job or row refers to them.
    assert len(list(research.objects.iterdir())) == 2
    monkeypatch.setattr(research, '_insert_records', original)
    assert research.import_retained()['replayed'] is False
    assert counts(research) == [1, 553, 28, 2, 1]

def test_research_history_rejects_updates_and_deletes(research):
    research.import_retained()
    with research.connection() as db:
        for table, column in [('ingestion_jobs', 'snapshot_id'), ('raw_objects', 'object_key'),
                ('job_files', 'filename'), ('research_observations', 'raw_value'),
                ('quality_issues', 'kind'), ('ingestion_attempts', 'code')]:
            with pytest.raises(sqlite3.IntegrityError, match='immutable'):
                db.execute(f'UPDATE {table} SET {column}={column}')
            with pytest.raises(sqlite3.IntegrityError, match='immutable'):
                db.execute(f'DELETE FROM {table}')

def test_parser_outage_records_rejection_without_partial_rows(research, monkeypatch):
    def unavailable(_texts):
        raise DomainError('research_parser_unavailable', 'Parser unavailable')
    monkeypatch.setattr(research, '_parse', unavailable)
    with pytest.raises(DomainError):
        research.import_retained()
    assert counts(research) == [0, 0, 0, 0, 1]
    assert research.overview()['lastAttempt']['code'] == 'research_parser_unavailable'

def test_api_paging_and_filters_are_bounded_and_snapshot_specific(tmp_path):
    with TestClient(create_app(tmp_path / 'crew.sqlite3')) as client:
        imported = client.post('/api/research/imports', headers=HEADERS, json=BODY)
        assert imported.status_code == 200
        job = imported.json()['job']
        base = '/api/research/imports/' + job['id']
        assert client.get(base, headers=HEADERS).json() == job
        records, after = [], 0
        while True:
            page = client.get(base + '/observations', headers=HEADERS, params={'after': after, 'limit': 37}).json()
            assert len(page['items']) <= 37
            records.extend(page['items'])
            if page['nextAfter'] is None:
                break
            after = page['nextAfter']
        assert len(records) == len({r['id'] for r in records}) == 553
        selected = client.get(base + '/observations', headers=HEADERS,
            params={'subject': 'C001', 'analyte': 'WHITE BLOOD CELL COUNT'}).json()
        assert len(selected['items']) == 7
        assert all(r['subjectId'] == 'C001' for r in selected['items'])
        assert client.get(base + '/observations', headers=HEADERS, params={'analyte': "' OR 1=1 --"}).json()['items'] == []
        for params in [{'limit': 101}, {'limit': 0}, {'after': -1}, {'subject': 'SIM-C03'}]:
            assert client.get(base + '/observations', headers=HEADERS, params=params).status_code == 422
        issues = client.get(base + '/issues', headers=HEADERS, params={'limit': 10}).json()
        assert len(issues['items']) == 10 and issues['nextAfter'] == 10
        assert client.get('/api/research/imports/RI-' + '0' * 64, headers=HEADERS).status_code == 404

def test_import_allowlist_and_research_role_do_not_mutate_crew(tmp_path):
    with TestClient(create_app(tmp_path / 'crew.sqlite3')) as client:
        crew_headers = {'X-CHNAI-Actor': 'crew', 'X-CHNAI-Request': 'local-simulation'}
        before = client.get('/api/workspace', headers=crew_headers).json()
        assert client.post('/api/research/imports', headers=crew_headers, json=BODY).status_code == 403
        assert client.post('/api/research/imports', headers=HEADERS, json={**BODY, 'url': 'https://example.com/file.csv'}).status_code == 422
        assert client.post('/api/research/imports', headers=HEADERS, json={**BODY, 'datasetId': 'OSD-999'}).status_code == 422
        assert client.post('/api/research/imports', headers=HEADERS, json=BODY).status_code == 200
        after = client.get('/api/workspace', headers=crew_headers).json()
        assert before == after
        assert client.app.state.store.path != client.app.state.research.path
        with client.app.state.store.connection() as db:
            assert not db.execute("SELECT name FROM sqlite_master WHERE name='research_observations'").fetchone()
        with client.app.state.research.connection() as db:
            assert not db.execute("SELECT name FROM sqlite_master WHERE name='subjects'").fetchone()

def test_api_rejection_returns_attempt_id_for_traceability(tmp_path):
    with TestClient(create_app(tmp_path / 'crew.sqlite3', research_assets=tmp_path / 'missing')) as client:
        rejected = client.post('/api/research/imports', headers=HEADERS, json=BODY)
        assert rejected.status_code == 422
        attempt_id = rejected.json()['error']['attemptId']
        state = client.get('/api/research', headers=HEADERS).json()
        assert state['lastAttempt']['id'] == attempt_id
        assert state['latestJob'] is None

def test_research_startup_failure_does_not_block_crew_workspace(tmp_path, monkeypatch):
    import chnai_api.main as main
    def broken_registry(*_args, **_kwargs):
        raise sqlite3.DatabaseError('Injected research database corruption')
    monkeypatch.setattr(main, 'ResearchStore', broken_registry)
    with TestClient(create_app(tmp_path / 'crew.sqlite3')) as client:
        assert client.get('/api/research', headers=HEADERS).status_code == 503
        crew = client.get('/api/workspace', headers={'X-CHNAI-Actor': 'crew'})
        assert crew.status_code == 200 and crew.json()['actor']['key'] == 'crew'
    with pytest.raises(ValueError, match='separate paths'):
        create_app(tmp_path / 'research.sqlite3', research_directory=tmp_path)
