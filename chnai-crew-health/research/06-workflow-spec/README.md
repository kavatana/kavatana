> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB - MVP workflow specification

20 October 2026 | v0.1 | Proposed and untested

This package turns the architecture recommendation into one reviewable workflow. It does not implement the challenge product.

## Start here

- Team lead: report pages 1, 5 and 19.
- Health/life-science reviewer: scenario and applicability on pages 2-4; evidence cases on pages 13-14.
- Software engineer: data and transaction boundaries on pages 6-10; case catalogue on pages 13-16.
- AI/data engineer: evidence and numerical boundary on pages 3-4; bounded AI and qualification on pages 11 and 17.
- Both engineers: planned implementation sequence on page 18.

[Open the report]([private archive link omitted])

[Open folder 10]([private archive link omitted])

## What is specified

- SC01: a simulated personal aerobic-capacity comparison, followed by an onboard review request, accountable follow-up and an optional delayed ground handoff.
- Exact comparison semantics, baseline/method applicability, unit/time/provenance requirements and uncertainty handling.
- Separate data-quality, comparison, episode and handoff states.
- Role/purpose boundaries, durable transactions, retry behavior and correction handling, including in-flight packets.
- A bounded AI explanation task with a deterministic fallback.
- Five task views described as interaction requirements, without a built UI.
- 32 qualification cases with expected outcomes, mapped to the existing acceptance baseline.
- A staged plan for the software-duty and AI/data-duty engineers.

## What is real and what remains proposed

The NASA criterion is source-backed. The scenario, numerical examples, contracts, permissions, test cases and implementation sequence are team-authored proposals. The numerical examples are simulated, not astronaut observations. No dataset has been newly acquired for operational ingestion in this milestone.

Three official NASA pages were read again. The standard PDF reference remains the earlier retained source. The current Space Apps challenge and participant FAQ returned 502 errors, so this pass does not reconfirm eligibility or new resources. The existing 28 October and 13 November checks remain the follow-up points.

All 32 application cases are **Not run**. Only document-reference consistency, illustrative decimal arithmetic, PDF layout and package integrity were checked. No hardware measurement, model benchmark, clinical validation or production claim is made.

Prior preparation restrictions remain the working constraint. This is research/specification material; its eligibility for reuse in a submission has not been certified. Do not treat it as permission to begin early product implementation.

## Contents

- `output/pdf/`: reviewed 20-page report.
- `documents/`: 20 editable Markdown chapters.
- `qualification_cases.json`: non-executable case descriptions and expected outcomes.
- `specification_pages.json`: editable report content.
- `sources/`: source register and readable retrieval evidence, with failed current-page retrieval retained.
- `analysis/`: frozen baseline input, traceability subset and document checks.
- `build_specification.py`: research-report authoring script, not application code.
- `SHA256SUMS.json`: hashes for all other packaged files.

The authoring script needs Python, ReportLab and the DejaVu Sans font files used in this environment. Its frozen baseline fallback is included. It is not necessary to run the script to read the PDF, Markdown or JSON.

## Remaining gates

Full challenge and eligibility reconciliation; a qualified review of the episode; actual host/client inventory and benchmarks; evidence-release review; AI qualification; protected/public deployment separation. The 84 requirements and 58 acceptance cases in the prior baseline remain unchanged. The 32 cases here refine that baseline; they are not 32 additional validated capabilities.
