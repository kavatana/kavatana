> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Role and purpose, on every operation

The following permissions are a proposed prototype policy, not a NASA role certification.

| Role | Allowed within assigned scope | Not implied by the role |
| --- | --- | --- |
| Crew member | Read own case, correct self-reported context, request help, inspect a proposed release. | Editing measured source values; reading another crew member; authorizing any medical action. |
| Assigned onboard medical role | Read the assigned case; record review and permitted actions within reviewed training/procedures. | Physician qualification, unrelated records, or authority granted merely by a CMO label. |
| Assigned ground clinician | Read released case content and record a separate clinical-review event. | Automatic access to the full onboard database or access before release. |
| Evidence/data reviewer | Approve mappings and evidence releases under the research policy. | Altering measured source bytes or issuing treatment instructions. |
| Software support | See bounded technical health and collection status. | Private health details, free-form symptoms, genetic data or model prompts. |
| Model / background worker | Read a least-privilege job projection; return a draft or compute an authorized deterministic task. | Granting its own access, approving release, marking clinical review or selecting a new recipient. |

Authorize using active identity, assignment, subject, purpose, operation and policy version. Recheck at commit and transfer dispatch. Revoked permission or an expired relationship holds unsent work; it does not remove the audit trail.

For the public no-login demonstration, all people and events are simulated and all roles are visibly scripted. A role selector is a demonstration control, not authentication. The protected deployment must separately pass server-side authorization tests.

Evidence and cross-references: Research basis W02-W03; permission choices are CHNAI proposals. RQ53-57, RQ84; AC05, AC31, AC38, AC44, AC55, AC58.
