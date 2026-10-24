> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI Mission and Interface Review

21 October 2026

Research/design review; no new application release.


## A mission system the crew can trust

*DECISION REVIEW / CHNAI LAB*


**Proposed product promise**

CHNAI helps a crew understand a health change, complete an accountable onboard review, and carry the evidence through delayed Earth support.

Your journal asks for a connected system: mission constraints, people, daily tasks, measurements, knowledge, decisions, interfaces and proof. The current v0.5 mock demonstrates a narrow evidence-to-follow-up transaction. This review specifies how that transaction should become a credible operational experience.

| Your concern | Concrete result required |
| --- | --- |
| What NASA needs | A sourced problem statement, existing-system comparison and explicit assumptions. |
| Who uses it, during what work | A role-and-task model with privacy boundaries, duty availability and an assessment-day story. |
| Use our accumulated data | Each source assigned to a question, rule, adapter, evaluation or background purpose. |
| Advanced, visual UX | Task context, explanation, data quality and next responsibility visible together. |
| Engineering through production | Versioned contracts and evidence, recovery tests, release gates and measured device performance. |
| Interactive 3D world | A view of the same deterministic scenario engine, with testable spatial and resource constraints. |


### The decision this review supports

Make the next milestone one complete assessment-day episode: routine acquisition, uncertainty detection, technical recovery, available medical reviewer, accountable follow-up and delayed handover. Add broader health domains through the same contracts after their measurements and interpretation rules are qualified.

Evidence labels throughout: SOURCE = published material; OBSERVED = our current interface test; PROPOSED = CHNAI design; UNVERIFIED = an unresolved claim. These labels prevent aspiration from quietly becoming a product fact.

Scope: three 2025 winner websites reviewed; two interactive flows exercised; NASA Playbook interface figures visually inspected. Current websites may differ from the versions judges saw. No claim about private judging psychology, clinical readiness or a guaranteed award is made. Full 2026 challenge details remain unverified [S20].


## NASA already has pieces of this system

*MISSION NEED / EXISTING CAPABILITY*

| Published evidence | Implication for our proposal |
| --- | --- |
| EIMO addresses delayed communication, limited supplies, constrained crew time and unavailable evacuation [S08]. | Our unit of design is an operational episode: who can act, with what resources, under which communication conditions. |
| NASA developed Medical Data Architecture and published a CDSS architecture recommendation [S09]. | A large database alone is insufficient. Qualification, context, decision support and task execution need explicit contracts. |
| The 2026 HRP AI portfolio reports CMO and flight-surgeon assistant prototypes and BME proof-of-concept work [S10]. | A generic medical chatbot offers weak differentiation. Show a specific, measured improvement in evidence handling and follow-up. |
| Playbook links schedules, activity status, procedures and communication [S11]. | Health work should fit the mission day and handover. We propose an integration seam, not an unsupported claim of Playbook integration. |
| Bio-Monitor combines wearables with a dedicated tablet application [S16]. | Automatic collection can coexist with lightweight activity context and technical quality checks. A real connector still needs a published or authorized contract. |


### Why the flight surgeon still matters

The problem is the changing availability of Earth support. Delays and outages move more responsibility onboard. Our proposed system must preserve both local action and useful ground consultation, rather than treating a transmitted message as completed care [S08].


### What the interface research actually says

The CDSS recommendation calls for situation-appropriate information, interfaces adapted to caregiver skills, and heterogeneous data arriving at different rates. It also describes conventional graphs, forms and dashboards alongside potential natural-language interaction. This is an architecture recommendation, not evidence of a flight-certified product or an open clinical API [S09, section 7].


**Our contribution to prove**

Reduce the effort and mistakes involved in moving from an uncertain measurement to the right reviewer, evidence and follow-up while communications are interrupted. Measure that benefit against the current mock and a simple record-review baseline.


## SpaceGenes+: clarity, then verification

*WINNER INSPECTION / BEST USE OF SCIENCE 2025*

