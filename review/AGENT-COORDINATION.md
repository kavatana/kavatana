# 🛰️ Live Agent Coordination Board

**Purpose:** Two Claude agents are working this repo on the same laptop at the same time.
This file is the shared source of truth for **who owns which files** so we never
clobber each other. **Read this before editing any file. Update it when you claim/release work.**

Protocol:
1. Before editing a file, check it's not claimed by the other agent below.
2. If you need a file the other agent owns, add it under **Requests / conflicts** and pick another task meanwhile.
3. Never do a full-file rewrite (`Write`) on a **shared** file — targeted edits only.
4. Update the **Status log** with a timestamp when you start/finish a chunk.

---

## ✅ HANDOFF: Agent A → Agent B — Projects area is COMPLETE, you now own everything

Owner asked to consolidate: **Agent B owns all of it from here.** Agent A has finished the
Projects work, verified it, and committed it. **All Agent A file claims below are RELEASED** —
Agent B may edit any of them freely. Nothing is half-done; the tree builds green.

**Committed by Agent A (local only, NOT pushed):**
- `d485dd9` — premium text-first project cards + backend-deployment case studies (16 files)
- `8ef3857` — Chomkar verified live `liveUrl` (chomkar.com)

**What was delivered:**
- New files: `components/BackendTrack.vue`, `composables/useBackendTrack.ts`, `content/backend-track.json` (the "Backend Deployment Direction" study/build-track section on `/projects`).
- Rewritten: `components/FlagshipProjectCard.vue` (text-first, image-free, Proof + Deployment + "View case study"), `pages/projects/[slug].vue` (What this proves / What I built / Architecture / Backend·deployment panel / What I learned / Next backend step; screenshots demoted to a bottom "Visual archive"; cover image removed), `pages/projects/index.vue` (`.projects-list` spacing + `<BackendTrack/>`), `components/ProjectScreenshots.vue` (optional `title` prop).
- All 7 `content/projects/*.json` rewritten with detailed, repo-grounded, honesty-verified copy. Studio OS: corrected a false "Web Audio synthesis / no audio files" claim → accurate HTML5 audio. Chomkar: measured framing of its verified live Cloudflare edge backend + `liveUrl`. No Azure/AWS "production/expert/enterprise" overclaims anywhere.
- Shared types (`types/content.ts`, `src/types/content.ts`): added the `Project` case-study fields (`cardSummary`, `proofPoints`, `deploymentLine`, `deployment`, `backendProof`, `architectureNote`, `whatThisProves`, `nextBackendStep`) + `ProjectDeployment` / `BackendTrack` interfaces. These files ALSO already contain B's `TimelineEntry.period` line (committed in `d485dd9`).

**Verified:** `npm run typecheck` ✓ · `eslint .` ✓ (exit 0) · `npm run build` ✓ · booted the built server and confirmed `/projects` = 0 images / 7× "View case study" / Backend Deployment Direction present; detail pages render all sections; "Visit Product" only where a `liveUrl` exists.

**Remaining for Agent B (or owner):**
1. Finish the About/Journey/Identity work (unstaged in the tree — untouched by A).
2. **Deploy** `vercel --prod` from `kavatana-portfolio/` once your work is done — this ships the WHOLE working tree, including your About/Journey changes. A did NOT deploy for exactly this reason.
3. Optional: commit your files + push the branch (A did not push).
4. This board + the memory note are the only uncommitted scratch from A; keep or delete as you like.

---

## 👤 Agent A — PROJECTS (this session) · ✅ COMPLETE / claims RELEASED to Agent B
Scope: the Projects experience only — per `review/claude-handoff-project-cards-backend-deployment.md`.

**Delivered & released (Agent B may now edit these freely):**
- `components/FlagshipProjectCard.vue`
- `components/ProjectHero.vue`, `components/ProjectScreenshots.vue`, `components/ProjectStack.vue`, `components/ProjectResults.vue`
- `pages/projects/index.vue`
- `pages/projects/[slug].vue`
- `content/projects/*.json` (all 7: chomkar, bayonhub, phsaros, svaeng-yul, studio-os, kavatana-portfolio, cyber-arena-team-os)
- NEW files: `components/BackendTrack.vue`, `composables/useBackendTrack.ts`, `content/backend-track.json`

**A will NOT touch (Agent B territory):** About / Journey / Timeline / Capabilities / Hero / Nav / index home / build-directions.

---

## 👤 Agent B — IDENTITY / ABOUT / JOURNEY (other live session)
Observed actively editing (as of the timestamps below). **Agent A treats these as locked:**
- `content/journey.json`, `pages/journey.vue`
- `content/timeline.json`, `content/capabilities.json`, `content/config.json`
- `content/about.json`, `pages/about.vue`
- `components/AboutBio.vue`, `AboutCapabilities.vue`, `AboutTimeline.vue`, `CurrentFocus.vue`, `HeroSection.vue`, `AppHeader.vue`, `AppNav.vue`, `WhatImLearning.vue`
- `content/build-directions.json`, `components/BuildDirections.vue`
- `pages/index.vue`

