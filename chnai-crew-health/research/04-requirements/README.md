> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB - research and requirements baseline v0.1

Prepared 19 October 2026. This is research preparation, not a monitoring application or clinical validation.

## Open first

- Requirements workbook: [private archive link omitted]
- Research and requirements report: [private archive link omitted]
- This checkpoint folder: [private archive link omitted]
- Earlier master catalog: [private archive link omitted]
- Complete project collection: [private archive link omitted]

Start with the workbook's Readiness, Workflow options and Scope staging tabs. Then use Requirements and Acceptance to assess a proposed implementation. Use Data access and Field mappings before importing data.

## What this checkpoint contains

| Item | Count | Meaning |
| --- | ---: | --- |
| Proposed requirements | 84 | Source-grounded engineering proposals, not NASA certification |
| Acceptance cases | 58 | Specified; application execution state is Not run |
| Candidate indicators | 38 | Includes measured, indirect, documentation-only and unavailable inputs |
| Proposed roles | 10 | Access boundaries need mission and clinical review |
| Dataset access cards | 15 | What bytes exist, permitted purpose, limits and next gate |
| Source-to-field mappings | 19 | Includes blocked mappings and documentation-only adapters |
| NASA applicability entries | 12 | Requirement IDs, context and invalid uses |
| Source index entries | 132 | Earlier sources plus this checkpoint; not 132 datasets or cohorts |

The new acquisition manifest has 37 entries: 29 retrieved responses, five recovered local files, two unavailable requests, and one HTML interstitial whose primary article was verified separately through web retrieval. These are acquisition records, not independent scientific datasets. The earlier 339-asset / 94-source figures remain the historical 18 October collection counts and are not silently overwritten.

## Folder purposes

- `documents/`: sixteen concise sections covering research method, mission, crew journey, data governance, AI, offline operations, UX, architecture criteria, sizing and validation.
- `tables/`: portable CSV copies of the fourteen research/requirements tables.
- `sources/`: retained primary-source pages/documents, extracted text and link inventories. Read collection status before treating a page as usable evidence.
- `data/sleep-edf/`: one complete PSG session, its annotation companion, participant metadata and publisher checksums.
- `data/cycle-exercise/`: ACTES exercise files and license; 18 youth athletes, not adult astronaut norms.
- `data/analog-metadata/`: ISA study metadata for OSD-51, OSD-195 and OSD-198; no claim of acquired raw omics arrays.
- `data/exercise/`: treadmill license/checksum evidence only. Measurements were not downloaded because terms conflict.
- `analysis/`: reproducible profiles, publisher-hash comparisons, source validation, traceability and native-sheet checks.
- `rejected/`: failed download content retained as evidence of the access failure; not accepted PDF/data files.
- `output/`: report, workbook sizing results and artifact validation records. The native Google Sheet is the editable workbook deliverable.
- Root Python files: collection, profiling and document-generation scripts. They are research tooling, not the challenge application.

## Verified findings that affect architecture

1. The Sleep-EDF PSG was recovered complete and matches the publisher hash. The annotation companion is part of that session, not a second participant. Four physiological channels are 100 Hz; the marker is 10 Hz. The annotation-only EDF+ file has zero record duration, which requires special handling rather than a fabricated sample rate.
2. ACTES has 52,062 measurement rows, 18 participants and 1,148 missing RR values. RR here is an interbeat interval in milliseconds. The similarly named treadmill field means breaths per minute. ACTES oxygen-consumption scale remains unresolved; retain raw values and block clinical normalization.
3. The OSD-569 submitted CBC file has 553 rows for four participants and seven relative time labels. The transformed hemoglobin percent header conflicts with submitted g/dL. Preserve both sources and quarantine the mapping.
4. OSD-195 and OSD-198 describe related PlanHab work. Separate accessions do not establish independent people.
5. Current flight-device APIs, target mission hardware and clinical next actions remain unconfirmed. Vendor documentation and research proofs of concept do not establish operational compatibility.

## Readiness

The evidence is sufficient to begin reversible comparisons of client, API, database/object storage, local inference and automation patterns. Final commitment requires an exact episode, target hardware and approved interpretation/action content. Fine-tuning currently lacks a demonstrated task-specific justification.

The recommended first path is an onboard evidence-review episode with a legitimate next action, durable follow-up and delayed ground handoff. The authentic CBC mapping discrepancy is a useful failure case. A successful health-evaluation branch still needs reviewed semantics and clinical content; a data-quality demonstration alone does not fulfill every challenge verb.

## Reproduction and validation

Extract this package as `requirements-2026-10-19/` beneath the same `research-foundation/` parent as the earlier collection packages. The profile script's CBC inputs and the base-table builder's earlier source catalog are dependencies from that earlier collection. This checkpoint is an incremental package, not a replacement full backup.

The acquisition plans and results capture URLs and retrieval evidence. Preserve those snapshots: rerunning collection later can return a different source version. `build_requirements.py` creates the original tables; `extend_package.py` adds mappings, access cards, applicability and documents; `build_report.py` renders the PDF with ReportLab. The supplied `build_workbook.mjs` requires the artifact-tool runtime and contains a recorded workspace path; adapt that path when reproducing elsewhere. It writes an intermediate XLSX for native Google Sheets import. No product tests have been run.

Byte validation and table consistency checks are documented in `analysis/package_verification.json`. `SHA256SUMS.txt` covers the portable contents except itself. Publisher checksum agreement establishes file identity, not medical accuracy. Native import was checked for table identity, all fourteen table contents, workload formulas and exported visual layout.

## Scheduled reconciliation

Two follow-up checks are scheduled for the evening in Phnom Penh:

- 28 October 2026: reconcile the published full challenge objectives and required resources.
- 13 November 2026: verify the official submission and judging guides; replace historical 2025 assumptions.

The official FAQ prohibits beginning challenge work before the hackathon. This package is research preparation. Confirm organizer interpretation before using pre-event product code or mockups. Local pitch times/bonuses and 2025 demo limits remain planning claims until current sources confirm them.

## Attribution and reuse

Third-party assets keep their original licenses and conditions. See `ATTRIBUTION.md`, source pages, license files and the Data access register. This archive is a research copy; it is not an assertion that every asset may be republished publicly, used for model training or used clinically. No private astronaut medical records were obtained. No data requests or messages to external people were sent.
