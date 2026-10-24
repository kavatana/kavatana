> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# The architecture comparison now has a target

12 / Technology decision brief

Select technologies by measured task and failure behavior. The next milestone can compare client packaging, API/runtime, transactional storage, waveform/object storage, local model serving and workflow execution against the same fixtures and queries. No vendor or framework is selected in this baseline.

Compare three deployment patterns first: a browser application with a local companion, a packaged local application, and a shared onboard service with crew clients. Evaluate offline cold start, storage durability, device SDK compatibility, inference access, deployment effort and public-demo hosting. A pure cloud dependency fails the proposed core mission scenario.

Define ownership before folder names: client interaction; domain rules and authorization; source adapters; evidence and versioning; inference; persistence/migrations; synchronization; verification fixtures; and documentation. A modular single deployment and multiple services are options to benchmark, not status symbols.

The API contract should expose commands, queries, revision identity, authorization, structured validation errors and asynchronous job state. Persistence lives behind a controlled data-access boundary. Putting a database in an api folder is an organizational choice; schema migration ownership, reproducibility and access rules are the consequential decisions.

- Benchmark unit/time validation, latest accepted observations, trend windows, waveform slices, provenance lookup, action recording and resumable handoff.
- Use pass/fail mission constraints before scoring convenience or popularity.
- Record decision, alternatives, evidence, benchmark result, owner and reversal cost.

Evidence / cross-references: RQ77-RQ84; G02-G08; workload model; S004; E003-E010