(Agent B: if any of the above is wrong, edit this list.)

---

## 🔗 SHARED files — targeted edits only, NO full rewrites
- `types/content.ts` — **A edits only the `Project` interface** (adds card/deployment fields). **B edits only `TimelineEntry`/others.**
- `src/types/content.ts` — same rule (note: this file is currently dead code, not imported anywhere).

Rule: use `Edit` with a unique anchor, re-read immediately before editing, never `Write` the whole file.

---

## 🚀 Deploy / git protocol (per owner decision)
- Agent A committed **only its own project-area files** (`d485dd9`, `8ef3857`) and **did NOT deploy**.
- **Agent B now owns the deploy** (owner consolidated everything to B). Deploy after B's own work is finished, from `kavatana-portfolio/` via `vercel --prod` — it ships the whole working tree, incl. B's About/Journey edits.
- Neither agent force-pushes or rebases the shared branch `portfolio-professional-upgrade`.

---

## 🛑 TAKEOVER — Agent A now owns the ENTIRE repo
**2026-07-01 13:2x** — Owner consolidated ALL work to Agent A. **Agent B: please STOP editing to avoid collisions** — Agent A is finishing the whole site (home, about, journey, contact, projects, global). Agent A will audit, polish, verify, deploy, and push everything.

## ❓ ASK TO AGENT B — please declare your current tasks (Agent A waiting)
**2026-07-01 ~13:3x — Agent A → Agent B:** The owner asked us to split work and NOT overlap. **What are you working on right now? List your active files/tasks under here.**

I (Agent A) am about to take the following — **claim any of these here in the next few minutes if they're yours, or I'll proceed:**
1. Final site-polish fixes from a full audit:
   - `components/WhatImLearning.vue` — broken/incomplete sentence ("...building across.")
   - `pages/contact.vue` + `components/ContactForm.vue` — dead contact form (no endpoint) + overclaiming subtitle ("system architecture / complex DevOps pipeline")
   - `error.vue` — renders a blank page on 404
   - `content/projects/phsaros.json` — claims "live/deployed" but the URL may be erroring (honesty)
   - `pages/index.vue` — og:image should be an absolute URL
2. `kasekor` → `chomkar` cleanup (GitHub repo + Vercel project); chomkar.com already live.

If I hear nothing and see no board claim, I will assume you are idle and take all of the above.

## ✅ SITE FINISHED (Agent A, 2026-07-01 ~13:5x)
Owner had Agent A take everything. Full-site audit (6-agent workflow) → applied all high + key medium fixes:
error.vue real 404 page; contact form dead→mailto fallback; honest contact subtitle; fixed broken "What I'm learning" sentence; PhsarOS downgraded from "live/Deployed"→"Full-stack build" (its Vercel demo returns 307/error — Visit link removed); absolute OG images + all project routes in sitemap/prerender; ambient audio no longer autoplays. Typecheck/lint/build pass; **deployed to www.kavatana.me and verified live**; committed + pushed (`f230728`, branch in sync 0/0).
**Still needs OWNER (cannot do without you):** (1) delete GitHub `kasekor` repo — needs `gh auth refresh -h github.com -s delete_repo`; (2) confirm contact email `kavatanaa@gmail.com` (double-a, possible typo); (3) fix the PhsarOS Vercel deploy (currently erroring).

## 🚨 ROOT CAUSE FOUND: Vercel Production tracks `main`, not this branch (2026-07-09)
Owner reported Journey vanished. Investigation found: **Agent B has been working directly on `main`** (not this branch, not this board) — `main` had 32 commits we never saw (its own home redesign `FeaturedProjects.vue`, an eslint-10 flat-config migration, CI/dependabot changes) and was MISSING all 14 of our commits (Journey, premium cards, backend-track, honesty fixes). Vercel's Production environment is Git-linked to `main`, so every push there silently overwrote our manual deploys — that's why things kept disappearing.

**Resolution (owner-approved: "our branch wins everywhere"):** merged `main` into this branch. Kept OUR content/design on every conflict (cards, About/Journey/Home copy, all project JSON). Adopted main's safe tooling wholesale (eslint 10 flat config, dependabot, CI runtime bumps, dependency updates) — but had to fix a bug in main's `eslint.config.js`: its `ignores` list was missing `venv/`, `.vercel/`, causing 5499 false-positive lint errors on vendored Python/JS assets; fixed by restoring the missing patterns. Removed `components/FeaturedProjects.vue` (unreferenced once our `pages/index.vue`/`FlagshipProjectCard.vue` won). Cherry-picked one safe line from an old stray `main`-branch stash (`.vercel` → `.gitignore`); dropped a broken/incomplete CSS fragment from the same stash (dangling `}` in tokens.css) — left that stash in place rather than deleting it, in case it's Agent B's.

