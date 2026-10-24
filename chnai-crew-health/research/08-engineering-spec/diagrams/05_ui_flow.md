> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Crew and reviewer task flow

Task views can share one workspace. Only meaningful decisions need controls.

```mermaid
flowchart TD
    start["Own review / resume"]
    gap["Resolve missing context"]
    attention["Review change"]
    evidence["Inspect source / revisions"]
    request["Request onboard review"]
    review["Assigned reviewer disposition"]
    follow["Pending follow-up"]
    handoff["Preview and approve handoff"]
    start -->|"qualified data"| attention
    start -->|"not evaluable"| gap
    attention -->|"inspect"| evidence
    attention -->|"request"| request
    request -->|"assigned"| review
    review -->|"responsibility"| follow
    review -->|"if appropriate"| handoff
```
