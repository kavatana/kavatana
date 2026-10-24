> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Correction and stale-result handling

One transaction changes record state; historical released packets remain immutable.

```mermaid
flowchart TD
    request["Correction + expected version"]
    check["Check authorization / version"]
    deny["Deny or return conflict"]
    commit["Append revision and audit"]
    stale["Invalidate dependent work"]
    fresh["Recompute current findings"]
    packet["New packet needs approval"]
    request -->|"submit"| check
    check -->|"fails"| deny
    check -->|"valid"| commit
    commit -->|"same transaction"| stale
    stale -->|"new dependencies"| fresh
    stale -->|"released content changed"| packet
```
