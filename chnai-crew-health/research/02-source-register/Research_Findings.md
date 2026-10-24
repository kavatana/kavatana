> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB: space health research foundation

Research collection: 17-18 October 2026. This is preparation and evidence gathering. Product scope, physical database schema, clinical rules, hardware target and technology stack remain provisional.

## The decision for the team leader

Your original preparation is a useful starting structure. Its largest gap was the distance between knowing that a dataset exists and having inspected usable records. This collection closes part of that gap: it includes actual public laboratory tables, historical environmental observations, Earth waveform benchmarks, file-level inventories, source documents and a register of unresolved issues.

The strongest direction to investigate is an onboard assistant that gathers available indicators, explains a meaningful change with its evidence and limitations, and helps a crew member complete a reviewed next step during delayed or unavailable ground contact. That is a product hypothesis. Its value must be demonstrated through one specific workflow, not claimed from the size of the collection.

The next decision is the mission setting and workflow. A short ISS demonstration, lunar sortie and long Mars transit have different communication, evacuation, supply and care assumptions. Keep the broad research library, then choose a small operational slice once the full challenge statement is released.

## What the NASA evidence changes

NASA already has medical staff, monitoring hardware and research software. The problem is not a lack of interest in astronaut health. Its EIMO ConOps describes a gradual transfer of capabilities onboard as missions lose timely communication, evacuation and resupply. It identifies pre-mission planning, acute management, prolonged management, supplies/resource management and task-load management as interacting components. This is a preliminary systems-engineering concept, not a ready-to-integrate operational product. [S003]

NASA's Datascope work describes physiological wearables, environmental controls, countermeasures, behavioral data, point-of-care tests, personal records, supplies and ground inputs as relevant input categories. Its architecture discussion supports your concern about heterogeneous data. It also identifies the difficulty of obtaining training data relevant to astronaut demographics. Collecting many unrelated records does not solve that problem. [S004]

The 2026 NASA AI presentation provides a current research reference for a Crew Medical Officer Digital Assistant. It should inform our comparison with existing work. It does not establish a publicly accessible production API, clinical reliability, an open medical knowledge license or a flight-ready model. Treat its roadmap as a roadmap. [S005]

## People, duties and privacy

The primary user remains the astronaut. Relevant supporting roles include an assigned Crew Medical Officer, flight/crew surgeon, biomedical flight controller, behavioral health provider, exercise/rehabilitation specialist and radiation specialist. NASA's medical-operations brief explains that roles, authority and coordination vary by program. The software permission matrix therefore needs a mission-specific policy. [S054]

The training standard distinguishes the Crew Medical Officer assignment from physician qualification. A software role called CMO must not imply that every user has medical-school training. [S056]

BME is a technical coordination role that works with the flight surgeon and mission control. A technical hardware view can expose collection gaps, battery/connection state and scheduled activities without automatically exposing psychological notes or genetic records. That separation is our proposed implementation implication, not a published NASA access-control matrix. [S011]

Record changing duties and context: current task, duty/rest period, exercise, EVA, mission phase, location, available supplies and communication state. A permanent job title cannot explain a reading taken during exercise, after waking or during a demanding operational task. Private medical and psychological communications require deliberate handling, including stored-forward modalities when appropriate. [S010]

## What is actually in the collection

Use the master register for exact counts and collection state. Counts of files, study entries, samples and measurements mean different things and must not be combined into an inflated data total.

### Public spaceflight laboratory data

The selected Inspiration4 files include submitted and transformed CBC, comprehensive metabolic panel, immune and cardiovascular assay tables, urine inflammation results, processed plasma proteomic/metabolomic files, sample metadata and ISA protocol packages. The original bytes are retained. These are research observations, not live readings from a current mission.

The CBC submitted file has 553 analyte rows across four pseudonymous participants and seven relative time labels. Its transformed companion has 28 sample rows and 61 columns. A wide sample row and a long analyte row are different grains; loading both as independent observations would duplicate evidence. The submitted file contains 23 analyte labels, while the transformed layout does not simply represent all of them identically. The import mapping needs an analyte-level reconciliation.

The CMP submitted file has 531 analyte rows. Immune and cardiovascular EvePanel submitted files contain 1,988 and 252 rows respectively. Preserve assay platform, units, reference values and specimen details. A research cytokine measurement is not, by itself, a diagnosis or an operational alarm.

