"""Integration checks use real SQLite files and the shared Node rule engine."""
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
from uuid import uuid4
import pytest
from fastapi.testclient import TestClient
from chnai_api.engine import ROOT, DomainError
from chnai_api.main import create_app
from chnai_api.models import CommandRequest
from chnai_api.store import Store

def headers(actor):
    return {'X-CHNAI-Actor': actor, 'X-CHNAI-Request': 'local-simulation'}

@pytest.fixture
def client(tmp_path):
    with TestClient(create_app(tmp_path / 'local.sqlite3')) as c:
        yield c

def view(client, actor='crew'):
    response = client.get('/api/workspace', headers=headers(actor))
    assert response.status_code == 200, response.text
    return response.json()

def command(client, actor, name, *, status=200, version=None, key=None, **fields):
    request = {'expectedVersion': view(client, actor)['version'] if version is None else version, 'idempotencyKey': key or str(uuid4()), 'command': {'name': name, **fields}}
    response = client.post('/api/commands', headers=headers(actor), json=request)
    assert response.status_code == status, response.text
    return response.json()

def reviewed(client):
    command(client, 'crew', 'review.request')
    command(client, 'crew', 'assignment.offer', to='SIM-A06', reason='Primary reviewer is occupied.')
    v = view(client, 'backup')
    command(client, 'backup', 'assignment.accept', assignmentId=v['episode']['handover']['id'], expectedDependency=v['dependency'])
    command(client, 'backup', 'review.record', note='Confirm fictional assessment method and unspecified uncertainty.', trigger='After method context has been checked', expectedDependency=view(client, 'backup')['dependency'])
    return view(client, 'backup')

def released(client):
    reviewed(client)
    result = command(client, 'backup', 'packet.preview', question='Check applicability of the comparison.', includeNote=True)
    draft = result['view']['drafts'][-1]
    command(client, 'backup', 'packet.approve', draftId=draft['id'], expectedHash=draft['hash'])
    return view(client, 'backup')['packets'][-1]

def test_complete_episode_delivery_and_followup_are_separate(client):
    p = released(client)
    assert view(client, 'ground')['packets'] == []
    assert view(client, 'technical')['queue'][0]['status'] == 'queued'
    command(client, 'technical', 'link.set', link='earth', available=True)
    command(client, 'technical', 'scenario.step', seconds=15)
    assert view(client, 'ground')['packets'] == []
    command(client, 'technical', 'scenario.step', seconds=60)
    received = view(client, 'ground')['packets'][0]
    assert received['bytes'] == p['bytes']
    assert sha256(received['bytes'].encode()).hexdigest() == p['hash']
    command(client, 'ground', 'ground.review', packetId=p['id'], note='Received snapshot reviewed in simulation.')
    followup = view(client, 'backup')['episode']['followUps'][0]
    assert followup['state'] == 'pending'
    command(client, 'backup', 'followup.complete', followupId=followup['id'], outcome='Source method checked in the fictional exercise; no medical clearance inferred.')
    assert view(client, 'backup')['episode']['followUps'][0]['state'] == 'complete'

def test_process_restart_preserves_owner_and_exact_queue(client):
    p = released(client)
    path = client.app.state.store.path
    script = "from chnai_api.store import Store; import sys,json; s=Store(sys.argv[1]); print(json.dumps(s.view('backup')))"
    result = subprocess.run([sys.executable, '-c', script, str(path)], env={**os.environ, 'PYTHONPATH': str(ROOT / 'api/src')}, text=True, capture_output=True, check=True)
    restored = json.loads(result.stdout)
    assert restored['episode']['owner'] == 'SIM-A06'
    assert restored['packets'][0]['bytes'] == p['bytes']
    assert restored['packets'][0]['receipt'] is None
    assert restored['episode']['followUps'][0]['state'] == 'pending'