NASA identifies SpaceGenes+ as a 2025 science winner [S01]. Its author describes a hypothesis-generation tool that reduces the work of comparing biological stressors. The project site labels one research case as live and other cases conceptual [S02, S04]. That scope is useful to study; the award does not validate every displayed calculation.

| Interface observation [S03] | Result of our inspection |
| --- | --- |
| Three-column workspace | Filters at left, four-condition heatmap centrally, ranked results at right. Numeric values accompany color. |
| Synergy-only checkbox | Reduced the visible table from 15 rows to four. |
| Methodology control | Opened the formula, data description, color explanation and educational-use caveat. |
| Use-case control | Opened examples with live/conceptual wording and dataset links. |
| Add another dataset | No visible importer appeared after clicking; import remains unverified. |
| Ranked result / PNG export | A result click was attempted, but no separate detail was established. Export was not exercised. |


### A concrete consistency check

The displayed rule uses absolute values: combined > 1.5 x (radiation + microgravity). Three highlighted rows fail this rule using their displayed magnitudes. This is an interface consistency finding, not a reanalysis of the underlying study [S03].

| Row | Combined | 1.5 x sum | Rule met? |
| --- | --- | --- | --- |
| Brca1 | 0.26 | 0.705 | No |
| Gadd45a | 0.65 | 0.885 | No |
| Rad51 | 0.47 | 0.720 | No |
| SYNR1 | 4.00 | 1.050 | Yes |


### CHNAI design decisions

Keep the explanation next to the selected evidence. Give each rule an independently computed expected result and bind the UI to the same versioned inputs. Show unavailable imports as unavailable. A dataset badge should open the actual record and transformation history. Ranked or highlighted outputs must be reproducible before they influence care.

Our interpretation: a compact visual comparison can make a difficult idea understandable quickly. It is a useful presentation pattern, not a clinical risk model for CHNAI. We did not validate this app's GeneLab extraction, biological claims or backend.


## PureFlow: a strong sequence needs strong state

*WINNER INSPECTION / BEST MISSION CONCEPT 2025*

NASA identifies PureFlow as the 2025 mission-concept winner [S01]. We followed its public route from mission configuration through analysis and briefing to the designer [S05].

| Observed path | What happened [S05] |
| --- | --- |
| Configure | Crew, duration, destination, propulsion, habitat strategy, material and shelter controls. Dark cards group related choices. |
| Change crew 4 to 6 | Displayed cost and resource estimates changed. This verifies UI propagation, not estimate accuracy. |
| Generate and review | Analysis showed risks and proposed mitigations; briefing retained six crew. |
| Check state consistency | The initial label showed 365 days; subsequent pages used 360. Briefing said approved while high risks remained listed. |
| Check freshness | A panel described real-time DONKI monitoring while displaying events dated October 2025. Live retrieval was not established. |
| Start simulation | The 3D workspace stayed at initialization, including after one reload. Drag/drop, validation and 3D behavior were not verified. |


### CHNAI design decisions

Use a clear sequence from context to consequence to action, with an editable summary. Drive every screen from a single versioned scenario state. Keep readiness, unresolved risk and approval as separate fields. Display observation time, receipt time and data age. A stalled visual layer must provide a useful fallback and explain which functions remain available.


### AstroSweepers: study the evidence packaging

NASA lists AstroSweepers as the Galactic Impact winner [S01]. Its public solution page gives a short value proposition and labels roadmap stages. The submission hub groups technical and project documents. We visually inspected both pages; we did not execute a risk model, inspect those documents or verify its performance claims [S06, S07].

For CHNAI, create two experiences: the crew workspace for tasks, and a judge evidence page for the story, demo, sources, limitations and reproducible checks. Each claimed capability should link to its proof. The commercial framing of another challenge does not establish suitability for our health-monitoring brief.


**Interpretation boundary**

These are current observations of public prototypes. They do not establish the exact product state at judging time or the judges' private reasons for selecting them.


## What NASA crew-interface evidence teaches us

*NASA UX / VISUAL AND RESEARCH REVIEW*


