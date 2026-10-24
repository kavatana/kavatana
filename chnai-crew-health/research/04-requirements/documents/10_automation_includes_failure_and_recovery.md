> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Automation includes failure and recovery

10 / Offline operations and privacy

A local save is acknowledged only after it is durable. A restart without internet must restore the selected review, approved evidence and unresolved actions. Delayed export uses a persistent queue with stable packet identity and retry policy. This is an application requirement; adopting Bundle Protocol or a specific message broker remains a later decision.

Separate six states: saved locally, approved for release, queued, transported, received by the remote application, and reviewed by a clinician. Delivery receipts cannot stand in for clinical acknowledgement. Concurrent corrections require a visible conflict or revision workflow.

Access is based on active role, care relationship, purpose and mission policy. A commander may need an approved task restriction without the underlying private diagnosis. A technical operator may need clock or device faults without behavioral questionnaire text. Role switching in a public demo is a simulation, not production authentication.

Research exports, model traces and technical logs must not silently accumulate clinical plaintext. Key lifecycle, backups, recovery and retention require an explicit design and verification. The current package specifies those obligations but does not claim they have been implemented.

- Adverse test cases include duplicate delivery, interrupted writes, delayed packets, source corrections and model failure.
- Raw licensed material is not automatically permitted for model training or public redistribution.
- Permissions and provenance follow derivatives and outbound packets.

Evidence / cross-references: S008 7001-7002; S010; S044-S045; E010-E011; RQ53-RQ67
