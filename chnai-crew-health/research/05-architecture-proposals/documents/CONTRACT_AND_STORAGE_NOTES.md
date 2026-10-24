> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Contract and storage invariants

These are implementation requirements for later qualification, not executable product contracts or migrations.

## Envelope and time

Each adapter envelope needs contract version, namespace, source identity/hash, adapter version, device/session/clock segment where applicable, raw timestamp expression, receipt time and record outcome accounting. Preserve event and ingestion time separately. Relative mission labels and unanchored local times remain distinct from UTC. Do not rely on wall-clock ordering alone to identify events.

Use string identifiers, finite enumerated value/state discriminators and explicit unit/quantity identifiers. Reject nonfinite numeric values at the JSON boundary. Preserve censored results as an operator plus a bound, not an ordinary point estimate. Large integer timestamps cross JavaScript JSON as decimal strings. Do not infer a missing quantity or unit from a familiar field name.

For exact scalar quantities, retain raw text and a reviewed canonical decimal representation. Arithmetic belongs to a named deterministic calculation with declared rounding/precision and method applicability. SQL text order is not decimal numeric order. High-rate waveforms can use an appropriate numerical encoding in versioned file chunks, with calibration and transformations recorded.

## Mutation and idempotency

Scope every idempotency key to actor/adapter, namespace, operation and payload digest. A retry with the same key/digest returns the recorded result. The same key with changed content is a conflict. Retain keys long enough for the declared retry/retention horizon. An expired key policy must not silently make an old medical packet appear new.

Require an expected revision for corrections, action authorization and release. Validate it in the same transaction that performs the transition. Record original and new revisions, actor, purpose, reason and applicable policy. A rejected correction must not erase its predecessor. A valid repeated numerical measurement is not a duplicate solely because its value equals an earlier value.

Distinguish durable acceptance (the batch/job exists) from successful interpretation (all required mappings and applicability checks passed). A 202 response can mean accepted for processing; it cannot mean clinically reviewed. For partially valid files, account for every source row and expose the outcome counts.

## Object publication and backup

Qualify the actual Python driver transaction mode as well as the database engine. SQLAlchemy documents sqlite3 legacy transaction behavior that can omit BEGIN for reads, DDL and SAVEPOINT operations. Choose an explicit supported transaction configuration and test rollback, repeatable reads, savepoints and migration failure. Do not infer these guarantees merely from using an ORM or calling a method named transaction. Verify foreign-key enforcement for every connection and after schema migration. Corroborating source: T037, transactions section, retained in `sources/web_batch_12.json`.

Do not permit user-controlled filesystem paths. Bound input bytes, decompressed size, file count and parser time before processing an archive. Hash/check file signatures and content structure. Quarantine failed formats and mappings.

Proposed publication protocol: write a staged object, validate size/hash, flush and synchronize it using platform-qualified filesystem semantics, atomically publish within the managed filesystem, then commit its ready manifest and dependent record. Filesystem publication and SQL commit are not one transaction. Recovery must handle staged files, orphaned published files and a manifest whose referenced bytes are unavailable. Never present an incomplete object as usable.

Backups identify a database snapshot and the exact object manifest it references. Immutable referenced objects must be retained until snapshot copying and restore verification complete. Use the database backup facility rather than copying a live DB file while ignoring WAL. Restoring data also requires the applicable mapping/evidence/model versions and, for any encrypted design, a tested independent key-recovery process.

## Worker and event stream

An accepted job is durable before dispatch. It has bounded input/output size, deadline, attempt count, lease, cancellation semantics and an idempotent result identity. Long inference or network transfer cannot hold a database write transaction. An expired lease can be reclaimed only when duplicate execution is safe or requires an explicit recovery step.

SSE notifications carry identifiers and bounded state changes, not a private raw-data dump. Authorize their scope, support a reconnect cursor where retained, and refetch the authoritative GET projection after a gap. A browser cache, optimistic UI transition or streamed token is never the save acknowledgment.

## Minimal first slice

The 26 entity groups define semantics. They need not become 26 tables during the hackathon. Read-only evidence sections, quantity definitions and mappings can be served from a versioned reviewed package. Time/specimen/device context can initially be validated nested structures attached to observations, provided identities, versioning and invariants remain explicit.

Prioritize persisted observations/revisions, derivations, episodes/actions/follow-ups, packets/outbox, jobs and audit. Simulated identity and purpose-policy fixtures remain explicit. Defer broader mission administration, live-device management and unrelated health workflows. Do not defer the failure behavior required by the chosen path.

Relevant references: RQ09-30, RQ34-40, RQ53-67, RQ77-84; T005, T006, T008, T009, T015 and T037. Every proposed behavior needs the corresponding data, fault, authorization or release test; it is not proven by this document.
