# Claude Handoff — Project Cards, Premium Case Studies, Backend Deployment Positioning

Owner request, 2026-07-01:

> For project cards, remove project photos. Make the cards feel premium, text-first, and clickable. The viewer should click the project and see a Visit button. Make project content more detailed and easy to understand. Show that Ka can build/deploy backend systems too, with a learning path toward Azure/AWS backend hosting and static frontend deployment.

## Product Direction

Make the projects area feel like a premium engineering portfolio, not a screenshot gallery.

The card should sell the project through:
- Clear problem
- Builder role
- What was built
- Backend/deployment proof
- Outcome or current status
- A clean `View case study` action

Do not lead with project images on cards. The card should feel like a polished case-study index.

## Important Honesty Rule

Do not overclaim Azure/AWS production backend experience unless it is actually deployed and verified.

Good wording:
- “Backend deployment direction”
- “Currently studying Azure/AWS backend hosting”
- “Next target: static frontend + hosted API backend”
- “Existing backend-adjacent proof: server actions, Postgres, Supabase, RLS, Neon, Prisma, server-side scoring”

Avoid wording like:
- “Expert AWS backend engineer”
- “Production Azure backend deployed”
- “Enterprise cloud architect”

The portfolio should make companies think: this student is serious, can already reason about backend systems, and is actively moving toward cloud deployment.

## Files To Edit

Primary UI:
- `components/FlagshipProjectCard.vue`
- `pages/projects/index.vue`
- `pages/projects/[slug].vue`
- `components/ProjectHero.vue`
- `components/ProjectScreenshots.vue`
- `components/ProjectStack.vue`
- `components/ProjectResults.vue`

Project content:
- `content/projects/chomkar.json`
- `content/projects/bayonhub.json`
- `content/projects/phsaros.json`
- `content/projects/svaeng-yul.json`
- `content/projects/studio-os.json`
- `content/projects/kavatana-portfolio.json`
- `content/projects/cyber-arena-team-os.json`

Types/composables:
- `types/content.ts`
- `src/types/content.ts`
- `composables/useProjects.ts`
- `composables/useProject.ts`

Optional supporting sections:
- `content/build-directions.json`
- `components/BuildDirections.vue`
- `pages/about.vue`
- `content/about.json`

## Card Redesign Requirements

In `components/FlagshipProjectCard.vue`:

1. Remove the visible cover image block from cards.
2. Keep the whole card clickable to `/projects/[id]`.
3. Make the card layout text-first and dense but elegant.
4. Add a compact “proof” area with 2-3 bullets from each project.
5. Add a “Deployment / backend” line where available.
6. Show primary action: `View case study`.
7. If `liveUrl` exists, do not put the external Visit button on the card unless the card design can handle it cleanly. The user asked visitors to click in and see the Visit button there.
8. Keep status/year/role visible.
9. Avoid giant decorative cards. Keep border radius modest and premium.

Suggested card structure:

```text
[status] [year] [role]
Project Title
One strong paragraph: problem + what it proves.

Proof
- Server-side scoring / Postgres / Prisma / Supabase / RLS / etc.
- Product outcome / demo status / hackathon result.

Deployment
Vercel + Neon Postgres / Supabase / Static PWA / Planned AWS or Azure API

[stack chips, max 5]                    View case study ->
```

## Data Model Suggestion

Extend `Project` in `types/content.ts` and `src/types/content.ts`:

```ts
export interface Project {
  // existing fields...
  cardSummary?: string
  proofPoints?: string[]
  deployment?: {
    frontend?: string
    backend?: string
    database?: string
    hosting?: string
    status?: 'deployed' | 'demo' | 'planned' | 'local-only'
  }
  backendProof?: string[]
  architectureNote?: string
}
```

Use these fields to keep the card and detail page clean.

## Project-by-Project Content Direction

### Chomkar.com

Positioning:
- Strongest current proof project.
- Co-founder, product builder, full-stack engineer.
- Market access for farmers.
- KasekorX AI voice-to-marketplace → Chomkar.com.
- Top 2 at Turing Hackathon Cycle 10.

Do not overclaim backend deployment if it is not publicly verified yet.

Suggested proof:
- “Top 2 at Turing Hackathon Cycle 10.”
- “Mapped farmer and buyer flows around market access.”
- “Turned KasekorX AI voice-to-marketplace concept into Chomkar.com direction.”

Deployment line:
- `Active product build; backend/deployment details to be documented as the product matures.`

### BayonHub

Positioning:
- Khmer-first marketplace learning project.
- Strongest architecture story for offline-first frontend and planned backend.
- Shows thinking about local Cambodian network conditions.

Suggested proof:
- “Offline-first marketplace demo with localStorage fallback.”
- “Planned Express/Postgres backend with Redis and Cloudflare R2.”
- “Validated with frontend/backend lint, production builds, smoke tests, audits, and pre-deploy checks.”

Backend positioning:
- Honest: backend exists in learning/project architecture, but public frontend currently works without backend.
- Strong next step: connect Express + Postgres behind the frontend and deploy backend to AWS/Azure.

Deployment line:
- `Frontend demo on Vercel; next target is a hosted API backend with Postgres storage.`

### PhsarOS

