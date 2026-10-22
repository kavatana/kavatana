# GitHub handoff

Destination requested by the user: `kavatana/kavatana`. The application is contained in `chnai-crew-health/`; start all project commands from that directory after cloning. The repository-root workflow `.github/workflows/chnai-verify.yml` runs checks with that working directory. The project-local workflow is also retained so the folder can become a standalone repository later.

```bash
git clone https://github.com/kavatana/kavatana.git
cd kavatana/chnai-crew-health
```

Then follow the root project README for Python setup, testing and local startup. The export contains the source, public research fixtures, documentation and prior mock screenshots. It excludes the Site-specific `.openai/hosting.json`, generated `dist/`, local databases, credentials and virtual environments. Build `dist/` with `npm run build`.

The existing private static Site is a separate deployment target. The GitHub folder does not provision a public API or medical database.
