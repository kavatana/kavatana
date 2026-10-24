> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI Mission Experience Blueprint v0.4

21 October 2026. All app changes and scenarios in this document are proposed unless explicitly identified as existing.

## What we are actually trying to improve

Mission Experience Blueprint v0.4  |  CHNAI LAB  |  21 October 2026

> Proposed product: CHNAI helps a crew recognize a qualified health change, complete an accountable next step, and preserve the evidence when Earth cannot help immediately.

Your journal is the right expansion of the problem: people, routine work, devices, authority and failures must shape the data model and interface. The large research collection is useful only when each item has a justified job. This blueprint adds the operational story and test model to the v0.3 data-use plan; it does not replace the existing engineering specification.

| Evidence we can state | Our interpretation / scope |
| --- | --- |
| NASA already has care teams and technical support. Its EIMO concept addresses distance and resource constraints. [J01, J03, J04] | Improve continuity and clarity of a bounded onboard review task. Do not position the project as replacing absent NASA staff. |
| NASA has demonstrated medical digital-assistant prototypes. [J02] | AI alone is not the differentiator. Test whether our evidence, workflow and failure handling make a task easier and more trustworthy. |
| The supplied challenge summary asks astronauts to gather, evaluate and act across several health concerns. [J15] | An end-to-end crew workflow is the core; ground and technical roles support it. Full objectives and required resources may change priorities. |
| The current mock demonstrates a fictional capacity review and handoff. | It has not demonstrated clinical benefit, actual autonomous acquisition, a production database, a trained model or spaceflight use. |

### A narrow operational promise; a broad evidence foundation

Use a fictional long-duration transit as the initial setting. Preserve ISS examples as references, not proof of a future vehicle design. Cover normal days, missing information and shared responsibility as carefully as abnormal numbers. A useful system should often stay quiet.

We cannot know the challenge authors private motivation or guarantee an award. We can show a defensible problem, transparent data, a complete task, reproducible behavior and an honest boundary. Those are the claims we can earn.

## Who uses it, and who may do what

Nine personas inform the design; they do not require nine dashboards in the MVP.

| Persona | Primary task | Proposed access boundary |
| --- | --- | --- |
| Crew member | Personal brief, context, review and follow-up | Self; private sharing grants |
| Crew medical officer | Review a qualified episode; assign and track authorized next steps | Current mission assignment, training and patient/care scope |
| Commander / mission operations | Coordinate duty changes and task ownership | Operational impact summary; no automatic access to private notes |
| Flight surgeon | Review a released longitudinal packet and return a signed response | Assigned care relationship and authorized scope |
| Biomedical flight controller | Investigate hardware and data acquisition problems | Purpose-limited technical grant; clinical access only if authorized |
| Behavioral health provider | Private communication and reviewed follow-up | Separate confidential channel and explicit policy |
| Environmental operations / ETHOS analogue | Investigate cabin sensor and habitat conditions | Environmental telemetry; person linkage requires permission and context |
| Data steward / investigator | Qualify study files, versions and permitted uses | Research workspace; no conversion of subjects into live crew |
| System maintainer / test operator | Manage device adapters, evidence releases and scenario runs | Technical administration is not medical authority |

> Correction to the current seed: one CMO label is not an operational staffing model. NASA V1 3006 specifies at least two trained CMOs per vehicle/platform. V1 5003 says a CMO need not be a physician. [J05]

Proposed schema separation: person -> mission assignment -> qualifications -> active duty -> scoped grant -> episode responsibility. One engineer can also be a trained CMO; job title alone must not grant medical authority. Coverage must be checked per location, with a backup available.

The BME metadata-only default is our conservative demo policy, not a claim that NASA BME staff never access medical data. Ground data-management capability in V2 10126 also needs reconciliation with medical privacy and crew visibility. A per-packet approval mock is a limited interaction, not full mission policy. [J03, J07]

## An illustrative day, with the software in the background

Fictional assessment day. Relative times are scenario choices, not a NASA timetable.