### Playbook: the day is the organizing structure

The 2019 paper's figures show a horizontal timeline, crew rows, selected-activity details, communication bands and violation marking. A tablet is shown in use. We inspected the actual figures, not just the abstract; we did not operate a live Playbook instance [S12, figures 1-3].


### More model output did not automatically help

The 2022 study compared four fatigue-interface designs with eight HERA participants who completed all variants. An annotated graph/heatmap variant scored better for clarity than both an earlier display and a three-model variant. The authors hypothesized why; the study does not isolate every visual change causally. Predictions were prepared offline. Its separate broader satisfaction baseline analyzed 30 participants [S13, sections 3-4].

| Design question | Proposed CHNAI response |
| --- | --- |
| What is happening now? | Keep the current mission task, active episode, evidence age and responsible actor visible. |
| Why is this shown? | Attach source, qualification, comparison basis and uncertainty to the same selected episode. |
| What does automation own? | Show running, paused, degraded or completed state and the next human responsibility. |
| What if I am interrupted? | Restore the exact task and version; highlight changes made since the last review. |
| Which device layout? | Prototype a compact crew view and a wider review view. Validate on actual hardware before claiming suitability. |

NASA V2 requires task-appropriate information, data at the workstation, explicit simulation/operational mode changes, visibility into automation, and clear human/system responsibility. Privacy, restoration and crew-visible ground access also matter [S14: 10113, 10124-26, 10129-31, 10153, 10161-64]. These are design inputs, not a compliance certification.

Open MCT is a useful reference for historical and streaming telemetry organization [S18]; it is not established here as an astronaut medical interface. The 2026 CMO-DA slide reviewed shows a simulation demonstration photograph, not readable clinical screen specifications [S10].


**Visual direction to test**

Quiet, legible surfaces; stable navigation; data plus context; semantic color plus text; progressive detail. Evaluate light and dark modes under realistic lighting. Brand decoration and dense charts cannot substitute for task performance.


## One assessment day, across several responsibilities

*PROPOSED OPERATIONAL EPISODE / FICTIONAL TIMING*

This is a design scenario, not a NASA flight schedule. Timing, crew assignments and device events are fictional. Routine days should remain quiet. A review appears when a defined task or qualified change needs attention.

| Day moment | Automatic behavior | Human task / interface |
| --- | --- | --- |
| Wake and planning | Check expected inputs, current device state and pending follow-ups. | Crew sees coverage and due work. Missing data is explicit, never a healthy score. |
| Routine work | Receive permitted observations and attach task/time context. | Crew can correct inferred activity with minimal effort. Technical support sees device metadata. |
| Scheduled assessment | Validate identity, method, baseline, unit and timestamp before comparison. | Crew opens a comparison only when evidence supports it. |
| Uncertain result | Withhold interpretation; route the quality issue to its owner. | BME resolves acquisition issues; medical reviewer handles interpretation. |
| Onboard review | Prepare an evidence summary and check reviewer availability. | Assigned qualified reviewer accepts the episode or explicitly hands it over. |
| Ground opportunity | Prepare a versioned, scoped packet and retry transport. | Review authorization follows the approved privacy policy; ground sees the received snapshot. |
| Shift / duty handover | Preserve unresolved tasks, revisions and due triggers. | New owner acknowledges responsibility. Delivery alone does not close follow-up. |
| Rest / next day | Keep nonurgent work for the appropriate review window. | Crew can resume the exact episode and inspect changes. |


### Who sees what - proposed permissions

Crew: their own evidence and actions. Onboard medical reviewer: assigned care episodes. Flight surgeon: authorized received snapshots and questions. BME: acquisition and transport diagnostics. Commander: approved operational constraints and scheduling needs. Researchers: separately governed research data. A job title alone must never grant all medical access.

Role, qualification, current duty, care relationship and access permission are separate facts. A backup CMO label in a fixture does not implement coverage. The next slice must model availability, acceptance and handover explicitly.


**Action ownership**

