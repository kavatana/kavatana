# First session on the Mac

Target reported by the founder: 16-inch MacBook Pro, M3 Pro, 18 GB RAM. Actual local acceptance is still outstanding. Use fictional data only.

## Open the right folder

```bash
git clone https://github.com/kavatana/kavatana.git
cd kavatana/chnai-crew-health
```

If already cloned, inspect `git status` and preserve local edits before updating. In VS Code use File → Open Folder and choose `chnai-crew-health`. Follow the [official Codex IDE setup](https://learn.chatgpt.com/docs/codex/ide), then paste the root `CODEX_HANDOFF_PROMPT.md` into Codex. The official guide was read on 23 October 2026; use it if extension commands change.

The parent repository also contains the user's GitHub profile material. Project commands and edits belong in this subfolder. Git pushes still target the parent repository. Do not initialize a nested Git repository or overwrite its unrelated files.

## Install and verify

Requires Node.js 22+ and Python 3.12. Check `node --version` and `python3.12 --version`; if missing, install appropriate official distributions with the user's normal Mac setup. Do not assume Homebrew exists or change system Python. No LLM or API key is needed for this prototype.

```bash
npm ci --ignore-scripts
python3.12 -m venv .venv
.venv/bin/python -m pip install -r api/requirements.lock
npm run doctor
npm run check
npm test
npm run test:api
npm run handoff:verify
```

`doctor` makes no network calls and writes ignored readiness information under `.runtime/qualification/`. Dependencies require network access for their initial installation. If the API is changed later, run `npm run contracts` and review the generated OpenAPI diff.

## Run the complete path

```bash
CHNAI_DB=.runtime/mac-acceptance-01.sqlite3 npm run dev
```

Choose a new numbered filename if that one already holds a prior test. Open `http://127.0.0.1:4173/` and follow [the 17-case Mac checklist](../LOCAL_ACCEPTANCE.md). Open `http://127.0.0.1:4173/research-registry.html` and follow [the eight research walkthrough steps](../RESEARCH_WALKTHROUGH.md). Stop with Ctrl+C; restart with the identical database name to test persistence.

Record exact checkout commit, macOS/browser version, viewport/zoom, pass/fail/blocked outcomes, actual save times and screenshots where useful. Keep local machine reports and databases out of Git. A sanitized dated results summary can be committed once the checks have actually been performed.

The old browser-local mock at `/index.html` has separate localStorage; its state does not prove persistence in the API database. The private hosted Site is also this static mode. For API UI acceptance, use the local root URL.

Do not discard an unresolved command retry or reset its database as a recovery shortcut. The crew backup command in `README.md` preserves crew state only; it does not cover the research store. No complete research-backup result is claimed.
