# v0.7.1 verification — 22 October 2026

This iteration fixes client recovery and disclosure-choice handling on the API-connected interface. It adds a local setup report and an unexecuted Mac/browser acceptance checklist. Database rules and NASA reference semantics are unchanged.

## Concrete issues addressed

- A role change cleared the in-memory view but did not repaint until the request completed. The previous medical screen could remain visible during the wait. Every view fetch now clears displayed data immediately and emits loading state.
- A failed same-role refresh retained an old actionable view. A failed request now shows an unavailable state, keeping recovery controls accessible.
- FormData omits unchecked checkboxes. Rebuilding a failed preview form could therefore restore the old checked-by-default note option. The option now starts unchecked; field snapshots explicitly retain checked and unchecked values, with form identity scoped to packet/follow-up IDs.
- An uncertain command restored after reload had no retry control when the initial workspace fetch failed. Recovery controls now exist in the unavailable view and retry without needing a successful GET first.
- Browser storage failures could abort execution. New commands are now blocked before sending when their retry record cannot be saved. Damaged retry records are preserved for investigation.
- Reconnection left old error text visible; successful refresh clears it. Received responses must match the selected actor, and command receipts must match the saved key.
- Reviewer duty copy now uses the current projected duty. An unreconciled packet says “Awaiting receipt,” covering both queued and simulated in-transit work.

## Executed checks

| Check | Result | Scope |
| --- | --- | --- |
| Node suite | 86 passed | 74 existing domain/research/mission/scenario checks plus 12 client-transport/form-state checks |
| API/SQLite suite | 21 passed | Existing full episode, role scoping, durable restart, retry, backup, rollback, concurrency and contract checks |
| JavaScript syntax | Passed | Web, shared rules, scripts and tests |
| OpenAPI generation/drift | Passed | API version 0.7.1 and generated schema agree |
| Readiness utility | Passed in this Linux environment | Runtime/dependency match; versioned local JSON report written |
| Missing-Python readiness case | Expected blocked result, exit 1 | No success claim when configured Python path is unavailable |

There are **107 automated test cases**: 86 Node plus 21 API cases. The readiness utility checks are reported separately. The 12 in-app scenario cases are already included in the Node total. The unchanged Starlette TestClient/httpx deprecation warning is non-failing. The 12 new client tests use controlled fetch/storage responses; they are not browser or visual tests.

Test transcripts: `test-results-v071-node.txt`, `test-results-v071-api.txt`. CI verifies pushed revisions; its remote run is the authoritative CI result for that commit. The preceding v0.7 GitHub run succeeded: https://github.com/kavatana/kavatana/actions/runs/39762861863.

## Remaining acceptance work

The managed preview remains stopped after the previously recorded Python runtime resolution failure. There was no evidence of infrastructure recovery, so no repeat browser run or screenshot is claimed. New HTML/CSS, DOM event wiring, actual Safari interaction, keyboard focus, zoom and narrow-window behavior remain unverified. `LOCAL_ACCEPTANCE.md` lists 17 manual cases, all Not run.

`npm run doctor` captures general host/runtime information and dependency pin status without installing software, making network calls, reading medical records or collecting a username/serial number. Its Linux result is not evidence about the user's M3 Pro or 18 GB workload performance. A target-Mac readiness report and actual walkthrough results are still needed.

Role selection remains a fictional demo selector, not authentication. Client clearing and scoped API tests do not establish production privacy or security. All v0.7 limits on clinical qualification, devices, real ground links, LLM, 3D, wider schema, eligibility and NASA adoption remain.