| Time / actor | Work and app behavior | Important boundary |
| --- | --- | --- |
| Wake +00:00; Crew member | Private morning brief: Present last successful acquisition, coverage gaps and due tasks; no interruption if nothing requires review. | Sleep opportunity is not measured sleep. A wearable may still hold untransferred data. |
| +00:30; Crew + commander | Planning conference / task allocation: Show operational constraints and responsible owners; private clinical content stays in care views. | Role and duty can contextualize a measurement, not diagnose its cause. |
| +02:00; Crew member | Research or maintenance block: Background import with identity, time, unit and quality checks. Surface acquisition failure separately from a health concern. | No full-time manual dashboard watching or per-sample approvals. |
| +04:00; Crew + CMO | Scheduled assessment on this illustrative day: Import a completed comparable capacity assessment; display 50 versus 39 and the 78% comparison from the existing fictional seed. | This assessment is not claimed to happen every day or to be derived from a wrist sensor. |
| +04:10; Crew + CMO | Evidence review and next step: Inspect method and uncertainty; choose a reviewed follow-up, owner and completion condition. Missing evidence can block a conclusion. | No automatically generated treatment or EVA clearance. |
| +04:20; BME / technical support | Recorder or gateway fault, if present: See connection state and acquisition metadata; recover queued data without erasing the clinical episode. | Device repair is a separate task from caring for the person. |
| +05:00; Crew / authorized sender | Prepare ground handoff: Preview exact selected evidence and purpose; freeze a released packet in the local outbox during outage. | Local task completion continues. Transmission and care have different states. |
| +09:00 or later; Flight surgeon | Ground review when packet arrives: Show source age, revisions and open questions. Return a response referencing the exact packet. | No promise of an instantaneous reply or closure on receipt. |
| +12:00; Crew + backup CMO | Handover / follow-up check: Accept ownership transfer or keep it visibly unresolved; record actual completion evidence. | Being off duty does not silently clear an outstanding task. |
| Pre-sleep / next wake; Crew member | Quiet period and overnight collection: Respect the planned rest window; continue acquisition and audit. Route only reviewed alert classes. | Any duty-time and critical-alert policy needs mission/clinical approval. |

Sources support activity categories [J03-J11]; the sequence is ours. Routine exercise is not a diagnostic test. Ground receipt may occur later. The editable register adds privacy and dependency fields. Actual astronaut use and time savings have not been measured.

## Map evidence into the software

One connected workflow with independent data, care and transport states.

![Conceptual diagram](visuals/CHNAI_Mission_System_Map.png)

Read left to right for the crew workflow. The lower research track can qualify an importer or method without pretending its research participants are current crew. Every derived result should resolve back to a source artifact, transformation, subject identity, method and evidence version.

| State dimension | Examples that must stay distinct |
| --- | --- |
| Data | Received / quarantined / qualified / superseded |
| Care | Unreviewed / review in progress / follow-up assigned / outcome recorded |
| Transport | Draft / released / queued / sent / receipt confirmed |
| Ground care | Not received / awaiting review / response returned / response reviewed onboard |

These are proposed logical boundaries. A packet receipt cannot close a follow-up. A correction cannot erase a previously released record. An explanation cannot silently become a clinical order.

## Data and devices: preserve the differences

The v0.3 package assigns all 20 data families to a purpose. These are the interface consequences.

| Input class | Useful handling | What it must not imply |
| --- | --- | --- |
| Wearable signals / recordings | Adapter declares clock, sampling, units, quality, wearer interval and buffering. Show last acquired and last received times separately. | A device measures continuously, therefore our application has a live stream. |
| Completed fitness assessments | Compare qualified values to the same persons appropriate baseline and method. Keep discrete points and uncertainty visible. | Pulse or estimated calories directly measure VO2max or cardiovascular-event risk. |
| Blood, urine and saliva | Specimen, collection time, lab method, analyte, original unit and source interval travel with each result. | Every lab value has one universal threshold or yields an overall immune score. |
| Imaging / bone / SANS | Store study, body site, modality and interpretation provenance; mark absent assessments. | Exercise adherence measures bone density, or generic images diagnose SANS. |
| Private self-report / cognition | Separate raw response, instrument version, scoring rights and reviewed interpretation; allow meaningful human context. | Silence or missing answers mean normal mood. |
| Environment / radiation | Require compatible quantity, time window and location before linking exposure context to a person. | Historical cabin or solar data is current personal dose. |
| Research matrices / waveforms | Use separate study identity and file storage; qualify parsers and quality rules before runtime use. | A large file inventory is a live crew-health database. |

