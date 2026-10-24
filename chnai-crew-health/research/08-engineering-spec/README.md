> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI Engineering Handoff v0.2

21 October 2026. Development specification and test fixtures; application not implemented.

Start with the PDF for the design narrative and diagrams. Use the Excel / Google Sheets workbook for field-level work and review. Machine-readable JSON and CSV files carry the same proposed schema and case definitions.

- Proposed schema: 42 tables, 371 columns, 87 foreign-key references. Three tables are future modality/context extensions.
- Interface/API: 12 task views, 16 operation contracts and 12 code/data ownership boundaries.
- Inputs: 17 indicator groups and 10 adapter paths, with evidence and access limits.
- Fictional seed material: 6 crew, 9 principals, 11 assessment records, an end-to-end timeline and synthetic transport packets.
- Testing: 36 development case specifications. All application results are Not run. The separate earlier 40 AI case cards are not merged into this count.
- Diagrams: editable Mermaid and rendered SVG files, also included in the PDF.

NASA sources inform mission, human-factors and health constraints. The software schema, fixture cohort, role grants and implementation choices are CHNAI proposals. Research subjects are never relabeled as astronauts. No live flight API has been established.

`retained_data_manifest.json` fingerprints six already retained research files without duplicating the large raw data. `verification/document_checks.json` records document/fixture integrity checks only. `build_spec_data.py`, `build_docs.py`, and report/workbook builders author this package; they are not application code.

Review the full event rules and challenge details before implementation. Clinical review, hardware/model qualification, migrations, app development and executed end-to-end tests remain outstanding.
