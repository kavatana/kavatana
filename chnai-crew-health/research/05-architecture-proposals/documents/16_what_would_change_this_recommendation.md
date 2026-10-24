> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# What would change this recommendation

20 October 2026. Recommended design; implementation not tested.

Choose PostgreSQL if the actual workflow requires independent concurrent writers, stronger database-side row policies or throughput that the qualified SQLite design cannot meet. Retest migration semantics; SQLAlchemy does not make this a configuration-only migration.

Choose a native client/gateway if a disconnected tablet must make durable authoritative changes or the chosen device requires a native SDK. Choose a larger serving stack only after measured simultaneous model requests or host capabilities make it useful.

- Use Vite/Fastify when demonstrated team familiarity and complete parser/contract tests reduce delivery risk. The current default is not a claim that other frameworks are obsolete.
- Add embeddings only when the held-out evidence-retrieval task improves without weakening permissions or traceability.
- Add fine-tuning only after an explicit labeled-data and evaluation gate. More papers in Drive do not constitute a fine-tuning dataset.
- Reopen the model choice if the candidate fails number/citation checks, memory limits, latency or reliable offline initialization. Keep the non-model path.
- The architecture decision log records these triggers so a change is deliberate rather than a stack rewrite driven by trends.

Evidence and cross-references: Alternatives register; ADR02-05; ADR10-13; G02; G04-10; T007; T012; T014; T024; T029

- [T007](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
- [T012](https://duckdb.org/docs/current/connect/concurrency)
- [T014](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [T024](https://huggingface.co/Qwen/Qwen3.5-4B)
- [T029](https://github.com/polarofficial/polar-ble-sdk)