### What a real device source establishes

CSA documents a Bio-Monitor tablet workflow and a docked recorder transfer through station communications [J09]. That supports a store-and-forward adapter concept. It does not establish a public flight SDK, exact tablet model or guaranteed live feed. Commercial APIs and Earth devices need their own qualification.

Test responsive layouts at 1440 x 900, 1024 x 768 and a narrow 390-pixel width as our chosen QA sizes. These are not NASA hardware specifications. The user owns a 16-inch M3 Pro Mac with 18GB memory; no actual performance measurements have been collected.

## A more visual interface, with fewer routine actions

Visualize change, source quality, time and responsibility. Use AI only where it improves a measured task.

| Surface | What it answers | Meaningful action |
| --- | --- | --- |
| Personal brief | What changed? What is missing? Who owns the next step? | Open the relevant episode; add private context if useful. |
| Review timeline | Which observations are comparable and when were they acquired? | Inspect discrete points, gaps, methods and revisions. |
| Evidence drawer | Where did this result and rule come from? | View exact source, original unit and applicability. |
| Follow-up | What is agreed, possible with onboard resources, and still incomplete? | Accept ownership; record an actual outcome or unresolved issue. |
| Ground workspace | What has arrived, been reviewed, and changed since release? | Review the exact packet and return a scoped response. |
| Technical status | Is the problem the sensor, local network, service or Earth link? | Investigate or recover without exposing private care notes. |
| Research / scenario workspace | What is real research, fictional input or quarantined? | Run import checks and repeat a documented scenario. |

NASA interface guidance supports task-relevant information and visible automation; Open MCT provides a visualization reference [J07, J14]. The proposed layout is ours. Make source age, uncertainty and actor visible beside the value. Use labels as well as color, keyboard access and an accessible 2D path.

| Automate by default after qualification | Keep explicit |
| --- | --- |
| Import, deduplication, unit checks, qualified comparisons, draft evidence assembly, outbox retry and audit. | Symptoms and context only the person knows; correcting ambiguous identity; care decisions; meaningful consent and ownership. |
| Optional local retrieval and a short source-linked explanation from permitted facts. | No invented thresholds, autonomous treatment, hidden role changes or LLM-only calculation. |

Evaluate the model against a deterministic template for factual support, omissions, privacy leakage, latency and usefulness. Fall back cleanly on failure. A larger model or fine-tuning is not justified until it wins that task evaluation; the existing 24 development and 16 proposed holdout cards remain unexecuted.

## The 3D idea becomes a scenario laboratory

Keep one source of scenario truth and expose it through several views.

![Conceptual diagram](visuals/CHNAI_Scenario_Lab_Map.png)

Start with a 2D operator view. Add simple authored 3D zones only when position, task context, equipment access or movement helps explain a failure. Do not recreate an ISS or future Mars interior without a verified model. Leave a fast accessible task view available.

The crew app, ground app and 3D scene consume the same event stream. The scene emits scenario events through adapters; it cannot update the database directly or create its own clinical rules. Reset restores a named seed. Export the seed, virtual clock, software/evidence versions, injected faults and result log.

> This is a software and workflow simulation. It is not a validated human digital twin, disease progression model or astronaut training system. NASA operational simulations support the method, not the accuracy of our game. [J10]

## Scenario coverage: input, comparison and communication

Twenty proposed cases. These are specifications, not new test results.