def test_online_backup_can_restore_full_pending_work(client, tmp_path):
    p = released(client)
    backup = client.app.state.store.backup(tmp_path / 'backup.sqlite3')
    restored = Store(backup).view('backup')
    assert restored['packets'][0]['hash'] == p['hash']
    assert restored['episode']['owner'] == 'SIM-A06'
    assert restored['episode']['followUps'][0]['state'] == 'pending'
    with pytest.raises(FileExistsError):
        client.app.state.store.backup(backup)

def test_lost_response_retry_does_not_repeat_state_change(client):
    before = view(client)['version']
    key = str(uuid4())
    first = command(client, 'crew', 'review.request', version=before, key=key)
    again = command(client, 'crew', 'review.request', version=before, key=key)
    assert first['receipt']['replayed'] is False
    assert again['receipt']['replayed'] is True
    assert again['view']['version'] == before + 1
    with client.app.state.store.connection() as db:
        assert db.execute('SELECT count(*) FROM episodes').fetchone()[0] == 1

def test_same_retry_key_cannot_change_payload(client):
    key = str(uuid4())
    command(client, 'crew', 'review.request', key=key, version=0)
    response = command(client, 'crew', 'fixture.import', key=key, version=0, status=409)
    assert response['error']['code'] == 'idempotency_conflict'

def test_stale_version_cannot_overwrite_another_action(client):
    command(client, 'crew', 'review.request')
    result = command(client, 'crew', 'fixture.import', version=0, status=409)
    assert result['error']['code'] == 'version_conflict'
    assert view(client)['version'] == 1

def test_concurrent_writers_have_one_winner(client):
    store = client.app.state.store
    requests = [CommandRequest(expectedVersion=0, idempotencyKey=str(uuid4()), command={'name': 'review.request'}) for _ in range(2)]
    def run(req):
        try:
            store.command('crew', req)
            return 'committed'
        except DomainError as error:
            return error.code
    with ThreadPoolExecutor(max_workers=2) as pool:
        outcomes = sorted(pool.map(run, requests))
    assert outcomes == ['committed', 'version_conflict']
    assert view(client)['version'] == 1

def test_failure_after_projection_rolls_back_every_table(client, monkeypatch):
    store = client.app.state.store
    original = store._persist
    def fail_after_write(db, state, **kwargs):
        original(db, state, **kwargs)
        raise RuntimeError('Injected failure before COMMIT')
    monkeypatch.setattr(store, '_persist', fail_after_write)
    with pytest.raises(RuntimeError):
        store.command('crew', CommandRequest(expectedVersion=0, idempotencyKey=str(uuid4()), command={'name': 'review.request'}))
    assert store.view('crew')['version'] == 0
    with store.connection() as db:
        assert db.execute('SELECT count(*) FROM episodes').fetchone()[0] == 0
        assert db.execute('SELECT count(*) FROM command_receipts').fetchone()[0] == 0
        assert db.execute('SELECT count(*) FROM audit_events WHERE code=?', ('review_requested',)).fetchone()[0] == 0

def test_role_views_do_not_disclose_unsent_medical_values(client):
    reviewed(client)
    for actor in ['technical', 'ground', 'primary']:
        v = view(client, actor)
        assert 'records' not in v and 'comparison' not in v and 'episode' not in v
        assert 'unspecified uncertainty' not in json.dumps(v)
    assert view(client, 'ground')['packets'] == []

@pytest.mark.parametrize('actor', ['crew', 'ground', 'technical', 'primary'])
def test_non_owner_cannot_record_review(client, actor):
    reviewed(client)
    dep = view(client, 'backup')['dependency']
    command(client, actor, 'review.record', note='Not the owner', trigger='No action', expectedDependency=dep, status=403)

