> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Transactions, corrections and delayed transfer

## Ingest transaction

Publish verified bytes to an internal object key before marking the object ready. Stage and hash first, then atomically rename on the same filesystem. Commit source metadata, batch identity, record accounting and durable work intent. Recovery scans staging and unreferenced objects conservatively. A crash must not leave a ready registry row pointing to absent bytes.

## Correction transaction

Authorize the actor and validate expected observation version. Append a new immutable revision, advance the current pointer, mark dependent findings and drafts stale, create reevaluation work and append audit in one database transaction. Existing released packets remain historical. An already transmitted packet cannot be recalled by editing the local database.

## Review transaction

Authorize subject and purpose. Check the finding and episode version. Commit the human action, next actor, follow-up, audit and command_receipt together. Require a due time or named trigger. API13 accepts exactly one discriminator: local episode/version creates an action_record; packet ID/hash creates a clinical_review. A network timeout means unconfirmed: reconcile the same idempotency key before another action.

## Release transaction

Recheck relationship, destination and field allowlist at release, not only at preview. Require the exact preview hash and draft version. Publish immutable packet bytes, then commit released packet, revision membership, queued send intent and audit atomically. If inputs changed or permissions were revoked, deny release or require a new preview. All unchanged retries use the same packet/hash.

## Leases and receipts

Workers acquire durable leases with fencing tokens. An expired worker cannot commit after another worker takes over. Delivery is at least once; the receiver deduplicates by packet ID and hash. Transport acknowledgement and clinical review are separate records. Follow-up remains pending after receipt unless an authorized human records the required outcome.

## Offline states

Earth disconnected: local acquisition/review continues and approved packets queue. LAN disconnected: a tablet cannot assume a write succeeded; show unconfirmed/stale and reconcile. Local node down: no new authoritative saves; cached content is visibly stale. Model unavailable: deterministic facts and explanation remain available. These are four different product states.

## Recovery and backups

Use consistent SQLite snapshot/backup procedures with referenced immutable objects and manifest hashes. Do not copy a changing .db file alone or sync live DB/WAL through Drive. Restore into an isolated directory and verify database integrity, referenced objects, pending jobs and responsibility ownership before reopening service. Check the linked SQLite version and applicable WAL fixes during qualification. [T02, P03]