Inspiration4's mission-level context is four participants and three days in LEO. Individual assays have their own coverage. For example, OSD-687 describes a proof-of-concept histone study from one crew member at R+194. The skin-biopsy metadata also describes unequal pre/postflight participation. Do not assign every table the same sample size. [S026; selected ISA metadata]

### Broader studies and analogs

The documented human-organism metadata query returned 116 entries. These include astronaut samples, bed-rest/unloading and confinement studies, human cells and tissue models, and mixed-organism metadata hits. The register labels context triage as provisional. These are not 116 astronaut cohorts.

Useful additional starting points include OSD-53, describing short-duration astronaut blood-expression measurements; OSD-140, describing the six-person Mars-520 isolation study; and OSD-530, describing a JAXA cfRNA study of six astronauts on ISS missions longer than 120 days. Metadata and selected files are collected at different depths. Detailed analog phenotypes, labels, reuse terms and suitability still need study-level review.

The ESA HREDA record adds a bed-rest intracranial-pressure investigation and a partner archive discovery route. Its catalog record specifies CC BY-NC 3.0 IGO. The metadata record is collected; a usable participant measurement package has not been obtained. [S058; S069]

### Environment and space weather

The collection includes a historical ISS RadLab slice with absorbed-dose and dose-equivalent fields, historical DONKI flare/particle-event records, a dated NOAA GOES integral-proton snapshot and an EDA historical ISS/ground telemetry slice. Treat each as environmental or event context.

RadLab's documentation pages failed during direct collection while a historical API request succeeded. EDA's radiation endpoint also failed during this collection. Keep the failure log and the successful snapshots; neither result establishes availability during a mission.

GOES particle flux cannot be turned into personal crew dose without a valid physical exposure model. RadLab instrument dose cannot be substituted for NASA's career effective-dose limit. Likewise, an EDA experiment sensor is not automatically the exposure at a crew member's location. [S028; S029; S031; S032; S071]

### Earth engineering benchmarks

BIDMC supplies ECG/PPG/respiration signals, numerics and breath annotations under ODC Attribution terms. The selected collection contains the numeric recordings and three high-frequency waveform examples. These can test file ingestion, timestamps, data quality and resampling behavior. The cohort consists of critically ill hospital patients, so it cannot establish healthy astronaut thresholds. [S052]

Sleep-EDF supplies an EDF/EDF+ format and annotation example with its description and condition dictionary. Collection state is recorded per file. Its telemetry study includes placebo/temazepam conditions and historical sleep-stage scoring. Do not equate it with astronaut wrist actigraphy or use it to claim a validated astronaut sleep classifier. [Sleep-EDF source]

## A concrete quality finding

The transformed CBC file names a hemoglobin field `hemoglobin_value_percent`. Matching submitted records specify `g/dL`. For example, C001 at L-3 has value 14.7 in both representations, with g/dL explicitly supplied in the submitted file.

This is a source-unit discrepancy requiring review, not permission to silently repair the source. Preserve the original files, record the issue, block automated interpretation of the disputed mapping and have a qualified reviewer resolve the import contract. Other analytes and transformed tables need the same reconciliation. No clinical interpretation was performed.

Other review requirements include missing/blank versus zero, censored values, assay-specific normalization, specimen identity, unequal cohort coverage and mission-relative time. File checksums establish byte identity; they do not establish clinical accuracy.

## Devices and automation

CSA documents Bio-Monitor as a garment, headband and dedicated tablet application. Its described workflow includes activity selection and plugging the recorder into a base for transfer through station communications. Continuous measurement does not prove continuous live integration with our application. [S055]

Commercial Hexoskin has a documented authenticated REST API with JSON, CSV and binary access. Its timestamps and subsampling behavior need explicit handling. This provides an engineering reference, not proof that the flight Bio-Monitor exposes the same API. [S036]

For actigraphy, cognition, hematology, ultrasound, ocular imaging and exercise equipment, the next proof is a sample export or documented SDK for the actual device/model. FHIR and DICOM are candidate representations. They do not make an unsupported instrument interoperable. The Devices tab records these boundaries rather than inventing adapters.

Automation should reduce routine effort while retaining necessary human observations and control. A wearable cannot directly capture a new symptom, private concern, all nutrition intake or every contextual change. The design goal is fewer unnecessary interactions and clearer exceptions, not an unsupported promise of zero manual input.

