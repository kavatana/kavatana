> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Logical schema before table count

20 October 2026. Recommended design; implementation not tested.

The proposed schema has 26 logical entity groups, staged by workflow. These are responsibilities and invariants, not 26 tables to build immediately. The Entities register defines grain, key fields, constraints, owner and stage for each group.

An observation retains raw value/unit, canonical quantity, reviewed mapping, specimen/method, original time, optional UTC anchoring, quality state and exact source locator. A corrected observation creates a new revision. Findings and packets depend on exact revisions, so correction can invalidate them predictably.

- Use explicit subject namespaces and care relationships. A role such as commander does not imply access to all clinical details.
- Use a value discriminator: decimal quantity, coded result, text, waveform reference or unavailable/censored state. Do not convert every missing value to zero.
- For exact scalar quantities, retain a canonical decimal representation and compare through reviewed Decimal logic. SQLite numeric affinity alone is not an exact-decimal guarantee.
- Represent large integer timestamps as decimal strings across the JavaScript JSON boundary. Keep original clock basis and reset segment.
- Index common access paths: subject + quantity + time basis, current episode state + next actor, pending jobs + due time, packet + destination and source/revision dependencies.

Evidence and cross-references: Entities register; RQ10-24; RQ28-30; RQ34; RQ53; RQ64; T006; T037; E005; E009

- [T006](https://pydantic.dev/docs/validation/latest/concepts/strict_mode/)
- [T037](https://docs.sqlalchemy.org/en/20/dialects/sqlite.html)
- [E005](https://raw.githubusercontent.com/polarofficial/polar-ble-sdk/master/documentation/TimeSystemExplained.md)
- [E009](https://hl7.org/fhir/R4/observation-definitions.html)
