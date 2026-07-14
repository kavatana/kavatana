# GitHub Account Cleanup Record

Verified on 2026-07-14 using authenticated GitHub API and CLI reads.

## Current State

- Account: `kavatana`
- Public personal repositories: 1
- Private personal repositories: 1
- Public CHNAI LAB repositories: 1
- Private CHNAI LAB repositories: 8, including one archived GitHub demo
- Organization members: 3 accepted, 1 pending (`rei3117`)
- Personal account two-factor authentication: enabled
- Organization-wide two-factor enforcement: not enabled; all current members
  individually have two-factor authentication enabled
- Public name: `Ka Vatana`
- Profile website: `https://kavatana.me`
- Profile bio: `Founder-engineer building Cambodia-first products, learning systems, and practical AI workflows.`
- Profile company: `CHNAI LAB`
- Profile location: `Cambodia`
- Hireable flag: enabled
Future-startup source is private by default. Public proof is concentrated in
`kavatana/kavatana`, `kavatana.me`, the Studio OS demo, and the CHNAI LAB
organization profile.

## Repository Model

| Repository | Visibility | Purpose |
| --- | --- | --- |
| `kavatana/kavatana` | Public | GitHub profile, portfolio source, case studies, and public proof index. |
| `kavatana/kavatana-life-os` | Private | Studio OS private operator source and public-demo build. |
| `chnai-lab/.github` | Public | Organization profile, member onboarding, and shared AI-agent workflow. |
| `chnai-lab/bayonhub` | Private | Tech student opportunity platform. |
| `chnai-lab/svaeng-yul` | Private | Khmer self-study platform for technical students. |
| `chnai-lab/chomkar` | Private | B2B agriculture coordination platform. |
| `chnai-lab/sat-digital` | Private | Cyber service platform. |
| `chnai-lab/vantrex` | Private | Trading signal, bot model, and indicator tooling platform. |
| `chnai-lab/phsaros` | Private | SME operating system for shops and restaurants. |
| `chnai-lab/website` | Private | CHNAI LAB website source. |
| `chnai-lab/demo-repository` | Private, archived | GitHub demonstration repository retained only for history. |

The seven startup tracks live under CHNAI LAB, while Studio OS remains a
personal private repository because it contains owner-specific operating
context.

## Collaboration Controls

- The organization has three accepted members: `kavatana`,
  `chamroeunhongleng`, and `solaly`.
- `rei3117` has a pending regular-member invitation and no product-team access
  until the invitation is accepted and a least-privilege role is assigned.
- Product write access is granted through least-privilege teams instead of
  unmanaged direct collaborator grants.
- Organization base repository permission is `none`; members receive access
  only through an assigned product team.
- Repository creation is restricted to organization owners so product assets
  enter through the agreed naming, privacy, ownership, and CI setup.
- Each active product repository has a root `AGENTS.md`, model-specific entry
  points, contribution and security guidance, CI, and deterministic repository
  checks.
- `CODEOWNERS` names the responsible product team where team collaboration is
  active.
- Changes use focused branches and pull requests; checks must pass before merge.
- `main` is protected on `kavatana/kavatana`, `kavatana/kavatana-life-os`, and
  `chnai-lab/.github`: pull requests and the `verify` check are required, history
  stays linear, review threads must be resolved, and force pushes and deletion
  are blocked.
- Repositories use squash-only merges and delete merged branches automatically.
- Vulnerability alerts and automated security fixes are enabled on every active
  personal and organization repository.
- Secret scanning and push protection are enabled on the two public proof
  repositories: `kavatana/kavatana` and `chnai-lab/.github`.
- GitHub Free does not provide protected branches for the organization's private
  repositories; their guides and CI establish the workflow, but server-side
  enforcement requires a future organization plan upgrade.
- High-impact external writes, deployments, security actions, financial actions,
  and trading actions remain human decisions.

## Visibility Decisions

- Keep future-startup implementation and strategy private until there is a
  deliberate open-source, customer, investor, or hiring-review decision.
- Publish architecture evidence, screenshots, demos, validation results, and
  honest tradeoffs without publishing secrets or private product context.
- Keep `.github` public so organization identity and collaboration standards are
  visible without exposing product source.
- Keep Studio OS source private; its public build uses neutral data and disables
  live connectors.
- Do not add a permissive license to startup source by default. Licensing is a
  product and legal decision, not a repository-cleanup checkbox.

## Remaining Manual Decisions

1. Enable organization-wide two-factor enforcement in GitHub's organization
   authentication settings after pending and future invitees are prepared for
   the policy.
2. Decide which repositories, if any, should eventually receive a public
   license or source release.
3. Review and merge private product pull requests after human product and data
   boundary review.

No repositories were deleted during cleanup.
