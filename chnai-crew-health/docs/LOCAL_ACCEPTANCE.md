# Local browser and Mac acceptance

This is an unexecuted checklist for the actual 16-inch M3 Pro / 18 GB Mac. The API and client-transport tests do not establish browser usability or clinical validity. Use fictional data only. Keep this record with the exact source commit tested.

## Prepare once

Follow the project README setup, then run these commands from `chnai-crew-health/`:

```bash
npm run doctor
CHNAI_DB=.runtime/mac-acceptance-01.sqlite3 npm run dev
```

`doctor` records OS/architecture, CPU model, installed RAM, runtime and dependency versions, plus the source commit. It saves `.runtime/qualification/readiness-<time>.json`. It makes no network calls, installs nothing, and does not read the crew database, user name, serial number or other projects. A passing setup report is not a passing browser test. If the database filename already exists, its prior state is retained; use a new numbered filename for a fresh seed.

Open http://127.0.0.1:4173/ in Safari. Record Safari version, source commit, screen resolution and browser zoom. Start at 100% zoom. Inspect again at 200% and a narrow window: task controls, source evidence and packet content should remain reachable without obscured text. This does not certify an astronaut device size.

## Record the complete path

| ID | Action | Expected observation | Actual result |
| --- | --- | --- | --- |
| M01 | Open the local workspace | Crew 03; fictional 39/50 assessment; 78%; NASA source and unreviewed applicability visible | Not run |
| M02 | Request review; inspect primary reviewer | Primary is occupied and cannot accept; no ownership silently assigned | Not run |
| M03 | Return to crew; offer responsibility to Crew 06 with a reason | Offer visible; acceptance still required | Not run |
| M04 | Switch to backup; accept; record context and follow-up trigger | Crew 06 owns review and follow-up; no automatic clearance | Not run |
| M05 | Prepare handoff with “include onboard review note” left off | Exact payload has no onboard note; only intentional fields included | Not run |
| M06 | Inspect payload and hash; approve | Approved evidence is fixed; ground still sees no received packet | Not run |
| M07 | Technical: connect Earth; advance once, then four more 15-second steps | Technical has metadata only; acknowledgement arrives after modeled delay | Not run |
| M08 | Ground: record review; backup: inspect follow-up | Ground review is separate; onboard follow-up remains pending | Not run |
| M09 | Backup: record an observed outcome; restart the service with the same database | Owner, completed outcome and exact approved packet survive restart | Not run |
| M10 | Tab through controls; use keyboard to change role, expand payload and submit | Visible focus, labels and disabled controls; no keyboard trap; selected role identifiable | Not run |

The simulation's transport delay is an abstraction, not a real Earth link. This is not a medical procedure or authorization to act on actual health data.

## Connection and privacy checks

Keep the same terminal and database. Stop the service with Ctrl+C before a refresh or while attempting a fictional command. Restart with the identical `CHNAI_DB` value.

| ID | Action | Expected observation | Actual result |
| --- | --- | --- | --- |
| F01 | Stop service, then refresh | Old medical details disappear; unavailable state; no apparently current actionable values | Not run |
| F02 | Switch role while service is stopped | Previous role's content disappears immediately; selected actor and recovery controls remain visible | Not run |
| F03 | Attempt a command while service is stopped; reload the tab | Unconfirmed outcome and exact retry remain; a fresh command/role change is blocked | Not run |
| F04 | Restart, then retry that command | Original actor, body and key retained; either saved once or original receipt recovered | Not run |
| F05 | Open the same workflow in two tabs, change it in one, submit the older view | Explicit conflict; latest scoped view; entered text and unchecked note choice preserved where still authorized | Not run |
| F06 | After a failed preview request, inspect “include onboard review note” | Remains unchecked; inspect exact payload again before approval | Not run |
| F07 | Restore connection and refresh | Old network-error message clears; current API revision visible | Not run |

F03/F04 exercise an uncertain browser outcome. Stopping the server cannot reliably force the exact “commit succeeded but response was lost” timing; that boundary has an automated client replay test and a separate API idempotency test. Do not claim the physical timing case was reproduced unless actually observed.

If browser storage is unavailable, the app blocks new commands before sending them. If the stored retry record is damaged, preserve the tab and database for investigation; do not delete the retry record and assume its command never committed. A new, separately named database is appropriate for another fictional demonstration, not recovery of the original episode.

## Results and decision

Copy this file into `.runtime/qualification/` and fill actual results there; keep unchecked rows as Not run. Add the readiness report, browser/version, screenshots of any failures, and observed time from click to confirmed save for at least five actions. Record observed values without inventing a latency pass threshold. Do not commit the database or local qualification artifacts.

Before claiming the local workspace ready for a live demo, resolve failed interaction checks and record an end-to-end pass. Actual astronaut usability, medical applicability, encryption/authentication, device integrations, high-volume data ingestion and model qualification are separate work. LLM or 3D work should reuse this verified event flow after its acceptance evidence is available.