## How the data architecture should follow the evidence

Keep three separate purposes: the research repository, the onboard operational record and the approved evidence/procedure pack. Large arrays and historical studies belong in research storage. The runtime should contain the mission-relevant subset, individual baseline, recent observations and procedures needed for its tasks.

Before a physical schema, specify examples for scalar measurements, waveforms, specimen-linked results, questionnaires, images, environmental series and operational events. Each needs identity, event time, received time, source device/method, original unit/value, quality state, provenance, access purpose and revision handling. Mission-relative labels need an explicit anchor and uncertainty; they must not be fabricated into exact UTC timestamps.

An individual has many missions and time-bounded assignments. A specimen has many assays, and an assay can produce many results. A finding depends on particular observation versions, a rule/model version and an applicable evidence version. An action has an accountable person and follow-up state. These are research-derived modeling questions, not a finalized schema.

Candidate storage choices remain open. A transactional local store can serve recent observations and actions; waveform/array files and imaging objects need different storage and indexing. Columnar research tools can analyze large archived tables. Encryption requires real key-management and recovery decisions. Putting every modality into one large JSON field or embedding image bytes in ordinary clinical rows would hide important distinctions.

Future code boundaries should follow responsibilities: device/import adapters, domain contracts, quality/unit mapping, operational storage, evidence retrieval, analysis, workflow/authorization, sync and clients. Research ingestion should have its own lifecycle. A `web` folder and an `api` folder alone do not describe these responsibilities. Database migrations belong with the service that owns persistence; large datasets and credentials do not belong in source control.

## AI and interface decisions

Start evaluation with a bounded task: explain an observed change using allowed evidence, identify missing information, or prepare an authorized handoff packet. Deterministic calculations should own units, windows and approved numerical rules. A language model can organize an explanation or retrieve cited material without becoming the source of truth.

Fine-tuning is justified only after a permitted labeled dataset, subject-separated evaluation and a baseline comparison exist. Do not split samples from one person randomly between training and evaluation and call that astronaut generalization. A model's response should expose unsupported or missing evidence and retain a usable non-model fallback. No model was fine-tuned or clinically validated in this research phase.

NASA interface requirements and crew-planning research should inform status visibility, interruptions, automation responsibility and workload. Open MCT is a useful NASA telemetry reference, while A2UI/AG-UI are technology candidates. None demonstrates that a new generated interface is preferred by astronauts. Select a device/compute target only after a mission assumption and usability test plan exist. [S020; S021; S072; S074; S075; S076; S082]

## Maintain and extend the repository

1. State the operational question before adding a source. Record how its contents could change a workflow, decision, data contract or validation claim.
2. Add the source URL, authority, publication/version, population, mission/analog, modality, access and reuse conditions. Discovery is not collection.
3. Retain source bytes with retrieval time, checksum and the request parameters. Keep failed attempts visible.
4. Profile formats and sample relationships. Review units, missingness, duplicates, clock semantics, sample sizes and assay scope. Preserve raw files.
5. Define a versioned mapping only after review. Keep derived outputs reproducible and linked to their input hashes. Clinical applicability requires separate review.
6. Refresh mutable feeds into dated snapshots. Compare changes before replacing operational evidence. Do not silently update thresholds or model behavior mid-mission.

Google Drive is the team research repository, not the proposed spacecraft database. Each domain folder contains a downloadable collection package. The master register separates catalog-only files from collected assets and links every asset back to its source. CSV/JSON registers support later import without making the spreadsheet the production database.

## Next gates

Read the full challenge statement on 28 October and map each objective and required resource. Review the 2026 submission guide when released on 13 November. The current official FAQ confirms those dates and prohibits beginning challenge work before the hackathon. Keep this as research preparation; obtain organizer clarification before relying on any pre-event product mockup or code for eligibility. [S002]

Then choose one mission setting, recruit a medical/life-science reviewer, select one feasible workflow, resolve its data gaps and unit mappings, define contracts, and evaluate the smallest credible prototype during the permitted build window. The wider research collection can grow without forcing the first product to implement every health domain.

Source IDs resolve to URLs in the master register and sources.csv. Study claims resolve to retained ISA or API metadata. All workflow, permission, architecture and UI proposals remain labeled as hypotheses until evaluated.
