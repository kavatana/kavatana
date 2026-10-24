> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Codebase ownership and build sequence

## Selected candidates

Continue the prior conditional recommendation: Nuxt/Vue/TypeScript client, FastAPI/Pydantic backend, SQLAlchemy/Alembic with local SQLite, immutable object files, and optional local llama.cpp explanation runtime. These are CHNAI choices, not NASA requirements. Exact dependency versions and the model artifact remain to be pinned and qualified. [P01, P03]

## Database belongs to the backend

Migrations and repositories belong under services/api/persistence. The runtime .db, WAL, object files and models belong in an external application-data directory. apps/web never opens the database. Shared contracts generate the typed frontend client. Format adapters cannot call the LLM to decide units or identity.

## Build in useful slices

First implement one completed-assessment import, provenance storage and exact deterministic comparison. Add a read projection and the crew review screen. Then implement review/follow-up transactions and restart recovery. Add purpose-limited packet preview/release/receipt. Only then qualify optional AI wording, extra modalities and physical devices. The source-backed path should remain usable if AI is disabled.

## Contract change discipline

A request/response schema is versioned once and generates clients. Changes to units, provenance, clock basis, identity or state transitions require a migration/compatibility plan and new fixture version. Do not edit generated clients independently. Read queries return as_of and version; mutating requests carry expected versions and idempotency keys.

## Build evidence

The future repository should keep requirements-to-case links, dependency locks, source manifests and a concise release note. CI must validate contracts, type checks, deterministic rules, privacy boundaries and transaction scenarios. Model quality is evaluated separately from code correctness. Do not publish research files whose redistribution rights have not been verified.

## Scaling trigger

Do not select a distributed stack merely because the research archive is large. First separate byte archives from transactional records and measure the real workload. Revisit PostgreSQL, partitioned analytical storage, multiple ingestion workers or remote services only when measured write contention, multi-node needs or deployment constraints justify the change. Keep stable IDs, ports and migrations to make that change possible.
