# CHNAI Crew Health mock MVP v0.6

A visual, browser-local demonstration of astronaut health evidence review, accountable onboard follow-up and delayed ground handoff. Fictional crew workflows and actual public research files have separate workspaces.

## Run and test

The deployed application is buildless HTML, CSS and JavaScript in `dist/`. Serve the directory with a local static server, or use the Sites preview workflow. No runtime packages or external service calls are required once assets have loaded. Run `npm test` for domain, research and simulation checks, and `npm run check` for syntax. There is no service worker or installed offline application; the Earth-link controls model a communication outage inside a loaded browser tab.

## Try the assessment-day episode

Open **Crew today → Replay assessment day → Load scenario**. Use **+15 seconds** for a controlled step or **Run replay** for automatic progression. A completed fictional record arrives at +00:15. Crew 02 is occupied with a separate mission task; Crew 06 is the available backup. These are authored scenario conditions, not a NASA duty roster.

1. Request onboard review. The request offers responsibility to the primary reviewer; it does not assign an accepted owner.
2. **Request a different reviewer → Crew 06 → Offer responsibility**. The offer has a reason and is bound to current evidence.
3. Open Crew 06's workspace and **Accept responsibility**. Reload the page to verify saved acceptance and simulated role/view restoration. The replay resumes paused.
4. Record an onboard context review and a named follow-up trigger. The accepted reviewer owns the follow-up.
5. Prepare and approve an exact ground handoff. The preview includes the fictional task, accepted owner, evidence revisions and pending follow-up. A changed owner or completed follow-up invalidates unreleased previews.
6. Advance to +01:30 for Earth reconnection and transit, then +02:30 for the modeled acknowledgement. Ground sees only received snapshots. Ground review and onboard follow-up remain separate.
7. Record ground review, then return to the accepted onboard owner and record the observed follow-up outcome. Neither completion nor receipt declares medical clearance.

The initial page retains a preloaded assessment for immediate exploration. Eight scenario presets include the occupied reviewer, unconfirmed wearer, nominal change, no threshold crossing, incompatible unit, missing baseline, recorder outage and local-link outage. The unconfirmed-wearer scenario preserves the record but withholds numeric comparison; it does not implement a real identity-reconciliation service.

**Research data → Load and check NASA files** imports two retained OSD-569 CSVs: 553 submitted rows, four public research IDs and 28 hemoglobin unit-label conflicts. They never become fictional crew records. The **12 isolated scenario-lab checks** are included in the 74-test Node suite, not additional tests.

## Implemented behavior

- Crew today connects the fictional task, record/device state, evidence quality, accepted owner and follow-through. The earlier health brief remains available.
- Explicit responsibility offers and acceptance; primary/backup duty availability, scoped inspection, pending-task transfer and assignment history. Qualification and authorization are fictional configuration.
- v0.5 browser-state migration preserves notes and approved packets, invalidates old unreleased previews, and asks for explicit acceptance without inventing historical acceptance.
- Automatic fictional intake, duplicate handling, recorder/LAN/node failure states, delayed acknowledgement and interrupted-transit retry.
- Actual source checksums, bounded CSV parsing, independent research namespace, original units/relative times and explicit normalization quarantine.

- Exact decimal comparison before display rounding. The example 39/50 is 78%, while 39.995/50 is 79.99% and remains below reference.
- Source and original scenario-time inspection, provenance labels, unknown uncertainty and visible unassessed domains.
- Review requests, assigned onboard review, explicit follow-up responsibilities and manually recorded outcomes.
- Immutable canonical packet snapshots, real SHA-256, exact approval, local queue, simulated acknowledgement and separate ground review.
- Revision append, stale-review/preview handling and historical released packets after a correction.
- Simulation role boundaries in the rendered UI. Ground reads received snapshots. Technical views show metadata rather than medical values.
- Browser-local persistence, fault controls for Earth, device link, local node and reviewer relationship, plus reset of this mock's state.

## Boundaries

All crew-workflow measurements and transport events are fictional. OSD-569 records are real public research observations shown only in the separate research workspace. The simulation role selector is not authentication. Browser storage is not the proposed backend database and may be cleared. No physical device, NASA flight-health API, LLM, production medical service or actual ground link is connected. Explanation wording uses deterministic templates. Nothing in the UI constitutes diagnosis, treatment, triage or EVA clearance. Clinical applicability, event eligibility and operational readiness are unconfirmed.

NASA V1 4003 provides the relative aerobic-capacity reference. Our fixture, workflow, interface and software design are independent CHNAI proposals. The fuller physical-schema and API design remain a separate engineering specification; this repository does not claim to implement its 42 tables or all 36 prior development specifications.

## Primary references

- https://www.nasa.gov/reference/4-0-human-performance/ — V1 4003 relative aerobic capacity; EVA requirements are separate.
- https://www.nasa.gov/reference/6-0-medical-operations/ — private and delayed medical communication.
- https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/ — useful information, explicit simulation mode and automation responsibility.
- https://www.nasa.gov/reference/standard-measures/ — longitudinal measurement domains.
- https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp — wearable/tablet/docking workflow; no flight API connection established here.

## AI assistance

Codex authored the mock with an Astra maximum-effort review of workflow and failure cases at the user's request. No AI-generated clinical advice, imagery or model inference runs in the application.

## Release evidence

- `docs/VALIDATION.md`: performed checks and remaining limits.
- `docs/test-results.txt`: latest automated run, 74 passing tests (including the 12 in-app contracts).
- `docs/DATA_PROVENANCE.md`: source files, exact digests, reuse boundary and normalization decision.
- `docs/AWARD_EVIDENCE.md`: lessons from five historical winners, observed product proof and remaining gaps.

The primary SIM-A02 and backup SIM-A06 can receive offers for Crew 03. Scoped read access, configured fictional qualification, current duty availability and accepted ownership are separate checks. This does not verify medical training or implement production authorization.

- `docs/MISSION_EPISODE.md`: the v0.6 state, UX and requirements handoff.
- `docs/previews/crew-today-v0.6.jpg`: checked desktop interface.
