# kavatana-portfolio

Personal portfolio for Kavatana, showcasing projects, capabilities, and background.
Built with Nuxt 3 (SSG), TypeScript, and minimal CSS tokens.

## Deployment Runbook

### How to Deploy
1. Ensure all code passes `npm run typecheck` and `npm run lint`.
2. Commit and push your changes to the `main` branch.
3. GitHub Actions will automatically run the CI pipeline (Typecheck, Lint, Build).
4. Vercel automatically deploys the `main` branch via webhooks.

### Post-Deployment Verification
After deployment, explicitly check the following:
1. Navigate to `https://kavatana.me` and ensure the site resolves correctly.
2. Open DevTools (F12) to verify **zero** console errors/warnings are thrown.
3. Test the contact form submission on production to ensure the environment endpoint is active.
4. Open the Plausible Analytics dashboard and verify live events are firing correctly.

### Rollback Process
If a deployment fails or contains critical bugs:
1. Log into the Vercel dashboard.
2. Select the `kavatana-portfolio` project and go to the **Deployments** tab.
3. Find the previous stable deployment.
4. Click the "..." options menu and select **Redeploy** or **Promote to Production** to instantly rollback.

## Environment Variables
Ensure Vercel production has the following configured exactly:
| Variable | Description |
|---|---|
| `VITE_CONTACT_ENDPOINT` | The production URL endpoint to receive contact form submissions. |
| `PLAUSIBLE_DOMAIN` | The tracked domain for analytics (e.g. `kavatana.me`). |
