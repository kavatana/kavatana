> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data contracts: identity and input

These field groups describe required semantics, not an implemented API schema.

| Object / field group | Required content and validation |
| --- | --- |
| Import envelope | Contract version; simulation namespace; source asset hash; adapter/version; source record identity; batch identity; scoped idempotency key; receipt time. |
| Subject reference | Opaque subject ID plus namespace and mission-simulation ID. Display name is separate. A source participant ID is never silently remapped to a crew ID. |
| Assessment identity | Assessment ID and revision; source locator; quantity identifier; raw value and unit; reviewed canonical decimal and unit; quality disposition. |
| Method context | Protocol and version; direct/indirect method; relevant measurement conditions; reviewer decision for comparability. A free-text method name is insufficient. |
| Time context | Original timestamp expression; event interval; clock basis; phase; precision/uncertainty; receipt time. Store mission labels without inventing UTC. |
| Baseline link | Exact baseline assessment revision; selection actor; reason; review state; linked comparison-policy version. |
| Evidence release | Source revision/section; acquired source hash where retained; mapping/calculation versions; permitted use; release reviewer and status. |
| Provenance label | simulated_operational / research_observation / measured_demo / derived. Derived output also records the provenance of all inputs. |

A record can be stored while its interpretation is blocked. Accepted-for-processing is not accepted-for-comparison. At batch completion, received records must equal accepted + quarantined + rejected + exact duplicates; a pending count is explicit before completion.

No final name, unit registry code or numeric validator is implied by this table. The eventual typed schema must resolve these documentary requirements and retain a versioned example for every failure branch.

Evidence and cross-references: RQ05, RQ09, RQ11, RQ13, RQ17-18, RQ24-28, RQ77-78; AC04, AC08-16, AC55.
