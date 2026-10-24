> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB - Product and data-use plan

21 October 2026. Design proposal; current mock unchanged.


## From a working mock to a useful product

CHNAI LAB  |  Product and data-use plan  |  21 October 2026

> Next milestone: make one evidence-backed crew decision easy to understand, complete and verify - then demonstrate how the same data foundation supports the wider health brief.

Proposed product sentence: CHNAI helps a crew member understand a health change, complete an accountable next step, and preserve the evidence when Earth is unavailable.

| What exists | What it establishes | What it does not establish |
| --- | --- | --- |
| Research collection and engineering specifications | A substantial, traceable preparation base and explicit integration limits. | A validated clinical dataset, finished backend or flight interface. |
| Current private browser mock | Fictional intake, exact comparison, review, follow-up and delayed-handoff simulation. | Real autonomous acquisition, a connected LLM, mission operation or actual medical benefit. |
| 28 recorded passing tests and desktop walkthrough | The documented mock behaviors were checked at the retained source commit. | The 36 development specifications, real Mac performance or human usability have passed. |

### My assessment

The mock is a strong workflow proof. It is not ready for judging as our finished product: its data collection is largely invisible, its visual narrative is narrow, and clinical usefulness has not been tested. Adding decorative space graphics would not close those gaps. A clearer personal history, explicit missing data, contextual explanations and fewer routine steps would.

NASA usefulness is a hypothesis to test with task evidence and appropriate reviewers. Award selection is outside our control. This plan targets the things we can prove: relevance, traceability, understandable action, resilience and a convincing demonstration.

Evidence: Current source: [historical workspace path] commit 67b5e93; docs/VALIDATION.md. No new app execution in this planning pass.

## What our collection actually contains

Allocate each source to a purpose; do not count every file as a dataset.

| Inventory reviewed | Count | Meaning |
| --- | --- | --- |
| Source-register occurrences across preparation, research, architecture, validation and engineering | 243 | 207 distinct URL keys after conservative URL normalization; not 207 datasets or independent papers. |
| Study catalog entries | 119 | 106 labeled metadata-only; 13 in an older mixed ISA/selected-results category. Qualify per asset. |
| Remote file inventory entries | 6,532 | Catalog rows. Most are not downloaded measurement files. |
| Asset/acquisition register entries | 382 | 345 earlier entries plus 37 research-checkpoint entries. Includes pages and acquisition evidence. |
| Registered local paths present | 375 | 374 match an existing recorded SHA-256; zero mismatches. Seven missing paths were already marked unavailable. |
| Original preparation notes | 26 | Preserved as context; time-sensitive assumptions still need reconciliation. |

### Corrections the next implementation must respect

The earlier Sleep-EDF PSG path is now present and byte-identical to the later recovered session. Its old unavailable label is stale; the annotation companion is not a second person. Historical acquisition state and current availability need separate fields. A matching hash proves byte identity, not valid content or medical accuracy.

Submitted and transformed CBC files represent overlapping evidence. Their hemoglobin unit labels disagree; do not load both as independent observations. Source IDs such as N01 are reused across packages, so the new register namespaces them. Runtime records, research subjects and simulated crew must also keep separate identities.

This was a catalog-wide allocation, review of the recorded profiles and targeted primary-source checks. It was not a fresh scientific review of every paper or every measurement. The editable registers retain that distinction.

Evidence: Registers: allocation_summary.json, source_use_register.json, asset_use_register.json, study_use_register.json, original_preparation_use.json.

## Give every data family a useful job

Twenty families are allocated in the accompanying register. These are the product-facing priorities.

| Data we hold or reference | Best use in the project | Boundary |
| --- | --- | --- |
| NASA standards, Standard Measures, EIMO and role documents | Evidence cards, comparison applicability, mission context, privacy and accountable workflows. | Documentation drives requirements; it is not personal telemetry. |
| OSD-569 CBC; OSD-575 chemistry and multiplex panels; OSD-656 urine assays | Real research importer, analyte trends, specimen/unit lineage and quality rejection. | Keep short-mission research separate from fictional crew. No immune or disease score. |
| Selected OSD-571 matrices; omics and microbiome metadata | Sample/protocol schema and research-scale storage tests. | No model training or operational prediction without a defined, reviewed task. |
| ACTES: 52,062 rows from 18 youth participants | Session replay, missing interbeat intervals, time handling and unit checks. | Unresolved oxygen-consumption scale; not astronaut VO2max or norms. |
| Sleep-EDF complete session; BIDMC numerics and waveforms | Multi-rate signal parsing, gaps, annotations, calibration and replay. | Earth sleep/ICU cohorts do not validate astronaut health inference. |
| EDA, RadLab, DONKI and NOAA snapshots | Historical environmental timeline, location and quantity handling. | No matching mission or personal exposure assumed; no flux-to-personal-dose shortcut. |
| Bio-Monitor, Hexoskin and Polar documentation | Explicit adapter contracts and one optional Earth-device proof. | No public flight API or actual device capture established. |
| Open MCT, interface standards, FHIR, units, AI and framework references | Visual patterns, data contracts, bounded explanation and engineering choices. | Reference use does not require adopting every library or claiming NASA approval. |