| ID / focus | Expected behavior | Dimension |
| --- | --- | --- |
| S01  No change, no interruption | Routine comparable input does not create an invented concern; coverage and latest acquisition stay visible. | Usability |
| S02  Below-baseline review | 50 then 39 in compatible mL/min/kg yields 78%; open review, not diagnosis. | Calculation |
| S03  Exact boundary | 50 then 40 is exactly 80%; 39.995 is below despite a rounded label. | Calculation |
| S04  Missing / incomparable baseline | No baseline or method mismatch returns not evaluable, not normal. | Quality |
| S05  Conflicting source unit | Submitted versus transformed CBC hemoglobin discrepancy is quarantined; original files retained. | Quality |
| S06  Wrong person / duplicate identity | Unresolved wearer assignment cannot attach observations to a crew health timeline. | Identity |
| S07  Mixed clocks / late data | Retain observed and received times; uncertainty and relative time anchors remain visible. | Time |
| S08  Duplicate / reordered delivery | Idempotent import creates one logical observation; replay order does not change accepted facts. | Integrity |
| S09  Recording gap / exhausted battery | Mark missing coverage and technical issue; do not fill values or conclude healthy. | Acquisition |
| S10  Earth unavailable | Local review and follow-up work; authorized packet queues without simulated delivery. | Resilience |

Use the retained source files for bounded importer fixtures where rights and semantics permit. For crew behavior, use explicit synthetic records. The current CBC unit conflict is a useful rejection case, not a clinical example. S03 reuses a meaningful boundary already addressed in the mock; that does not make the new integrated scenario passed.

Every run needs an independent expected result and an actual event log. Do not have the same implementation produce both the output and its expected answer. Include a normal no-action case to avoid optimizing the demo only for alarms.

## Scenario coverage: recovery, authority and change

A realistic environment must test what happens after the first alert.

| ID / focus | Expected behavior | Dimension |
| --- | --- | --- |
| S11  Tablet LAN unavailable | UI distinguishes unreachable local service from Earth outage; cached information is dated and writes are guarded. | Resilience |
| S12  Local service crash / restart | Restore durable accepted data and pending outbox; no success acknowledgement for an uncommitted write. | Recovery |
| S13  Correction after release | Append a correction; preserve the old packet and make obsolete draft readiness visible. | Integrity |
| S14  Ground receipt without review | Receipt updates transport state only; no automatic clinical approval or task closure. | Authority |
| S15  Role swap / expired grant | A technician or expired care grant cannot read the clinical payload; record denied access. | Privacy |
| S16  LLM unavailable or unsupported claim | Fall back to structured facts; block fabricated references, diagnostic claims and unauthorised actions. | AI |
| S17  Follow-up tool or consumable absent | Show resource conflict and seek an authorized alternative; do not issue an impossible task. | Resources |
| S18  CMO unavailable / duty handover | Require an accepted backup assignment within training/scope; unresolved responsibility remains visible. | Ownership |
| S19  Protocol/evidence update mid-episode | Pin the old assessment to its evidence version; require explicit new review when applicability changes. | Versioning |
| S20  Packet tamper / failed restore | Reject altered content or unverified backup; show failure and preserve an independent recovery path. | Security |

These cases cover selected failure classes, not every likely medical condition. Clinical severity and escalation thresholds need review. Extend combinations only where a concrete risk warrants them: for example, a correction during an Earth outage, or a device failure while the primary CMO is unavailable.

The editable scenario TRANSIT_REVIEW_01 specifies a 600-second one-way delay as a test setting, not a mission fact. It distinguishes ground arrival at 1500 seconds, onboard receipt at 2100 and reviewed response at 2160. The harness is not implemented; scripted human actions are not measured behavior.

## Development, QA, staging and the two kinds of release

A working public demo is achievable. Clinical mission deployment has a different evidence burden.

