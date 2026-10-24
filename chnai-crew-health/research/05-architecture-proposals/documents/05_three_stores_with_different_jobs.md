> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Three stores with different jobs

20 October 2026. Recommended design; implementation not tested.

Research archive: Drive holds public source material, access notes, inventories and research profiles. It is the team knowledge repository. A large archive is not a reason to load every file into an operational database or a model context.

Approved evidence: a reviewed versioned package selects the source sections, quantity mappings and applicability rules actually needed by the episode. Its manifest references exact source hashes and locators. Rights and review status govern promotion.

Operational record: a local transactional database stores identities, observations, quality, review episodes, actions, follow-ups and transfer state. Original waveforms/images and derived chunks stay in a separate managed file store.

- Use different namespaces for historical research subjects, simulated operational crew and any future measured demo participant.
- Never place the live SQLite DB/WAL in a Google Drive synchronization folder or a shared network filesystem.
- A file hash proves byte identity, not clinical meaning, permission or authenticity of the publisher.
- Unknown source rights or an unresolved unit contradiction cannot disappear because a file was successfully downloaded.

Evidence and cross-references: ADR05; ADR08; ADR10; RQ09-30; RQ80; T008; T013; S024; S025; Q001

- [T008](https://www.sqlite.org/wal.html)
- [T013](https://duckdb.org/docs/current/data/parquet/overview)
- [S024](https://science.nasa.gov/reference/osdr-help-terms-and-conditions/)
- [S025](https://www.nasa.gov/reference/osdr-tutorials-requesting-controlled-access-datasets/)