Every open task needs an owner, a trigger or due condition, a status and evidence of completion. Unavailable owners create an unresolved assignment state; the software must not invent authorization or silently close the episode.


## Screens organized around a decision

*PROPOSED STORYBOARD / NOT YET DEPLOYED*

See the original vector storyboard on page 7 of the PDF: Crew Today, Evidence Review and Ground Handover. These are proposed states, not deployed screens.

Original layout study. All measurements and events shown are fictional. The retained v0.5 example compares 39 with 50 mL/min/kg: 78% of baseline. NASA V1 4003 supplies an 80% relative reference; applicability and clinical meaning require qualified review [S15].

| Surface | Useful controls and content |
| --- | --- |
| Crew Today | Current task, due follow-up, data coverage; Open episode and Correct context. No button needed for routine intake. |
| Episode review | Comparison, original evidence, applicability, current owner; Accept review, Request correction, Record disposition. |
| Ground handover | Received version, missing context, open question and reply; no access to unsent local changes. |
| Technical view | Wearer binding, quality issues, recorder/link state and retry history; no unnecessary private narrative. |
| Research / evidence | Separate study IDs, file checksums, original units and row-level provenance. Never silently populate fictional medical records. |

Layout proposals: 1280x800 for broad review and 1024x768 for compact crew tasks, plus narrow and zoomed layouts. These are design-test viewports, not verified NASA device specifications. Exact target equipment, input constraints and lighting remain open.


## A data architecture built around meaning

*PROPOSED BOUNDARIES / EXTENDS EXISTING SCHEMA WORK*

Retain the earlier schema study as a candidate model. The next implementation must prove its boundaries through one episode before adding more tables. An organized Drive archive is the research collection; runtime records, knowledge releases and analysis assets have different lifecycles.

| Data class | How we use it | Boundary to enforce |
| --- | --- | --- |
| Mission requirements | Versioned source excerpts, applicability and rule-review status. | A requirement is not automatically a treatment protocol. |
| Operational observations | Original value/unit/time, subject binding, device/method and quality. | Immutable original; corrections append with reason and supersession. |
| Task and resource context | Duty availability, activity, equipment location/status and episode ownership. | Context supports review; it does not prove a medical cause. |
| Research cohorts | Analysis, methods research and importer/evaluation fixtures. | Distinct subject namespace and consent/license context. |
| Approved knowledge | Procedures and explanations with version, authority and review status. | Unreviewed research text cannot become executable medical instruction. |
| Simulation assets | Seeds, event schedule, faults and expected outcomes. | Persistent simulation identity across UI, APIs, exports and backups. |


### The minimum observation-to-action contract

Preserve source record ID; subject and mission binding; quantity; raw value and unit; acquisition and receipt times; time basis and clock uncertainty; method and device identity; quality flags; file or message hash; transformation version; access class; and simulation/research/operational provenance. Derived results name every input revision and rule version.

Store binary waveforms, imaging and large research files as immutable objects with metadata references. Query reviewed observations and episode state in the application store. Build analysis views separately. The interface should request the current task's read model, not download the entire archive.


**Data expansion rule**

Acquire a new source when it answers an unresolved requirement, enables a specific adapter, provides a defensible comparison, or tests a failure case. Record license, population, context, units and exclusions before promoting it. More rows do not create more clinical validity.


## Source to interface to test

*TRACEABILITY / PROPOSED ACCEPTANCE CRITERIA*

The following are new requirements or extensions. Status is a requirement-level assessment, not a declaration that the earlier schema, all scenario specifications or a production service are complete.