| Environment | Data and purpose | Exit evidence |
| --- | --- | --- |
| Development | Synthetic crew plus isolated, permitted research fixtures. Small deterministic cases, disposable local database, explicit versions. | Domain invariants, importer reports, migration and contract checks. |
| Integration / QA | Reproducible scenario runs against real app interfaces; fault injection and independent expected outcomes. | Recorded outcomes for privacy, correction, identity, timing and recovery. Failed cases remain visible. |
| Staging | Production-shaped configuration and migrations with synthetic or specifically approved de-identified data. | Fresh install, actual disconnect/restart, backup/restore, bounded load, accessibility and device/browser checks. |
| Hackathon demo | Public synthetic experience plus separately labeled real research importer; no-login judging route if current rules permit. | Clean browser access, reproducible reset, clear source names, truthful claims and verified submission limits. |
| Future operational deployment | Only authorized mission data, approved device integrations and validated workflows; formal ownership and support. | Mission/clinical validation, security and privacy controls, training, monitoring, incident response and change approval. |

### Do not copy a medical production database into staging

Data access, de-identification and permitted use must be explicit. Prefer synthetic edge cases because they make expected results reproducible. Public research records can exercise parsers in a separate domain; they do not authorize clinical use or identify a live astronaut.

### What is already checked, and what is not

The retained mock records 28 passing domain checks and one desktop browser walkthrough. This planning pass did not rerun them or change the application. The 36 engineering cases, 20 scenarios here, clinical review, real device integration, actual 18GB Mac workload and AI evaluation are not completed by that result.

Before calling a release offline-capable, disconnect the actual Earth connection and separately interrupt the local network/service. A UI toggle only tests a simulation branch. Before calling it useful, observe representative task completion and error patterns. Astronaut use would require a different evaluation.

## Architecture follows responsibilities, not data volume

Retain the earlier conditional stack and 42-table proposal; resolve these boundaries before adding tables.

| Boundary | Proposed ownership and contract |
| --- | --- |
| Web / task views | Render role-scoped projections. No direct database access, device truth or duplicated clinical rule logic. Show pending writes and source age. |
| API / domain | Own identities, policy, observation qualification, episode state, revisions and durable transactions. One authoritative write path. |
| Adapters / replay | Translate files, documented hardware or scenario events into the same input contract; preserve originals and reject ambiguity. |
| Database + object storage | Relational metadata/transactions; immutable large files and recordings; hashes link them. Migrations live with the backend. Runtime database files live outside source control. |
| Evidence / rules | Versioned, reviewed source mappings and applicability. Distinguish a standard, a test fixture, a clinical protocol and a model output. |
| Automation / model worker | Bounded jobs with idempotency, timeouts and cancellation. Model consumes permitted context and returns a proposal, not a direct state mutation. |
| Outbox / ground | Durable scoped packet, integrity verification, retry, deduplication and independent review state. |
| Scenario lab / QA | Versioned seeds, independent assertions, virtual clock and fault controls. Optional 3D renderer is only a client. |

Suggested future repository boundaries: apps/web; services/api; packages/contracts; adapters; evidence; simulation; tests; docs; deployment. Keep schema migrations under services/api, while bulk datasets and runtime databases remain outside Git. This is a proposed organization, not the present buildless mock.

Record observed time, ingestion time, time basis/uncertainty, source identity, transform version, quality status and revision lineage. Model person, study subject and device assignment separately. Do not force waveforms, questionnaire responses and lab panels into an untyped value field.

Migration to Nuxt/FastAPI/SQLite remains conditional. The visual brief can improve before a rewrite. Choose streaming, indexing, compression and batch sizes from measured rates and a stated retention policy. No terabyte-scale throughput or local model performance has been demonstrated.

## What past winners actually teach us

Published project features are evidence. Explanations of why judges preferred them are our inferences.

| 2025 official example [J12] | What NASA publicly described | CHNAI design lesson - inference |
| --- | --- | --- |
| SpaceGenes+ / Best Use of Science | Interactive dashboard exploring molecular effects of radiation and microgravity for researchers and mission planners. | A dashboard can win. Make a scientific relationship and a named users decision legible. |
| Twisters / Best Use of Technology | SkySense combines NASA Earth observations and AI for local weather risks and activity time windows. | Connect data to a practical next decision, rather than stopping at a prediction. |
| Astro Sweepers / Galactic Impact | Public orbital data becomes debris reports and a risk index. | Show the transformation from source data into an operational artifact. |
| PureFlow / Best Mission Concept | Interactive 3D habitat design and validation against space-weather threats. | 3D can express system constraints when it is part of the problem, not decoration. |

