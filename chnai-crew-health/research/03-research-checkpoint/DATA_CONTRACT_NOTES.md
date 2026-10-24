> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data-contract research notes

Draft, 19 October 2026. These are proposed information requirements, not a physical database schema, implemented API, NASA specification or clinical decision rule. They follow the observed data problems and the primary references in RESEARCH_CHECKPOINT.md and the original research register.

## Shared record envelope

| Information | Why it is needed | Grounding |
| --- | --- | --- |
| Stable record ID and revision | Corrections must not silently replace the record used in an earlier decision | Proposed invariant; FHIR provenance and observation status |
| Record class and purpose | Separate research evidence, operational observation, derived estimate and simulated example | OSDR access rules; existing Q007/Q012 |
| Subject namespace and subject kind | A study participant, a tissue sample and a cabin location are different subjects | OSDR human-query limitations; existing Q003/Q004 |
| Mission/analog setting and phase | Preflight, flight, bed rest and recovery are different conditions | OSDR metadata; existing Q011 |
| Source accession, file hash and row/member locator | Recover the exact source behind a displayed value | Collection manifests; existing Q001 |
| Original variable name, value and unit | Preserve meaning even when a transformation is questionable | CBC hemoglobin percent-versus-g/dL conflict |
| Proposed canonical code, unit and mapping version | Make normalization reviewable and reversible | FHIR/UCUM references; no unverified code assignment |
| Acquisition device, firmware, assay and method | Method changes can create apparent trends | E004/E005; laboratory tables |
| Observed time or interval | Specify when a measurement describes the subject | FHIR Observation effective time |
| Original time label, anchor and precision | L-3 or R+194 is not itself a UTC timestamp | Existing Q011 |
| Device tick/epoch, session and clock state | Detect resets and avoid misaligned streams | E005 |
| Issued, received and stored times | Distinguish delayed results from fresh acquisition | FHIR issue time; E010/E011 |
| Value-presence reason and quality flags | Missing, unsupported, disconnected and invalid are different states | E009; failed XLSX responses |
| Consent, sensitivity and permitted purpose | Operational care and research permissions differ | NASA privacy requirements; existing Roles and Q012 |
| Derivation inputs and algorithm/version | Show which measurements and method produced an estimate | FHIR provenance; proposed implementation rule |

Do not infer that a public research pseudonym is the identity of a known astronaut. Store researcher-supplied labels within their study namespace. No cross-study identity linkage is proposed.

## Type-specific requirements

| Type | Additional information | Reject or limit use when |
| --- | --- | --- |
| Scalar vital sign | Measurement site, posture/activity, device association, original unit, method and quality | Unit is missing or signal quality cannot support the intended interpretation |
| Laboratory result | Specimen ID/type, collection time, result time, analyte, assay/platform, qualifier, reference interval provenance | Values from incompatible assays or specimen types are merged; a label conflicts with the submitted unit |
| Waveform | Object checksum, channels, sample encoding, rate/period, calibration, sample count, start anchor, gap intervals | Sample count or clock continuity is inconsistent; receipt time is substituted for every sample time |
| Sleep estimate | Device/raw epoch length, scoring algorithm/version, sleep opportunity interval, valid-wear coverage and diary context | Time in bed is silently treated as measured sleep; medication context is lost |
| Cognitive task | Task/version, session, trial/result grain, practice history, score definition and normative reference | Practice effects or group averages are treated as personal decline |
| Questionnaire | Instrument/version, question IDs, response vocabulary, recall period, completeness and privacy scope | Missing answers are scored as zero or sensitive content enters a general command view |
| Image/scan | Study/series identifiers, modality, body site, acquisition protocol, object locator and derived-report linkage | Image availability is mistaken for a validated automated diagnostic method |
| Cabin measurement | Sensor location, physical quantity/unit, pressure where conversion requires it, averaging window and coverage | Cabin measurement is assigned to a crew member without location/time context |
| Radiation | Absorbed dose versus equivalent/effective dose, instrument, integration window, geometry/shielding and model | Flux or instrument dose rate is compared directly with the career effective-dose requirement |
| Task/exercise event | Assigned role over time, planned versus actual activity, equipment, duration/load, interruptions and approval | Job title alone is used to infer exposure or a completed exercise session is called a bone-density reading |
| Decision/evidence packet | Input revisions, applicable requirement/version, computed result, uncertainty, authorized next step and reviewer state | An LLM-generated explanation becomes the medical authority or sends private data without release policy |

These records can share identifiers while keeping waveform/image objects outside ordinary scalar rows. One database need not contain every raw research file. The evidence repository, approved onboard evidence pack and operational health records serve different purposes.

## Concrete acceptance cases for later implementation

1. **CBC unit disagreement:** preserve both source representations; quarantine the normalized field for review. No automatic percent-to-g/dL conversion exists here.
2. **Sensor clock reset:** start a new clock segment; preserve raw ticks and receipt time. Mark UTC unknown until a reliable anchor is established.
3. **No precise HR sample timestamp:** retain the available session/receipt information and declared precision. Do not manufacture beat-level timestamps.
4. **HTML returned for XLSX:** keep a failed-attempt record; exclude it from acquired measurement counts. HTTP 200 is insufficient.
5. **Duplicate upload:** recognize the same source checksum and source record key. Preserve corrections as new revisions when the content changes.
6. **Disconnected medical packet:** distinguish locally prepared, approved for release, queued, transported, application-received and clinically reviewed. Exact protocol and access policy remain design work.
7. **Unrelated cohorts:** a bedside waveform, an isolation-analog cognitive score and a flight laboratory result must not be joined into a fictional real participant.
8. **Unapproved interpretation:** show source and data-quality state; withhold unsupported diagnosis, drug advice or autonomous clearance.

## Architecture decision still open

The evidence supports separating acquisition adapters, validation, provenance, clinical observations, large signal objects, evidence retrieval, workflow authority and synchronization. It does not yet select a database vendor, API framework, LLM, fine-tuning strategy, device model or crew screen size. Those choices need actual workload measurements, a defined mission scenario, source rights and human review. The next deliverable should convert these notes into reviewed field mappings and a workflow comparison before physical schema work.
