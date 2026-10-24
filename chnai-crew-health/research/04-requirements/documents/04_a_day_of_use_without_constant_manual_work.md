> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# A day of use without constant manual work

04 / Proposed crew journey

Before rest ends, permitted local inputs are reconciled in the background: available sleep/activity summaries, due assessments, prior follow-ups and device gaps. The interface opens with what needs attention and why, including evidence age and missingness. This sequence is a design proposal informed by NASA workflow and interface sources; it has not been tested with astronauts.

During exercise or scheduled assessments, device or file adapters collect supported signals with their session, method and clock context. A missing measurement triggers a collection-status explanation. It must not silently become a normal health value. Laboratory results can arrive much later than specimen collection and must retain both times.

At review, automation assembles relevant evidence and computes only reviewed comparisons. The user supplies context sensors cannot know, such as a symptom or why an assessment was missed. The model may explain a finding or draft a handoff; a validated workflow decides which actions are available.

After the user records an authorized step, the system saves it locally, creates follow-up responsibility and queues only approved information for ground. A transmitted packet is not shown as clinically reviewed. If data is corrected later, affected interpretations and drafts require renewed review.

- Avoid asking for data already present and trustworthy.
- Keep private health content off shared displays by default.
- Preserve the exact point of interruption and next responsible actor.

Evidence / cross-references: S007; S010; S017; S020; S021; R003; R010; E010
