> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# One path worth building first

05 / Candidate MVP episode

Recommended narrative: a crew member receives an automatically prepared health-review item, sees the source and its limitations, completes a permitted next step, and leaves a durable follow-up while a ground review waits in the outbound queue. This choice remains provisional until the full challenge and clinical review.

The first technical proof can use the NASA lab schema because the collection already contains authentic fields, units, source intervals and a real mapping discrepancy. Operational crew identity and scenario values must be explicitly simulated. Do not turn a real research participant into a fictional mission crew member.

Success branch: a reviewed source mapping allows a correctly typed observation to enter the record; deterministic logic identifies an applicable review condition; the crew sees an evidence-backed explanation; a human-authorized review/follow-up step is saved. Until clinical content is approved, the permitted action is a review or information-quality task, not treatment.

Failure branch: the transformed hemoglobin mapping is inconsistent. The system isolates the field, explains the discrepancy, leaves a correction task and withholds the unsupported health conclusion. This demonstrates trustworthy automation, but it must not be the only branch if the final product claims to evaluate health.

- Demonstrate offline restart, not just a disconnected icon.
- Demonstrate an explanation without inventing a missing measurement.
- Demonstrate queued versus received versus clinically reviewed handoff.
- Do not build ten separate role applications for the first release.

Evidence / cross-references: WF01; WF02; Q001; RQ03-RQ08; RQ31-RQ47; AC02; AC10; AC31-AC41
