> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Web and API responsibilities

20 October 2026. Recommended design; implementation not tested.

Nuxt builds a client-only static application. The production package contains its scripts, styles, icons and evidence-view assets locally. Nuxt routing/layout conventions support several review views without requiring a second server-side domain layer.

FastAPI owns ingestion, validation, comparisons, workflow transitions, authorization and transfer state. Generate TypeScript types from its OpenAPI contract. The frontend displays server-derived findings and sends explicit commands; it cannot bypass policy by hiding or showing a button.

- Pydantic strict mode reduces type coercion, but units, time basis, censored values and clinical applicability still require explicit semantic validation.
- Use bounded pagination and summarized trends for the crew view; load raw waveform windows only on demand. Never send the entire research archive to the browser.
- Version the contract and return structured errors with a stable code, correlation ID, field/record location and safe retry guidance.
- The UI owns stable navigation, focus, interruption recovery and visible automation state. Do not generate executable layouts or rearrange authorization controls.
- Fastify and a Vite client remain valid alternatives if actual team proficiency and parser tests make them cheaper to deliver.

Evidence and cross-references: ADR02-04; ADR14; RQ42; RQ69-74; RQ78-79; T001; T002; T004; T006; T007; T035; T027

- [T001](https://nuxt.com/docs/4.x/guide/concepts/rendering)
- [T002](https://nuxt.com/docs/4.x/getting-started/deployment)
- [T004](https://fastapi.tiangolo.com/how-to/extending-openapi/)
- [T006](https://pydantic.dev/docs/validation/latest/concepts/strict_mode/)
- [T007](https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/)
- [T035](https://openapi-ts.dev/introduction)
- [T027](https://github.com/a2ui-project/a2ui)
