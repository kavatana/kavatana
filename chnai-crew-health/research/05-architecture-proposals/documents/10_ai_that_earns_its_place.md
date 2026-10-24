> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# AI that earns its place

20 October 2026. Recommended design; implementation not tested.

Start with a deterministic summary template. Then test whether a local model makes the explanation clearer or the draft handoff more useful without changing numbers, inventing support or bypassing authority. The model is useful only if the complete task improves.

Qwen3.5-4B is the first candidate, not a declared winner. The publisher card describes the model and Apache-2.0 license. Resolve the exact model revision, conversion/quantization provenance and runtime build before any implementation evaluation. No weights have been downloaded or benchmarked here.

- Retrieve only authorized observations and approved evidence sections. Include source IDs, locators, units, time and missing context as structured inputs.
- Use a small output schema: explanation claims, cited evidence IDs, missing information and draft handoff fields. Validate every number and identifier after generation.
- llama.cpp structured output helps shape JSON. Schema-shaped JSON does not establish truth, citation support or authorization.
- MedGemma 1.5 4B is a possible research comparator, with HAI-DEF access terms and explicit restrictions on treating outputs as direct clinical decisions.
- Fine-tuning remains deferred until permitted task labels and held-out evidence demonstrate a specific benefit.

Evidence and cross-references: ADR10-13; G08-09; RQ41-52; T010; T021; T022; T024; T025; T045

- [T010](https://www.sqlite.org/fts5.html)
- [T021](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)
- [T022](https://github.com/ggml-org/llama.cpp)
- [T024](https://huggingface.co/Qwen/Qwen3.5-4B)
- [T025](https://huggingface.co/google/medgemma-1.5-4b-it)
- [T045](https://developers.google.com/health-ai-developer-foundations/terms)
