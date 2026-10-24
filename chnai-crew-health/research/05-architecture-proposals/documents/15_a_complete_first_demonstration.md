> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# A complete first demonstration

20 October 2026. Recommended design; implementation not tested.

Recommended episode for review: a crew member reviews a newly gathered, explicitly simulated aerobic-capacity assessment against a comparable personal baseline. The interface explains the applicable NASA criterion, shows provenance and missing context, records an authorized review request, and queues a purpose-limited handoff while Earth is unavailable.

This is a proposed narrative for later implementation. The numerical examples and operational crew are simulated. NASA-STD-3001 supplies the criterion, not the invented crew record. A health reviewer must approve comparability and wording. ACTES VO2 values are not silently repurposed as astronaut VO2max.

- Success branch: accepted comparable assessment, deterministic comparison, cited explanation, request for assigned CMO review and persisted follow-up. No treatment or exercise prescription.
- Failure branch: ambiguous source unit or missing baseline prevents interpretation and explains what is needed. A failure branch alone does not satisfy the full challenge.
- All four named health domains remain represented honestly as measured, indirect, unavailable or outside this episode; a wearable does not establish bone or immune health.
- If the full statement requires different indicators or resources, remap the episode before implementation.
- Show the working path live after the permitted build period. Keep the public synthetic demo available and the offline path reproducible.

Evidence and cross-references: ADR18; G01; G03; G12; RQ03-08; RQ24; RQ84; S008 V1 4003; R011; R012; R017

- [S008](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)
- [R011](https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/)
- [R012](https://www.spaceappschallenge.org/resources/participant-faqs/)
- [R017](https://physionet.org/content/actes-cycloergometer-exercise/1.0.0/)
