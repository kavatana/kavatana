> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Qualification cases: concurrency

Eight case specifications. Execution status: Not run.

| ID / case | Setup | Required outcome |
| --- | --- | --- |
| WQ17 Stale action request | Finding corrected after client loaded its revision. | Reject stale transition; show latest review need. |
| WQ18 Correction before send | Released but unsent packet references corrected data. | Packet held; new derivation and human approval required. |
| WQ19 Correction in flight | Correction commits while previously claimed transfer is sending. | Do not promise recall; retain outcome and require approved correction packet. |
| WQ20 Lost acknowledgment | Commit succeeds, connection drops before response. | Retry returns saved identity; UI resolves unknown outcome by read/retry. |
| WQ21 Crash before commit | Kill action handler before durable transaction commit. | No saved acknowledgment; restart yields no partial action/follow-up. |
| WQ22 Expired worker lease | Old worker completes after another worker claims a newer generation. | Stale completion cannot overwrite or publish a new result. |
| WQ23 Permission revoked | Assignment or release permission expires before commit/dispatch. | Deny or hold; preserve audit; no unauthorized export. |
| WQ24 Cross-subject access | Crew A requests crew B by guessed identifier. | Server denies without leaking B's content in errors/events. |

Retain the exact input revisions, environment/build, observed output, pass/fail result, fault timing and reviewer note when executed. These documentary expectations are not passing test results. Cases are refinements of the existing acceptance baseline, not replacements.

Baseline mapping: WQ17: AC19; AC46 | WQ18: AC19; AC32 | WQ19: AC19; AC32 | WQ20: AC45; AC55 | WQ21: AC45 | WQ22: AC37; AC45 | WQ23: AC05; AC31 | WQ24: AC05; AC55

Evidence and cross-references: RQ03, RQ17-18, RQ21, RQ24, RQ34-46, RQ53, RQ62-66, RQ78, RQ84. Full catalogue: qualification_cases.json.
