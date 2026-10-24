> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Seed fixtures and acceptance strategy

## Fictional cohort

Six fictional crew subjects, eight fictional human actors and one service principal support self, onboard-review, ground-review and technical roles. Eleven completed-assessment fixture records include normal-comparison arithmetic, missing baseline, unit mismatch and exact-boundary scenarios. No age, sex or real-person identity is needed. Values are deliberate engineering inputs, not validated physiological simulations.

## Primary scenario

SIM-C03 has baseline 50 and current 39 mL/min/kg under a fictional comparable assessment method. Arithmetic gives 78% of baseline, below the 80% relative reference. The output is a demo comparison and request for review, not diagnosis, treatment or fitness-for-duty clearance. Unknown measurement uncertainty remains visible. Real clinical use needs an approved uncertainty/comparability policy. [N01, P02]

## Boundary cases

DEV01-12 isolate below, equal, just below, just above, absent/zero baseline, missing value, wrong quantity, incompatible method, unknown unit, wrong subject and unreviewed uncertainty policy. Compare exact decimals before display rounding. DEV03 is 79.99%, even if a coarse display would round it to 80%.

## Failure and integration cases

DEV13-20 cover real-source defects and transport faults. DEV21-32 cover crashes, corrections, stale work, privacy, release races, delayed transport, retries, LAN loss, expired leases and disk failure. DEV33-36 cover optional model failure, altered facts, untrusted-source instructions and recovery of pending responsibility. Each card has expected behavior and an empty observed-result/evidence field.

## What has been checked

Document checks verify field uniqueness, foreign-key target existence, unique case IDs, seed subject references, explicit fictional labels and four independent Decimal arithmetic oracles. Retained-data manifests hash six local research files. These checks do not execute foreign-key enforcement, an API, real device, UI, model or SQLite transaction.

## Future execution order

After eligibility and clinical scope review: implement and run pure comparison/contract cases; then database migration and transaction cases; then API/authorization cases; then UI and offline end-to-end cases; finally optional device and model tests. Record commit, environment, fixture version/hash, actual result, evidence file and reviewer for every executed test. A written expectation never becomes Pass by default.

## Performance qualification

Existing proposed G06 uses 60 scalar samples/s for 30 minutes and 600/s for 60 seconds. These are stress-test proposals, not a flight sensor rate or proven capacity. G07 review-load p95 target and G09 model deadline remain separate. Measure UI latency while ingestion and optional model work run together on the actual M3 Pro 18GB. Record memory pressure, throughput, queue depth, retries and failures.
