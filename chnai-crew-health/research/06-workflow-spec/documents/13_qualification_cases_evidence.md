> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Qualification cases: evidence

Eight case specifications. Execution status: Not run.

| ID / case | Setup | Required outcome |
| --- | --- | --- |
| WQ01 Comparable success | B=50.0, F=39.0; all applicability gates accepted. | 78%; below criterion; one review episode; no diagnosis. |
| WQ02 Exact boundary | B=50, F=40.0. | 80%; meets this criterion only; no healthy/clearance claim. |
| WQ03 Rounding below | B=50, F=39.995. | 79.99%; below even if a rounded badge would show 80. |
| WQ04 Rounding above | B=50, F=40.005. | 80.01%; meets this comparison; original precision retained. |
| WQ05 Absent baseline | Follow-up exists; baseline missing. | Not evaluable; missing-baseline reason; no inferred ratio. |
| WQ06 Invalid numeric input | B=0, negative capacity, NaN or infinity. | Quality rejection/quarantine; no ratio or silent zero substitution. |
| WQ07 Quantity mismatch | Absolute L/min compared to mass-normalized mL/min/kg. | Block until reviewed mapping/context; no guessed mass. |
| WQ08 Method mismatch | Different protocol versions without reviewed equivalence. | Not evaluable/review required; method reason retained. |

Retain the exact input revisions, environment/build, observed output, pass/fail result, fault timing and reviewer note when executed. These documentary expectations are not passing test results. Cases are refinements of the existing acceptance baseline, not replacements.

Baseline mapping: WQ01: AC02; AC22 | WQ02: AC22 | WQ03: AC22; AC34 | WQ04: AC22; AC34 | WQ05: AC22 | WQ06: AC14; AC55 | WQ07: AC11; AC22 | WQ08: AC11

Evidence and cross-references: RQ03, RQ17-18, RQ21, RQ24, RQ34-46, RQ53, RQ62-66, RQ78, RQ84. Full catalogue: qualification_cases.json.