Four destinations: crew-relevant operational facts; engineering qualification fixtures; a versioned evidence pack; and a research backlog with an explicit question. A deferred source still contributes by explaining a limitation or future decision. It does not need to appear on the crew home screen.

Evidence: All 243 source occurrences and 382 asset/acquisition entries have an allocation. Allocation does not mean all content is ready or permitted for runtime use.

## Cover the challenge without inventing health knowledge

Use the same observation, evidence, review and follow-up structure across all four named outcomes.

| Domain | Useful next behavior | Data and interpretation gate |
| --- | --- | --- |
| Cardiovascular / fitness | Improve the existing capacity comparison with discrete history, method context and a clear review action. | Existing fictional completed assessments plus V1 4003. Add signals only through qualified adapters. Capacity is not cardiovascular-event diagnosis. |
| Immune / laboratory | Add a lab importer and analyte-by-analyte history. Detect conflicting units and preserve source reference intervals. | Start with retained CBC and chemistry. A qualified reviewer must check analyte semantics. No CBC-derived overall immune status. |
| Bone / muscle | Track the presence of actual DXA/strength assessments and contextual exercise records; identify missing monitoring. | Use the bone standards and study protocols. No held crew DXA series. Exercise adherence is not measured bone density. |
| Behavior / sleep | Private optional self-report, sleep-opportunity versus recorded-sleep context, and a clearly assigned follow-up. | Use NASA measurement domains and schedule guidance. Instrument rights/scoring and privacy need review. Do not infer mood from pulse or sleep alone. |

### Shared context

Duty/rest events, current activity, mission phase, acquisition quality and communication state can help explain which observations deserve review. A temporal association is not proof of cause. Cabin and radiation records require compatible time and location before they can be associated with a person.

> Recommended next release: one complete cardiovascular review path, one real research lab-import/quality path, and an honest four-domain monitoring map. Only functioning, supported behaviors count as coverage. Cards saying Not assessed do not complete the other three health outcomes.

After the full challenge objectives are available, choose which additional domain becomes a complete second crew workflow. Lab review is the strongest data-backed candidate; private sleep/workload context is the strongest UX complement. Do not promise both as finished before their gates pass.

Evidence: NASA Standard Measures; NASA medical operations; existing coverage.csv and Data access register. Domain priorities are CHNAI design recommendations, not NASA requirements.

## The proposed visual direction

A crew brief organized around change, evidence and responsibility. This screen is a design proposal.

![Proposed design](visuals/CHNAI_Visual_Direction_v0.3.png)

Evidence: Only the existing fictional values 50 and 39 are plotted. No extra time points, health scores, flight devices or NASA endorsement are implied.

## Make the interface useful at a glance

Visual depth means showing relationships the user would otherwise have to reconstruct.

| Surface | What the user understands | Meaningful interactions |
| --- | --- | --- |
| Health brief | What changed; what is missing; whether local work is available; one next responsible actor. | Open the surfaced episode; optionally add a private observation. Move simulation controls out of the primary task. |
| Review timeline | Discrete assessments and actual events, with gaps, source time and received time distinguished. | Select comparable observations; inspect the source/method; never smooth or interpolate unmeasured values. |
| Evidence drawer | Where the number came from, the applicable rule version and unresolved assumptions. | Open raw/normalized value, source citation, qualification and revision history without repetitive navigation. |
| Care follow-up | Who owns the next step and what event or deadline completes it. | Assign or accept a reviewed action; record an actual outcome. Ground delivery must not close care. |
| Ground handoff | Exactly what will be shared, to whom, and what has only been delivered versus reviewed. | Approve a frozen purpose-limited preview; inspect current versus historical evidence. |
| Separate research workspace | Which records are real research, fictional scenario inputs, unavailable or quarantined. | Replay a retained file and inspect a mapping report. Research subjects never appear as live crew. |

