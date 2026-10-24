> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Research data and device qualification

## Three kinds of test data

Use retained research bytes to test parsing and preservation. Use fictional operational records to test actor/workflow logic. Use synthetic transport packets to test ordering and failure behavior. A permitted real Earth-device capture can later test one actual adapter. These serve different purposes and must keep their own namespaces and labels.

## CBC mapping

The retained submitted OSD-569 CBC has 553 analyte rows, four pseudonymous source subjects, raw units and relative collection labels. Map ANALYTE, VALUE, UNITS and TEST_DATE without dropping original strings. RANGE_MIN/RANGE_MAX belong to source lab context, not universal astronaut thresholds. The submitted/transformed hemoglobin unit conflict is an intentional quarantine test. [N05; retained_data_manifest.json]

## Exercise mapping

ACTES contains 52,062 measurement rows across 18 source participants aged 12-18 in the retained metadata. Preserve ID, time, RR, VO2 and power. RR is an interbeat interval; 1,148 rows are missing it in the earlier profile. Do not assign these youth records to fictional astronauts or use ordinary oxygen uptake as a completed capacity assessment. The unresolved scale interpretation remains blocked. [D01]

## Signal mapping

The retained Sleep-EDF pair tests multi-channel signal parsing and timed annotation preservation. Keep original headers, digital/physical calibration, channel units and recording intervals. A parser passing one terrestrial PSG record proves neither astronaut sleep inference nor clinical performance. The manifest gives exact retained byte hashes; the large files are not duplicated in this handoff. [D02]

## Flight versus commercial interfaces

CSA describes Bio-Monitor's garment, headband, tablet and docking transfer to the station communication system. That description does not establish an accessible flight API for us. Hexoskin documents commercial authenticated REST/export routes. Polar documents a separate native SDK. No flight credentials, live crew feed or actual device capture has been obtained. [C01-C03]

## Optional live hardware gate

Before A07 is called working: pin exact model, firmware, SDK version and allowed data use; capture permitted bytes; verify channels, units, sampling/timestamps, reset behavior, contact quality and local buffering; compare captured values with the device output; test reconnect and denial paths. Native mobile SDK integration may need a gateway. A browser app does not automatically gain SDK capabilities.

## Additional domains

EDA and RadLab are research context paths, not guarantees of live operational data. Imaging, cognition, behavioral questionnaires and bone measures need their own methods, rights, acquisition formats and clinical review. Existing sources are cataloged; unresolved access remains visible rather than being replaced by invented APIs or generated medical truth. [N04, N06, N07]
