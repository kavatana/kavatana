> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB - validation handoff

20 October 2026 | v0.1 | Research preparation; no application or Mac benchmark completed

## Start here

The next decision is whether the proposed episode and local AI deserve implementation. This package makes the evidence needed for that decision explicit.

| Work | Ready now | Still requires a person or device |
| --- | --- | --- |
| Health review, G03 | Three-page review brief, editable response form and boundary cases | A reviewer with relevant expertise; no review has occurred |
| Hardware, G02/G09 | Read-only Mac inventory script and staged qualification procedure | Run on the actual M3 Pro Mac; model/runtime artifacts and performance remain unqualified |
| AI quality, G08 | 40 distinct synthetic case cards, scoring rules and development/holdout split | Freeze reviewed expected outcomes, implement the permitted experiment, execute and score |
| Eligibility, G01 | Dated access log and a precise clarification question | Central rules/full challenge and, where necessary, organizer confirmation |

## First action on the Mac

Extract this ZIP into a folder. Open Terminal, type `cd `, drag the extracted folder into Terminal, then press Return. Run:

```bash
/bin/bash mac_inventory.sh
```

It writes one `inventory.txt` inside a new `chnai-mac-check-*` folder. Send that text file back. It uses built-in read-only commands, downloads nothing and does not need an administrator password. The script writes its result locally; it sends nothing. It is an inventory, not an AI benchmark. We checked shell syntax and the non-Mac refusal here; execution on macOS remains untested.

The event's preparation boundary is still unresolved. The inventory is general machine information. Hold project-specific runtime experiments and implementation until their timing is permitted. See `RULES_STATUS.md` for the evidence and question; calling something research does not establish eligibility.

## Files

- `output/pdf/CHNAI_Health_Review_Brief.pdf`: three-page brief to give a prospective reviewer.
- `HEALTH_REVIEW_RESPONSE.md`: editable response; records expertise, changes, evidence and scope. All responses are blank.
- `MAC_QUALIFICATION.md`: exact distinction between inventory, inference microbenchmark and full-workflow qualification.
- `mac_inventory.sh`: local inventory only; no model, server or project implementation.
- `MODEL_EVALUATION.md` and `model_case_cards.json`: 40 designed cases, no outputs and no test passes.
- `qualification_record.json`: blank record for future measurements and decision evidence.
- `RULES_STATUS.md`: current retrieval limitations and the unresolved preparation boundary.
- `sources.json`: small primary-source register and relevant internal baseline references. These are references, not new datasets.
- `SHA256SUMS.json`: portable package integrity manifest.

## Decision after evidence arrives

1. Resolve the health review's required changes. A student or life-science review is preliminary; it is not clinical authorization or NASA approval.
2. Record the real host inventory. Select and hash a traceable model artifact and runtime only when the experiment is permitted.
3. Keep the architecture conditional until actual resource, quality, authorization and recovery tests are complete. A successful inventory or fast token benchmark passes none of those gates by itself.
4. Use deterministic explanations if the optional model fails qualification. Keep unmeasured health domains visibly Not assessed.

Existing architecture, requirements and workflow reports remain the baseline. This package does not change their gates to Passed. G11 is the optional real-device adapter gate; G05 covers durability/recovery.

No reviewer or organizer has been contacted. No model has been downloaded, installed, trained or run on the user's Mac. No real crew medical data is included.
