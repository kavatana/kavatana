> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Four independent state machines

Separate data quality, comparison, review work and communication.

| Track | States / transitions | Important guard |
| --- | --- | --- |
| Data | received -> pending -> accepted, quarantined, rejected or duplicate | Accepted revisions are immutable; corrections create linked revisions and invalidate affected outputs. |
| Comparison | not_evaluable / review_required / evaluated; an evaluated result can become stale | An evaluated result records below/meets. Stale inputs cannot authorize new actions or release. |
| Episode | attention -> in_review -> follow_up -> closed; needs_reassessment can reopen review | Closed requires a recorded disposition and no unresolved mandatory action. A correction can reopen it without rewriting history. |
| Handoff | draft -> approved/queued -> transported -> application_received -> reviewed | These are separate events. Held, failed and superseded are explicit; transport cannot create a reviewer event. |

## Corrections that cross the network boundary

If an input correction arrives before release, invalidate the draft. If it arrives after release but before an unsent packet is dispatched, hold that packet and require a new review. If transmission is already in flight, do not claim cancellation succeeded: preserve its outcome and prepare a supersession/correction packet for approval.

If the packet has been received, retain the original and append the correction relationship. The receiving view must show that its evidence was superseded when that update arrives. A reviewer may have acted before learning of a correction; the history must represent that ordering honestly.

A replay clock, local commit order and ground receipt time have different meanings. Use identities and revision dependencies for consistency, not wall-clock order alone.

Evidence and cross-references: RQ17, RQ21, RQ34-40, RQ62-64; AC16, AC19, AC29-32, AC46. Transition policy is proposed.
