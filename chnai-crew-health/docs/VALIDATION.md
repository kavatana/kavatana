# Mock validation record — v0.6

Updated 22 October 2026. This record applies to this browser-local mock only.

## Automated checks

The Node test suite covers exact arithmetic and threshold boundaries, invalid numeric inputs, missing and incompatible context, namespaces and provenance, original relative times, intake and action deduplication, hash correctness against Node crypto, exact-payload approval, stale and tampered previews, corrections, immutable released packets, revoked relationships, Earth/LAN/node faults, received-only ground access, technical/crew scope, independent follow-up and JSON restoration.

The final run result is recorded in `docs/test-results.txt`. This does not certify the proposed production backend or the earlier 36 application-case specifications. Clinical review, real hardware, actual Mac resource/load tests, browser quota exhaustion and mobile-device testing remain outstanding.

## Earlier baseline browser walkthrough (retained history)

At the managed desktop preview:

1. Started a fresh walkthrough with Crew 03 current assessment absent.
2. Imported the fictional completed assessment and observed 39/50 = 78%, original relative times and unreviewed clinical applicability.
3. Requested onboard review, switched role and saved the context note with SIM-A02 and a named follow-up event.
4. Created a frozen purpose-limited preview with a SHA-256 digest and approved it into the offline queue.
5. Reloaded the page and confirmed the queued packet remained.
6. Switched to ground before receipt and observed that no packet was available.
7. Reconnected the simulated Earth link and recorded a simulated acknowledgement. Ground review remained pending.
8. Recorded ground review separately. The onboard follow-up remained pending with its owner and trigger.
9. Corrected the local current assessment to 39.995 and observed 79.99%, below reference, and new-review readiness.
10. Switched to ground and observed the historical received snapshot still contained 39 and 78%.
11. Switched to the technical role and inspected its metadata-only view.

The browser preview runs in a cloud QA environment, not the user's MacBook. Responsive styles are implemented; no claim is made that NASA specifies this exact viewport or that mobile-device QA passed.

## Independent design review

Astra reviewed the specifications and prioritized separation of arithmetic from clinical qualification, independent care/transport states, evidence-version binding, exact preview hashes, role-specific information and honest simulation time/persistence labels. These principles informed the implementation. That review was not clinical or NASA approval.

## v0.5 automated result

60 of 60 Node tests passed. This includes the 28 existing domain tests, eight research importer checks, 12 additional replay checks, and 12 scenario-lab contracts. The in-app 12/12 result is a subset of this suite, not 12 additional independent tests. Syntax checks passed for all five JavaScript modules. The first new test run exposed a test-fixture property mistake (`crew.subjects` instead of the exported seed roster); that test was corrected before the passing run.

New coverage verifies pinned file bytes using independent Node crypto, CSV quoting/malformed-input rejection, fail-closed checksum mismatch, source row counts, all 28 hemoglobin unit conflicts, research/crew separation, missing series, paused clocks, automatic intake without approval, duplicate input, missing/unit-incompatible context, recorder/LAN/node outages, delayed receipt, interrupted retry, packet tampering, deterministic repeated inputs and persistence of manual faults after scripted recovery.

## v0.5 browser walkthrough performed

At the managed desktop preview on 21 October 2026:

1. Visually inspected the new crew brief, baseline/current plot and source context.
2. Loaded actual bundled research files. The browser verified checksums and displayed 553 submitted rows, four participants, 28 wide rows and 28 unit conflicts.
3. Selected hemoglobin and verified original g/dL values. Selected an absent participant/analyte combination and observed an empty state rather than inferred zeroes.
4. Ran the 12 isolated checks and observed 12/12 passed.
5. Loaded and ran the main replay. Observed intake at +00:15, duplicate recognition at +00:30 and modeled Earth reconnection at +01:30.
6. Requested review, switched to the onboard role, saved context/owner/trigger, inspected the exact packet and approved it.
7. Resumed replay; observed transit then receipt 60 virtual seconds later. Ground still required an explicit review.
8. Recorded ground review and verified onboard follow-up stayed pending. Recorded the owner's explicit outcome and verified no pending task remained.
9. Verified completed-state labels and corrected event times after page reload. Synthetic timestamps now display virtual elapsed time, separate from the real browser save time.
10. Loaded the incompatible-unit preset, advanced its clock, and verified that comparison was withheld.

Observed presentation defects were fixed: the completed follow-up badge, completed-brief wording, timezone-dependent event display and a hardcoded compatible-unit caption. Manual delivery is hidden during a scenario replay so the replay view does not silently bypass its modeled delay.

## Qualification still not performed

No actual MacBook, tablet, physical monitor, flight API, production database, authentication system, local language model or network transport was tested. CSS has responsive breakpoints, but this release does not claim mobile-device, astronaut, clinical or full accessibility validation. S12 is serialization, not crash/backup recovery. S20 is packet-integrity rejection, not a security penetration test. All earlier engineering/scenario specifications retain their own status unless their narrower implemented contract is explicitly named here.


## v0.6 assessment-day release — 22 October 2026

74/74 Node tests passed, including the existing 12 in-app contracts. Six JavaScript modules passed syntax checks. Fourteen new tests cover unaccepted assignment, occupied/wrong/unqualified recipient, idempotent acceptance, scoped access changes, pending-task reassignment, stale handover after evidence correction, preview invalidation after ownership/outcome changes, duty controls, grant/local-failure rejection, unconfirmed wearer binding, historical evidence after recorder loss, v0.5 migration, serialization of the backup's accepted responsibility and fail-closed UI rendering.

The previous domain/replay setup helpers now explicitly accept assignments before testing later actions. This is a changed workflow precondition, not a bypass of the acceptance requirement.

Browser walkthrough performed in the managed desktop preview:

1. Loaded the occupied-primary assessment day; stepped to automatic intake at +00:15.
2. Requested review and observed unaccepted responsibility. Opened the primary's workspace and observed a disabled acceptance action while occupied.
3. Returned to crew, offered the case to the backup with a reason, opened Crew 06 and accepted.
4. Reloaded and observed the same backup role, view, evidence and accepted ownership; replay paused.
5. Saved context review and a follow-up owned by SIM-A06. Previewed the exact packet including task, owner and assignment ID, then approved.
6. Switched to ground before receipt: no packet available. Stepped to link return at +01:30, then acknowledgement at +02:30. Ground then saw the received snapshot.
7. Recorded ground review; onboard follow-up remained pending. Saved the backup's explicit outcome; completion did not change clinical applicability.
8. Inspected technical controls: duty and transport metadata, no medical values or notes.
9. Loaded the unconfirmed-wearer scenario. The record arrived but comparison remained withheld. No numeric retained-capacity result appeared.

Visual inspection corrected progress-step order, a coordinator avatar, completed follow-up wording, coverage labels when comparison is withheld, and a transit label. Ground snapshot labels no longer infer an unsent local correction. The checked screenshot is `previews/crew-today-v0.6.jpg`.

This is desktop browser functional/visual QA, not astronaut usability testing or validation of the user's Mac. No tablet/mobile viewport qualification, hardware tests, clinical review, actual network delay, durable backend, production access control, LLM or 3D was added. Ground review is a separate event in shared browser state; a return communication channel is not independently simulated. Reload persistence and state serialization do not establish crash recovery or backup durability.