| ID / basis | Required behavior | Proof to collect / current gap |
| --- | --- | --- |
| R01 / S15 | Separate valid arithmetic from applicable clinical interpretation. | Boundary and unit checks exist in v0.5; independent clinical review remains open. |
| R02 / S14 10113 | Show task, evidence, quality and next owner without repetitive navigation. | Timed comprehension test; compare v0.5 with proposed episode layout. Not run. |
| R03 / S11-S12 | Connect episode to duty and resource constraints. | Unavailable primary reviewer -> accepted backup handover. Not implemented. |
| R04 / S14 10161-64 | Expose automation mode and responsibility. | Pause/restart/degraded-mode tests; existing replay is only a partial demonstration. |
| R05 / S14 10125-26 | Protect data and make authorized ground operations visible to crew. | Role matrix plus backend authorization tests. Current role switcher is a simulation. |
| R06 / S14 10129-31 | Recover essential records and pending work. | Crash, restore and replay without duplicate actions. JSON serialization alone is insufficient. |
| R07 / S09, S16 | Adapt heterogeneous inputs with quality and timing metadata. | Device contract replay, clock drift, identity mismatch and reconnect. Flight integration unverified. |
| R08 / S03, S05 findings | Keep formulas, timestamps, labels and derived screens consistent. | Independent expected results and cross-screen version assertions. Add to next UI suite. |
| R09 / S17 | Represent missing health-domain evidence explicitly. | Immune, bone, cardiovascular and behavioral coverage states; no invented score. Broad clinical monitoring absent. |
| R10 / S10, S19 | Evaluate AI on a bounded useful task. | Compare template vs grounded summary; measure factual errors, omissions, abstention and time saved. Not run. |

Record each result with software version, scenario seed, source versions, expected result, observed result and reviewer. Preserve failed runs. Passing one contract must not promote unrelated clinical, security or production claims.


## AI and device integration: proof before scale

*PROPOSED ENGINEERING EXPERIMENTS*


### Automation that should reduce crew work

Routine acquisition, duplicate handling, structural checks, time alignment, evidence assembly and transport retry should happen automatically. Ask for human input when context is unknown, care responsibility changes, or policy requires authorization. Present the reason for each interruption.

| Candidate capability | Evidence needed before promotion |
| --- | --- |
| Grounded episode summary | Every statement points to an input or approved source; preserves unknowns, units and timeline. Compare with a deterministic template. |
| Procedure retrieval | Versioned, authorized corpus; relevant passage citations; rejection when no approved procedure exists. |
| Context suggestion | Show inferred versus confirmed context; test ambiguity and correction. Never infer clearance from job title or location alone. |
| Fine-tuning | Licensed, representative labeled examples; fixed holdout set; measured improvement beyond retrieval/template baselines. No demonstrated need yet. |
| Local model on the M3 Pro | Measure peak memory, latency, battery/thermal behavior, app responsiveness and failure recovery on the actual 18 GB machine. No benchmark has been run. |


### Device contracts must be explicit

For each device family, document payload type, unit dictionary, sampling/aggregation, clock behavior, identity pairing, transport, retry ordering, authentication, calibration/quality signals and export rights. Unknown fields remain unknown. CSA evidence supports the Bio-Monitor workflow, not permission to assume an open flight API [S16].

Use an adapter simulator with the same envelope expected from a future connector: valid, duplicate, delayed, out-of-order, wrong-wearer, missing-unit, stale, disconnected and corrupted messages. Label every sample. An authorized commercial SDK can be evaluated later, but its availability does not establish flight compatibility.


**Architecture decision gate**

Framework selection should follow measured needs: offline durability, authorization, adapter boundaries, reproducible computation and recovery. Keep current candidates provisional. Do not add distributed services or larger models unless a demonstrated requirement warrants the cost.


## The 3D world should be an experiment

*PROPOSED SCENARIO LAB / SAME EVENT ENGINE*

A spatial view is useful when location, reachability, device availability or simultaneous tasks change the outcome. It should render the same events and state as the 2D lab and app. Avoid inventing physiology or portraying a 3D body as a validated medical twin.

| Test world event | Expected observable behavior |
| --- | --- |
| Recorder leaves its dock | Acquisition and transfer availability change according to the declared contract; gaps remain visible. |
| Crew swaps a wearable | Unknown wearer binding quarantines the record; no silent assignment by proximity. |
| Primary reviewer is occupied | A qualified available backup can accept ownership; history retains both actors. |
| Assessment method changes | Comparison is withheld until method compatibility is reviewed. |
| Vehicle LAN fails; Earth link remains up | The UI distinguishes onboard acquisition failure from Earth transport. |
| A packet arrives, then evidence is corrected | Ground retains the old snapshot and receives an explicit superseding version. |
| The 3D renderer fails | The 2D scenario controls and event trace remain usable; test state is preserved. |
| Application restarts during handover | Pending responsibility and packet identity survive without duplicate completion. |


