# v0.7 verification — 22 October 2026

## Executed

| Check | Result | Scope |
| --- | --- | --- |
| Existing Node suite | 74 passed | Domain, source-byte/CSV checks, mission and scenario behavior; includes 12 in-app contracts |
| FastAPI/SQLite suite | 21 passed | Real on-disk SQLite and shared Node engine; pytest parametrization included in count |
| JavaScript syntax | Passed | Web modules, shared engine, scripts and Node tests |
| OpenAPI drift | Passed | Checked-in schema equals FastAPI's generated contract |
| Process reopening | Passed | A separate Python process restores accepted owner, pending follow-up and exact queued packet bytes |
| Backup and restore | Passed | SQLite online backup, integrity check, preserved owner/hash and overwrite refusal |
| Concurrent writers | Passed | One commit and one explicit revision conflict |
| Injected transaction failure | Passed | Aggregate, projections, domain audit and retry receipt all roll back |
| Retry after lost response | Passed | Same request/key returns original committed revision without duplicate action |
| Role-specific API responses | Passed | Ground sees received snapshots; technical response contains metadata; revoked assignment redacts retry response |

These are 95 automated test cases in total, not 95 clinical validations. A Starlette warning notes the installed TestClient's future migration away from httpx; it does not fail the checks. Dependencies are pinned in `api/requirements.lock`. GitHub CI is configured but has not been claimed as executed.

## Browser/runtime limit

The existing v0.6 browser mock previously passed its documented manual browser walkthrough. This release relocates its modules without changing those rules or interactions and rebuilds them into `dist/`.

The new API-connected workspace has **not completed browser interaction or visual QA**. The managed preview failed before serving it because its environment could not resolve the Python interpreter behind the local virtual environment. `sites-preview status` confirmed that preview was stopped. No successful browser run, screenshot or physical Mac test is inferred from the API integration suite. The local API is exercised via FastAPI TestClient and separate-process SQLite reopening.

The actual 16-inch M3 Pro, 18 GB machine remains the required next browser/runtime check. Source code, localhost startup instructions and the full manual episode are included. The static hosted Site remains the browser mock; it is not a hosted FastAPI backend.

## Unqualified

Real astronaut data/device APIs; clinical usefulness or safety; actor identity; encryption; actual network delivery; physical power-loss recovery; tablet/LAN access; high-volume waveform ingestion; full 42-table specification; LLM performance or medical behavior; all wider research/requirements cases; competition eligibility; winning an award or NASA adoption.

The evidence sources support the reference and workflow rationale. They do not certify this implementation or its fictional scenario.
