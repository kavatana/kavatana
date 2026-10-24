> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# One review episode, fully traceable

MVP workflow specification v0.1 | CHNAI LAB | 20 October 2026

Proposed product sentence: An onboard assistant turns comparable health measurements into an evidence-linked review, records the crew's next step, and preserves the handoff when Earth is unavailable.

The first candidate episode is an explicitly simulated aerobic-capacity review. It exercises the data and action chain without pretending to diagnose cardiovascular disease. The October requirements baseline and architecture recommendation remain unchanged.

| Decision now | Boundary |
| --- | --- |
| Specify one success path plus failures | Comparable personal baseline and follow-up; onboard review request; accountable follow-up; optional delayed ground handoff. |
| Use the recommended stack as the planning baseline | Nuxt / FastAPI / single-owner SQLite; immutable objects; local model candidate. No runtime performance is established. |
| Keep the main task independent of AI | Validated findings, evidence and allowed actions must work when inference fails. |
| Separate research, simulation and care | The public demo cannot connect to private operational records. |

## What this milestone does not settle

Clinical review, actual hardware qualification, full challenge resources and eligibility are open. This is a non-executable specification: no application, database migration, trained model or UI prototype was produced. All implementation cases in this package are Not run.

The current challenge and participant FAQ could not be retrieved on 20 October (502). Prior preparation restrictions remain the working constraint; this document does not certify that pre-event specifications are eligible for submission. Keep them as research notes until current rules are reconciled.

Evidence and cross-references: Baseline RQ03, RQ05, RQ07, RQ27, RQ83; ADR01, ADR08-12; G01-03. Sources W01-W06.
