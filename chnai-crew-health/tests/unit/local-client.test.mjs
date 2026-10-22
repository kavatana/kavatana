import test from 'node:test';
import assert from 'node:assert/strict';
import {createLocalClient, captureFields, restoreFields, PENDING_KEY} from '../../web/src/local-client.mjs';

const key = 'retry-key-00000000000001';
const view = (actor = 'crew', version = 0, more = {}) => ({actor: {key: actor}, version, ...more});
const response = (body, status = 200) => ({ok: status < 400, status, json: async () => body});
const receipt = (actor = 'crew', replayed = false) => response({view: view(actor, 1), receipt: {key, replayed, committedVersion: 1}});
const pending = {actor: 'crew', body: {expectedVersion: 0, idempotencyKey: key, command: {name: 'review.request'}}};
function memory(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k)};
}
const client = options => createLocalClient({storage: memory(), makeId: () => key, ...options});

test('Role switch removes the previous medical view before its request settles', async () => {
  let finish;
  const snapshots = [];
  const c = client({onChange: s => snapshots.push(structuredClone(s)), fetcher: async (_url, init) =>
    init.headers['X-CHNAI-Actor'] === 'crew' ? response(view('crew', 0, {note: 'Private fictional note'})) :
      new Promise(resolve => {finish = resolve;})});
  await c.refresh();
  const changing = c.selectActor('technical');
  assert.equal(c.state.data, null);
  assert.equal(snapshots.at(-1).actor, 'technical');
  assert.equal(snapshots.at(-1).data, null);
  finish(response(view('technical')));
  await changing;
  assert.equal(c.state.data.actor.key, 'technical');
});

test('A failed refresh hides stale medical data and blocks new commands', async () => {
  let fail = false, posts = 0;
  const c = client({fetcher: async (_url, init) => {
    if (init.method === 'POST') posts++;
    if (fail) throw Error('Disconnected');
    return response(view());
  }});
  await c.refresh(); fail = true;
  await c.refresh();
  assert.equal(c.state.data, null);
  assert.equal(c.state.connection, 'unavailable');
  assert.equal(await c.send({name: 'review.request'}), false);
  assert.equal(posts, 0);
});

test('Lost response and reload preserve the exact actor, body and retry key', async () => {
  const storage = memory(), posts = [];
  const c = client({storage, fetcher: async (_url, init) => {
    if (init.method === 'GET') return response(view());
    posts.push(init); throw Error('Response lost after commit');
  }});
  await c.refresh(); await c.send(pending.body.command);
  assert.equal(c.state.pending.body.idempotencyKey, key);
  assert.equal(c.state.data, null);
  const reopened = client({storage, fetcher: async (_url, init) => {posts.push(init); return receipt('crew', true);}});
  assert.equal(await reopened.selectActor('ground'), false);
  assert.equal(await reopened.send(null, true), true); // Recovery also works without a GET/view.
  assert.equal(posts[0].body, posts[1].body);
  assert.equal(posts[1].headers['X-CHNAI-Actor'], 'crew');
  assert.equal(storage.getItem(PENDING_KEY), null);
  assert.equal(reopened.state.pending, null);
  assert.match(reopened.state.message, /No duplicate/);
});

test('A retry preserves an explicit decision to exclude the onboard note', async () => {
  const storage = memory(); let first = true; const bodies = [];
  const c = client({storage, fetcher: async (_url, init) => {
    if (init.method === 'GET') return response(view('backup'));
    bodies.push(init.body);
    if (first) {first = false; throw Error('Network unavailable');}
    return receipt('backup', true);
  }});
  await c.selectActor('backup');
  await c.send({name: 'packet.preview', question: 'Review source context', includeNote: false});
  await c.send(null, true);
  assert.equal(bodies[0], bodies[1]);
  assert.equal(JSON.parse(bodies[1]).command.includeNote, false);
});

test('Rejected command refreshes authorization without restoring the previous medical view', async () => {
  let posts = 0;
  const c = client({fetcher: async (_url, init) => {
    if (init.method === 'POST') {posts++; return response({error: {message: 'Review relationship revoked'}}, 403);}
    return response(view('crew', posts, {canRead: !posts, ...(posts ? {} : {note: 'Private fictional note'})}));
  }});
  await c.refresh(); await c.send(pending.body.command);
  assert.equal(c.state.pending, null);
  assert.equal(c.state.data.canRead, false);
  assert.equal(c.state.data.note, undefined);
  assert.equal(c.state.isError, true);
});

test('An unreadable success response remains unconfirmed and recoverable', async () => {
  const c = client({fetcher: async (_url, init) => init.method === 'GET' ? response(view()) :
    {ok: true, status: 200, json: async () => {throw Error('Incomplete response');}}});
  await c.refresh(); await c.send(pending.body.command);
  assert.ok(c.state.pending);
  assert.equal(c.state.data, null);
});

test('A mismatched response actor or receipt cannot become the selected view', async () => {
  for (const result of [receipt('technical'), response({view: view(), receipt: {key: 'other-key', committedVersion: 1}})]) {
    const c = client({fetcher: async (_url, init) => init.method === 'GET' ? response(view()) : result});
    await c.refresh(); await c.send(pending.body.command);
    assert.equal(c.state.data, null);
    assert.ok(c.state.pending);
  }
});

test('Failure to save the retry record prevents sending the command', async () => {
  let posts = 0;
  const storage = {...memory(), setItem: () => {throw Error('Storage quota');}};
  const c = client({storage, fetcher: async (_url, init) => {if (init.method === 'POST') posts++; return response(view());}});
  await c.refresh(); await c.send(pending.body.command);
  assert.equal(posts, 0);
  assert.equal(c.state.pending, null);
  assert.match(c.state.storageIssue, /Nothing was sent/);
});

test('Corrupt retry storage is retained and new writes are blocked', async () => {
  const storage = memory({[PENDING_KEY]: '{damaged'});
  const c = client({storage, fetcher: async () => response(view())});
  await c.refresh();
  assert.equal(await c.send(pending.body.command), false);
  assert.equal(storage.getItem(PENDING_KEY), '{damaged');
  assert.ok(c.state.storageIssue);
});

test('Rapid repeated commands cannot send twice while the first is unsettled', async () => {
  let finish, posts = 0;
  const c = client({fetcher: async (_url, init) => {
    if (init.method === 'GET') return response(view());
    posts++; return new Promise(resolve => {finish = resolve;});
  }});
  await c.refresh();
  const sending = c.send(pending.body.command);
  assert.equal(await c.send(pending.body.command), false);
  assert.equal(await c.selectActor('ground'), false);
  finish(receipt()); await sending;
  assert.equal(posts, 1);
});

test('Successful reconnect removes the old network error', async () => {
  let disconnected = true;
  const c = client({fetcher: async () => {if (disconnected) throw Error('Disconnected'); return response(view());}});
  await c.refresh(); disconnected = false; await c.refresh();
  assert.equal(c.state.message, '');
  assert.equal(c.state.isError, false);
  assert.equal(c.state.connection, 'ready');
});

test('Form restoration preserves unchecked note sharing and entered text', () => {
  const fields = [{name: 'includeNote', type: 'checkbox', value: 'on', checked: false},
    {name: 'question', type: 'textarea', value: 'Check method context'}];
  const saved = captureFields(fields);
  const rerendered = [{...fields[0], checked: true}, {...fields[1], value: ''}];
  restoreFields(rerendered, saved);
  assert.equal(rerendered[0].checked, false);
  assert.equal(rerendered[1].value, 'Check method context');
});
