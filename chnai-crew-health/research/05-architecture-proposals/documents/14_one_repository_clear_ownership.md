> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# One repository, clear ownership

20 October 2026. Recommended design; implementation not tested.

Keep one repository while the team is small. apps/web owns the interface. services/api owns domain behavior, use cases, adapters, persistence and the bounded AI boundary. contracts/generated carries derived client types. tests contains permitted fixtures and scenario definitions when implementation becomes eligible.

The database belongs to the API operationally, but its live files do not belong inside the source tree. A separate app-data directory holds the DB/WAL, objects, quarantine, model artifacts and backups. Git contains migrations and manifests, not the clinical database.

- Software engineer: client/API boundary, persistence, workflow, authorization and offline packaging.
- AI engineer: evidence preparation, retrieval, model experiments and output validation, collaborating on adapter semantics.
- Health reviewer: applicability, comparison language and permitted action content. This role is still needed; neither engineer substitutes for clinical review.
- Use generated contracts and small domain modules. Avoid duplicating clinical rules in Vue, API handlers and prompts.
- Split a service only when isolation, scaling or ownership requires it. A separate model process already gives an explicit failure and resource boundary.

Evidence and cross-references: Code ownership register; ADR03-04; ADR09; ADR17; RQ79-82; T004; T015; T021; T035

- [T004](https://fastapi.tiangolo.com/how-to/extending-openapi/)
- [T015](https://alembic.sqlalchemy.org/en/latest/batch.html)
- [T021](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [T035](https://openapi-ts.dev/introduction)
