> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# AI, automation and decision ownership

## Useful automation

Automate routine acquisition, structural validation, quality checks, exact deterministic comparisons, event correlation within reviewed limits, draft summaries and transport retry. Keep visible gaps, freshness and provenance. The system should reduce transcription and navigation while leaving clinical responsibility explicit. [N03, P02]

## Bounded LLM role

An optional local model rephrases authorized structured facts and approved evidence into a short explanation. It does not compute the official ratio, assign clinical severity, select treatment, clear an EVA, change a record or authorize a release. Validate schema, numbers, units, missing-context statements and citation IDs. Reject late or stale responses; show a deterministic template.

## Privacy and prompt boundaries

Retrieve only evidence authorized for the selected subject/purpose. Source text and uploaded notes are untrusted data. Never let an embedded instruction alter system rules or invoke tools. Do not send real medical data to a cloud model by default. The public demo remains synthetic and its role switcher is not an authentication system.

## Model qualification remains pending

Qwen3.5-4B via a suitable local runtime is a candidate from the previous milestone, not a downloaded or benchmarked selection. The 18GB M3 Pro must be measured with the whole app. No fine-tuning is justified yet: no approved training corpus, target error analysis or demonstrated gain exists. Keep the prior 40-case model evaluation protocol and its development/holdout cautions. [P03]

## No hidden dependency on AI

The review workflow must remain functional if model loading fails, memory pressure rises or inference times out. Auto-retry may be bounded, but cannot repeatedly block the crew. Optional AI status belongs in system state, while deterministic evidence remains accessible in the main task.
