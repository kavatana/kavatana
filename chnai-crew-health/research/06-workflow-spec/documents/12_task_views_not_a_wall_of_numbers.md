> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Task views, not a wall of numbers

Interaction requirements only; no pre-event screen prototype is included.

| View | Question it answers | Meaningful controls |
| --- | --- | --- |
| Crew review | What needs my attention, and why now? | Open review; inspect source; request onboard review; record context. |
| Evidence detail | Which measurements and requirement support this result? | Inspect exact revisions; view method/unit/time; report a mapping concern. |
| Action and follow-up | Who must do what next, and is it finished? | Assign within policy; record disposition; defer with reason; resume unfinished work. |
| Handoff preview | What leaves the local system, to whom and for what purpose? | Inspect fields and digest; approve if authorized; hold or revise before release. |
| Technical status | Is the system collecting, saving and communicating? | Inspect last receipt/commit; view bounded job errors; retry only permitted operations. |

Always show the simulated-data label, subject, assessment time basis, freshness, save state, communication mode and AI state. Not assessed is a first-class status for domains without evidence. Do not color an unmeasured domain green.

Earth offline means local work can continue. Tablet/LAN offline means the client cannot claim an authoritative save. Local-node failure means the service is unavailable. These conditions need distinct language and recovery behavior.

Use progressive evidence detail and a stable primary task. Voice is optional and off for private playback by default. Validate keyboard, touch, zoom, focus and non-color status cues on the actual client; no astronaut preference or flight-device suitability is claimed.

Evidence and cross-references: RQ04, RQ45, RQ68-74; AC03, AC27, AC30, AC41, AC44, AC49-53. UX choices are hypotheses.
