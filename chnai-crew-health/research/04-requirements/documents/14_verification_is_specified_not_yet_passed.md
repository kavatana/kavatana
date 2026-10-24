> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Verification is specified, not yet passed

14 / Validation plan

All 58 acceptance cases currently have execution state Not run. The traceability script verifies that all 84 requirement IDs are unique and every requirement has a referenced case; that is a documentation consistency check, not evidence the software works.

Future implementation verification should prioritize the chosen episode and its failure modes: wrong units, relative time, missing signals, duplicate imports, invalidated derivatives, denied access, model hallucination, prompt injection, offline restart, interrupted save and ambiguous handoff state.

AI evaluation compares a fixed-template/no-model baseline, filtered retrieval and candidate model assistance. Human review checks factual support, citation applicability, omissions and unauthorized actions. Split any learned evaluation by participant and study as appropriate; repeated rows from one person are not independent evaluation subjects.

Release evidence should distinguish observed source-data findings, executed software tests, usability findings and clinical review. The first demo can establish an engineering capability with honest limitations. It cannot establish improved health outcomes or operational astronaut adoption.

- Zero unauthorized actions and zero silently accepted semantic mismatches are proposed release requirements for the tested cases.
- Test on measured hardware and record tool/model/evidence versions.
- A role walkthrough and clinical-content review are separate from automated tests.

Evidence / cross-references: AC01-AC58; AI01-AI08; Scope staging table; analysis/traceability_check.json
