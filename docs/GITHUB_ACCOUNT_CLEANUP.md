# GitHub Estate And Visibility Contract

Last audited on 2026-07-18 with authenticated GitHub API and CLI reads. This is
the public operating record for what belongs on the account, what stays private,
and which controls are technical rather than aspirational.

## Current State

- Personal repositories: two public proof repositories and one private operator
  repository.
- CHNAI LAB repositories: one public organization profile, seven active private
  repositories, and one archived GitHub-generated demo pending deletion.
- Organization membership: six accepted members and no pending invitations.
- Organization role boundary: one owner; every other account is a member.
- Organization base repository permission: `none`.
- Organization-wide two-factor enforcement: not enabled. Three accepted members
  still need to enable 2FA before receiving or retaining product access.
- Public identity: `Ka Vatana`, `CHNAI LAB`, Cambodia, and
  `https://kavatana.me`.

Future-startup source is private by default. Public proof is concentrated in the
profile and portfolio, the reusable workflow template, the neutral Studio OS
demo, and the CHNAI LAB organization profile.

## Repository Model

| Repository | Visibility | Purpose |
| --- | --- | --- |
| `kavatana/kavatana` | Public | GitHub profile, portfolio source, case studies, and public proof index. |
| `kavatana/ai-native-team-starter` | Public, MIT | Vendor-neutral template for traceable AI-assisted development. |
| `kavatana/kavatana-life-os` | Private | Owner-specific Command Center source and neutral public-demo build. |
| `chnai-lab/.github` | Public | Organization profile, governance, onboarding, and inherited agent workflow. |
| `chnai-lab/bayonhub` | Private | Tech-student opportunity platform. |
| `chnai-lab/svaeng-yul` | Private | Khmer self-study platform for technical students. |
| `chnai-lab/chomkar` | Private | B2B agriculture coordination platform. |
| `chnai-lab/sat-digital` | Private | Community cybersecurity service platform. |
| `chnai-lab/vantrex` | Private | Trading-signal, bot-model, and indicator tooling platform. |
| `chnai-lab/phsaros` | Private | SME operating system for shops and restaurants. |
| `chnai-lab/website` | Private | CHNAI LAB website source. |
| `chnai-lab/demo-repository` | Private, archived | GitHub welcome sample; verified as non-product material and queued for deletion. |

The startup portfolio lives under CHNAI LAB. The Command Center remains a
personal private repository because it contains owner-specific operating
context. The reusable starter is deliberately separate from both so other teams
can adopt the workflow without receiving private product knowledge.

## Collaboration Controls

- Product write access is granted through one dedicated team per repository,
  never through organization-wide base access.
- Members choose a product and enable 2FA before team assignment. Accounts with
  no active product assignment retain organization membership but cannot read
  private startup source.
- Team permission is `write`; only the founder account holds organization-owner
  or repository-admin authority.
- Repository creation is restricted to the organization owner so new assets
  enter through the naming, privacy, ownership, and CI standard.
- Each active product repository has a root agent guide, contribution and
  security boundaries, CI, and deterministic verification.
- Changes start from issues, use focused branches, open as draft pull requests,
  record AI involvement separately from human judgment, and require evidence
  before merge.
- `main` on `kavatana/kavatana`, `kavatana/kavatana-life-os`, and
  `chnai-lab/.github` requires a pull request and the `verify` check, enforces
  linear history, dismisses stale reviews, resolves review threads, and blocks
  force pushes and branch deletion.
- Repositories use squash-only merges and delete merged branches automatically.
- GitHub Free does not enforce branch protection on the organization's private
  repositories. Their local policy and CI are active; server-side enforcement
  requires a plan upgrade.
- Deployment, credentials, production data, billing, security response,
  financial signals, and trading remain explicit human approval gates.

## Security Controls

- Vulnerability alerts and automated security fixes are enabled across the
  active repository estate where GitHub supports them.
- Future private and internal repositories inherit the enforced
  `CHNAI LAB Free Baseline`: dependency graph, Dependabot alerts, and automatic
  security updates are enabled without activating paid Advanced Security.
- Future public repositories inherit GitHub's recommended public security
  configuration, including code and secret scanning where GitHub provides them.
- Secret scanning and push protection are enabled on public proof repositories.
- CI workflows use least-privilege permissions and immutable third-party action
  revisions where the repository standard has been adopted.
- Startup repositories do not receive a public license by default. A license is
  a deliberate product and legal decision.
- Secrets, customer data, private strategy, recovery codes, and production
  infrastructure details never belong in public proof or Git history.

## Visibility Decisions

- Keep future-startup implementation and strategy private until an explicit
  open-source, customer, investor, hiring-review, or acquisition decision.
- Publish architecture evidence, selected screenshots, verification results,
  and honest tradeoffs without publishing source, secrets, or unsupported
  claims.
- Keep `.github` public so collaboration quality is independently inspectable.
- Keep the Command Center source private; its public mode uses neutral data and
  bounded connectors.
- Keep only deploy-consumed or clearly documented evidence assets in the public
  portfolio. Generated review captures, abandoned prototype media, and one-off
  local scripts are not product proof.

## Open Human Actions

1. Review and merge the green hardening pull requests; no agent self-merges.
2. Have `rei3117`, `maobunleang`, and `houtrothanakvichai-sudo` enable GitHub
   2FA before product-team assignment.
3. Collect each unassigned member's first and second product choice, then grant
   only the selected team and create one ready starter issue.
4. Delete `chnai-lab/demo-repository` after the owner authorizes a GitHub token
   with the `delete_repo` scope. It contains no unique product material.
5. In organization **Settings > Member privileges**, disable member repository
   deletion or transfer, repository visibility changes, and outside-collaborator
   invitations. GitHub exposes these owner controls in the web settings but not
   as writable fields in the organization REST endpoint.
6. Upgrade the organization plan when enforced reviews and protected branches
   on private product repositories become operationally necessary.
