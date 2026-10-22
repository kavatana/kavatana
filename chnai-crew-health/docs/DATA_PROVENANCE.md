# OSD-569 research import

Verified 21 October 2026. This is a separate research-inspection workspace, not an operational astronaut medical record or a continuous device stream.

## Original source

NASA Open Science Data Repository, [OSD-569](https://osdr.nasa.gov/bio/repo/data/studies/OSD-569). These files describe a short-duration mission research cohort. They cannot establish long-duration mission clinical thresholds or train a reliable medical decision model on their own.

The two original CSVs were recovered from the team's previously retained research package. Their complete bytes match the earlier recorded SHA-256 values. The prototype bundles those exact bytes, including the transformed file's UTF-8 BOM; no participant record was modified or relabeled as a fictional crew member.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| LSDS-7_Complete_Blood_Count_CBC.upload_SUBMITTED.csv | 26,138 | 10a878b009eb2ea11a13fe92ad698098858639e8ed02f5ee849431313b9457d3 |
| LSDS-7_Complete_Blood_Count_CBC_TRANSFORMED.csv | 9,317 | 32e4f9c97d3b636b5d5c2e72dab8c4d3319dee64c437508b092dad04603b2b8f |

Original download references:

- https://osdr.nasa.gov/geode-py/ws/studies/OSD-569/download?source=datamanager&file=LSDS-7_Complete_Blood_Count_CBC.upload_SUBMITTED.csv
- https://osdr.nasa.gov/geode-py/ws/studies/OSD-569/download?source=datamanager&file=LSDS-7_Complete_Blood_Count_CBC_TRANSFORMED.csv

These are provenance references, not a live-device API contract. Browser loading reads bundled copies; it does not revalidate the current NASA endpoint. A digest verifies consistency with our retained bytes, not clinical validity or a NASA digital signature.

## Accepted representation and quality decisions

- 553 submitted analyte rows, 23 distinct source analyte labels, four public research IDs.
- 28 overlapping wide rows, 61 columns. They are not 28 additional specimens or people.
- Original relative times, raw values/units, source intervals, row numbers and filenames remain attached to every accepted row.
- 28 hemoglobin entries have `g/dL` in the submitted representation and a percent-labeled transformed column. Cross-file normalization is quarantined. The importer retains submitted values and does not decide which representation is clinically correct.
- No submitted rows failed the implemented structural checks. This is not a general assurance that every source field is valid.
- Fixed source checksums are required before parsing. Changed or missing bytes stop the import; general arbitrary-file upload is not implemented.
- `RESEARCH:OSD-569` is separate from `SIM-CHNAI-01`. No join, common person key, production clinical alert or training pipeline is created.
- Charts show discrete observations at categorical mission-relative labels. Horizontal spacing does not represent elapsed time. Missing combinations stay empty.
- Published source intervals remain metadata; they are not transferred into crew health rules. No immune score or diagnosis is calculated.

## Attribution and reuse

Keep the study and original filenames linked to any derivative output. Consult the OSDR study's publications, contributor attribution and reuse terms before broader redistribution or model training. The repository's MIT license applies to CHNAI-authored code; it does not relicense contributed research files. This release retains the existing private Site audience.

## Adapter boundary for the next backend

The importer should eventually emit an acquisition manifest, immutable raw-object reference, parser version, normalized observation candidate and quality issues in one explicit ingestion job. An operational adapter additionally needs a verified device/subject binding, specimen or session ID, method/unit mapping, acquisition and observation time bases, deduplication key, calibration/quality context and scoped authorization. None of those can be inferred merely because a CSV was hosted by NASA.

## Public source release check — 22 October 2026

The retained OSD-569 file manifest marks both bundled CBC CSVs `restricted: false` and `visible: true`; this is preserved in `data/catalog/osd-569-public-files.json`. Controlled-access sequence files are not included. The files remain public research observations, with no linkage to the fictional crew identities.

NASA's [OSDR terms, Data Redistribution section](https://science.nasa.gov/reference/osdr-help-terms-and-conditions/) routes redistribution through its Science Information Policy and requests study citations. The [OSDR FAQ](https://science.nasa.gov/reference/osdr-faq/) distinguishes publicly accessible processed astronaut data from controlled-access sequence data. These checks support retaining the two public CSVs for reproducible research parsing; they do not relicense all OSDR material as MIT.

Dataset: NASA Open Science Data Repository, **OSD-569**, *Whole Blood Measurements from the SpaceX Inspiration4 Mission (RNA-seq, epitranscriptome, WGS, clonal hematopoiesis, CBC)*. [Study and contributor/citation record](https://osdr.nasa.gov/bio/repo/data/studies/OSD-569). The exact retained bytes are identified above; the current full study version is not inferred from those checksums. Research data are credited to their contributors through NASA OSDR.

The private hosted demonstration retains its audience. The GitHub export is project source in the user-designated public repository; it excludes private research archives, local databases, virtual environments, credentials and the Site hosting binding.
