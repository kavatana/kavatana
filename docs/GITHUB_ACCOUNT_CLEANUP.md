# GitHub Account Cleanup Record

Updated cleanup record on 2026-07-08 using authenticated GitHub CLI access.

- Account: `kavatana`
- Public personal repos: 1
- Private personal repos: 7
- Public CHNAI LAB org repos: 1
- Private CHNAI LAB org repos: 2
- Public name: `Ka Vatana`
- Profile website: `https://kavatana.me`
- Profile bio: `Founder-engineer building Khmer-first products, marketplaces, learning tools, and practical AI systems.`
- Profile company: `CHNAI LAB`
- Profile location: `Cambodia`
- Hireable flag: enabled
- Future-startup source repositories are private by default.
- Public proof is concentrated in `kavatana/kavatana`, `kavatana.me`, the Studio
  OS demo, and the CHNAI LAB organization profile.
- Startup repos have descriptions, topics, Dependabot config where applicable,
  vulnerability alerts, automated security fixes, and delete-branch-on-merge.
- `kavatana/kavatana-life-os` is private source with a public demo at
  `https://kavatana-studio-os.vercel.app`.
- No repositories were deleted.
- No licenses were added. This remains a deliberate product/legal decision.
- GitHub reports account two-factor authentication is currently disabled.
- `gh` CLI is installed locally and authenticated as `kavatana`.

## Profile Settings

| Field | Recommended value |
| --- | --- |
| Name | `Ka Vatana` |
| Bio | `Founder-engineer building Khmer-first products, marketplaces, learning tools, and practical AI systems.` |
| Company | `CHNAI LAB` |
| Location | `Cambodia` |
| Website | `https://kavatana.me` |
| Social link | `https://www.linkedin.com/in/ka-vatana-99b85440a/` |

Recommended profile showcase repositories:

1. `kavatana/kavatana`
2. `chnai-lab/.github`

Keep startup product repos private until a specific repo is ready for public
release, open-source reuse, or investor/customer diligence.

## Repository Metadata

| Repo | Visibility | Purpose |
| --- | --- | --- |
| `kavatana/kavatana` | Public | GitHub profile, portfolio source, case-study site, and public proof-of-work index. |
| `kavatana/kavatana-life-os` | Private | Studio OS source for the public privacy-safe demo. |
| `kavatana/bayonhub` | Private | Tech student opportunity platform. |
| `kavatana/svaeng-yul` | Private | Khmer self-study platform for technical students. |
| `kavatana/chomkar` | Private | B2B agriculture coordination platform. |
| `kavatana/sat-digital` | Private | Cyber service platform. |
| `kavatana/vantrex` | Private | Trading signal, bot model, and indicator tooling platform. |
| `kavatana/phsaros` | Private | SME operating system for shops and restaurants. |
| `chnai-lab/.github` | Public | CHNAI LAB organization profile. |
| `chnai-lab/website` | Private | CHNAI LAB website source. |
| `chnai-lab/demo-repository` | Private | GitHub demo repository; safe to archive if it is not used. |

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
- Keep demos privacy-safe by construction. Do not publish source, data, or
  deployment details for startup products until there is a deliberate release
  decision.

## Automation Path

Current automation path:

1. GitHub CLI is installed and authenticated.
2. Account metadata and repository settings can be managed with `gh api`.
3. Repository content is managed with local git worktrees and normal commits.

Manual-only remaining items:

1. Enable two-factor authentication.
2. Confirm the public email and social links you want shown on the GitHub
   profile.
3. Decide whether `chnai-lab/demo-repository` should be archived.
4. Decide whether each repo should stay unlicensed or receive an explicit
   license.
