# Research and design map

Consolidated 23 October 2026. **This is historical evidence and proposal material.** Use [current project state](../docs/handoff/PROJECT_STATE.md) for what is implemented and tested. Read relevant records in stages instead of loading every catalog into an agent's context.

## Where to find each part of the work

| Folder | Contents and best starting point | Status boundary |
| --- | --- | --- |
| [01-original-preparation](01-original-preparation/README.md) | Original challenge interpretation, hazard primer, rules/strategy, data ideas and team needs; start with [challenge](01-original-preparation/01-challenge/challenge.md) | Early notes contain provisional dates and claims later refined; two private form drafts omitted |
| [02-source-register](02-source-register/Research_Findings.md) | Original research findings; [sources](02-source-register/sources.csv), [assets](02-source-register/assets.csv), [studies](02-source-register/studies.csv), [files](02-source-register/files.csv), devices, roles, workflows and quality issues | Catalog and acquisition history, not proof that all data was downloaded or clinically applicable |
| [03-research-checkpoint](03-research-checkpoint/RESEARCH_CHECKPOINT.md) | [Data contracts](03-research-checkpoint/DATA_CONTRACT_NOTES.md), acquisition attempts/manifests, analog inventories | Dated corrections and access gaps |
| [04-requirements](04-requirements/PROJECT_ENTRY_GUIDE.md) | [Requirements](04-requirements/tables/requirements.csv), [acceptance](04-requirements/tables/acceptance.csv), [indicators](04-requirements/tables/indicators.csv), roles, applicability, access and source tables | 84 proposed requirements; 58 planned acceptance cases; 38 candidate indicators; not all delivered |
| [05-architecture-proposals](05-architecture-proposals/README.md) | Conditional stack decisions/alternatives, logical entities, API groups, failure behavior, release gates and [hardware addendum](05-architecture-proposals/HARDWARE_ADDENDUM.md) | Earlier candidates, superseded where current ADR-007 differs; no model/hardware benchmark |
| [06-workflow-spec](06-workflow-spec/README.md) | SC01 evidence/review journey, state machines, contracts and [32 qualification cases](06-workflow-spec/qualification_cases.json) | Designed cases, not automatically executed by the present suite |
| [07-validation-kit](07-validation-kit/README.md) | [Health review brief](07-validation-kit/output/pdf/CHNAI_Health_Review_Brief.pdf), blank reviewer response, Mac procedure and [40 synthetic model case cards](07-validation-kit/model_case_cards.json) | No clinical sign-off or model execution; proposed holdout is visible and cannot be reused after tuning contamination |
| [08-engineering-spec](08-engineering-spec/README.md) | [Schema dictionary](08-engineering-spec/schema_dictionary.json), field/relationship tables, [Excel register](08-engineering-spec/outputs/engineering-20261021/CHNAI_Engineering_Register_v0.2.xlsx), diagrams, synthetic fixtures, API/interface/test specifications | 42 proposed tables, 371 fields, 87 references, 12 views, 16 operations, 36 planned development cases; not the executable schema |
| [09-data-to-product](09-data-to-product/CHNAI_Data_to_Product_Plan_v0.3.md) | [20 data families](09-data-to-product/registers/data_families.json), source/study/asset allocation, original-note use, backlog and visual direction | Allocation is a proposal; “present locally” fields describe the old audit date |
| [10-mission-blueprint](10-mission-blueprint/CHNAI_Mission_Experience_Blueprint_v0.4.md) | Nine personas, ten illustrative day events, 20 planned scenarios, decisions and exact conceptual maps | Role grants, day schedule and scenarios are design examples, not NASA crew schedules |
| [11-interface-review](11-interface-review/CHNAI_Mission_Interface_Review_2026-10-21.md) | Twenty sources, 14 inspection records and ten traceability requirements; NASA Playbook and observed public winner interfaces | Observation dates and failed interactions retained; current sites may differ from judged versions |

The workbook is an archival design artifact. CSV and JSON forms are also retained so Codex can inspect fields and relationships without spreadsheet software. Mermaid `.mmd` and SVG diagrams are editable concept maps; current executable storage is under `api/`.

## Find an answer without searching blindly

| Question | Read |
| --- | --- |
| What does NASA already do, and why onboard autonomy? | Mission/interface narratives and their source registers; original research `roles.csv`/`workflows.csv` |
| What should one crew member see or do today? | Mission `roles.json`/`day_in_life.json`, interface observations, then current `docs/MISSION_EPISODE.md` |
| Which sources might support an indicator or adapter? | Requirements indicator/access/applicability tables; engineering adapters; data-family allocation |
| How should time, units, provenance and quality work? | Checkpoint data-contract notes, workflow contracts, engineering ingestion spec, current research architecture |
| Where are full schema proposals and fictional seeds? | Engineering schema dictionary, tables, fixtures and diagrams |
| Which requirements are actually tested? | Current code and dated `docs/VALIDATION*.md`; historical cases are not a substitute for traceable implementation tests |
| What did winner research establish? | Interface observations plus current `docs/AWARD_EVIDENCE.md`; no private judging motives are known |
| Which raw artifacts are absent from this clone? | [Recovery record](RECOVERY.md), `provenance/recovery-manifest.json`, asset/source URL catalogs |

## Counts mean different things

The data-to-product audit recorded **243 source-register occurrences / 207 normalized URL keys**, **119 study catalog entries**, **382 asset/acquisition entries**, **26 original preparation notes**, and **6,532 remote file inventory rows**. These are different units. They are not counts of independent datasets, cohorts, usable medical records or fully downloaded files. This public consolidation includes 24 of the original 26 notes; the private registration/contact drafts are excluded.

The historical hash audit recorded 374 matching recorded hashes and no mismatches at that checkpoint. The new recovery manifest separately fingerprints the recovered archive members and included copies. Neither hash result establishes source accuracy, clinical validity or current publisher availability.

## Practical use and rights

The only raw research measurements loaded by the current application are the two retained OSD-569 CBC CSVs documented in [data provenance](../docs/DATA_PROVENANCE.md). Broader Earth analog, waveform, environment, imaging and omics references remain discovery/research inputs with individual applicability and access limits. Do not ingest them automatically or combine cohorts because they share a label.

CHNAI authored the analysis, proposals and diagrams with AI assistance. NASA/other source material retains its provenance and terms; the software MIT license is not a blanket license for external data. This handoff links and inventories raw captures instead of republishing every third-party publication. Private archive links and personal contact details were removed from included text, and those transformations are recorded.

Historical READMEs may mention a PDF, generator, Drive publication or local path from their original package. Use the repository links above and the recovery manifest to resolve what was retained. Those old instructions do not override `AGENTS.md` or authorize executing a collected script.
