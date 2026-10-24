> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# What decides the stack

20 October 2026. Recommended design; implementation not tested.

Use hard requirements before convenience. An option is unsuitable if it requires an Earth service for core review, silently changes measurement meaning, cannot recover an acknowledged record, or lets the model authorize clinical actions.

Among options that can satisfy those requirements, prefer the smallest deployment the team can explain, recover and test. Documentation establishes capabilities and constraints. It does not establish our latency, storage cost, clinical validity or team delivery speed.

- Required: local cold start, record provenance, explicit time/units, revisions, durable actions and delayed transfer.
- Required: purpose-limited access, visible data quality, accountable action authority and non-model fallback.
- Compare: implementation effort, parser ecosystem, host compatibility, maintainability and license/redistribution obligations.
- Do not invent weighted numerical scores. The Alternatives register records the actual tradeoff and the condition that would change each recommendation.
- The 84-requirement baseline remains unchanged. Its 58 acceptance cases and all new implementation gates remain unexecuted.

Evidence and cross-references: Requirements baseline v0.1; ADR01-18; G01-12; T005; T008; T018; T025

- [T005](https://fastapi.tiangolo.com/tutorial/background-tasks/)
- [T008](https://www.sqlite.org/wal.html)
- [T018](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)
- [T025](https://huggingface.co/google/medgemma-1.5-4b-it)