This is a review of the official award descriptions. Linked project pages were unavailable in this pass; we have not audited their repositories, model performance or actual judge deliberations. There is no evidence here that complexity, a particular framework, AI or 3D caused the award.

### The judge should be able to repeat one sentence

> CHNAI turns a qualified health change into a traceable onboard follow-up, even when Earth is unavailable.

A proposed short demonstration: a completed fictional assessment arrives automatically; the brief shows the baseline, source and limitation; an authorized user assigns a next step; Earth drops out; local work continues; the exact packet arrives later; receipt does not masquerade as care completion. Show a separate real research import rejecting a unit conflict when time permits.

Use the current guide to set the actual demo length. The previously cited 30-second limit and event times remain provisional until verified. Disclose synthetic crew, template/model status and prototype limits. Do not claim NASA use, medical approval or an assured award.

## What the next version must earn

A bounded build sequence with observable exit conditions, not a promise of unlimited features.

| Order | Deliverable | Evidence to accept it |
| --- | --- | --- |
| 1 | Visual crew brief and real research import report | A reviewer finds the change, its source, missing evidence and next actor. CBC unit conflict is visibly rejected. |
| 2 | Background synthetic acquisition and accountable workflow | Replay reaches the actual app; duplicate input, correction and outages preserve the intended invariants. |
| 3 | 2D scenario laboratory | Named seed, clock, fault injection, independent assertions and exportable actual results. No case marked passed without execution. |
| 4 | Clinical / UX / host qualification | Scoped health review; observed exploratory user tasks; actual disconnect/restore and measured M3 Pro memory/latency. |
| 5 | Optional local model and 3D scene | Each improves a defined task over template/2D baseline without weakening reliability or accessibility. |
| 6 | Second complete health domain and submission proof | Select after full objectives and review. Add a complete supported workflow, then prove no-login demo and source disclosure. |

### Questions we should not lose

Who is allowed to act when the primary CMO is unavailable? What happens when there is no new data? Which sensor is assigned to whom at each instant? How old is an apparently live value? Is a proposed task possible with available equipment? What happens to an open episode after a protocol update? Can an authorized ground change be visible without interrupting crew work? Who owns unresolved care at shift change?

Other gates: instrument rights; language and accessibility; consent and private behavioral records; retention and deletion; clock drift; calibration; storage exhaustion; key recovery; software rollback; evidence-pack revocation; model contamination by untrusted documents; and support ownership after the event. These are risk questions to prioritize, not claims that all require a hackathon feature.

> Now: finish one visible and testable path. Broad research informs the decisions; measured outcomes determine which technology and extra scope deserve to stay.

No application code, database migration, real-device integration, AI model or 3D environment was implemented in this blueprint milestone. New scenario specifications remain Not run. The v0.3 plan and existing mock are separate, dated artifacts.

## Primary-source register / 1

Primary references checked or reconciled on 21 October 2026. Exact source context governs applicability.

### J01  Earth-Independent Medical Operations ConOps

NASA, 2024 technical presentation. Deep-space care faces communication, evacuation, resupply and vehicle-resource constraints. EIMO integrates care, planning and resource management. Concept of operations, not a published CHNAI mission requirement.

https://ntrs.nasa.gov/citations/20240001402

### J02  NASA HRP use of AI technology to mitigate risk

NASA NTRS 20260001797, slides 14 and 16. Reports CMO and flight-surgeon digital-assistant working prototypes and BME proof of concept; includes a simulation demonstration. No flight certification, open medical corpus or available integration API established.

https://ntrs.nasa.gov/api/citations/20260001797/downloads/NASA%20HRP%20Use%20of%20AI%20Technology%20to%20Mitigate%20Risk.pdf

