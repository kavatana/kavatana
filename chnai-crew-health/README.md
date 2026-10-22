# CHNAI Crew Health — local simulation monorepo

An evidence-led astronaut health workflow: gather a completed assessment, evaluate its source and limits, assign an accountable reviewer, and send an exact approved snapshot when Earth becomes reachable.

**v0.7 implements a durable local assessment-day slice. All operational crew data is fictional.** NASA supplies named references; this independent prototype is not clinically qualified or NASA-endorsed.

## Start on your Mac

Requires Node.js 22+ and Python 3.12. Tested here with Node 24 and Python 3.12; the actual M3 Pro / 18 GB Mac has not yet been tested.

```bash
npm ci --ignore-scripts
python3.12 -m venv .venv
.venv/bin/python -m pip install -r api/requirements.lock
npm run dev
```

Open **http://127.0.0.1:4173/**. The local API and UI share that origin. SQLite is created under `.runtime/` on first start and survives restarts. Dependencies need to be installed once; the local workflow then needs no cloud or model service. Stop with Ctrl+C.

For a separate test/demo database:

```bash
CHNAI_DB=.runtime/demo-02.sqlite3 npm run dev
```

`/index.html` opens the existing browser-local mock, scenario lab and separate NASA research importer. Its localStorage state is independent of the API database. The existing hosted Site serves this static browser mode; it does not host Python or SQLite.

## One project, explicit ownership

| Folder | Owns |
| --- | --- |
| `web/src/` | Browser mock and API-connected interface modules |
| `web/public/` | HTML, styles, mark and retained research CSV assets |
| `api/src/chnai_api/` | FastAPI endpoints, validated commands, transactions and scoped responses |
| `api/migrations/` | Versioned executable SQL schema |
| `api/tests/` | Real SQLite/API integration, restart, recovery and failure tests |
| `packages/domain/src/` | Shared tested comparison, review, assignment, packet and simulation rules |
| `packages/contracts/` | Generated OpenAPI contract |
| `tests/unit/` | Existing domain, mission, research and scenario checks |
| `data/catalog/` | Source register and evidence-use boundaries |
| `data/fixtures/` | Ownership guide for fictional seeds and scenarios |
| `scripts/` | Development host, web build, contract export and online backup |
| `docs/architecture/` | Architecture decision, schema map and API semantics |
| `.github/workflows/` | Verification workflow; no deployment credentials |

`dist/` is generated, never edited. `.runtime/`, `.venv/`, secrets and database files are ignored. The database belongs to the API, not to the web app. Large research archives are not copied into the operational record.

## What now works locally

- Accepted primary/backup review responsibility, with explicit offer and acceptance.
- Exact decimal comparison, evidence inspection and accountable follow-up.
- Append-only measurement corrections and immutable approved packet bytes.
- SQLite transactions that save state, projections, audit, outbox and retry receipt together.
- Optimistic version checks and idempotency keys for uncertain network outcomes.
- Ground receives only approved snapshots; technical responses contain metadata.
- Simulated delivery and acknowledgement, independently recorded ground review and onboard completion.
- Online database backup and restoration; checked migration hashes and foreign keys.

The local seed begins after the fictional 39/50 assessment has arrived. Follow the [development walkthrough](docs/DEVELOPMENT.md) to complete the episode. The source files and behavior of the older browser mock are documented in [the v0.6 guide](docs/BROWSER_MOCK_V06.md).

## Verify

```bash
npm run check
npm test
npm run test:api
npm run contracts
```

Current result: **74 Node checks + 21 API integration checks pass**. The 12 in-app scenario checks are included in the 74. CI is configured; local success is not a claim that GitHub Actions has run. See [validation](docs/VALIDATION_V07.md) for the browser/runtime limitation and exact scope.

Back up without copying an incomplete live WAL database:

```bash
.venv/bin/python scripts/backup.py .runtime/backups/assessment-day.sqlite3
```

A backup destination must be new. To inspect a restored copy, stop the old process and start with `CHNAI_DB` pointing at that copy. A new, empty filename creates a fresh fictional seed instead.

## Architecture decisions and limits

[ADR-007](docs/architecture/ADR-007-local-monorepo.md) explains the implementation against the earlier conditional stack recommendation. FastAPI/Pydantic and SQLite are implemented. The tested JavaScript engine remains shared through a bounded Node adapter; a Python port, Nuxt migration and SQLAlchemy/Alembic adoption are deferred decisions. This avoids two disagreeing implementations of the same rule while the workflow is still being qualified. It is not a high-throughput recording architecture or the full earlier 42-table specification.

**Demonstration role selection is not authentication.** The API defaults to loopback, accepts only fictional actor keys and applies scoped read/write rules. It is not ready for Internet exposure or real medical records. No encrypted record store, physical device API, actual ground connection, LLM, fine-tuning or production environment is implemented. The UI's explanations are deterministic templates. Neither receipt nor follow-up completion is medical clearance.

The public research importer verifies two retained OSD-569 CSVs in a separate namespace. It does not populate the fictional crew database. The [data provenance record](docs/DATA_PROVENANCE.md) describes checksums, the unit-label conflict, source terms and limits.

## Read the evidence

- [Mission episode and source mapping](docs/MISSION_EPISODE.md)
- [Database and entity relationships](docs/architecture/DATABASE.md)
- [API contract and retry semantics](docs/architecture/API.md)
- [Prior winner/interface observations](docs/AWARD_EVIDENCE.md)
- [NASA V1 4003 reference](https://www.nasa.gov/reference/4-0-human-performance/)
- [NASA crew-interface requirements](https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/)
- [NASA Spaceflight Standard Measures](https://www.nasa.gov/reference/standard-measures/)

The MIT license applies to CHNAI-authored software. Contributed research files retain their owners and terms. AI assistance was used to author code and documentation; no model makes care decisions in the app. The full 2026 challenge, submission rules and eligibility still require the scheduled official-source reconciliation. No award or operational adoption is promised.
