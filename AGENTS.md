# Portfolio Agent Guide

Read this file before editing. Then read `README.md`, `CONTRIBUTING.md`,
`SECURITY.md`, the relevant content file, and the current Git status.

## Repository Purpose

This public repository is Ka Vatana's GitHub profile, portfolio source, and
public proof surface. It documents private startup products without publishing
their source, secrets, user data, or sensitive strategy.

The strongest output is accurate evidence. Never improve the portfolio by
inventing users, revenue, production scale, security guarantees, benchmark
results, deployment status, or features that are only planned.

## Source Map

- `content/projects/*.json`: project claims, architecture, results, and media.
- `content/config.json`: public profile and contact metadata.
- `pages/` and `components/`: Nuxt portfolio UI.
- `docs/`: public engineering workflow and account decisions.
- `public/images/projects/`: approved public visual evidence.

## Required Workflow

1. Run `git status -sb` and preserve all existing user work.
2. Define one public-facing outcome and list the claims it changes.
3. Verify claims against code, tests, deployment evidence, or an explicit owner
   statement. Label in-progress, demo, degraded, and planned behavior honestly.
4. Keep private repository content out of Git, prompts, logs, screenshots, and
   public copy. Use redacted or synthetic evidence.
5. Make one focused branch and pull request.
6. Run `npm run verify`.
7. For UI changes, inspect the affected pages at mobile and desktop widths.
8. Record AI involvement, human verification, privacy impact, and rollback in
   the pull request.

## Hard Rules

- Never commit tokens, environment values, private notes, customer data,
  production logs, local paths, or copied private source.
- Do not turn a future-startup repository public or add a license without an
  explicit product and legal decision.
- Do not describe synthetic/demo data as live data.
- Do not make blanket privacy claims based only on bundler behavior.
- Do not overwrite, reset, stash, stage, or commit dirty work outside the task.
- Keep consequential GitHub, deployment, security, financial, and trading
  actions under explicit human control.

## Verification

```bash
npm ci
npm run verify
```

`npm run verify` checks repository invariants and content JSON, audits
dependencies, runs strict type-check and lint, and generates the production
site.
