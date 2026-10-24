> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Database design and invariants

## Storage types

The field dictionary is a physical proposal, not executable DDL. TEXT_JSON means SQLite TEXT with json_valid validation plus a versioned application schema. TEXT_DECIMAL means a finite canonical decimal string parsed with decimal arithmetic. TEXT_DECIMAL_INT carries large integer offsets safely across JavaScript. INTEGER contains bounded counts, revisions or small state counters. No clinical comparison may silently convert decimal strings to binary floating point.

## Keys and boundaries

Every proposed table has an opaque TEXT primary key and UTC created_at. Foreign keys use RESTRICT by default. Enable and verify SQLite foreign keys per connection. Add supporting indexes on foreign columns used in joins. Explicit UNIQUE rules in Entities are required migrations, not suggestions. Namespace matching, parent revision ownership and cross-table scope need composite constraints or reviewed triggers plus application validation. [T01]

## Important cross-row constraints

observation.current_revision_id must point to a revision belonging to that observation. A correction must supersede the current revision and increment version exactly once. Baseline and current inputs must share subject, semantic quantity and compatible assessment method. Personal observations require subject_id. Cabin observations instead require mission/location context. An environment record is never assigned to all crew automatically.

## Value union and missingness

A qualified scalar revision has canonical_decimal and no coded/text/object branch. Coded, text and object revisions activate exactly one corresponding branch. A quarantined or missing revision may have no canonical branch but retains original source evidence and a quality_issue. Empty, absent, zero, below detection limit and invalid are distinct states. Lab reference ranges live in versioned context with their source and method; no universal normal-range table is inferred.

## JSON contracts

Versioned JSON fields are bounded payloads for policy allowlists, measurement context, source mappings, algorithm parameters and output facts. They do not replace relational identity, revisions, care grants or packet membership. A schema version accompanies every JSON document. Unknown versions fail closed. Mappings select allowlisted transformations and never execute uploaded code.

## Indexes and query plan

Initial indexes: subject(namespace_id,external_ref); observation(namespace_id,producer_ref,source_record_key); observation_revision(observation_id,revision_no); observation_revision(subject_id,quantity_id,time_context_id); derivation_input(revision_id,run_id); review_episode(subject_id,state); follow_up(owner_actor_id,state,due_at); care_relationship(actor_id,subject_id,mission_id,purpose); job(state,deadline_at); outbox_attempt(state,next_attempt_at); packet_item(revision_id,packet_id). Separate UTC and relative-time queries. Measure actual plans and p95 latency before adding speculative indexes.

## Size and retention

SQLite stores identities, scalar facts, provenance and workflow state. Original EDF, image and large stream objects remain immutable files referenced by hashes. Derived analytics may use Parquet/DuckDB outside transactional records. Do not put one ECG sample in a clinical workflow row by default. Chunks retain channel, calibration, exact timing and completeness. Retention durations, encryption key management and actual volume remain decisions to review.

## Schema delta

The former 26 logical groups become 42 proposed tables by making mission and actor identity, policy, durable command receipts, stable observation identity, per-record outcomes, quality issues, baseline selection, rules, derivation inputs, episode links, draft/packet membership, receipts and clinical review explicit. The original 26 were not implemented tables. Three extension tables (specimen, signal_descriptor, context_event) are documented without requiring them in the first scalar path.
