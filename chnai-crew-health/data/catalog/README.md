# Evidence catalog

`interface-research-sources.json` carries the 20 public-source references from the 21 October interface/winner study, including review dates and narrow claims. It is a reference list, not 20 downloaded datasets. The source/provenance decisions in `docs/DATA_PROVENANCE.md`, `docs/AWARD_EVIDENCE.md` and `docs/MISSION_EPISODE.md` control product use.

The wider research archive stays in the existing research workspace; it is not blindly bundled into an application release or the operational database. Public research, fictional crew and a future measured participant need separate namespaces and release review. The two retained OSD-569 CSV files are under `web/public/data/` solely for the separate research importer. Their digests are pinned and checked. No model training pipeline consumes them.


The v0.8 `osd569-ingestion.json` catalog binds those exact files to the retained CHNAI snapshot, rights/use scope and original source references. The local research registry materializes a verified import in its own database and raw-object directory. The shared `cbc.mjs` parser serves browser inspection and the durable importer; no duplicated Python interpretation of the CSV is introduced. See `docs/architecture/RESEARCH_INGESTION.md` and `docs/RESEARCH_WALKTHROUGH.md`.
