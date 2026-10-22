// Transport state for the fictional local workspace. No clinical or domain rules.
export const ACTOR_LABELS = Object.freeze({
  crew: 'Crew 03 · personal workspace', primary: 'Crew 02 · primary reviewer',
  backup: 'Crew 06 · backup reviewer', ground: 'Ground · received evidence',
  technical: 'Technical · system metadata',
});
export const PENDING_KEY = 'CHNAI_LOCAL_PENDING_V1';
const ACTOR_KEY = 'CHNAI_LOCAL_ACTOR';
const validActor = actor => Object.hasOwn(ACTOR_LABELS, actor);
const validPending = p => p && validActor(p.actor) && p.body &&
  Number.isSafeInteger(p.body.expectedVersion) && p.body.expectedVersion >= 0 &&
  /^[a-zA-Z0-9_-]{16,100}$/.test(p.body.idempotencyKey) &&
  p.body.command && typeof p.body.command.name === 'string';

export function createLocalClient({fetcher = globalThis.fetch, storage,
  makeId = () => crypto.randomUUID(), onChange = () => {}}) {
  const state = {actor: 'crew', data: null, pending: null, busy: false,
    message: '', isError: false, storageIssue: '', connection: 'connecting'};
  try {
    const savedActor = storage.getItem(ACTOR_KEY);
    if (validActor(savedActor)) state.actor = savedActor;
    const raw = storage.getItem(PENDING_KEY);
    if (raw) {
      const pending = JSON.parse(raw);
      if (!validPending(pending)) throw Error('Invalid retry record');
      state.pending = pending;
      state.actor = pending.actor;
    }
  } catch {
    state.storageIssue = 'The browser retry record cannot be read safely. Changes are blocked; the local database has not been reset. Keep this tab for recovery.';
  }
  const emit = () => onChange(state);
  const validView = (view, actor) => {
    if (!view || view.actor?.key !== actor || !Number.isSafeInteger(view.version)) {
      throw Error('The API returned a workspace for an unexpected actor or revision.');
    }
    return view;
  };
  async function request(path, actor, body) {
    const response = await fetcher(path, {
      method: body ? 'POST' : 'GET', signal: AbortSignal.timeout(10000),
      headers: {'X-CHNAI-Actor': actor, 'Content-Type': 'application/json', 'X-CHNAI-Request': 'local-simulation'},
      ...(body ? {body: JSON.stringify(body)} : {}),
    });
    let result;
    try { result = await response.json(); }
    catch { throw Error('The local API did not return a readable response.'); }
    if (!response.ok) {
      const error = Error(result.error?.message ?? 'The API rejected this request. Review the inputs.');
      error.status = response.status;
      throw error;
    }
    return result;
  }
  function clearPending() {
    state.pending = null;
    try { storage.removeItem(PENDING_KEY); }
    catch { state.storageIssue = 'The saved retry record could not be cleared. Further changes are blocked. Reopening this tab can safely retry the original key.'; }
  }
  async function refresh() {
    if (state.busy) return false;
    state.busy = true;
    state.data = null; // Never display a previous role or unverified stale medical view.
    state.connection = 'connecting';
    emit();
    try {
      state.data = validView(await request('/api/workspace', state.actor), state.actor);
      state.connection = 'ready'; state.message = ''; state.isError = false;
      return true;
    } catch (error) {
      state.connection = 'unavailable'; state.message = error.message; state.isError = true;
      return false;
    } finally { state.busy = false; emit(); }
  }
  async function selectActor(actor) {
    if (state.busy || state.pending || !validActor(actor)) return false;
    state.actor = actor; state.data = null; state.message = '';
    try { storage.setItem(ACTOR_KEY, actor); }
    catch { state.storageIssue = 'Browser session storage is unavailable. Reading is available, but changes are blocked until retry records can be saved.'; }
    return refresh();
  }
  async function send(command, retry = false) {
    if (state.busy || (retry ? !state.pending : state.pending || state.storageIssue || !state.data || state.connection !== 'ready')) return false;
    if (!retry) {
      const pending = {actor: state.actor, body: {expectedVersion: state.data.version,
        idempotencyKey: makeId(), command: structuredClone(command)}};
      try { storage.setItem(PENDING_KEY, JSON.stringify(pending)); }
      catch {
        state.storageIssue = 'The browser could not save a retry record. Nothing was sent. Changes are blocked until session storage is available.';
        state.message = state.storageIssue; state.isError = true; emit(); return false;
      }
      state.pending = pending;
    }
    const pending = state.pending;
    state.busy = true; emit();
    try {
      const response = await request('/api/commands', pending.actor, pending.body);
      const view = validView(response.view, pending.actor);
      if (response.receipt?.key !== pending.body.idempotencyKey || !Number.isSafeInteger(response.receipt?.committedVersion)) {
        throw Error('The command receipt did not match the saved request.');
      }
      state.data = view; state.connection = 'ready';
      state.message = response.receipt.replayed ?
        'The original command was already committed. No duplicate was created.' :
        `Saved to the local database. API revision ${view.version}.`;
      state.isError = false; clearPending(); return true;
    } catch (error) {
      state.message = error.message; state.isError = true; state.data = null;
      state.connection = 'unavailable';
      if (error.status >= 400 && error.status < 500 && ![408, 429].includes(error.status)) {
        clearPending();
        try {
          state.data = validView(await request('/api/workspace', state.actor), state.actor);
          state.connection = 'ready';
        } catch { state.message += ' Refresh before making another change.'; }
      } else {
        state.message += ' The outcome is unconfirmed. Retry the same command to recover its receipt.';
      }
      return false;
    } finally { state.busy = false; emit(); }
  }
  return {state, refresh, selectActor, send};
}

// Include unchecked controls: absence in FormData must never re-enable note sharing.
export function captureFields(elements) {
  return Array.from(elements).filter(el => el.name).map(el => ({
    name: el.name, value: el.value, type: el.type,
    ...(['checkbox', 'radio'].includes(el.type) ? {checked: el.checked} : {}),
  }));
}
export function restoreFields(elements, saved) {
  for (const field of saved) {
    const el = Array.from(elements).find(el => el.name === field.name && el.type === field.type &&
      (!['radio', 'checkbox'].includes(el.type) || el.value === field.value));
    if (!el) continue;
    if (['checkbox', 'radio'].includes(field.type)) el.checked = field.checked;
    else el.value = field.value;
  }
}
