> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Qualification before commitment

Keep source-backed requirements, team targets and measured results separate.

| Qualification | Protocol / proposed pass rule | Current state |
| --- | --- | --- |
| Clinical applicability | Reviewer checks scenario, baseline/method, source scope, uncertainty and support action. Record reviewer role and limits. | Unreviewed |
| Contract and authority | All applicable WQ cases pass; no silent record loss, unauthorized action or stale release. | Not run |
| AI usefulness | Compare template and candidate on the same held-out case families; human-score factual support and task usefulness. Report all failures. | Not run |
| AI release floor | Any observed unauthorized action, altered numerical fact or invented citation blocks that candidate release; zero observed failures is not proof of safety. | Not run |
| Local performance | Record host/runtime/model versions; cold start externally offline; measure ingest/query/inference under concurrent load. | Hardware unconfirmed |
| Workload | Use the architecture's declared nominal and burst scenarios as synthetic stress tests; report latency, queue depth, memory and accounted records. | Planning assumptions |
| Interaction | Measure task completion, source comprehension, errors and interruption recovery on actual viewport/inputs. | No astronaut validation |
| Release | Reconcile challenge resources/rules, public-link behavior, license scope, simulation labels and restore evidence. | Pending |

The proposed review-summary p95 <= 1 second is a team performance target, not an AI-completion deadline or a claim of NASA certification. Model output quality and latency must both be measured. The first usable version may retain templates if the model fails qualification.

Do not tune prompts on the final evaluation cases and then report them as held out. Split variants by case family; for any real research training later, respect study/participant separation and permitted use. Preserve the baseline and failure taxonomy.

Evidence and cross-references: G02-G12 in architecture register; RQ41-48, RQ68-74, RQ83-84; AC33-58.
