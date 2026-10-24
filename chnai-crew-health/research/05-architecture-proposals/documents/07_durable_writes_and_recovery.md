> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Durable writes and recovery

20 October 2026. Recommended design; implementation not tested.

SQLite is proposed because the first operational workflow has one local backend owner. It is not selected because spaceflight requires SQLite. Use short transactions and serialize consequential writes through the service. Run bounded jobs outside transaction lifetimes.

For WAL, qualify the actual linked SQLite build and durability settings. The upstream WAL-reset issue is fixed in 3.51.3 and specific earlier backports. Select a maintained release with the fix and review its current advisories; a version string alone is not a release qualification.

- Save an action, its audit event and an authorized outbox intent in one transaction. Acknowledge saved only after the required durable commit.
- For the proposed WAL design, test synchronous=FULL, connection configuration, checkpoint growth, busy handling and disk-full behavior on the actual host.
- Database and file publication are not one atomic transaction. Stage the file, verify hash/size, sync and publish it, then commit its ready manifest. Recover abandoned staging files and unreferenced objects.
- Use the database backup mechanism and a matching object-manifest snapshot. Copying only a live .db file can omit required WAL state.
- Name constraints. Review Alembic table-copy migrations and verify constraints after migration; automatic migration generation is not proof of preservation.

Evidence and cross-references: ADR05-09; F10-11; G05; RQ62; T008; T009; T015; T037

- [T008](https://www.sqlite.org/wal.html)
- [T009](https://www.sqlite.org/backup.html)
- [T015](https://alembic.sqlalchemy.org/en/latest/batch.html)
- [T037](https://docs.sqlalchemy.org/en/20/dialects/sqlite.html)
