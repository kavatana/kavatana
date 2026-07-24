# Open-Source Engineering Proof

My startup products remain private assets. This page documents public tools I
maintain for other builders and keeps them separate from the seven startup
tracks.

## AI-Native Team Starter

**Status:** public GitHub template, released as
[`v1.0.0`](https://github.com/kavatana/ai-native-team-starter/releases/tag/v1.0.0)
on July 15, 2026.

**Repository:**
[`kavatana/ai-native-team-starter`](https://github.com/kavatana/ai-native-team-starter)

### Problem

Small teams can adopt coding agents faster than they establish a reliable way
to supervise them. Repository instructions become scattered, verification is
described vaguely, sensitive context enters prompts, and pull requests do not
show what the agent produced versus what a human actually checked.

The starter packages a practical baseline that a student team or early-stage
product team can adopt before its first agent-assisted change.

### Design

- Vendor-neutral `AGENTS.md` contract for Codex, Claude Code, Copilot, Gemini
  CLI, Cursor, Windsurf, and similar coding agents.
- Issue-first delivery loop: one outcome, one branch, one reviewable pull
  request, and one accountable human verifier.
- Structured bug, feature, task, and pull request forms that record acceptance
  criteria, AI involvement, verification, risk, rollback, and data boundaries.
- Security guidance that routes vulnerabilities away from public issues and
  keeps secrets, private user data, and production access out of agent context.
- Team onboarding checklists that let a new member and their agent read the same
  rules before editing.
- A dependency-free Python readiness scanner for required files, unresolved
  placeholders, credential shapes, and broken local links, plus regression tests
  for the clean repository, secret rejection, and internal/external link behavior.
- A least-privilege GitHub Actions workflow pinned to the official checkout
  `v7.0.0` commit.

### Engineering Boundary

The template does not make generated code trustworthy, configure production,
or replace project-specific tests and product requirements. It provides a
reviewable operating baseline; each adopting team still owns its architecture,
access, verification, and merge decisions.

Human co-author credit is reserved for material, consented work. AI assistance
is disclosed in pull requests rather than used to manufacture authorship,
reviews, discussions, or achievement activity.

### Verification Evidence

The first stable release passed:

- `python3 scripts/verify_starter.py`
- `python3 -m unittest discover -s tests -v` with four regression tests
- Python compilation and YAML parsing
- Markdown relative-link validation
- credential-shape and unresolved-placeholder checks
- GitHub Actions
  [`repository-readiness`](https://github.com/kavatana/ai-native-team-starter/actions/runs/29416972143)

The repository is marked as a reusable GitHub template, uses a protected
`main` branch with required CI, enables private vulnerability reporting, and
provides a public GitHub Discussions path for real adoption questions.

### Origin And Learning

The starter grew from the public collaboration standard used by
[CHNAI LAB](https://github.com/chnai-lab), then removed product-specific access
and startup context so other teams could reuse it safely.

Building it reinforced three principles in my own workflow:

1. Agent instructions should be versioned beside the code they govern.
2. Important policy should become an automated check when possible.
3. AI speed is useful only when scope, evidence, and human ownership remain
   visible.
