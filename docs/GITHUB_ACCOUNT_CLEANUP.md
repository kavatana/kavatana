# GitHub Account Cleanup Plan

Public audit snapshot from 2026-06-17:

- Account: `kavatana`
- Public name: `vatana`
- Public repos: 4
- Profile bio, company, location, public email, and Twitter fields are empty.
- All public repos currently lack descriptions, topics, and licenses.
- `bayonhub` has 1 open issue.
- The GitHub plugin install was approved in Codex, but no callable GitHub MCP
  tools were exposed in this session.
- `gh` CLI is not installed locally.
- SSH git access works for `kavatana/kavatana`.

## Profile Settings

Recommended public profile values:

| Field | Recommended value |
| --- | --- |
| Name | `Ka Vatana` |
| Bio | `Founder-engineer building Khmer-first products, marketplaces, learning tools, and practical AI systems.` |
| Company | `BayonHub` if you want the founder identity public; otherwise leave blank. |
| Location | Add only if you want it public, for example `Cambodia`. |
| Website | `https://kavatana.me` |
| Social link | `https://www.linkedin.com/in/ka-vatana-99b85440a/` |

Recommended pinned repositories:

1. `kavatana/kavatana`
2. `kavatana/bayonhub`
3. `kavatana/svaeng-yul`
4. `kavatana/cyber-arena-team-os`, if you want security training work visible

## Repository Metadata

Add descriptions and topics so visitors understand the account quickly.

| Repo | Description | Suggested topics |
| --- | --- | --- |
| `kavatana` | `Personal portfolio and GitHub profile for Ka Vatana.` | `portfolio`, `nuxt`, `vue`, `typescript`, `vercel` |
| `bayonhub` | `Khmer-first classifieds marketplace for Cambodia.` | `cambodia`, `khmer`, `marketplace`, `classifieds`, `nuxt`, `nestjs` |
| `svaeng-yul` | `Education-focused product workspace.` | `education`, `learning`, `typescript`, `web-app` |
| `cyber-arena-team-os` | `Python workspace for structured security learning and team operations.` | `cybersecurity`, `training`, `python`, `education` |

## Repository Hygiene

- Add a clear README to every public repo before pinning it.
- Add a license only when you truly want public reuse. For business products,
  no license or an `All rights reserved` notice may be more appropriate than MIT.
- Disable unused repo features: wiki, projects, and discussions if they are
  empty.
- Enable Dependabot alerts for public code.
- Add branch protection on important `main` branches once CI exists.
- Prefer archiving or making unfinished repos private over deleting them.
- Keep one public profile story: founder-engineer, Khmer-first products,
  practical systems, and shipped work.

## Automation Path

To apply account-wide metadata automatically later, this session needs one of:

1. A working GitHub MCP tool exposed to Codex.
2. The GitHub CLI installed and authenticated with `gh auth login`.
3. A GitHub token passed through a secure local environment variable, never in
   chat.

Until then, this repository can be updated through normal git/SSH, but profile
settings and repository metadata must be changed manually in the GitHub UI.
