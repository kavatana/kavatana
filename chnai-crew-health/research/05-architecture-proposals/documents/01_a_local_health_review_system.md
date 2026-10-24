> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# A local health-review system

20 October 2026. Recommended design; implementation not tested.

Recommendation: use Nuxt 4 / Vue 3 / TypeScript for a stable crew interface, FastAPI / Python for data and workflow logic, and SQLite for the first local operational record. Preserve large recordings as files. Add Parquet and DuckDB for batch analysis when the selected workflow needs them.

Evaluate a local llama.cpp runtime with Qwen3.5-4B for evidence explanation and handoff drafting. The software must remain useful with the model switched off. This is a design recommendation, not a measured performance result or a flight-certified architecture.

The core product promise is: help a crew member turn trustworthy measurements into an understandable review, an authorized next step, and a traceable follow-up when Earth is unavailable.

- One backend owns clinical state and every consequential transition.
- The research archive, approved onboard evidence and operational crew records are different stores and release processes.
- Technology is ready for a provisional choice. Hardware, the full challenge, clinical content and implementation tests remain open gates.

Evidence and cross-references: ADRs 01-18; RQ03, RQ27, RQ41-51, RQ61-84; S003; S008; S009; T001; T002; T004; T008; T022; T024

- [S003](https://ntrs.nasa.gov/api/citations/20240001402)
- [S008](https://www.nasa.gov/wp-content/uploads/2023/11/nasa-std-3001-vol-1-rev-c-with-signature.pdf)
- [S009](https://www.nasa.gov/wp-content/uploads/2025/05/nasa-std-3001-vol-2.pdf)
- [T001](https://nuxt.com/docs/4.x/guide/concepts/rendering)
- [T002](https://nuxt.com/docs/4.x/getting-started/deployment)
- [T004](https://fastapi.tiangolo.com/how-to/extending-openapi/)
- [T008](https://www.sqlite.org/wal.html)
- [T022](https://github.com/ggml-org/llama.cpp)
- [T024](https://huggingface.co/Qwen/Qwen3.5-4B)
