> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Record provenance and revision relationships

Arrows are child foreign-key to parent. Full 87-reference list is in Relationships.

```mermaid
flowchart TD
    obs["observation"]
    rev["observation_revision"]
    subject["subject"]
    asset["source_asset"]
    time["time_context"]
    mapping["field_mapping"]
    input["derivation_input"]
    run["derivation_run"]
    quantity["quantity_definition"]
    rev -->|"observation_id"| obs
    rev -->|"subject_id"| subject
    rev -->|"source_asset_id"| asset
    rev -->|"time_context_id"| time
    rev -->|"mapping_id"| mapping
    input -->|"revision_id"| rev
    input -->|"run_id"| run
    mapping -->|"quantity_id"| quantity
```