Positioning:
- Best “I can build backend systems” proof right now.
- Full-stack POS with database, server actions, transactions, Prisma, Neon Postgres.
- This should feel like serious backend ability.

Suggested proof:
- “Atomic checkout transaction: sale + sale items + stock decrement.”
- “Prisma 7 + Neon Postgres relational schema.”
- “Server-side Zod validation on mutations.”
- “Daily self-reset cron keeps public demo clean.”

Deployment line:
- `Vercel + Neon Postgres + Prisma server actions.`

### Svaeng-Yul

Positioning:
- Strong backend/security/AI proof.
- Server-side scoring, Supabase, RLS, AI guardrails.
- Healthcare education use case.

Suggested proof:
- “Server-authoritative quiz scoring keeps answers off the client.”
- “Supabase Auth/Postgres/RLS live mode plus credential-free demo mode.”
- “AI hints are filtered so they cannot reveal the answer.”

Deployment line:
- `Next.js demo; optional Supabase backend with Auth, Postgres, and RLS.`

### Studio OS

Positioning:
- Not backend proof; it is privacy/local-first proof.
- Show it as a deliberate no-backend architecture decision.

Suggested proof:
- “Local-first state engine with defensive localStorage parsing.”
- “Build-flagged public demo prevents private data from shipping.”
- “Web Audio ambient engine, no bundled audio files.”

Deployment line:
- `Static/offline-first frontend; intentionally no backend.`

### Kavatana Portfolio

Positioning:
- The portfolio itself is a deployed Nuxt content system.
- Show SEO, structured content, deployment discipline.

Suggested proof:
- “Nuxt 4 content-driven portfolio.”
- “SEO/OG/sitemap and accessible navigation.”
- “Direct Vercel production deployment to kavatana.me.”

Deployment line:
- `Nuxt on Vercel, custom domain kavatana.me.`

### Cyber Arena Team OS

Positioning:
- Keep it secondary or private/local-only.
- Useful as security study habit, not a public flagship.

Suggested proof:
- “Local Python CLI for CTF learning structure.”
- “Private/local-only; not deployed.”

Deployment line:
- `Local-only; intentionally not public.`

## Detail Page Requirements

The project detail page should make each project easy to understand without requiring screenshots.

In `pages/projects/[slug].vue`:
- Consider removing or hiding the cover image frame.
- Consider removing `ProjectScreenshots` from the default case-study flow, or move it below all writing as optional “Visual archive.”
- Add sections:
  - `What this proves`
  - `Architecture`
  - `Backend / deployment`
  - `What I built`
  - `What I learned`
  - `Next backend step`
- Keep `Visit Product` button in `ProjectHero.vue` for live projects.

The user’s preference: visitor clicks the project, then sees the Visit button.

## Backend / Azure / AWS Positioning

Add a section somewhere visible, probably Projects page after cards or About page:

Title ideas:
- `Backend Deployment Direction`
- `Deployment Systems I’m Building Toward`
- `Cloud Backend Track`

Suggested copy:

```text
I am moving from frontend-only demos toward complete deployment systems: static frontends, API backends, hosted databases, environment variables, auth, storage, monitoring, and safe deployment workflows. My next study target is to deploy a backend API on Azure or AWS and connect it to a static frontend.
```

Suggested bullets:
- `Static frontend deployment: Vercel / Azure Static Web Apps / AWS Amplify or S3 + CloudFront`
- `Backend API deployment: Azure App Service / Container Apps or AWS App Runner / ECS / Lambda`
- `Database: Postgres via Neon, Supabase, Azure Database for PostgreSQL, or AWS RDS`
- `Storage: Cloudflare R2, Azure Blob Storage, or AWS S3`
- `Operational basics: env vars, migrations, logs, health checks, rollback, and secret handling`

Again, label this as a study/build track unless there is a live Azure/AWS deployment.

## Suggested Implementation Steps

1. Extend `Project` types with `cardSummary`, `proofPoints`, `deployment`, `backendProof`, and `architectureNote`.
2. Add those fields to each project JSON.
3. Redesign `FlagshipProjectCard.vue` to remove image rendering and use the new fields.
4. Update `pages/projects/[slug].vue` to make the detail page text-first and architecture-rich.
5. Keep `ProjectHero.vue` Visit Product button.
6. Add backend/cloud deployment direction section, preferably on `/projects`.
7. Remove or hide screenshot-heavy sections from the main flow.
8. Run verification.
9. Deploy to Vercel production.

## Verification Commands

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

After deploy, verify:

```bash
curl -ILs https://www.kavatana.me/projects
curl -ILs https://www.kavatana.me/projects/phsaros
curl -ILs https://www.kavatana.me/projects/svaeng-yul
curl -Ls https://www.kavatana.me/projects | rg "Backend|Deployment|View case study|PhsarOS|Svaeng-Yul"
```

## Acceptance Criteria

- Project cards show no screenshots/images.
- Cards feel premium, text-first, and easy to scan.
- Visitors click into a case study to see `Visit Product`.
- Every flagship project has more detailed, understandable content.
- Backend/deployment proof is visible but honest.
- Azure/AWS backend hosting is framed as a serious current study/build direction unless there is a live deployed backend.
- Typecheck, lint, and production build pass.
- Production is deployed and live on `www.kavatana.me`.
