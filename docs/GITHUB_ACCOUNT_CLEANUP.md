# GitHub Account Cleanup Record

Applied cleanup on 2026-06-17 using authenticated GitHub CLI access.

- Account: `kavatana`
- Public repos: 4
- Public name: `Ka Vatana`
- Profile website: `https://kavatana.me`
- Profile bio: `Founder-engineer building Khmer-first products, marketplaces, learning tools, and practical AI systems.`
- Profile company: `BayonHub`
- Profile location: `Cambodia`
- Hireable flag: enabled
- Every public repo has a README.
- Every public repo now has a description and topics.
- Wikis and classic Projects are disabled on public repos because they were not
  being used as part of the public profile surface.
- Dependabot security updates are enabled on all public repos.
- Secret scanning and push protection are enabled where GitHub exposes them.
- The `kavatana/kavatana` dependency alerts were fixed by upgrading the
  portfolio dependency tree and pushing commit `9ca95d9`.
- Superseded Dependabot PRs `#1` through `#4` on `kavatana/kavatana` were
  closed and their Dependabot branches were deleted.
- No repositories were deleted, archived, or made private.
- No licenses were added. This remains a deliberate product/legal decision.
- GitHub reports account two-factor authentication is currently disabled.
- The GitHub plugin install was approved in Codex, but no callable GitHub MCP
  tools were exposed in this session.
- `gh` CLI is installed locally and authenticated as `kavatana`.

## Profile Settings

| Field | Recommended value |
| --- | --- |
| Name | `Ka Vatana` |
| Bio | `Founder-engineer building Khmer-first products, marketplaces, learning tools, and practical AI systems.` |
| Company | `BayonHub` |
| Location | `Cambodia` |
| Website | `https://kavatana.me` |
| Social link | `https://www.linkedin.com/in/ka-vatana-99b85440a/` |

Recommended profile showcase repositories:

1. `kavatana/kavatana`
2. `kavatana/bayonhub`
3. `kavatana/svaeng-yul`
4. `kavatana/cyber-arena-team-os`

GitHub's GraphQL API reports these repos in `itemShowcase`. The older
`pinnedItems` list is empty, and no clean repository pin mutation is exposed by
the current API surface.

## Repository Metadata

| Repo | Description | Topics |
| --- | --- | --- |
| `kavatana` | `Personal portfolio and GitHub profile for Ka Vatana.` | `portfolio`, `nuxt`, `vue`, `typescript`, `vercel` |
| `bayonhub` | `Khmer-first classifieds marketplace for Cambodia.` | `cambodia`, `khmer`, `marketplace`, `classifieds`, `nuxt`, `nestjs` |
| `svaeng-yul` | `Education-focused product workspace.` | `education`, `learning`, `typescript`, `web-app` |
| `cyber-arena-team-os` | `Python workspace for structured security learning and team operations.` | `cybersecurity`, `training`, `python`, `education` |

## Repository Hygiene

- Keep a clear README in every public repo before showcasing it.
- Add a license only when you truly want public reuse. For business products,
  no license or an `All rights reserved` notice may be more appropriate than MIT.
- Add branch protection on important `main` branches once CI exists.
- Prefer archiving or making unfinished repos private over deleting them, but do
  this only after reviewing the repo's purpose.
- Keep one public profile story: founder-engineer, Khmer-first products,
  practical systems, and shipped work.
- Enable two-factor authentication manually from GitHub account settings.

## Automation Path

Current automation path:

1. GitHub MCP tools are still not exposed to Codex in this session.
2. GitHub CLI is installed and authenticated.
3. Account metadata and repository settings can be managed with `gh api`.

Manual-only remaining items:

1. Enable two-factor authentication.
2. Confirm the public email and social links you want shown on the GitHub
   profile.
3. Decide whether any repo should be private or archived after reviewing its
   contents.
4. Decide whether each repo should stay unlicensed or receive an explicit
   license.
