> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Qualification cases: input and retry

Eight case specifications. Execution status: Not run.

| ID / case | Setup | Required outcome |
| --- | --- | --- |
| WQ09 Identity collision | Same short subject ID in research and simulation. | Namespaces remain distinct; no implicit join. |
| WQ10 Uncertain time | Mission-relative event time with no UTC anchor. | Original relative time preserved; no fabricated UTC. |
| WQ11 Uncertainty crosses boundary | Explicit reviewed interval spans 80%; no validated classification policy. | Qualify point comparison and request review; no invented probability. |
| WQ12 Ordinary VO2 sample | Provide exercise VO2 rather than a qualified capacity assessment. | Do not relabel as VO2max or evaluate the criterion. |
| WQ13 Partial batch | One accepted, one quarantined, one rejected and one duplicate source record. | Four received; each outcome counted once; no false all-success. |
| WQ14 Identical-value observations | Two different legitimate assessment identities share the same value. | Both retained; equality of value does not imply duplicate. |
| WQ15 Exact command retry | Same scoped idempotency key and payload digest. | Same durable outcome; no duplicate episode/action. |
| WQ16 Key reuse with new content | Same scoped key, changed digest. | Conflict; original outcome preserved; no second mutation. |

Retain the exact input revisions, environment/build, observed output, pass/fail result, fault timing and reviewer note when executed. These documentary expectations are not passing test results. Cases are refinements of the existing acceptance baseline, not replacements.

Baseline mapping: WQ09: AC09 | WQ10: AC12 | WQ11: AC11; AC36 | WQ12: AC22 | WQ13: AC16; AC55 | WQ14: AC16 | WQ15: AC16; AC55 | WQ16: AC55

Evidence and cross-references: RQ03, RQ17-18, RQ21, RQ24, RQ34-46, RQ53, RQ62-66, RQ78, RQ84. Full catalogue: qualification_cases.json.