Use coordinated charts and timelines as informed by Open MCT, with stable navigation and explicit automation state informed by NASA crew-interface guidance. The exact visual layout is our design. Open MCT is not a certified astronaut medical interface.

Proposed QA viewports: 1440 x 900 desktop and 1024 x 768 tablet, plus a 390-pixel narrow layout. These are test sizes, not claims about NASA hardware. Use keyboard navigation, readable contrast, text labels with color, zoom support and reduced motion.

Evidence: NASA Crew Interfaces V2 10113, 10153, 10161-10164; Open MCT overview; WCAG 2.2. Detailed compliance remains untested.

## Automate the routine; preserve accountable decisions

A larger database is useful only when observations become timely, trustworthy information.

| Layer | Next implementation contract | Human responsibility |
| --- | --- | --- |
| Acquisition | A versioned replay/import adapter publishes typed records with raw bytes/hash, subject namespace, event time, received time, unit and method. | Start/stop replay or authorize a real device; supply symptoms and context that sensors cannot capture. |
| Quality and storage | Validate identity, units, time and duplicates; preserve raw records; append revisions; quarantine unresolved mappings. | Resolve disputed semantics with appropriate expertise. Do not silently turn unknown into normal. |
| Evaluation | Deterministic arithmetic and applicability checks produce version-bound findings; data-quality and clinical states stay distinct. | Review clinical relevance and permitted next steps. No rule automatically creates a diagnosis or EVA clearance. |
| Briefing and optional LLM | Draft a short explanation from authorized facts and a pinned evidence pack. Verify every number, unit, citation and action type. | Review consequential actions and release. Model failure falls back to the current deterministic template. |
| Follow-up and synchronization | Create a durable owned task; queue approved exact packets; retry idempotently; distinguish delivery, review and completion. | Approve the exact packet; separately record clinical review and actual follow-up outcome. |

### Architecture implication

Keep the research archive, operational database and approved evidence pack distinct. Store structured recent records and workflow transactionally; retain large signals/images as immutable objects with manifests; use columnar research analysis separately. The existing 42-table dictionary guides these boundaries; implement a coherent slice before every extension.

Nuxt/FastAPI/SQLite and local inference remain conditional candidates from the architecture milestone. The present browser mock cannot prove their performance. Test crash recovery, actual access control and source-version binding before presenting a backend as complete. Keep framework migration separate from proving the visual design.

Evidence: Existing architecture and engineering handoffs. No framework upgrade, model download, database migration or live integration was performed in this planning pass.

## Build in this order

This is a gated sequence, not a promise that every research idea enters the hackathon build.

| Priority | Work package | Deliverable | Exit criterion |
| --- | --- | --- | --- |
| P0 | B01 - Source and scope control | Reconcile current availability, namespaces, full challenge objectives and preparation eligibility. | This allocation is complete. Official current objectives/rules and reuse determination remain open. |
| P0 | B02 - Visual crew brief | Build the proposed hierarchy, discrete assessment history, evidence drawer and visible gaps. | Four of five exploratory testers identify change and next actor within 10 seconds; report observed counts. |
| P0 | B03 - Real research import | Parse retained CBC into a separate research namespace; preserve units/specimens/times; quarantine the hemoglobin conflict. | Reconciled row counts, lineage and duplicates; conflicting mapping cannot produce a clinical finding. |
| P0 | B04 - Automatic fictional replay | Replay a documented scenario, deduplicate arrivals and show source/received time and quality. | One start action; no per-sample clicks; missing or stale inputs remain visibly missing/stale. |
| P0 | B05 - Accountable complete path | Connect the brief to review, follow-up, exact release and independent ground review. | One success path plus source correction, offline receipt and privacy-denial failures; retain current invariants. |
| P1 | B06 - Second domain selection | Choose lab review or private sleep/workload after objective and health review. | Reviewed interpretation, credible data source and a useful complete action; empty cards do not pass. |
| P1 | B07 - Backend and local model qualification | Implement durable scoped storage; compare optional local LLM with template on existing cases and actual Mac. | Migration/recovery/access tests pass; measured model benefit and factuality before replacing template. |
| P0 release | B08 - Judge-ready proof | Produce a reproducible scenario, concise source-use explanation, timed demo and accessible submission links. | Fresh-browser trial, honest data labels, confirmed rules and measured demo comprehension. |

