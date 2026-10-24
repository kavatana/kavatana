> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# How data becomes a review

20 October 2026. Recommended design; implementation not tested.

The data path starts with a versioned adapter envelope. Validate file type, namespace, size, schema, identity, clock, quantity and source mapping. Persist the batch and job before acknowledging acceptance. Keep a complete ledger of accepted, quarantined, duplicate and rejected records.

The evaluation path consumes only accepted, applicable observations. Deterministic code evaluates comparable baselines, windows and source criteria. It records exact input revisions, rule and mapping versions. The resulting finding states its reason and missing context before entering the attention queue.

- Use event identity and clock segment for device deduplication. Two legitimate measurements can have the same value; equal values are not duplicate evidence.
- A high-rate channel stays in timestamped chunks with calibration and sample metadata. A dashboard uses versioned window summaries and coverage.
- An L-/R+ research time label cannot become a precise mission timestamp merely to make a chart continuous.
- OSD-569 hemoglobin mapping and ACTES RR/VO2 issues are useful failure fixtures. They are not inputs for unqualified medical interpretation.
- Device acquisition gaps generate collection faults. They do not establish a physiological change.

Evidence and cross-references: ADR08; ADR15; RQ11-25; RQ28; RQ31; RQ37; Q001; R017; E005; E008; T029

- [R017](https://physionet.org/content/actes-cycloergometer-exercise/1.0.0/)
- [E005](https://raw.githubusercontent.com/polarofficial/polar-ble-sdk/master/documentation/TimeSystemExplained.md)
- [E008](https://hl7.org/fhir/R4/datatypes.html)
- [T029](https://github.com/polarofficial/polar-ble-sdk)
