# Research registry walkthrough

Use the README dependency setup. From the project folder:

```bash
npm run dev
```

Open http://127.0.0.1:4173/research-registry.html, or follow **Research ingestion · engineering** from the local workspace sidebar. The page requires the local API; the existing hosted static demo has its independent browser-memory research importer.

1. Inspect the retained file names, byte sizes, SHA-256 values, source references and use boundaries.
2. Choose **Verify & import files**. This reads bundled source bytes and creates a separate research store; no download or crew-record import occurs.
3. Inspect the accepted-job summary: 553 submitted observations, four public research IDs and 28 unit-label conflicts. The original 28 wide rows are an overlapping representation.
4. Filter by a research ID and source analyte. Page through rows and expand provenance to inspect the original CSV record number, object digest, raw value/unit, relative time and source interval.
5. Open **Quality issues**. Inspect both source representations, their record locations and the decision to withhold cross-file normalization. Original values are not corrected by guessing.
6. Download the manifest. It captures input references, exact object hashes, parser implementation hashes and runtime versions.
7. Choose **Verify & reuse import**. An identical source/pipeline records a replayed attempt without duplicating the 553 rows.
8. Restart the local service with the same database path. The accepted job and attempt history should persist. These browser interactions remain unverified until executed on the target machine.

The equivalent reproducible command is:

```bash
npm run research:import
```

The command defaults to `.runtime/chnai.research/`, matching the default API database. For an API launched with `CHNAI_DB=.runtime/mac-acceptance-01.sqlite3`, inspect the matching research store with:

```bash
.venv/bin/python scripts/ingest-research.py --directory .runtime/mac-acceptance-01.research --inspect-only
```

Import output contains the complete accepted manifest and summary. The command does not fetch live NASA data. A changed retained input is rejected and records its observed digest; do not alter the tracked originals to experiment. Automated tests create isolated temporary copies for mismatch, missing-file, corrupt-object and rollback cases.

Keep real runtime databases and downloaded inspection reports out of Git. The repository's catalog and tests are the reproducible engineering record. Do not convert research IDs into astronaut identities, apply source reference intervals to the simulated crew, or interpret an accepted import as medical validation.
