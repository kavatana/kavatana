> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data organization before database selection

06 / Logical information model

The research repository is an evidence collection. The future operational data store has a different purpose: preserve a crew record, support timely review and record accountable actions. They should share governed mappings and approved evidence packs, not a single undifferentiated set of tables.

Separate the identities and lifecycles of source publication, dataset release, asset, research subject, operational crew assignment, session, device, specimen, raw observation, normalized observation, derived finding, procedure version, action, follow-up and handoff packet. The exact physical schema is deferred to the architecture milestone.

Store source bytes once with their checksum. A curated record points to the asset, row/channel locator and mapping version. A derived record points to exact input revisions, algorithm and parameters. An explanation points to the derived findings and evidence sections. Correction propagates invalidation through those links.

Waveforms and images need object-level metadata and efficient access by channel or time. Scalar observations need typed quantities and purpose-specific queries. Protocols and papers need versioned section references. Actions and approvals need transactional history. Choosing one database for all of them requires measured evidence, not fashion.

- Never join source cohorts merely because subject labels match.
- Do not collapse absent, invalid, stale and not applicable into zero or null without meaning.
- Keep reference interval, mission limit and learned model output separate.

Evidence / cross-references: RQ09-RQ30; S038-S047; E008-E009; FM01-FM19
