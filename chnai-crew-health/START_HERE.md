# CHNAI — start here

**Handoff prepared 23 October; finalized 24 October 2026. Application baseline: v0.8.** This folder contains the working local prototype, the recovered research/specification history and a portable Codex handoff. The goal is a useful, evidence-led astronaut health workflow for the chosen NASA Space Apps challenge.

## Continue in VS Code

1. Clone `https://github.com/kavatana/kavatana.git` or pull an existing clone after preserving local changes.
2. Open **`kavatana/chnai-crew-health/`** as the VS Code folder, not the parent profile repository.
3. Install/open the official Codex IDE extension using [OpenAI's setup guide](https://learn.chatgpt.com/docs/codex/ide), sign in, and open a new project chat.
4. Paste the complete [CODEX_HANDOFF_PROMPT.md](CODEX_HANDOFF_PROMPT.md). It points Codex to all context in this folder. This chat's memory and connected Drive are not prerequisites for the local app.

The instructions were checked against official OpenAI documentation on 23 October 2026. Account capabilities and extension UI can change; the linked guide is authoritative for setup. No extension or paid model is automatically installed by this repository.

## Read in this order

| File | Why it matters |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Project instructions and evidence/safety boundaries |
| [Founder intent](docs/handoff/FOUNDER_INTENT.md) | The original ambition, research questions and design preferences |
| [Current state](docs/handoff/PROJECT_STATE.md) | What exists, what passed, and what remains a proposal |
| [Research map](research/README.md) | Requirements, data catalogs, schema/workflow proposals, UX and winner research |
| [Next steps](docs/handoff/NEXT_STEPS.md) | Ordered work with concrete completion criteria |
| [Mac first session](docs/handoff/MAC_FIRST_SESSION.md) | Setup, local run and honest acceptance recording |
| [README](README.md) | Runtime commands and current architecture overview |

The next milestone is **a verified complete workflow on the actual Mac, followed by evidence-based interface improvements**. Adding features is not a substitute for that acceptance pass.

## What is portable

- `web/`, `api/`, `packages/`, `scripts/`, `tests/`: current application and checks.
- `docs/`: implementation decisions, validation history and onboarding.
- `research/`: editable research and design history, including the original source/asset catalogs, requirements, proposed schema, fixtures, flowcharts, engineering workbook, AI case cards and interface observations.
- `data/catalog/` and `web/public/data/`: the app's source-use records and two retained public CBC CSVs.

Research raw archives, bulky source captures, restricted data, private registration/contact drafts and generated duplicates are not all published in Git. The [recovery record](research/RECOVERY.md) and machine-readable manifest specify the boundary and retain original hashes. This is a curated engineering handoff, not a verbatim chat export or a claim that every remote dataset was downloaded.

The GitHub code runs locally. The earlier private static Site is a separate browser-only mock and does not host this FastAPI/SQLite application.
