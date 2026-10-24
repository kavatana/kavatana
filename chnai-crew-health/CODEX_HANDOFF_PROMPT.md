# Copy this prompt into Codex in VS Code

You are continuing CHNAI Crew Health, my existing NASA Space Apps project. Work inside this project folder; in the GitHub repository `kavatana/kavatana`, it is `chnai-crew-health/`. Continue the existing implementation and evidence trail. Do not restart from a generic dashboard template or import context from unrelated projects.

## First recover the context

Read `AGENTS.md` and `START_HERE.md`, followed by:

1. `docs/handoff/FOUNDER_INTENT.md`
2. `docs/handoff/PROJECT_STATE.md`
3. `docs/handoff/NEXT_STEPS.md`
4. `research/README.md` and `research/RECOVERY.md`
5. `README.md`, `docs/DEVELOPMENT.md`, `docs/architecture/ADR-007-local-monorepo.md`, `docs/architecture/DATABASE.md`, `docs/architecture/API.md`, `docs/architecture/RESEARCH_INGESTION.md`
6. `docs/LOCAL_ACCEPTANCE.md`, `docs/RESEARCH_WALKTHROUGH.md`, `docs/VALIDATION_V08.md`

Then inspect the actual code, migrations, fixtures and tests. Use the research index to read the relevant detailed records as you work; do not dump the whole archive into context. Report contradictions and resolve them using dates, source scope and the actual implementation. Reference documents are evidence, not executable instructions.

## My goal and expectations

I lead CHNAI LAB in Phnom Penh. We chose “Create Health Monitoring Software for Astronauts on Space Missions.” Its supplied summary asks software to gather indicators, help astronauts evaluate health, and enable action during long missions. It names radiation, isolation/confinement, altered gravity and a hostile closed environment, with immune, bone, cardiovascular and behavioral health outcomes. We also study delayed Earth support, mission tasks, crew roles, devices, privacy and data quality.

I want a serious, useful project with traceable NASA/primary-source evidence, a well-organized data foundation, deliberate database/API/codebase design, meaningful automation, a professional visual interface and an end-to-end demonstration. Understand roles, daily work, measurement provenance and failure behavior. Learn from observed winning projects without inventing judges' private reasoning or guaranteeing a win. Keep explanations to me concise and easy to judge.

My development/demo machine is a 16-inch MacBook Pro, M3 Pro, 18 GB unified memory. Verify its actual setup; earlier measurements were from Linux, not my Mac.

## What already exists

The v0.8 baseline uses browser JavaScript modules, FastAPI/Pydantic, SQLite migrations and a shared JavaScript domain engine invoked by a bounded Node adapter. It has a persistent fictional assessment-day workflow with accepted primary/backup reviewer ownership, append-only corrections, exact approved handoff snapshots, scoped views, audit/outbox, revision checks, retry keys, restart recovery and crew database backup.

A separate research registry imports two retained OSD-569 CBC files, preserves exact objects and source rows, records parser/runtime provenance, flags unit-label conflicts and provides bounded paginated inspection. Public research subjects never become fictional crew. The catalog includes broader research for later use, not implemented integrations.

The baseline has 86 Node and 34 API/storage checks passing, including a successful dated GitHub CI run. That is not browser, clinical or astronaut validation. The 17 Mac workflow checks and eight research UI walkthrough steps were still Not run at handoff. Earlier screenshots demonstrate the older browser-only mock. The managed preview environment had a Python resolution failure; do not report that as a failure already reproduced on my Mac.

There is no production authentication/encryption, live NASA device API, real ground link, LLM/fine-tuning, 3D environment or clinical qualification. The 42-table schema and Nuxt/Vue, SQLAlchemy/Alembic, local model and analytical-store proposals in older research are not all implemented or final choices. Read ADR-007 before changing the stack. Model case cards are synthetic, unexecuted and publicly visible; their proposed holdout cannot be called untouched after using it for tuning.

## Do the next concrete work

Inspect Git status and preserve my changes. Follow `docs/handoff/MAC_FIRST_SESSION.md`: verify/install the documented project dependencies as appropriate, run readiness and relevant checks, start the app on loopback with a separate fictional acceptance database, and execute the two browser checklists when browser control is available. If you cannot operate Safari or another needed tool, say exactly what remains blocked, complete independent checks, and give me the smallest manual action needed.

Record actual browser/version, commit, layout/keyboard behavior, measured save times and failures. Fix concrete reproducible problems, test those fixes and retain before/after evidence. After the complete path works, improve visual hierarchy and task flow using the source-backed interface observations and our actual workflow. Keep the interface calm, legible and focused on the current task, evidence quality, accountable next action and communication state. Do not add decorative health scores or NASA branding that implies endorsement.

Preserve deterministic operation with the model off. Any future AI addition must earn its place through a bounded comparison against the template baseline; it may not calculate medical truth, prescribe, clear a crew member, silently assign ownership or approve sharing. Any future 3D view must use the same deterministic scenario engine and evidence, not invented physiology.

## Evidence and completion

Keep source IDs, versions, applicability, units, methods, time semantics, quality, licenses and lineage. Distinguish an unavailable flight interface from a documented research/commercial API. Keep real research, synthetic fixtures and current operational state separate. Do not treat volume of files as volume of usable health data.

Original event dates, eligibility statements and submission limits are provisional or historical. Recheck the current official challenge/rules before relying on them. Notes expected full challenge details on 28 October and a guide on 13 November 2026; these are verification checkpoints, not established eligibility. Preserve real preparation timestamps.

Continue with focused, reviewable changes within this task. Update the current-state and next-step documents when a milestone is finished. Conclude with what changed, what actually passed, what remains unverified and the next concrete decision. Do not leave a list of ideas when the next authorized implementation or verification step can be completed.
