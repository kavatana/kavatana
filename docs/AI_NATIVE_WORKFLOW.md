# AI-Native Engineering Workflow

I use AI agents as part of my engineering workflow, but I do not treat generated
code as automatically correct. The goal is faster iteration with better review,
not blind automation.

## Workflow

1. Define the product problem, user, and failure mode.
2. Write or update a short implementation spec before major changes.
3. Let AI agents help with research, scaffolding, code edits, review, and test
   planning.
4. Read the code myself and check whether the implementation matches the product
   goal.
5. Run tests, smoke checks, or manual verification depending on the risk.
6. Document what changed, what is still simulated, and what needs real-user
   validation.

## Standards I Am Training Toward

- Small, reviewable changes
- Clear repository structure
- Strong README and setup docs
- No secrets in source control
- Private repositories for future-startup code
- Public proof of work through profile docs, case studies, screenshots, and
  product summaries
- Honest claims about what is shipped versus what is planned

## Current Verification Loop

- Run dependency audits before publishing or showcasing a repo.
- Keep Dependabot enabled for maintained JavaScript/TypeScript projects.
- Use strict type checks and production builds as the minimum proof for web apps.
- Keep private startup source private, then publish safe public summaries,
  screenshots, demos, and case studies.
- Record cleanup decisions so future collaborators can understand what is public,
  what is private, and why.

## How AI Helps

- Faster codebase navigation
- Structured debugging
- Drafting tests and edge cases
- Reviewing product copy for claim safety
- Generating implementation alternatives
- Writing documentation that future collaborators can understand

## Where Human Judgment Stays Required

- Product direction
- User trust and privacy decisions
- Security-sensitive changes
- Business model assumptions
- Final code review
- Whether a claim is true enough to publish
