# v0.8 verification — 22 October 2026

The retained OSD-569 research parser now feeds a separate durable research registry. There are no new clinical rules or live device integrations. The original source CSV bytes are unchanged.

| Executed check | Result | Evidence |
| --- | --- | --- |
| Node suite | 86 passed | Existing domain, CSV/source integrity, research, mission, scenario and client-recovery checks |
| API/storage suite | 34 passed | 21 prior crew/API cases plus 13 research-ingestion cases |
| JavaScript syntax | Passed | Web, shared parser/rules, scripts and tests |
| OpenAPI generation/drift | Passed | Current API contract includes the bounded research routes |
| CLI import | Passed in an isolated local directory | Actual retained bytes produced 553 submitted observations, four source IDs and 28 unit-label conflicts |

Total: **120 automated cases**. The 12 in-app scenarios and 12 client-transport tests are already included in the 86 Node checks. CLI execution is separate evidence and is not another test counted in the total. The existing non-failing Starlette TestClient/httpx deprecation warning remains visible.

The 13 added research cases verify exact object retention and source locations; repeated/reopened import identity; two concurrent imports producing one job; changed-source rejection with an attempt record; a missing source preserving accepted history; corrupt-object detection without replacement; full database rollback after injected write failure; immutable accepted records; parser failure handling; bounded paginated reads, filters and unknown IDs; source/role allowlists with unchanged crew state; API rejection traceability; and research-initialization failure isolation plus rejection of colliding database paths. Several assertions are intentionally grouped by a single failure contract; they are not additional case counts.

The transaction-failure test confirms that verified orphan raw files can remain after rollback while all accepted database rows and metadata are absent. This is a documented cross-filesystem/database limitation, not atomic storage across both resources. Runtime/parser hashes are part of the import identity, so a different runtime may produce another recorded job for the same original source files.

Test transcripts: `test-results-v08-node.txt`, `test-results-v08-api.txt`. GitHub CI reruns the checks for each pushed revision; its remote result is authoritative for that commit.

## Browser and target-hardware status

The new research registry HTML/CSS/DOM interactions have not completed browser or visual QA. The managed preview remains unavailable after its prior Python interpreter resolution failure; no infrastructure recovery was established, and no replacement browser/server was improvised. The original static browser importer uses the same shared parser and passed its source/CSV unit checks; this does not establish its post-refactor visual behavior.

Follow `RESEARCH_WALKTHROUGH.md` for eight manual steps. Those steps and the previous 17-case `LOCAL_ACCEPTANCE.md` remain Not run on the actual M3 Pro/Safari environment. No screenshot, target-Mac latency, astronaut usability or clinical result is inferred from automated checks.

## Remaining scope

One retained CBC snapshot is supported. Large waveform/omics/imaging ingestion, general uploads, automated remote acquisition, physical devices, scheduled refresh, coordinated research archive/restore, high-volume benchmarks and model training are unimplemented. The existing fictional care workflow is preserved; operational medical deployment, real identity/encryption, clinical review and challenge eligibility remain separate qualification work.
