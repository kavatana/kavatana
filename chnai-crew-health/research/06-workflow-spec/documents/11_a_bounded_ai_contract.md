> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# A bounded AI contract

Compare the model with a deterministic explanation, not with no explanation.

## Input projection

Only accepted, authorized facts: finding revision, precomputed values and units, applicability result, missing-context flags, approved evidence section IDs, current episode state and server-provided allowed support actions. No unrestricted database access, web retrieval or raw research instructions.

## Output projection

A short explanation tied to approved fact IDs; supported citation IDs; missing-information questions from the allowed categories; optional draft wording for an allowed action. Render numerical facts from validated server values so the model cannot silently recalculate or change them.

| Reject or fall back when | Required result |
| --- | --- |
| Wrong subject/revision or superseded input | Discard the draft; request a fresh authorized job. |
| Unknown citation, altered quantity or unsupported claim | Keep the deterministic explanation; record the failure class. |
| Treatment, clearance, export or unauthorized tool request | No execution. Preserve the safe review path. |
| Invalid output, timeout, unavailable model or overload | Core review and actions remain available; show AI status separately. |
| Injected instructions in a note or evidence text | Treat as data, not authority; no permission or destination changes. |

An allowlisted JSON shape does not prove clinical factuality. Keep citations resolvable, perform semantic review during qualification and use the deterministic path whenever validation is insufficient. Raw generated tokens should not appear as verified facts before validation.

First candidate: Qwen3.5-4B via llama.cpp, compared with templates on the same cases. Fine-tuning remains deferred: there is no approved training set or evidence that it improves the selected task.

Evidence and cross-references: ADR10-12; RQ41-48; AC33-40; G08-G09. No model evaluation has run.