Two-engineer split: one owns the crew experience, narrative and interaction tests; one owns import contracts, provenance, replay and workflow persistence. A health/life-science reviewer owns interpretation review, and a story/design teammate owns demo clarity. These are proposed assignments; no external reviewer has been contacted.

Next concrete build target: the redesigned brief plus the CBC research importer. Preserve the working review/handoff engine. Defer a new domain, hardware, model or framework change when it cannot pass its own gate.

Evidence: Backlog IDs B01-B08 are proposals. The current app has not been edited by this planning task.

## Prove usefulness and presentation

The strongest claim is a measured result from a reproducible task.

| Question to test | Proposed test | Acceptance / reporting |
| --- | --- | --- |
| Can someone understand the brief? | Five exploratory users: identify change, provenance, missing context and next actor. | Target 4/5 identify change and actor in 10 seconds; label non-astronaut participants honestly. |
| Does the workflow reduce effort? | Compare the current mock and revised design on the same task; counterbalance order. Record time, steps, errors and NASA-TLX. | Report actual counts and paired observations. Small convenience samples do not establish astronaut usability. |
| Can the data be trusted for its stated purpose? | CBC reconciliation; unit conflict; wrong subject; stale evidence; missing values; corrupt import; exact packet revision. | Zero critical failures in the defined cases. Report the scope; no general reliability percentage. |
| Does it work without Earth? | Actual browser/backend disconnection and restart once a backend exists; loss/retry/duplicate/late receipt. | No lost confirmed action; no duplicate task; no mistaken clinical completion from transport receipt. |
| Does AI improve the task? | Existing 24 development and 16 proposed holdout cards; pin the model/config; compare to template on the actual 18GB Mac. | Reject unsupported numbers/actions/citations. Report latency, memory and failures. No model has passed yet. |

### A 30-second working-story candidate

0-5s: fictional crew health brief and disconnected Earth. 5-12s: incoming assessment surfaces a change with NASA reference and explicit limits. 12-22s: crew completes the reviewed next step and assigns follow-up. 22-30s: approved evidence remains queued; show the preserved record and name the source. Keep the real research import as a live judge follow-up or appendix, not a second rushed story.

Judging evidence: Impact = observed task benefit; Creativity = coherent onboard evidence-to-action workflow; Validity = source/method/test traceability; Relevance = visible gather/evaluate/act and honest domain scope; Presentation = one understandable path. These criteria are planning anchors corroborated by indexed official local pages; the complete current central guide was not retrieved.

Evidence: 10 seconds, five testers and zero critical failures are proposed CHNAI gates, not NASA limits. The 30-second format remains provisional pending the 2026 submission guide.

## Evidence, release conditions and the next decision

Use the research to justify specific behavior. Do not claim certainty we have not earned.

| Reference | Use / verification |
| --- | --- |
| <link href="https://www.nasa.gov/reference/standard-measures/" color="#14698A">NASA Standard Measures</link> | Primary page read 21 Oct; multi-domain longitudinal measurement context. |
| <link href="https://www.nasa.gov/reference/4-0-human-performance/" color="#14698A">NASA Human Performance</link> | Primary page read 21 Oct; V1 4003 relative capacity, not an autonomous clinical action. |
| <link href="https://www.nasa.gov/reference/6-0-medical-operations/" color="#14698A">NASA Medical Operations</link> | Primary page read 21 Oct; schedule, private communication and mission-specific operations. |
| <link href="https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/" color="#14698A">NASA Crew Interfaces</link> | Primary page read 21 Oct; task information and visible automation responsibility. |
| <link href="https://nasa.github.io/openmct/" color="#14698A">NASA Open MCT</link> | Primary page read 21 Oct; mission-data visualization reference. |
| <link href="https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/" color="#14698A">Chosen 2026 challenge</link> | Current official search entry found; direct page returned 502 on 21 Oct. |
| <link href="https://www.spaceappschallenge.org/resources/participant-faqs/" color="#14698A">Central participant FAQ</link> | Direct page returned 502 on 21 Oct; current full rules not reverified. |
| <link href="https://www.spaceappschallenge.org/2026/local-events/mountain-house/" color="#14698A">Official local criteria example</link> | Indexed official excerpt lists the five criteria; direct page returned 502. |

### Release conditions still open

Full challenge objectives and mandatory resources; current submission rules; qualified review of interpretation/actions; permitted preparation reuse; actual hardware and model results; usability and privacy enforcement. The current app is private and uses a role switcher, so it is not yet a public no-login judging submission or an authenticated medical system.

