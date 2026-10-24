> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Delivery and care are different states

Release checks the exact payload hash and current permission.

```mermaid
flowchart TD
    draft["Editable preview"]
    change["Changed or unauthorized"]
    approve["Human approves exact hash"]
    queue["Released and queued"]
    retry["No acknowledgement / retry"]
    received["Receiver acknowledgement"]
    review["Human review recorded"]
    follow["Follow-up remains assigned"]
    draft -->|"request release"| approve
    approve -->|"recheck fails"| change
    approve -->|"atomic release"| queue
    queue -->|"link or receipt missing"| retry
    retry -->|"same packet / hash"| queue
    queue -->|"verified receipt"| received
    received -->|"separate human action"| review
    review -->|"until resolved"| follow
```
