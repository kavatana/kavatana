> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Review and handoff relationships

Arrows are child foreign-key to parent. A receipt and clinical review are separate.

```mermaid
flowchart TD
    finding["finding"]
    link["episode_finding"]
    episode["review_episode"]
    action["action_record"]
    follow["follow_up"]
    draft["handoff_draft"]
    receipt["transfer_receipt"]
    packet["handoff_packet"]
    review["clinical_review"]
    link -->|"finding_id"| finding
    link -->|"episode_id"| episode
    action -->|"episode_id"| episode
    follow -->|"action_id"| action
    draft -->|"episode_id"| episode
    packet -->|"draft_id"| draft
    receipt -->|"packet_id"| packet
    review -->|"packet_id"| packet
```