### J03  Biomedical Flight Controllers

NASA; updated 9 March 2026. BME supports crew-health hardware, data downlink, procedures, scheduling and troubleshooting with the flight surgeon. ISS operational description; proposed access policy is ours.

https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/

### J04  Flight Surgeons

NASA role description. Flight surgeons provide crew care and private conferences. Mission-impact information can reach the flight director without disclosing conference details. Weekly conferences described in this context are not a universal deep-space schedule.

https://www.nasa.gov/directorates/esdmd/hhp/flight-surgeons/

### J05  NASA-STD-3001 online: Training

V1 5003, 3006 and 5004. CMOs receive specific training and need not be physicians. At least two CMOs are to be trained per vehicle/platform; training is verified. Check governing revision, mission applicability and location coverage before making an operational compliance claim.

https://www.nasa.gov/reference/5-0-training/

### J06  NASA-STD-3001 online: Medical Operations

V1 6001-6003, 6006, 6008-6009, 6010-6011. Work/rest planning, private medical and psychological communication and mission-specific health operations are required. Delayed communication may use store-and-forward. EVA clearance remains a medical authority function. Our scenario is not an approved CHOC, clinical protocol or EVA-clearance tool.

https://www.nasa.gov/reference/6-0-medical-operations/

### J07  NASA-STD-3001 online: Crew Interfaces

V2 10113, 10125-10126, 10129-10131, 10153, 10161-10164. Task information, privacy, visible modes and automation, backup and recovery inform the design. Ground data-management access must consider protection and crew visibility. Patterns are design inferences; no interface compliance or NASA branding approval is claimed.

https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/

## Primary-source register / 2

Primary references checked or reconciled on 21 October 2026. Exact source context governs applicability.

### J08  Standard Measures

NASA research overview. Research spans pre-, in- and postflight measures, including sleep/activity, cognition and biological samples. Research measurement domains are not a continuous live clinical API.

https://www.nasa.gov/reference/standard-measures/

### J09  Bio-Monitor: Keeping an eye on astronauts vital signs

Canadian Space Agency; updated 26 February 2026. Wearable recording uses a tablet for activity context; docking the recorder enables transfer through station communications. No exact tablet model, screen size or public flight SDK is established by this source.

https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp

### J10  Mission Control: Crew Health Consoles

NASA, 21 March 2025; interview recorded 17 December 2024. Flight surgeon, BME and ETHOS have distinct responsibilities. Joint simulations exercise failures and coordination. ISS interview, not a future transit staffing plan or validation of our simulation.

https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles/

### J11  A Day in Space

NASA crew interview. Crew activities include meals, exercise, research, maintenance and ground coordination. The relative-time day in this blueprint is fictional; an ISS habitat is not a Mars vehicle.

https://www.nasa.gov/podcasts/curious-universe/encore-a-day-in-space/

### J12  NASA announces 2025 Space Apps global winners

NASA, 18 December 2025. Official award descriptions provide observable project features, not judges private deliberations. Linked team pages were unavailable during this pass; code quality, validation and causal reasons for winning were not verified.

https://www.nasa.gov/learning-resources/stem-engagement-at-nasa/nasa-announces-2025-international-space-apps-challenge-global-winners/

### J13  Human Performance

NASA-STD-3001 online; V1 4003. In-mission aerobic capacity is compared with the individuals pre-mission capacity; the specified level is at least 80%. Comparable method, units and baseline are prerequisites; this is not a diagnosis or acute cardiovascular-event detector.

https://www.nasa.gov/reference/4-0-human-performance/

### J14  Open MCT

NASA open-source visualization project. A reference for coordinated historical and streaming mission-data views. Not a clinical product or a reason to replace the present frontend without testing.

https://nasa.github.io/openmct/

### J15  2026 selected challenge

User-supplied summary; current full page unavailable in preceding checks. The supplied summary asks software to gather indicators and help astronauts evaluate and act, naming four health outcomes. Full objectives, required resources and current submission/early-work rules remain pending verification; planned checks are already scheduled.

https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/
