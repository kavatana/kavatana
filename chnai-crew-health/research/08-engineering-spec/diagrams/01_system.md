> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Local system and trust boundaries

Proposed topology. Earth connectivity is optional for the onboard review path.

```mermaid
flowchart TD
    crew["Crew / onboard reviewer"]
    ui["Browser task views"]
    api["Local API and policy"]
    replay["Replay / optional gateway"]
    domain["Rules and workflow"]
    db["SQLite and audit"]
    model["Optional local model"]
    objects["Immutable objects"]
    worker["Transfer worker"]
    earth["Delayed ground handoff"]
    crew -->|"uses"| ui
    ui -->|"authorized API"| api
    replay -->|"versioned input"| api
    api -->|"use cases"| domain
    domain -->|"transactions"| db
    domain -->|"bounded facts"| model
    domain -->|"hash references"| objects
    db -->|"released outbox"| worker
    worker -->|"approved packets"| earth
```
