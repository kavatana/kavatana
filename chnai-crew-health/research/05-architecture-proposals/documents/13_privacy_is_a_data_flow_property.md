> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Privacy is a data-flow property

20 October 2026. Recommended design; implementation not tested.

Every backend operation checks actor identity, current relationship to the subject, mission/purpose and allowed data/action scope. A commander can receive an agreed operational constraint without receiving the underlying mood, genomic or clinical narrative. A technical role sees diagnostics without medical content.

The public demo uses clearly synthetic operational identities and isolated synthetic data. A role selector demonstrates a workflow; it is not production authentication. Future real-data work needs a separately tested identity and key-recovery design before ingestion.

- Keep the model endpoint on a protected local boundary. It has no arbitrary SQL, shell, browsing, export or credential tool. Imported text remains data.
- Filter retrieval before generation and validate output after generation. Structured output and a trusted UI catalog do not replace access control.
- SQLCipher is a candidate for database encryption, but blobs, backups, temporary files, keys and recovery also need protection. Its actual merged SQLite build must be checked.
- Use logs with correlation IDs, error codes, timings and counts. Exclude clinical values, names, prompt text, secrets and full packet bodies by default.
- A local append-only audit helps reconstruction but does not make the host tamper-proof. Stronger integrity and operational security require separate threat testing.

Evidence and cross-references: ADR16; F14-15; G10; RQ53-60; T014; T016; T017; T027; T036; S008; S010

- [T014](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [T016](https://www.zetetic.net/sqlcipher/design/)
- [T017](https://github.com/sqlcipher/sqlcipher/blob/master/LICENSE.md)
- [T027](https://github.com/a2ui-project/a2ui)
- [T036](https://opentelemetry.io/docs/security/handling-sensitive-data/)
- [S008](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)
- [S010](https://www.nasa.gov/reference/6-0-medical-operations/)
