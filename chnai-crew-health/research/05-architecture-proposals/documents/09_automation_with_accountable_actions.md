> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Automation with accountable actions

20 October 2026. Recommended design; implementation not tested.

Use explicit domain states rather than chat history. A review episode owns attention, review, authorized action and follow-up. Jobs own ingestion, derivation, explanation and packet preparation. Each job has a lease, retry count, cancellation state and durable input/output references.

A handoff has six separate milestones: locally saved, approved for release, queued, transported, application received and clinically reviewed. Delivery uses at-least-once retries with receiver deduplication. A network success response cannot impersonate a clinician review.

- An AI component can draft text and propose allowed support actions. It cannot grant its own permissions, release a packet, prescribe or clear EVA.
- A released payload is immutable. Changing its source revisions, destination, purpose or content requires a new version and approval.
- If a correction invalidates a queued packet, hold it. If the old packet was already delivered, retain history and prepare a correction packet for fresh release.
- SSE supplies UI notifications; GET endpoints recover authoritative job and episode state after reconnection.
- FastAPI background callbacks are not a durable job queue. Persist job state before dispatch; keep processing bounded and restartable.

Evidence and cross-references: ADR09; API operations; F08-12; RQ34-40; RQ46; RQ55; RQ62-66; T005; E010

- [T005](https://fastapi.tiangolo.com/tutorial/background-tasks/)
- [E010](https://www.rfc-editor.org/rfc/rfc9171.txt)
