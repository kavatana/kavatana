> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Interface flow and role behavior

## Task first

Twelve view specifications describe the crew, assigned onboard reviewer, ground reviewer and technical operator. They are task states, not a commitment to twelve separate navigation tabs. The normal crew experience can remain a single review workspace with evidence and follow-up panels. The workbook records every view's useful actions, missing-data behavior and API boundary.

## What the astronaut sees

Show Simulation, the selected subject, current task, measurement time, freshness, data quality, relevant source and next responsible actor. For SC01, display current and baseline values with units and the exact comparison. Missing or unassessed domains are explicit. Never show green overall health because a single metric has no flagged result.

## Automation visibility

Receive, validate, calculate, prepare a bounded explanation, prepare a draft handoff and retry released transport automatically. Human approval is reserved for review disposition and purpose-limited release. Show who is expected to act, current mode and failures. This allocation follows NASA interface principles, while the exact UI remains our proposed design. [N03]

## Privacy and interruption

Crew view their own records. Onboard reviewers view assigned subjects through valid relationships. Ground reviewers see permitted released packets. Technical operators see import/session/queue health without default access to medical values. Commander role alone grants no medical access. Preserve task position and pending/unconfirmed actions across interruption.

## Device and usability assumptions

The known development/demo host is the user-reported 16-inch M3 Pro with 18GB memory. Its actual inventory and browser measurements are not yet available. Do not infer a universal NASA device or viewport from historical tablet use. Test keyboard, touch when available, readable text, 200% zoom, focus order, labels beyond color and interrupted tasks on the actual demo surfaces.

## Interface acceptance

Use meaningful controls: inspect evidence, request review, record disposition, assign follow-up, preview release and inspect transfer state. No decorative spacecraft controls, universal red/green health score or free-form medical chatbot. The UI is successful when a user can explain what changed, what is uncertain, who acts next and whether the information was actually saved.
