> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# The evidence that changed the design

02 / Verified findings

The recovered Sleep-EDF session is complete: the PSG and its annotation companion match publisher checksums. The files exercise different channel rates, calibration metadata, local time and annotation-only EDF+ records. They are Earth sleep data, not astronaut sleep telemetry.

The ACTES cycle files contain 52,062 measurement rows for 18 youth athletes, ages 12-18. There are 1,148 missing R-R interval entries and an unresolved oxygen-consumption unit-scale question. These are useful engineering fixtures, not adult astronaut reference values.

The Inspiration4 submitted CBC file contains 553 rows, four participants and seven relative collection labels. The transformed hemoglobin column is named as a percentage while the submitted analyte uses g/dL. The correct response is to block the mapping and preserve both versions.

The larger treadmill dataset is held at the rights gate. Its current license presentation and bundled license file disagree. No measurement download was made from that candidate. More bytes would not compensate for unclear permitted use.

- RR means interbeat interval in ACTES but breathing rate in the treadmill metadata. Field names alone cannot define the schema.
- OSD-195 and OSD-198 describe related PlanHab work; they must not be counted as two independent 14-person cohorts.
- Failed HERA supplements returned HTML and remain rejected downloads.

Evidence / cross-references: R001; R002; R015-R018; R020; OSD-569; OSD-195; OSD-198