### Three synchronized views

Mission view: people, stations, devices and task availability. Crew/ground view: the actual application at the same virtual time. Evidence view: raw input, validation, rule result, action, packet revision and assertion. Freeze, step and replay should reproduce the same result for the same seed.


### QA through release

Development uses fictional fixtures and pinned public research in separate namespaces. QA adds deliberate faults and independently specified expected results. Staging uses the release package and synthetic mission data, including cold start and offline recovery. The public hackathon demo remains clearly simulated. Any clinical deployment is a separate authorization, validation and operational-support program.


### What is already proven

v0.5 records 60 passing Node tests, including its 12 in-app scenario contracts. This is the existing browser-local mock result, not 72 tests or clinical qualification. Its replay, local persistence and role views do not prove real transport, backups, authentication, 3D behavior or hardware performance. No new app code was deployed in this review.


## Build priorities and a credible judging story

*DECISIONS / NEXT MILESTONE*

| Order | Deliverable | Completion evidence |
| --- | --- | --- |
| 1 | One mission-day episode with task, duty, equipment and explicit ownership. | A user can explain who acts next, why and with which evidence; handover stays correct through interruption. |
| 2 | Episode UI and honest domain-coverage map. | Usability comparison, keyboard/zoom checks, missing-data and stale-state walkthroughs. |
| 3 | Durable local service, scoped API and outbox. | Restart/restore, denied access, duplicate replay and delayed-version tests. |
| 4 | Bounded AI summary experiment. | Measured advantage over a template, with citations and a fail-safe fallback. |
| 5 | Spatial scenario adapter. | Identical expected outcomes across 2D, 3D and headless replay; renderer failure does not break care state. |


### What makes the story easy to judge - our inference

The reviewed examples make a user problem and a resulting artifact visible. We infer that a repeatable story, inspectable evidence and a clear limitation statement improve credibility. Award descriptions do not establish hidden weights, a required stack or a guaranteed winning formula.

Proposed short demo: an assessment arrives automatically; an unresolved context issue prevents a misleading interpretation; the assigned reviewer resolves the task and owns follow-up; Earth transmission waits and later delivers the exact evidence; a correction remains traceable. Show one failure deliberately. Keep source links and test evidence available beside the demo.


### Readiness questions that remain open

Who reviews clinical applicability? Which task and actual device will be tested? What is the approved information-sharing policy? Which procedure corpus can legally and safely be used? What objective defines MVP success? These questions can be researched and prototyped, but they must not be filled with invented NASA preferences.


**Use the existing work**

Keep the source catalog, data-use plan, mission blueprint and schema register. This review adds direct interface observations and sharper acceptance criteria. Prioritize the backlog by unresolved evidence and user-task risk; keep research-only material available without forcing every dataset into the operational app.

The challenge page returned 502 during this review. Use the supplied gather/evaluate/act summary provisionally. Reconcile scope, submission limits and pre-event development eligibility with the official 2026 documents when available. Historical winners and earlier guides do not settle those rules [S20].


## Sources and inspection boundaries

*REFERENCE REGISTER / 1 OF 2*

Primary material is linked below. Team websites establish what their authors show or claim. NASA announcements establish award identity. Neither substitutes for independent scientific validation. Browser observations describe this session on 21 October 2026.