The earlier project rule notes prohibit early solution building. This mock already exists and its timestamps must remain intact. Calling it preparation does not establish eligibility. Resolve whether any pre-event code, mockups or prompts may be reused, including global eligibility, before treating them as submission assets. No organizer has been contacted.

> Decision recommendation: adopt the visual brief, preserve the tested workflow, and bring the first real research importer into a clearly separated workspace. Then measure whether people understand and complete the task. That is the next milestone with the highest expected value.

The package includes the editable plan, visual source and source/asset/study allocations. The live mock and earlier specifications remain intact. Existing 28 October and 13 November reconciliation reminders are not duplicated.

Evidence: As of 21 October 2026, Asia/Phnom_Penh. This is an independent project plan; no NASA endorsement, clinical validation or winning outcome is claimed.

## Complete family allocation

### F01 - Mission, roles and operations

Priority: P0; lane: Decision context.

Use: Define the simulated mission, time-bounded care assignments, work/rest context and separate ground-receipt/review states.

Surface: Crew overview, care queue, ground packet

Limit: Mission policy is fictional; NASA operational roles do not establish our permissions.

### F02 - Standards, limits and reference versions

Priority: P0; lane: Approved evidence candidate.

Use: Make each comparison traceable to requirement, version, input quantity and applicability; retain visible unknowns.

Surface: Evidence drawer and comparison engine

Limit: Requirement numbers alone do not validate a clinical action or a sensor measurement.

### F03 - CBC, chemistry and assay tables

Priority: P0 importer / P1 UI; lane: Research importer and lab view.

Use: Preserve specimen, analyte, unit, raw value, source interval and relative time; reconcile submitted versus transformed tables.

Surface: Lab trend view in research workspace; later fictional crew lab review

Limit: OSD-569 and OSD-575 are short-mission research. No immune score, diagnosis or adult long-mission norms.

### F04 - Immune and urine multiplex assays

Priority: P1; lane: Assay and missingness tests.

Use: Use retained OSD-575/656 panel matrices to test censored values, assay units, panel versions and sample linkage.

Surface: Research panel explorer; quality queue

Limit: Different platforms are not one comparable clinical series. Urine inflammation is not hydration or kidney-stone diagnosis.

### F05 - Proteomics, metabolomics and genetic research

Priority: P2; lane: Research only.

Use: Use selected OSD-571 matrices for dimensionality and sample/protocol modeling; hold a separate omics namespace.

Surface: Research manifest and schema fixtures

Limit: No disease prediction, training claim or person-level runtime embedding without a defined reviewed task.

### F06 - Analog and long-duration study discovery

Priority: P2; lane: Question-led discovery.

Use: Model shared cohorts, crossover periods and technical replicates. Select additional bytes only for a named decision.

Surface: Study registry

Limit: Metadata is not acquired participant data. Related PlanHab accessions are not independent cohorts.

### F07 - Sleep, cognition, behavior and workload

Priority: P1; lane: Context and private workflow.

Use: Use Sleep-EDF for EDF/annotation parsing; NASA protocols for sleep/workload context and optional private check-ins; TLX for our usability study.

Surface: Private sleep/workload lane; signal research view

Limit: PSG is not actigraphy, sleep opportunity is not measured sleep, and sleep is not a diagnosis of behavioral health.

### F08 - Exercise, strength, bone and nutrition

Priority: P1; lane: Measurement and countermeasure context.

Use: Use ACTES for missingness and session ingestion; model completed capacity tests, exercise adherence and actual DXA separately.

Surface: Exercise context lane and bone monitoring coverage

Limit: Youth exercise samples are not astronaut norms. Ordinary VO2 is not VO2max. Exercise completion does not measure BMD.

### F09 - Terrestrial vital-sign waveforms

Priority: P1; lane: Engineering replay.

Use: Use retained BIDMC numeric records and selected waveforms for multi-rate replay, gaps, units and quality overlays.

Surface: Explicit research replay; optional adapter test

Limit: ICU measurements cannot become a healthy astronaut baseline or a live NASA feed.

### F10 - Environment and radiation

Priority: P1 context / P2 exposure; lane: Research context.

Use: Use historical EDA, RadLab, DONKI and GOES slices to test location, event time, unit and quantity-specific context.

Surface: Environmental research timeline

Limit: Different dates/locations cannot be aligned as one mission. Flux and instrument dose are not personal effective dose.

### F11 - Device and gateway contracts

Priority: P1 optional hardware; lane: Adapter design.