def test_revoked_grant_blocks_write_and_cached_retry_response(client):
    reviewed(client)
    key = str(uuid4())
    version = view(client, 'backup')['version']
    command(client, 'backup', 'packet.preview', version=version, key=key)
    command(client, 'technical', 'link.set', link='grant', available=False)
    retry = command(client, 'backup', 'packet.preview', version=version, key=key)
    assert retry['receipt']['replayed']
    assert retry['view']['canRead'] is False
    assert 'drafts' not in retry['view']
    command(client, 'backup', 'packet.preview', status=403)

def test_correction_appends_and_does_not_change_received_bytes(client):
    p = released(client)
    command(client, 'technical', 'link.set', link='earth', available=True)
    command(client, 'technical', 'packet.deliver', packetId=p['id'])
    before = view(client, 'ground')['packets'][0]
    command(client, 'backup', 'assessment.correct', value='40', unit='mL/min/kg', reason='Fictional correction', expectedCurrentId='SIM-C03-current-r1')
    v = view(client, 'backup')
    assert v['comparison']['percent'] == '80'
    assert v['review'] is None
    assert len([r for r in v['records'] if r['kind'] == 'current']) == 2
    assert view(client, 'ground')['packets'][0] == before
    with client.app.state.store.connection() as db:
        assert db.execute('SELECT payload_bytes FROM packets').fetchone()[0] == p['bytes']
        with pytest.raises(sqlite3.IntegrityError, match='immutable'):
            db.execute("UPDATE observations SET value_text='999'")

def test_ownership_change_invalidates_unreleased_preview(client):
    reviewed(client)
    draft = command(client, 'backup', 'packet.preview')['view']['drafts'][-1]
    command(client, 'technical', 'duty.set', reviewerId='SIM-A02', available=True)
    command(client, 'backup', 'assignment.offer', to='SIM-A02', reason='Transfer to available primary.')
    v = view(client, 'primary')
    command(client, 'primary', 'assignment.accept', assignmentId=v['episode']['handover']['id'], expectedDependency=v['dependency'])
    command(client, 'primary', 'packet.approve', draftId=draft['id'], expectedHash=draft['hash'], status=409)
    assert view(client, 'primary')['episode']['followUps'][0]['owner'] == 'SIM-A02'

def test_packet_and_outbox_approval_are_committed_together(client):
    p = released(client)
    with client.app.state.store.connection() as db:
        assert db.execute('SELECT state FROM outbox WHERE packet_id=?', (p['id'],)).fetchone()[0] == 'queued'
        with pytest.raises(sqlite3.IntegrityError, match='immutable'):
            db.execute('DELETE FROM packets')
        assert db.execute('PRAGMA foreign_key_check').fetchall() == []

def test_strict_command_rejects_actor_injection_and_wrong_types(client):
    for c in [{'name': 'review.request', 'actor': {'role': 'onboard'}}, {'name': 'link.set', 'link': 'earth', 'available': 'true'}, {'name': 'scenario.step', 'seconds': 301}]:
        r = client.post('/api/commands', headers=headers('crew'), json={'expectedVersion': 0, 'idempotencyKey': str(uuid4()), 'command': c})
        assert r.status_code == 422
    assert view(client)['version'] == 0

def test_local_origin_and_explicit_selector_required(client):
    assert client.get('/api/workspace').status_code == 422
    assert client.get('/api/workspace', headers=headers('admin')).status_code == 422
    assert client.get('/api/workspace', headers={**headers('crew'), 'Origin': 'https://unrelated.example'}).status_code == 403
    assert client.post('/api/commands', headers={'X-CHNAI-Actor': 'crew'}, json={}).status_code == 403

def test_unavailable_local_link_rejects_write_and_allows_operator_recovery(client):
    command(client, 'technical', 'link.set', link='lan', available=False)
    command(client, 'crew', 'review.request', status=503)
    assert view(client)['episode'] is None
    command(client, 'technical', 'link.set', link='lan', available=True)
    command(client, 'crew', 'review.request')

def test_generated_contract_matches_application():
    assert json.loads((ROOT / 'packages/contracts/openapi.json').read_text()) == create_app().openapi()
