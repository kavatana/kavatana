> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Review gates and next implementation decisions

## Content review

Resolve the clinical reviewer's questions about measurement validity, baseline selection, direct/indirect comparability, uncertainty, applicability and allowed action wording. Do not equate student feedback with clinical authorization. The proposed 80% arithmetic example remains a demonstration until the review scope is defined. [P03]

## Schema review

Review the 42-table draft against actual API use cases. Confirm nullable branches, uniqueness, JSON schemas, actor authentication, namespace enforcement, revision ownership, clinical-review storage and time indexing. Decide whether any core tables can be combined without losing an invariant. Count is not a quality target.

## Device and data review

Freeze one input contract and one licensed sample for each implemented adapter. Investigate the unresolved VO2 scale and transformed CBC unit conflict before canonical interpretation. Record source versions, checksums, limitations and rights. Future data collection should close a requirement or test gap, not simply increase archive size.

## Host qualification

Obtain actual Mac inventory and perform the already specified workload/model tests. Until then, no RAM, latency, throughput, offline reliability or energy-use claim is verified. The current cloud authoring environment is not the user's laptop.

## Event readiness

Reconcile full challenge objectives and any required datasets when published. Confirm permitted preparation before starting product implementation. Keep the public project link synthetic, clear about limitations and reliable after the event. Maintain the existing local/global submission plan as a working plan until the 2026 guide is checked.

## Exit condition for this milestone

This handoff is ready for design review when the workbook, diagrams, fixture inputs and expected results agree. It is ready for implementation only after unresolved eligibility/content/contract choices are addressed. It is ready for a live demo only after the application cases have actual evidence. None of those later gates is silently marked complete.
