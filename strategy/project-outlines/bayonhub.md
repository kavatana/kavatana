# BayonHub Case Study Outline

**Current problem:** Cambodian tech students need a focused place to find internships, freelance work, jobs, and portfolio-building opportunities. Employers need a clearer path to discover students in AI engineering, data science, cybersecurity, software engineering, and related fields.

**Historical context:** BayonHub started as a Khmer-first classifieds marketplace prototype. That build proved search, posting, trust, bilingual UI, offline fallback, and marketplace flow execution. The current product is a full pivot into a tech-student opportunities hub.

**Constraints:** solo execution, no funding, Cambodian student/employer context, opportunity-market cold start, bilingual mobile-first behavior, private startup source

**Role:** Founder-engineer — owns product direction, frontend, backend, architecture, docs, and public proof boundary

**Stack:** React, Vite, TypeScript, Express, Prisma, PostgreSQL, Redis, Tailwind CSS, Docker, Cloudflare/Vercel direction

**Approach:** phased build discipline. Retire the old marketplace surface, establish student/employer/admin identity and durable application data in Phase 0, then add the opportunity API and student experience behind review gates.

**Target student loop:**
- Admin curates companies and real opportunities
- Students build profile
- Students browse/filter opportunities
- Students open opportunity detail
- Students apply with resume/profile snapshot
- Admin sees submitted applications

**Tradeoffs:** keep old implementation history private rather than using obsolete screenshots as current proof. Allow synthetic read-only previews, but require a reachable backend for consequential actions such as applications. Keep source private until the opportunity-hub surface is ready for deliberate release.

**Results:** Phase 0 is merged with green frontend, backend, audit, and focused browser checks. The public case study and fresh screenshot now match the opportunity-hub direction. Phase 1 remains a draft until its UI and human gates are complete.

**What's next:** complete the student opportunity UI, verify Khmer copy, and run student/employer workflows against approved staging services before claiming a launch.
