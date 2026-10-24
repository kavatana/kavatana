> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Research checkpoint — 19 October 2026

The next research pass began before the request to move the project to the personal Google account. No additions have been written into the company research register. This checkpoint preserves work in progress for the move; it does not replace the completed 18 October findings.

## Findings that change engineering decisions

**1. Open papers do not imply open participant data.** The HERA cognition paper describes a request process through NASA's Life Sciences Data Archive for qualified researchers. Its public supplementary tables are a separate product. Five supplementary XLSX URLs returned HTML in this collection attempt, so no new cognition tables are claimed. The astronaut exercise/bone paper explicitly states that its underlying data are not available. We have research evidence, not a new longitudinal crew database. [E001, E002]

**2. We have a documented candidate for an Earth hardware demonstration.** The manufacturer's H10 documentation specifies a Bluetooth SDK with HR/RR output, 130 Hz ECG in microvolts, and selectable accelerometer rates. Its documented internal recorder supports a single HR recording; that is not proof of offline ECG storage. Android/iOS SDK documentation does not establish direct browser support or NASA flight approval. Choose a hardware adapter only after testing a real device and its firmware. [E003, E004, E007]

**3. A single timestamp column would be inadequate.** Polar describes nanoseconds from a 2000 epoch, local-time setting behavior and possible sensor clock resets. Some HR/PPI samples may have no precise individual timestamp. Retain device time, its epoch and settings, receipt time, session and clock reliability separately. Do not convert unknown time into a falsely precise UTC instant. [E005]

**4. Public source code is not automatically a permissive open-source dependency.** The Polar SDK supplies its own limited license. Preserve and review its conditions before committing the product to that SDK; do not label the entire proposed stack MIT or Apache licensed. [E006]

**5. Standards provide useful semantics, not automatic integration.** FHIR R4 distinguishes an observation's effective time, issue time, value, missing-value reason and method. SampledData adds sample period and dimensions. These support our data-contract research, but a specific mission profile and device mapping remain to be defined. [E008, E009; existing S038–S047]

**6. Delayed networking does not eliminate application responsibility.** NASA discusses delay/disruption-tolerant networking and RFC 9171 defines Bundle Protocol v7. A health product still needs purpose-authorized release, application receipt, version handling and clinical review states. The proposed distinction between transport delivery and clinician review is our architecture inference, not a NASA-certified implementation. [E010, E011]

## Collection state

Fourteen documents/file inventories were successfully retrieved and hashed. This includes the two papers, vendor documentation and license, FHIR definitions, DTN references and OSD-51/195/198 inventories. These three OSD studies were already present as metadata candidates in the earlier register; they are not three newly discovered astronaut cohorts. No new participant-level bone, cognition or exercise dataset has yet been acquired.

`collection_attempts.json` preserves all attempts, including the initially outdated H10 documentation path. `collection_manifest.json` gives the latest state per asset. `retrieval_failures/` contains the five rejected HTML responses under honest `.html` filenames. Successful HTTP status alone did not establish a valid spreadsheet.

## Work still to finish

1. Inspect the three OSD inventories and associated study metadata before selecting processed files. Muscle gene-expression data are not bone mineral-density measurements.
2. Find a usable, rights-compatible sleep/cognition or exercise measurement set, or record that the relevant human data require controlled access. Do not substitute cohort statistics for individual sequences.
3. Finish source-to-field mappings and explicit acceptance/rejection cases for scalar, lab, waveform, questionnaire, image, environmental and mission-context data.
4. Compare candidate MVP workflows by available evidence, interpretability, useful action, review needs and demonstration complexity. No final clinical workflow has been selected.
5. Map the complete challenge objectives and required resources when released. Recruitment of a health/life-science reviewer remains unresolved.

## References

- E001: HERA cognition paper — https://pmc.ncbi.nlm.nih.gov/articles/PMC7198903/
- E002: Pre-flight exercise and bone metabolism paper — https://pmc.ncbi.nlm.nih.gov/articles/PMC8862023/
- E003: Official Polar SDK — https://github.com/polarofficial/polar-ble-sdk
- E004: H10 supported features — https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/products/PolarH10.md
- E005: Sensor time documentation — https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/TimeSystemExplained.md
- E006: SDK license — https://github.com/polarofficial/polar-ble-sdk/blob/master/Polar_SDK_License.txt
- E007: Offline-recording documentation — https://github.com/polarofficial/polar-ble-sdk/blob/master/documentation/SdkOfflineRecordingExplained.md
- E008: FHIR R4 data types — https://hl7.org/fhir/R4/datatypes.html
- E009: FHIR R4 Observation definitions — https://hl7.org/fhir/R4/observation-definitions.html
- E010: Bundle Protocol v7 — https://www.rfc-editor.org/rfc/rfc9171
- E011: NASA DTN — https://www.nasa.gov/communicating-with-missions/delay-disruption-tolerant-networking/

All URLs were checked or collected on 19 October 2026. Snapshots and hashes preserve the retrieved versions; branch URLs may change later.
