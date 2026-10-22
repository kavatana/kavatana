# API development contract

Generated contract: `packages/contracts/openapi.json`. Refresh with `npm run contracts`. FastAPI serves the same schema at `/api/openapi.json`; no CDN-dependent documentation UI is required.

| Endpoint | Purpose |
| --- | --- |
| GET /api/health | Local simulation/version status |
| GET /api/workspace | A view scoped to the selected fictional actor |
| POST /api/commands | Validate a typed command and commit one atomic transition |

`X-CHNAI-Actor` accepts only `crew`, `primary`, `backup`, `ground`, `technical`. This is a local demonstration selector, **not authentication**. Commands also require `X-CHNAI-Request: local-simulation`. Cross-origin requests are rejected and the default development server binds to loopback. These measures are not a production access-control claim; a local caller can select any fictional role.

Each command includes `expectedVersion`, a UUID-style `idempotencyKey`, and a discriminated `command` object. Unknown fields and command names are rejected. Mutation responses return a current scoped `view` and a receipt containing `committedVersion`, `replayed`, and the key. They do not return a privileged internal domain result to a technical caller.

```json
{
  "expectedVersion": 0,
  "idempotencyKey": "example-command-key-0001",
  "command": {"name": "review.request"}
}
```

| Commands | Boundary |
| --- | --- |
| fixture.import, review.request | Existing care-scope rules; request must come from the crew member |
| assignment.offer, assignment.accept | Explicit offer, qualification/duty check and evidence-bound acceptance |
| review.record, assessment.correct, followup.complete | Available accepted owner and current evidence |
| packet.preview, packet.approve | Current review, current workflow context and exact expected hash |
| packet.deliver | Approved packet; simulated link and exact-byte integrity |
| ground.review | Only an addressed, received snapshot |
| duty.set, link.set, scenario.step | Technical simulation controls |

Ground views contain only received packet snapshots and ground review. They do not reveal unsent evidence, drafts or local correction flags. Technical views contain queue/duty metadata and counts, not medical values or notes. Onboard access depends on the offered/current assignment and care grant; edit access further requires acceptance, qualification and availability.

403 rejects role/ownership violations. 409 rejects conflicting revisions, changed retry payloads, stale previews or integrity conflicts. 422 rejects input/context errors. 503 reports local-service/storage unavailability. A client that loses a response must retry the **same body and key**, not create a new intent. After a confirmed 409, refresh, inspect the new state and consciously submit a new command.

There is no NASA device endpoint, public astronaut telemetry subscription, clinical model endpoint or background sync promise. The simulated adapter is identified as such in the retained records and interface.


## Research endpoints — v0.8

The operational technical view above still contains metadata only. A separate engineering registry uses `/api/research`, `POST /api/research/imports`, and per-import manifest/observation/issue reads. Its `technical` demo selector permits inspection of retained public research data without access to operational medical fields. See [Research ingestion](RESEARCH_INGESTION.md) for exact routes, fixed import body, query bounds and failure behavior. There is no arbitrary URL/file upload or clinical-namespace promotion endpoint.