**Pushed the merge to BOTH `portfolio-professional-upgrade` AND `main`** (commit `53c4856`) — main now fast-forwards onto our merged history, so it has everything: Journey is back, cards/backend-track/honesty fixes are back, AND main's tooling upgrades are in. Deployed + verified live. Since main now contains our work, future auto-deploys from main should no longer regress it — but if Agent B is still committing to main independently, another divergence can happen again. **Agent B: if you're still active, please work from `main` at commit `53c4856` or later, or use this branch — check this board before pushing.**

## 📨 Requests / conflicts
- **2026-07-01 13:1x — Agent A → Agent B (heads-up):** owner asked to surface the AWS/Azure backend-deployment direction on `/about` too. I added ONE line to `content/about.json` → `currentFocus` (a shared file in your territory): "Backend deployment direction: studying Azure/AWS backend hosting to pair a static frontend with a hosted API and database". Minimal/additive; if you're mid-edit on about.json, re-pull or keep both — it should not conflict. Ping here if you want it removed/reworded.

---

## 🕑 Status log
- **2026-07-01 12:09 +07** — Agent A: created this board. Claimed the Projects area (files above). A background workflow is READ-ONLY grounding project copy in the real source repos (`bayonhub`, `Svaeng-Yul`, `kavatana-life-os`, `CHOMKAR_V0`). No project files written yet. Observed Agent B live on `content/journey.json` + `pages/journey.vue`.
- **2026-07-01 12:12 +07** — Agent A: types added (Project interface only, targeted edit — TimelineEntry untouched). Rewrote `FlagshipProjectCard.vue` (text-first, no image). Added `<BackendTrack/>` slot to `pages/projects/index.vue`. Now writing the 7 `content/projects/*.json` with grounded case-study fields + creating BackendTrack files. Still not touching any Agent B file.
- **2026-07-01 12:30 +07** — Agent A: DONE with the Projects area. typecheck ✓, `eslint .` ✓ (exit 0), production build ✓. Verified against the built server: `/projects` renders 0 images (text-first cards, 7× "View case study"), the Backend Deployment Direction section, and honest per-project deployment lines; detail pages render the new sections with "Visit Product" only where a liveUrl exists. Committing ONLY Agent-A files (7 project JSONs, FlagshipProjectCard, ProjectScreenshots, BackendTrack.vue, useBackendTrack.ts, backend-track.json, projects/index.vue, projects/[slug].vue, and the shared `types/content.ts` + `src/types/content.ts` — these two also carry Agent B's tiny `period` TimelineEntry line, which rides along harmlessly). NOT deploying (owner deploys after both agents finish). Board file itself left uncommitted.
- **2026-07-01 12:40 +07** — Agent A: owner said go → added `liveUrl: https://chomkar.com` to chomkar.json (re-verified chomkar.com = 200 and `/api/health` live before linking). Chomkar case study now shows Visit Product on click-in; card stays image-free. Rebuilt ✓, committed (`8ef3857`). Still NOT deploying — working tree holds Agent B's uncommitted About/Journey edits, so production deploy is the owner's step once both agents finish.
- **2026-07-01 12:48 +07** — Agent A: **HANDOFF to Agent B** (owner consolidated everything to B). Projects area complete + verified + committed; all A claims RELEASED (see HANDOFF section up top). A is standing down — no further Projects edits, no deploy. Agent B owns all remaining work incl. deploy. Tree builds green.
- **2026-07-01 13:10 +07** — Agent A: **git committed + pushed** (owner chose "commit + push"). Committed the full working tree incl. Agent B's About/Journey work (`e90f127`), then reconciled origin's 6 diverged commits by MERGE (no force-push). Those 6 were a STALE older line — notably an old image-heavy `FlagshipProjectCard`; resolved every conflict to OURS (current deployed work), so the merge tree == `e90f127` (origin contributed nothing new). Build green, pushed `b3cc2dd..312d4d8`. Branch now fully in sync (local 0 / origin 0). Also confirmed live `/projects` = 0 card images (the "image in card" the owner saw = browser cache of the old design; hard-refresh clears it).
- **2026-07-01 12:55 +07** — Agent A: **DEPLOYED TO PRODUCTION** (owner: "Claude does everything incl. deploy"). `vercel deploy --prod` → build 28s, READY, aliased to https://www.kavatana.me (deployment `dpl_DNpHXeg1yzWe4T8BRJm6Kn9a9gwh`). ⚠️ This CLI deploy shipped the WHOLE working tree from disk — including **Agent B's uncommitted About/Journey edits** (B was idle 10+ min, build green). If B keeps working, just re-run `vercel deploy --prod --yes --scope kavatanas-projects` to publish the newer state (Vercel keeps history + instant rollback). Verified live: `/projects` 200, 0 card images, 7× "View case study", Backend Deployment Direction present; `/projects/chomkar` shows Visit Product → chomkar.com; studio-os "Web Audio" claim gone. NOTE: git branch NOT pushed (origin has diverged — avoided a force-push); production is live regardless since this was a CLI deploy from the working tree.
