# Security Policy

This public repository contains portfolio source and approved product evidence.
The startup implementations it describes are private.

## Reporting

Do not open a public issue containing credentials, private repository content,
personal data, unpublished strategy, or exploit details. Use GitHub's private
vulnerability reporting when available, or establish a private contact channel
through the owner profile before sharing sensitive details.

## Boundaries

- No credentials or environment values belong in source, issues, screenshots,
  build logs, or AI prompts.
- Public case studies must use approved screenshots, redacted evidence, and
  synthetic data where needed.
- A public demo is not evidence that its private operator mode is safe to host.
- Dependency audit, type-check, lint, static generation, and repository checks
  must pass before merge.
- Repository visibility and licensing changes require an explicit owner
  decision.

If a secret is exposed, revoke or rotate it first, then remove it from code,
logs, deployments, and history.
