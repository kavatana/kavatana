> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data contracts: findings and actions

An explanation, a decision and a saved action have different identities.

| Object | Minimum semantic contract |
| --- | --- |
| Comparison finding | Finding ID/revision; two exact assessment revisions; mapping/calculation/evidence versions; fraction; applicability; comparison; reasons; uncertainty; created time; supersession status. |
| Review episode | Episode ID/revision; subject and purpose; active finding references; assigned role; status; unresolved conditions; last durable activity. |
| Action request | Action ID; allowed kind; initiator; owner/assignment state; expected episode revision; reason; authorization status; procedure/version if one applies. |
| Follow-up | Follow-up ID; linked action; owner; due condition or explicitly unassigned scheduling; completion evidence; disposition; unresolved reason. |
| Explanation draft | Job/output ID; exact finding revision; approved fact/citation IDs; candidate model/build/prompt-template versions; validation state; draft expiry or supersession. |
| Handoff draft | Draft ID/revision; intended recipient and purpose; selected source revisions; allowed fields; question; exact content digest; human release decision. |
| Released packet | Immutable packet ID/hash; release actor/policy; destination; input lineage; queued/transport/receipt events; separate reviewer event. |
| Audit event | Actor/service identity; operation and target revision; purpose; outcome and reason code; time basis. No secrets or raw medical prompt dumps in general logs. |

Persisting a support request creates an accountable task, not a prescription. A missing care-plan procedure cannot be repaired by model-generated instructions. An unassigned request remains visible until a permitted assignment or disposition occurs.

A subject-level health score is intentionally absent. The available evidence does not justify compressing unrelated domains into a single percentage.

Evidence and cross-references: RQ21, RQ31, RQ34-46, RQ53, RQ55, RQ62-66; AC19, AC27-39.