- **S01** [NASA: 2025 global winners](https://www.nasa.gov/learning-resources/stem-engagement-at-nasa/nasa-announces-2025-international-space-apps-challenge-global-winners/). Official award identities; published 18 December 2025.
- **S02** [SpaceGenes+ project site](https://spacegenes-plus.framer.website/). Author description; one live case, other conceptual cases.
- **S03** [SpaceGenes+ public application](https://spacegenes-bj15.bolt.host/). Direct desktop interaction and visual inspection, 21 October 2026.
- **S04** [SpaceGenes+ designer reflection](https://medium.com/design-bootcamp/spacegenes-designing-a-tool-to-reveal-hidden-health-risks-in-space-7d46bdc97ef6). Author Saloni Tangal, 26 December 2025; design intent, not independent validation.
- **S05** [PureFlow home and mission flow](https://larasdiniz.github.io/PureFlow-2025/src/public/html/home/home.html). Direct inspection through configuration, technical analysis, briefing and designer.
- **S06** [AstroSweepers solution](https://astro-sweepers.vercel.app/solution). Direct visual inspection; product narrative and roadmap, not a tested model.
- **S07** [AstroSweepers submission hub](https://astro-sweepers.vercel.app/). Direct inspection of evidence-document organization; files not audited.
- **S08** [NASA EIMO concept of operations](https://ntrs.nasa.gov/citations/20240001402). 2024 concept presentation; medical autonomy and mission constraints.
- **S09** [ExMC CDSS architecture recommendation](https://ntrs.nasa.gov/api/citations/20220017869/downloads/HRP-48032%20ExMC%20CDSS%20Architecture%20Recommendation%20Rev%20B.pdf). HRP-48032 Rev. B, 17 January 2023; especially sections 7.1.2 and 7.2.
- **S10** [NASA HRP AI portfolio](https://ntrs.nasa.gov/api/citations/20260001797/downloads/NASA%20HRP%20Use%20of%20AI%20Technology%20to%20Mitigate%20Risk.pdf). 2026 presentation; slides 8, 14 and 16. Slide 16 visually reviewed.


## Sources and retained project evidence

*REFERENCE REGISTER / 2 OF 2*

- **S11** [NASA SPIFe / Playbook](https://www.nasa.gov/human-systems-integration-division/human-computer-interaction/schedule-and-planning-interface-for-exploration/). NASA platform description and mission/analog use.
- **S12** [Astronaut-centric planning design](https://ntrs.nasa.gov/api/citations/20190032485/downloads/20190032485.pdf). 2019 paper; figures 1-3 visually reviewed on PDF page 2.
- **S13** [Playbook UX evaluation](https://ntrs.nasa.gov/api/citations/20220000417/downloads/hcii22_final.pdf). 2022 paper; sections 3 and 4, figures 1c/1d on PDF page 6 visually reviewed.
- **S14** [NASA-STD-3001 V2 crew interfaces](https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/). 10113, 10124-26, 10129-31, 10153, 10161-64; applicability still needs review.
- **S15** [NASA-STD-3001 V1 human performance](https://www.nasa.gov/reference/4-0-human-performance/). 4003: relative in-mission aerobic-capacity requirement; not an acute diagnosis.
- **S16** [CSA Bio-Monitor](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp). Official wearable/tablet context; no flight API or exact screen model established here.
- **S17** [NASA Standard Measures](https://www.nasa.gov/reference/standard-measures/). Longitudinal, multi-system research; not a public operational crew feed.
- **S18** [NASA Open MCT](https://nasa.github.io/openmct/). Mission telemetry visualization reference; documentation reviewed, no live UI test this turn.
- **S19** [NASA / Google CMO-DA partnership](https://cloud.google.com/blog/topics/public-sector/how-google-and-nasa-are-testing-ai-for-medical-care-in-space). Partner account of a proof of concept and clinical evaluation approach; 7 August 2025.
- **S20** [Chosen challenge](https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/). 502 during this review. Challenge summary supplied by team leader; full objectives unverified.


### Project baseline inspected

Existing v0.5 repository: [historical workspace path] Commit 4eade06dd930a44ac62034c0b431d9e8589c0031. Reviewed validation record, data provenance, award evidence and domain logic. Earlier mission blueprint v0.4 and data-to-product plan v0.3 remain supporting specifications. This review does not change their implementation status.
