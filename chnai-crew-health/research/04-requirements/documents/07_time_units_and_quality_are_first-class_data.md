> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Time, units and quality are first-class data

07 / Ingestion and management contract

Every adapter declares source version, supported channels, units, time basis, cadence, missing-value representation and capabilities. The same adapter must accept a replayable sample export for verification. Documentation alone is not proof of a working device integration.

The raw time expression is retained even when a normalized time can be computed. Device resets create new clock segments. Relative L-/R+ study labels remain relative. EDF local time without a timezone remains uncertain. Receipt and publication time never replace measurement or specimen-collection time.

Validation has distinct stages: transport/content validity; format/schema validity; identity/time/unit validity; source quality; and applicability for the intended interpretation. A file may pass its checksum and still fail a unit mapping or population applicability check.

Accepted data enters a governed version. Rejected or quarantined records remain inspectable with reason and source locator. Re-import is idempotent. Corrections create revisions and invalidate dependent results rather than silently replacing the history.

- Mixed rates and event annotations need explicit channel contracts.
- A scalar update, a laboratory panel and an imaging study do not share the same latency or completeness assumptions.
- No silent resampling, imputation, unit correction or default normal value.

Evidence / cross-references: RQ09-RQ30; FM01-FM19; E005; R017; R020
