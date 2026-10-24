> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Ingest, qualify and preserve uncertainty

Receiving data is not equivalent to qualifying it for interpretation.

```mermaid
flowchart TD
    input["File or declared packet"]
    bytes["Preserve bytes and hash"]
    invalid["Reject malformed input"]
    check["Check identity / unit / time"]
    quarantine["Store with quality issue"]
    valid["Qualified demo revision"]
    evaluate["Compare exact dependencies"]
    input -->|"receive"| bytes
    bytes -->|"parse"| check
    check -->|"structurally invalid"| invalid
    check -->|"unknown semantics"| quarantine
    check -->|"prerequisites met"| valid
    valid -->|"versioned rule"| evaluate
```
