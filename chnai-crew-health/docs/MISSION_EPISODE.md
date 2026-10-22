# Assessment-day implementation — v0.6

22 October 2026. Independent CHNAI design prototype. Every crew record, qualification, duty assignment, device state and transport event is fictional.

## The concrete problem

A comparison alone leaves an operational question unanswered: who actually takes responsibility when the usual reviewer is occupied? The new episode makes an offered assignment, explicit acceptance, available reviewer, pending follow-up and approved evidence snapshot independently inspectable. It demonstrates a software contract, not a clinical procedure or NASA-approved staffing policy.

## What the crew sees

Crew today places the current fictional task above four distinct milestones: assessment, accepted responsibility, context review and follow-up. A discrete baseline/current plot has its source, structural quality status, unknown uncertainty and unreviewed clinical applicability attached. The right column shows the next responsible actor, both reviewers' duty states and the current acceptance action. The lower section separates onboard work from Earth support. Monitoring gaps stay visible rather than becoming a composite health score.

The task is SIM-TASK-030, a scheduled aerobic-capacity assessment in fictional transit day 030. The recorder is a simulation adapter for a completed record. A wearable heart-rate stream is not treated as a direct VO2max assessment. No device API or NASA device resolution was established by this implementation.

## Authority and state

| Concept | Implemented contract |
| --- | --- |
| Ordinary job | Seed roster label; does not confer care authority |
| Qualification | Explicit fictional CMO configuration; operational competence unverified |
| Care relationship | Configured Crew 03 scope and active global demo grant |
| Assignment | An offered recipient receives scoped inspection access |
| Acceptance | Addressed, available, configured reviewer accepts current evidence offer |
| Ownership | Initial owner remains null until acceptance; coordinator is Crew 03 |
| Subsequent handover | Current owner remains responsible until new recipient accepts |
| Follow-up | Pending tasks move on acceptance, with assignment history; completed tasks retain original owner |
| Duty | Availability gates care mutations, but never silently transfers ownership |
| Evidence change | New revision requires current review; a pending offer must be refreshed |
| Packet approval | Binds exact evidence, review, owner, pending follow-up, task context and hash |

The UI role selector simulates these checks in one browser. It is not authentication, encryption or production access control. Duty controls are scenario controls for the technical role, not a model of actual flight-surgeon staffing authority.

## Data and code changes

- `domain.mjs`: schema 2 adds task context, reviewer records, offered/accepted assignment, ownership revision and assignment history. New guard functions enforce ownership separately from read access.
- `migrateState`: retains v0.5 records, notes and packet bytes. Old unreleased previews become stale. Existing responsibility needs explicit acceptance; historical acceptance is never fabricated.
- `simulation.mjs`: occupied-primary and unconfirmed-wearer presets extend the same replay engine. Eight presets now exist. The original 12 in-app contracts remain a subset of the Node suite.
- `mission.mjs` and `mission.css`: task-focused view, evidence plot, quality/coverage state, staffing/acceptance and independent care/transport summaries.
- `app.mjs`: reviewer selection, offer/accept actions, dynamic follow-up owner, metadata-only duty controls and session view restoration. Unsaved modal text is not a durable draft.
- Packet schema `chnai-mock-packet/2` includes frozen task and acceptance context. Historical packet version 1 remains readable.

Unconfirmed wearer binding is an authored failure flag on a fixture. It blocks the comparison and comparison packet. Real-device identity reconciliation, quarantine admission, calibrated quality metrics and a general acquisition-quality schema remain future work. A recorder becoming unavailable after receipt does not erase or invalidate historical source evidence by itself.

## Evidence traceability

| Prior review requirement | v0.6 evidence | Remaining qualification |
| --- | --- | --- |
| R01 Arithmetic vs clinical applicability | Exact comparison stays separate from unreviewed clinical status | Qualified health review |
| R02 Relevant task information together | Task, input quality, evidence and responsible actor on Crew today | Timed usability evaluation |
| R03 Duty and accepted handover | Busy primary, available backup, explicit acceptance and follow-up transfer | Broader duties, resources and staffing policy |
| R04 Automation responsibility | Intake/retry automatic; acceptance/review/release/outcome explicit | Human factors evaluation |
| R05 Scoped privacy | Offered/accepted review scope; ground reads snapshots; technical metadata | Server-side authorization and privacy review |
| R06 Recovery | State migration, saved acceptance, session view restore | Crash recovery, backup and durable backend |
| R07 Input contracts | Unconfirmed fixture binding prevents comparison | Real adapter/API, time and quality qualification |
| R08 Consistent derived states | 74 tests and desktop full-path QA | Full production and multi-device coverage |
| R09 Health-domain coverage | Missing/partial coverage remains visible | Qualified immune, bone and behavioral workflows |
| R10 Bounded AI | Deterministic template remains baseline | Model experiment not run |

Primary references studied in the preceding research milestone:

- NASA crew interfaces, especially 10113 and 10161–10164: https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/
- NASA Playbook, activities/resources/constraints: https://www.nasa.gov/human-systems-integration-division/human-computer-interaction/schedule-and-planning-interface-for-exploration/
- NASA V1 4003 relative aerobic capacity: https://www.nasa.gov/reference/4-0-human-performance/
- NASA CDSS architecture recommendation: https://ntrs.nasa.gov/api/citations/20220017869/downloads/HRP-48032%20ExMC%20CDSS%20Architecture%20Recommendation%20Rev%20B.pdf

These sources inform requirements. They do not prescribe this exact interaction design, fictional staffing arrangement, packet policy or scenario timing. The interface does not claim to reproduce an operational NASA medical application.

## Next engineering slice

Move this tested episode into a locally owned service with immutable observation revisions, scoped assignment/review operations and a transactional outbox. Carry the current domain contracts across that boundary before expanding indicators. Test process interruption and replay recovery against durable storage. Continue the clinical and actual 18-GB Mac qualification handoffs; evaluate any local model against the deterministic template only after its evidence inputs and acceptance criteria are fixed. A 3D view should reuse the existing event engine.

This release does not freeze the framework choices, implement the earlier 42-table proposal, execute all earlier full scenario specifications or establish event eligibility. The research register and its dated counts remain separate from software test counts.
