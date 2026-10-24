# Current project state

Handoff date: **23 October 2026**. Application baseline: **v0.8.0**, GitHub commit [`60697bd2ca065833262b3b4bdb9762329d9b13f2`](https://github.com/kavatana/kavatana/commit/60697bd2ca065833262b3b4bdb9762329d9b13f2). The handoff consolidation adds documentation/research; it does not claim new application functionality.

## Implementation versus plans

| Area | Implemented | Remaining or proposed |
| --- | --- | --- |
| Web | Browser modules; API-connected local workspace; older browser-only mock/scenario lab; separate research registry | Actual Mac/Safari acceptance; current UI visual QA; broader usability work |
| API | FastAPI/Pydantic, strict command shapes, scoped views, revision checks and retry keys | Production identity, access policy and encrypted medical deployment |
| Crew storage | SQLite migration; aggregate plus 15 operational tables; transactional audit/outbox/receipts; append-only corrections and immutable packets | Full earlier 42-table proposal; high-volume ingestion architecture |
| Domain | Shared JavaScript rule engine through bounded Node adapters | Any justified port/refactor after evidence; no duplicate independent rules |
| Research storage | Separate SQLite registry and retained objects for one OSD-569 CBC snapshot; lineage, repeat-import reuse, bounded pagination | General adapters, bulk volumes, coordinated research backup/restore |
| Communication | Simulated link, outbox, receipt and ground review | Flight transport, actual device or Earth endpoints; independent return-link model |
| Explanation | Deterministic templates based on validated state | Qualified bounded LLM, model selection, benchmarks, fine-tuning |
| Simulation | Six fictional crew, role/duty context, eight browser replay presets, 2D scenario lab | 3D view and broader mission/clinical scenario qualification |
| Research | Source/asset catalogs, requirements, schema/flow proposals, fixtures, UX/winner study | Full objective/rule reconciliation, specialist review, domain coverage decisions |

Nuxt/Vue, SQLAlchemy/Alembic, Parquet/DuckDB, llama.cpp/Metal and a Qwen model were earlier candidates. They are not an instruction to install or migrate now. [ADR-007](../architecture/ADR-007-local-monorepo.md) records the current implementation choice. No model artifact has been selected, downloaded or benchmarked by this project.

## The implemented episode

The local seed begins after a fictional completed assessment: 39 compared with a baseline of 50 gives 78%. The displayed NASA V1 4003 reference and applicability status are evidence for review, not diagnosis or medical clearance. Primary reviewer Crew 02 is occupied; backup Crew 06 is available; subject is Crew 03.

The path is: request review → offer to backup with reason → backup accepts → record context/follow-up trigger → inspect exact handoff payload → approve that payload/hash → simulate link delivery/acknowledgement → separate ground review → accepted onboard owner records follow-up outcome. Offer does not transfer responsibility until acceptance. Approved historical bytes do not change when evidence is corrected.

The model's 60-second acknowledgement delay is a demonstration abstraction. It is not a Mars timing prediction or a real radio link. Ground receipt, ground review and onboard completion are distinct; completion is not medical clearance.

## Code map and invariants

| Path | Responsibility |
| --- | --- |
| `web/src/local.mjs`, `local-client.mjs` | API interface, view clearing, recoverable commands and form state |
| `web/src/research-registry.mjs` | Separate engineering research inspection |
| `web/src/app.mjs`, `views.mjs`, `mission.mjs` | Older browser-local mock, independent localStorage |
| `packages/domain/src/` | Comparison, ownership, packets, simulation and CBC parser |
| `api/src/chnai_api/main.py`, `models.py` | HTTP routes and validated contracts |
| `api/src/chnai_api/store.py`, `engine.py` | Crew transactions and bounded domain bridge |
| `api/src/chnai_api/research.py` | Research imports, content objects, manifests and queries |
| `api/migrations/`, `api/research_migrations/` | Separate checked SQL migrations |
| `scripts/` | Development/build, adapters, contracts, readiness, crew backup and research CLI |
| `packages/contracts/openapi.json` | Generated current API contract |

Commands use strict validation, `expectedVersion` and an idempotency key. SQLite `BEGIN IMMEDIATE` protects state/projections/audit/outbox/receipt updates as one crew transaction. SQL triggers protect immutable records. Uncertain browser commands retain exact actor/body/key across reload; new actions stay blocked until resolution. Storage failure blocks a new command before sending. Role changes and failed loads clear old medical content. Onboard-note sharing begins unchecked and remains so through form recovery.

The role selector and actor headers are simulation mechanisms, not authenticated identity. Default host is loopback. No Internet-facing API or real medical deployment is ready.

## What the research registry actually contains

Two retained public OSD-569 CBC CSVs are already in `web/public/data/`, with exact checksums in [data provenance](../DATA_PROVENANCE.md). The submitted file contains 553 rows, 23 analyte labels and four research IDs. The wide file has 28 overlapping rows, not 28 extra people. Twenty-eight hemoglobin unit-label conflicts are retained; cross-file normalization is withheld. Original relative time labels remain categorical rather than invented UTC timestamps.

Namespace `RESEARCH:OSD-569` stays separate from fictional `SIM-CHNAI-01`. Source reference intervals are metadata, not operational clinical rules. The registry uses fixed reviewed inputs; it has no arbitrary upload or live NASA download endpoint.

Imports retain source object hashes, file/row references, parser artifacts and runtime versions. Accepted rows, issues and import metadata commit together in the research database. Object-file writes are outside that transaction: verified orphan objects may remain after failure. There is no claim of distributed atomicity or continuous rehashing on every read. Research initializes lazily so a research-store error does not automatically block the crew workspace; shared-process resource failures are not fully isolated.

Crew backup uses SQLite's backup facility. **It does not back up the research directory.** Coordinated research object/database archive and restore is an explicit open task.

## Verification evidence and limits

| Evidence | Last established result | Scope |
| --- | --- | --- |
| Node tests | 86 pass | Includes 12 in-app scenario contracts and 12 client transport cases; do not add them again |
| API/storage tests | 34 pass | Includes 13 research ingestion cases; real temporary SQLite databases |
| Baseline GitHub CI | [Successful run 39813137558](https://github.com/kavatana/kavatana/actions/runs/39813137558) | Linux, v0.8 baseline above |
| Browser mock v0.6 | Earlier desktop walkthrough passed | Older browser-local mode only |
| API-connected Mac workflow | 17 manual checks Not run | `docs/LOCAL_ACCEPTANCE.md` |
| Research registry UI | Eight walkthrough steps Not run | `docs/RESEARCH_WALKTHROUGH.md` |
| Clinical/astronaut review | Not established | No sign-off or flight qualification |
| Target Mac/model performance | Not measured | Linux results do not establish M3 Pro performance |

See `docs/VALIDATION_V08.md`, `docs/VALIDATION_V071.md` and earlier records for their exact dates and limitations. A managed browser preview could not resolve its Python runtime; no new API-UI screenshots or visual pass were claimed. That infrastructure issue has not been reproduced on the user's Mac.

## Running and hosting

Use the project README dependency steps. `npm run dev` serves the local API/UI at `http://127.0.0.1:4173/`. `/index.html` opens the independent older browser mock; `/research-registry.html` opens the API research interface. `.runtime/` holds local databases/objects/reports. Use a new `CHNAI_DB` filename for a fresh fictional acceptance run; do not delete existing state as a recovery shortcut. `.env.example` is documentation; `.env` is not automatically loaded.

The earlier owner-private static Site is a different deployment target. It serves the browser mock and shared parsing assets, not Python/SQLite. Publishing code to GitHub did not provision a public API or make the private Site a judge-accessible final product. Final public demo hosting remains a deliberate future release decision.

## Chronology and source precedence

- Original preparation: challenge interpretation, hazards, data/technology possibilities, team/pitch notes and provisional event guidance.
- 18–19 October: research catalogs/checkpoint; 84 proposed requirements, 58 planned acceptance cases, 38 candidate indicators.
- 20 October: conditional stack/architecture, SC01 workflow, hardware addendum and 40 synthetic model case cards. These were proposals and designed tests.
- 21 October: 42-table engineering proposal, fictional fixtures, data-to-product allocation, mission blueprint and direct interface/winner review; first working browser mock and later v0.5.
- 22 October: v0.6 ownership/mission episode, v0.7 persistent monorepo, v0.7.1 client recovery, v0.8 research registry.
- 23 October: portable repository handoff and research consolidation.

Historical requirements and case counts are not counts of implemented features or executed tests. The research map preserves their original labels; actual code plus dated verification records establish delivery. Challenge details, required resources, entry eligibility and final submission rules remain open reconciliation items.
