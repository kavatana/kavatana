# GitHub handoff

Destination requested by the user: `kavatana/kavatana`. The application is contained in `chnai-crew-health/`; start all project commands from that directory after cloning. The repository-root workflow `.github/workflows/chnai-verify.yml` runs checks with that working directory. The project-local workflow is also retained so the folder can become a standalone repository later.

```bash
git clone https://github.com/kavatana/kavatana.git
cd kavatana/chnai-crew-health
```

Then follow the root project README for Python setup, testing and local startup. The export contains the source, public research fixtures, documentation and prior mock screenshots. It excludes the Site-specific `.openai/hosting.json`, generated `dist/`, local databases, credentials and virtual environments. Build `dist/` with `npm run build`.

The existing private static Site is a separate deployment target. The GitHub folder does not provision a public API or medical database.

For the v0.7.1 acceptance pass, run `npm run doctor` after dependency setup, then follow `docs/LOCAL_ACCEPTANCE.md`. The new client-transport checks cover lost responses, reload recovery, stale-role clearing and note-sharing choices. Actual Safari interaction and the target Mac remain unverified. Local reports stay under ignored `.runtime/qualification/`; do not commit them or the database.

## Complete context handoff — 23 October 2026

Open the project subfolder in VS Code and begin with `START_HERE.md` and `CODEX_HANDOFF_PROMPT.md`. `research/README.md` indexes the recovered research and engineering packages. `docs/handoff/PROJECT_STATE.md` resolves older proposals against the v0.8 implementation. Run `npm run handoff:verify` to check the included research copies and current navigation. The earlier checkpoint above retains its original validation scope.
