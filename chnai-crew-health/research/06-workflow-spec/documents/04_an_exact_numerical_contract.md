> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# An exact numerical contract

Only the deterministic calculation owns the comparison.

Proposed calculation ID: aerobic-relative-v1. Let B be a strictly positive, comparable personal baseline and F the accepted follow-up value in the same canonical quantity and unit. Compute the retained fraction F/B. Evaluate the boundary using F >= 0.80 x B before presentation rounding.

Illustrative simulated values: B = 50.0 and F = 39.0 mL/min/kg yield 78% of baseline. The display reports that comparison and requests review; it does not infer a diagnosis or severity. These numbers are invented test examples, not NASA observations.

| Example, B = 50 | Arithmetic expectation | Interpretation boundary |
| --- | --- | --- |
| F = 40.0 | 80%; criterion met for this comparison | No overall healthy / EVA-safe label. |
| F = 39.995 | 79.99%; below boundary | Rounding to 80% must not change the result. |
| F = 40.005 | 80.01%; above boundary | Display precision and decision precision stay separate. |
| B = 0 or missing | Not evaluable | No division, ratio or reassuring fallback. |
| F in L/min; B in mL/min/kg | Not evaluable without reviewed conversion/context | No guessed body mass or unit substitution. |
| Explicit uncertainty crosses the boundary | Point comparison may be shown with qualification | No definitive biological classification; review uncertainty. |

Use canonical decimal values with declared precision while retaining original strings. Reject NaN, infinity and unsupported numeric encodings. For this narrow assessment contract, non-positive capacity values require quality review; zero is not globally treated as missing in other data types.

Three separate outputs: applicability (applicable / not_evaluable / review_required), comparison (below / meets / absent), and review disposition. The last is never inferred from the numerical result alone.

Evidence and cross-references: Source criterion: W01. Calculation, rounding and output contract: CHNAI proposals. RQ18, RQ21, RQ24; AC14, AC22, AC34.
