# Development and release workflow

1. Read README, the mission episode, the source/provenance notes and ADR-007.
2. Make a feature branch. Domain rules belong in `packages/domain/src`, HTTP/transaction behavior in `api/src/chnai_api`, and interface behavior in `web/src`.
3. For a schema change, add a new numbered SQL migration. Never edit an already-applied migration; its hash is checked at startup.
4. For a command change, update Pydantic, the shared service adapter and generated OpenAPI together. Add a test for the changed failure boundary or intended outcome.
5. Run `npm run doctor`, `npm run check`, `npm test`, `npm run test:api`. The 12 in-app scenario checks and 12 client-transport checks are subsets of the 86 Node checks.
6. Use `docs/LOCAL_ACCEPTANCE.md` to review the full local assessment path manually and verify original source labeling. Record actual hardware/browser and observed limitations.
7. Use a different `CHNAI_DB` path for development, QA and a demo. Never promote a real person's data or an edited test database to a production environment.

CI runs the static build, Node checks, SQLite/API integration tests and OpenAPI drift check. It has read-only repository permission and no deployment secrets. No production deployment pipeline or real-data environment is configured.

## Local walkthrough

The local seed opens at an already-completed fictional assessment (39 versus 50; 78%). In the crew workspace request review, then offer responsibility to Crew 06 with a reason. Switch to the backup reviewer, accept the assignment and record a context note plus follow-up trigger. Prepare a handoff, inspect the exact payload and approve its hash. In the technical workspace connect Earth, advance once to start transmission and advance four more 15-second steps for the acknowledgement. Ground can then review the received snapshot. Return to Crew 06 to record the observed follow-up outcome. Ground review never auto-completes onboard work.

An unsupported unit or unconfirmed wearer should withhold comparison in the browser scenario lab. The local durable slice currently seeds the assessment-day scenario only. It does not claim every scenario/UI or the entire research architecture has been ported to the API.

## Offline meaning

Once dependencies and assets are installed, the local web/API process and database run without Earth/cloud services. The process must remain available on the laptop. An unavailable API never gets a success label: the UI keeps an unconfirmed command with its original retry key. A tablet is not independently offline and is not a qualified deployment target. No service worker or standalone tablet installation is implemented.

## Next engineering work

- Browser-check the local workspace on the actual 16-inch M3 Pro, 18 GB Mac; measure end-to-end latency and resource use before choosing an LLM runtime.
- Reconcile the research catalog and wider schema; add an ingestion manifest and real adapter contract only when source/device evidence supports them.
- Introduce reviewed identity/access and encryption before handling non-fictional records.
- Add a bounded model explanation behind the deterministic rules only after evaluation. It must not invent a treatment, silently approve a packet, or assign clinical clearance.
- Reuse the tested domain events for any later 3D scenario view. A 3D scene should expose workflow/failure behavior, not establish biological validity.
