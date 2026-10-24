> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# A build sequence for two engineers

Planning order only. Begin implementation when event rules permit.

| Stage | Software-duty owner | AI/data-duty owner | Exit evidence |
| --- | --- | --- | --- |
| 1. Prove the record | Ingest status, durable records, typed boundaries and revision handling. | Review quantity/method dictionary and exact expected comparisons. | WQ01-16; retrievable provenance. |
| 2. Finish onboard action | Crew review, request, assignment/follow-up and resume. | Deterministic explanation, evidence release and AI input projection. | One complete onboard path without AI or Earth. |
| 3. Add bounded AI | Job status, timeout/fallback and validated rendering. | Model/template comparison; fact/citation/overreach checks. | WQ27-30; quality and runtime report. |
| 4. Prove handoff | Immutable packet/outbox, simulated receiver and separate receipt/review. | Minimal authorized summary and correction examples. | WQ17-26; no silent stale release. |
| 5. Qualify demo | Public simulation isolation, restart/recovery and signed-out links. | Evidence labels, limitations and reproducible evaluation notes. | WQ31-32; release checklist reviewed. |

Both engineers integrate against the same semantic contracts. The API owns domain writes and permission checks; the web renders state; the AI module produces bounded drafts; data/evidence modules own mappings and releases. Keep a single repository with explicit ownership as already proposed in folder 09.

Protect the complete path by deferring optional live BLE, multi-host writes, fine-tuning, a general medical chatbot and unrelated health workflows until their evidence and qualification are available. Large research archives remain source material; only the reviewed episode release enters runtime.

There is no defensible fixed implementation-hour estimate before confirming team capacity and hardware. If a stage fails its exit, reduce optional scope; do not hide the failure by marking a feature complete.

Evidence and cross-references: ADR01-18; code ownership register; RQ03, RQ27, RQ45, RQ56, RQ81-84. Proposed engineering plan.
