> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Commit boundaries and recovery

One local service owns writes; long work happens outside the transaction.

| Boundary | Atomic domain result | Failure behavior |
| --- | --- | --- |
| Accept batch | Batch identity + durable job + idempotency result | No success acknowledgment before durable commit; exact retry returns the recorded result. |
| Publish finding | Finding + exact dependencies + episode notification intent | A changed input causes stale/recompute behavior; no half-linked visible result. |
| Request action | Action + follow-up/assignment state + audit + new episode revision | Expected revision prevents stale authorization; repeated same command does not duplicate the task. |
| Correct record | New revision + invalidations + affected packet hold + audit | Do not silently overwrite. In-flight transfers remain outcome-unknown until resolved. |
| Release handoff | Immutable approved payload + outbox intent + audit | Source/draft revision and policy checked together; sender rechecks held/revoked state. |

Source-object publication and SQL commit are not a single transaction. A staged file becomes usable only after size/hash validation and qualified durable publication. Recovery reconciles staged files, orphaned objects and missing referenced bytes. A missing object blocks interpretation.

Workers use bounded jobs with durable inputs, attempt limits, leases and idempotent result identity. Inference and transfer cannot hold a database write transaction. Lease expiry must not allow a stale worker to publish over a newer job generation.

Backup must pair a consistent database snapshot with referenced immutable objects and evidence versions. Verify restore and actual linked SQLite configuration before claiming durability; document tests in the existing architecture gates.

Evidence and cross-references: ADR05, ADR09, ADR15; contract/storage notes in folder 09. RQ62-67; AC16, AC19, AC32, AC42, AC45-48.
