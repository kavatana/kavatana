# Ka Vatana

[![CI](https://github.com/kavatana/kavatana/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/kavatana/kavatana/actions/workflows/ci.yml)

Software Engineering student in Cambodia building a private startup portfolio
across market access, education, cybersecurity, SME operations, trading tools,
and student opportunity infrastructure, alongside public AI-native developer
tooling.

I am early in my career, but I am deliberately training like a product engineer:
ship working systems, document tradeoffs, protect user trust, and use AI agents
as engineering leverage rather than as a substitute for judgment.

## Current Direction

- Building seven startup-track products under a Cambodia-first product lab
- Turning local market problems into small, testable software systems
- Practicing AI-native engineering: specs, agent reviews, test loops, and clear
  implementation logs
- Publishing reusable open-source workflow tools when they can help other
  student and early-stage teams
- Keeping future-startup source code private while publishing honest public
  proof of work

## Public Proof of Work

- **Portfolio case studies:** [kavatana.me](https://kavatana.me) documents the
  product surfaces, screenshots, tradeoffs, and build direction behind my work.
- **Studio OS demo:** [kavatana-studio-os.vercel.app](https://kavatana-studio-os.vercel.app)
  is the neutral public mode of a private AI-native command center. The public
  build keeps state local and disables live connectors; the private operator
  adds bounded workspace context and a read-only GitHub organization queue.
  The [human-agent control-plane case study](docs/STUDIO_OS_ARCHITECTURE.md)
  documents its authority, context, privacy, and verification boundaries.
- **Portfolio concierge:** the site-wide guide answers and routes from committed
  public evidence in the visitor's browser. It cites approved sources, keeps
  session context in the current tab, makes no model or private-tool call, and
  follows the [city-wide concierge contract](docs/AI_CONCIERGE_ARCHITECTURE.md).
- **CHNAI LAB profile:** [github.com/chnai-lab](https://github.com/chnai-lab)
  presents the student-run product studio behind the broader portfolio.
- **Collaboration system:** CHNAI LAB repositories use canonical agent guides,
  contribution and security boundaries, team ownership, and CI so human and AI
  collaborators enter through the same reviewable workflow.

## Open-Source Proof

[`ai-native-team-starter`](https://github.com/kavatana/ai-native-team-starter)
is a vendor-neutral GitHub template for teams using coding agents without giving
up human ownership, security boundaries, or verification discipline. The public
[`v1.0.0` release](https://github.com/kavatana/ai-native-team-starter/releases/tag/v1.0.0)
includes agent instructions, issue and pull request forms, onboarding and
security guidance, a zero-dependency readiness scanner, regression tests, and
pinned GitHub Actions verification.

Read the [open-source engineering case study](docs/OPEN_SOURCE.md) for the
problem, design decisions, safety boundary, and verification evidence.

## Runnable Verification

This profile is also a public Nuxt application, not only a narrative README.
Its repository policy, claim boundaries, content schema, media references,
concierge behavior, credential patterns, and pinned CI dependencies are checked by a
[zero-dependency Python verifier](scripts/verify_repo.py) with
[regression tests](tests/test_verify_repo.py).

```bash
npm ci
npm run verify
```

The same command runs in GitHub Actions and produces the static portfolio build.

## Startup Portfolio

Most source repositories are private because these are intended startup assets,
not throwaway class projects. Public details are documented at a product and
architecture level.

| Product | Problem Space | Current Thesis |
| --- | --- | --- |
| **BayonHub** | Student opportunity infrastructure | Help Cambodian tech students find internships, freelance work, jobs, and portfolio-building opportunities. |
| **Svaeng Yul** | Khmer tech education | Khmer video self-study for AI engineering, data science, cybersecurity, software engineering, and related fields. |
| **Chomkar** | Agricultural market access | Connect buyers and farmers before harvest demand is locked in, reducing hidden coordination power from middlemen. |
| **Sat Digital** | Community cybersecurity | Rentable cyber guard tools for Telegram communities, groups, and websites. |
| **Vantrex** | Trading software | Signal and indicator tooling across Forex, crypto, and model-assisted trading workflows. |
| **PHSAROS** | SME operations | Operating system for restaurants, coffee shops, marts, staff, inventory, and finance. |
| **CHNAI LAB** | Student-run product studio | A Cambodian student team building owned products with real responsibility, equity, and operating discipline. |

Read more:

- [Startup portfolio map](docs/STARTUP_PORTFOLIO.md)
- [Studio OS human-agent control plane](docs/STUDIO_OS_ARCHITECTURE.md)
- [AI concierge and product-agent city](docs/AI_CONCIERGE_ARCHITECTURE.md)
- [Open-source engineering proof](docs/OPEN_SOURCE.md)
- [AI-native engineering workflow](docs/AI_NATIVE_WORKFLOW.md)
- [GitHub account cleanup record](docs/GITHUB_ACCOUNT_CLEANUP.md)
- [Repository agent contract](AGENTS.md)

## Engineering Stack

TypeScript, JavaScript, Vue, Nuxt, React, Next.js, Node.js, Python, GitHub
GraphQL, Supabase, PostgreSQL, Cloudflare, Vercel, GitHub Actions, and
AI-assisted development workflows.

## How I Work

- **Product first:** start from a real user, workflow, and failure mode.
- **Evidence over hype:** document what is shipped, what is simulated, and what
  still needs validation.
- **Private by default for startups:** protect source code, secrets, and product
  strategy until a project is ready for public release.
- **AI-native, not AI-blind:** use agents for speed, review, research, and
  implementation support, then verify outputs with tests, code review, and
  manual judgment.
- **Bounded authority:** give agents the minimum context and permissions needed,
  and keep consequential product, security, deployment, and financial actions
  under human control.
- **Readable systems:** prefer clean architecture notes, small commits, and
  decisions that a future teammate can understand.

## Contact

- Portfolio: [kavatana.me](https://kavatana.me)
- GitHub: [github.com/kavatana](https://github.com/kavatana)
- LinkedIn: [Ka Vatana](https://www.linkedin.com/in/ka-vatana-99b85440a/)