Use: Specify one file/replay adapter first; qualify a real Earth device only after exact model, SDK, clock, units and buffer behavior are known.

Surface: Collection status and engineering adapter view

Limit: Bio-Monitor operational description and Hexoskin commercial API are not an accessible NASA flight API.

### F12 - Terminology, record contracts and rights

Priority: P0; lane: Data governance.

Use: Normalize supported quantities with raw-value preservation; track purpose, version, access, citations and reuse permissions.

Surface: Source drawer, import report, audit and schema

Limit: FHIR/DICOM do not create hardware connectivity. Public accessibility does not approve redistribution or model training.

### F13 - Visualization and interaction

Priority: P0; lane: Design reference.

Use: Use coordinated timelines, accessible charts and stable task navigation. Evaluate generative interfaces only through a fixed approved component catalog.

Surface: Crew brief, evidence drawer, mission timeline

Limit: Open MCT is a mission-data reference, not a clinical UI approval; library adoption is optional.

### F14 - AI, explanation and model evaluation

Priority: P1 gated; lane: Bounded explanation.

Use: Draft evidence-linked briefs from authorized structured facts; validate values/citations; compare with the current template on held-out cases.

Surface: Optional local explanation and handoff draft

Limit: No independent treatment, severity, release, EVA clearance or fine-tuning on unrelated research observations.

### F15 - Storage, API, codebase and resilience

Priority: P0 implementation gate; lane: Engineering references.

Use: Use the existing 42-table design as a reference; implement only the necessary ingest-review-handoff slice with recovery and access enforcement.

Surface: Backend foundation and benchmark plan

Limit: The browser mock has not implemented the proposed backend, real role enforcement or durable mission operation.

### F16 - SANS and advanced imaging

Priority: P2; lane: Coverage and acquisition requirements.

Use: Record expected imaging modality, acquisition method and monitoring gap; keep reports/object storage distinct.

Surface: Monitoring coverage and future imaging view

Limit: No acquired crew imaging series; no inference from pulse, sleep or a consumer camera.

### F17 - Microbiome, body sites and cabin samples

Priority: P2; lane: Research schema and discovery.

Use: Use retained ISA/sample metadata to separate person, specimen, body site and cabin surface; defer bulk sequences.

Surface: Research sample explorer

Limit: Do not equate organisms detected on a surface with crew infection.

### F18 - Specific cardiovascular evidence

Priority: P1 reference / P2 prediction; lane: Evidence scope.

Use: Use thrombosis and orthostatic evidence to identify unsupported claims and acquisition needs.

Surface: Evidence cards and future method requirements

Limit: No clot detection or clinical-event prediction from the existing assay/waveform collection.

### F19 - Competition, presentation and eligibility

Priority: P0; lane: Submission control.

Use: Map full objectives to evidence and demo behavior; preserve preparation timestamps and confirm rules before submission reuse.

Surface: Judge evidence map and release checklist

Limit: Current central pages returned 502; no global eligibility or award guarantee.

### F20 - Rights or acquisition hold

Priority: HOLD; lane: Do not operationalize.

Use: Retain acquisition/rights evidence; reconsider only if a decision requires this dataset and terms are resolved.

Surface: Access register

Limit: Treadmill measurements are not held; do not bypass inconsistent access or license conditions.

## Primary source links

- NASA Standard Measures: https://www.nasa.gov/reference/standard-measures/ - Primary page read 21 Oct; multi-domain longitudinal measurement context.

- NASA Human Performance: https://www.nasa.gov/reference/4-0-human-performance/ - Primary page read 21 Oct; V1 4003 relative capacity, not an autonomous clinical action.

- NASA Medical Operations: https://www.nasa.gov/reference/6-0-medical-operations/ - Primary page read 21 Oct; schedule, private communication and mission-specific operations.

- NASA Crew Interfaces: https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/ - Primary page read 21 Oct; task information and visible automation responsibility.

- NASA Open MCT: https://nasa.github.io/openmct/ - Primary page read 21 Oct; mission-data visualization reference.

- Chosen 2026 challenge: https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/ - Current official search entry found; direct page returned 502 on 21 Oct.

- Central participant FAQ: https://www.spaceappschallenge.org/resources/participant-faqs/ - Direct page returned 502 on 21 Oct; current full rules not reverified.

- Official local criteria example: https://www.spaceappschallenge.org/2026/local-events/mountain-house/ - Indexed official excerpt lists the five criteria; direct page returned 502.
