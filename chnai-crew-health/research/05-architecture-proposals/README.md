> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB technology and architecture decisions

20 October 2026. Version 0.1. Recommended architecture; implementation not tested.

## Read first

1. Read pages 1-4 of the report for the decision and offline boundary.
2. Use the Decisions and Alternatives tabs to review the recommended stack and what would change it.
3. Use Failure behavior and Evaluation gates before freezing implementation choices.
4. Use Entities, API operations and Code ownership when the permitted build begins.

- [Editable decision register]([private archive link omitted])
- [Architecture report]([private archive link omitted])
- [Architecture folder]([private archive link omitted])
- [Requirements baseline]([private archive link omitted])

Portable package: `CHNAI_Architecture_Decision_Package_2026-10-20.zip`.

## Recommended default

| Area | Recommendation | Commitment level |
| --- | --- | --- |
| Web | Nuxt 4, Vue 3, TypeScript, client-only static build | Recommended; confirm actual team fit |
| API and domain | FastAPI, Pydantic, Python | Recommended; parser and contract tests pending |
| Local record | SQLite, SQLAlchemy 2.x, Alembic | Recommended for one backend owner; actual build and durability tests pending |
| Large recordings | Original immutable files; Parquet plus DuckDB for selected derived analysis | Staged according to actual workflow volume |
| AI runtime | Local llama.cpp server | First candidate; target-hardware qualification pending |
| Model | Qwen3.5-4B, compared with deterministic templates | Candidate, not a benchmark winner |
| Automation | Durable local jobs, explicit workflow transitions, transactional outbox | Required behavior; not implemented |
| Interface | Stable review controls with validated AI content | Generative UI protocol optional |

The primary offline demonstration uses one development laptop as the local node. A tablet is an optional LAN client. Earth outage, LAN outage and node failure are separate cases. This package does not claim flight hardware integration or standalone tablet operation.

## Contents and status

- 18 architecture decisions and 22 alternative comparisons.
- 26 logical entity groups, not a requirement to build 26 separate tables.
- 14 API operation groups with actor, idempotency and revision semantics.
- 15 failure scenarios and 12 evaluation gates.
- Code ownership and component/license registers.
- 46 technology-reference entries: 9 successful full-byte captures, 32 readable web-evidence references and 5 acquisition gaps. These are references, not datasets or independent studies.
- The 84 requirements and 58 acceptance cases in the 19 October baseline remain unchanged. Baseline CSV copies are included for traceability.
- Zero application tests and zero runtime benchmarks executed. Documentation consistency, spreadsheet arithmetic, file integrity and layout checks are separate from application validation.

## Data and evidence boundaries

The research archive in Drive is the team knowledge repository. A reviewed evidence release selects the source sections, mappings and applicability needed by the episode. The operational record is a separate local store. Research participants, simulated crew and any future measured demo participant retain separate namespaces.

Raw source acquisition was partly blocked in this pass. The original failed requests remain in `source-plan-results.json`; readable primary-source retrievals are retained separately in `sources/web_batch_*.json`. Readable retrieval is not an original publisher byte capture. The source table records which kind of evidence is available. No gated model weights were downloaded or terms accepted.

Source files and documentation retain their original owners and terms. This archive is research reference material; it is not a blanket redistribution license for incorporation into the public product. See `ATTRIBUTION.md` and each source's release conditions.

## What the package contains

- `documents/`: readable architecture rationale and contract notes.
- `tables/`: editable CSV equivalents of the decision registers.
- `architecture_data.json`: structured content used to build the report and register.
- `sources/`: retained primary-document captures and readable retrieval evidence.
- `analysis/`: acquisition hashes, baseline references and documentation/publication checks.
- `output/CHNAI_Technology_and_Architecture_v0.1.pdf`: the reviewed report.
- `build_content.py`, `build_report.py`, `build_workbook.mjs`: research-artifact authoring scripts, not challenge-product code.

The intermediate Excel build and native-export verification copy are excluded from the portable deliverable because the editable spreadsheet is the native Google Sheet linked above. The workbook builder requires the artifact-tool runtime used for this research session. CSV and JSON files can be inspected without it.

For reconstruction, `build_content.py` can use the included `analysis/baseline_requirements_data.json` if the earlier checkpoint is not adjacent. `build_report.py` reads that retained baseline for reference titles. To run the workbook builder from a temporary working directory with the appropriate artifact-tool runtime, set `CHNAI_RESEARCH_ROOT` to this extracted package directory. `CHNAI_QA_DIRECTORY` can select a separate preview directory. These builders reconstruct research documents; they do not build the proposed application.

## Gates that remain open

The full challenge and required resources must be reconciled on 28 October. The 2026 submission guide is checked on 13 November. Existing follow-up checks are already scheduled; no duplicate reminders were created.

Actual host/client hardware, a reviewed clinical episode, source mapping/release rights, runtime measurements, authentication and recovery tests remain prerequisites for a qualified implementation. The current stack is a recommendation under those conditions, not a claim that requirement RQ83's benchmark gate has passed.

The official FAQ prohibits starting challenge work before the hackathon. This package is research and architecture preparation. It contains no implemented application, executable schema migration, trained model or deployment.

## Proposed episode change

The earlier CBC example remains valuable for testing source contradictions. This architecture adds a proposed success path using an explicitly simulated comparable aerobic-capacity assessment and a NASA criterion, followed by an authorized request for review. It does not replace the baseline workflow options or resolve the ACTES VO2-unit issue. See `documents/EPISODE_SELECTION_NOTE.md`.
