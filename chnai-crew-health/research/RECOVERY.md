# Recovery and portability record

23 October 2026. This handoff recovered **12 existing CHNAI research archives** from the connected personal research collection, plus selected retained local product-plan, mission-blueprint and interface-review sources and a separately updated hardware note. No unrelated project was searched or imported.

## What is included

- 246 editable/reference files selected from those research milestones, totaling 4,383,180 bytes before the handoff index files. These include Markdown, JSON/CSV registers, diagrams, synthetic fixtures, the authored engineering workbook, health-review brief and Mac inventory procedure.
- The existing application source, API contracts, SQL migrations, current tests, two original public CBC CSVs and earlier mock screenshots.
- A founder-context summary, current-state reconciliation, next-step gates, Mac setup guide, project instructions and a complete portable Codex prompt.

The manifest contains **865 recovered member/source records**, of which 246 are included research copies and two map to already-present application CSVs. The remaining 617 records are externally retained captures, research data, duplicate renderings/intermediates or explicitly omitted private/incomplete files. Archive members are not independent datasets. Later local packages are represented by selected source files, not a claim to inventory every temporary rendering ever produced.

## Provenance files

| File | Meaning |
| --- | --- |
| [packages.json](provenance/packages.json) | Archive filename, bytes and SHA-256 of each of the 12 recovered original ZIPs |
| [recovery-manifest.json](provenance/recovery-manifest.json) | Original package/member path, bytes and hash; disposition; included repository path/hash; recorded transformations |
| [Original asset catalog](02-source-register/assets.csv) | Earlier retrieval status, source URL, recorded hash and purpose |
| [Source-use register](09-data-to-product/registers/source_use_register.json) | Namespaced source references, intended product use and limits |
| [Asset-use register](09-data-to-product/registers/asset_use_register.json) | Later allocation and historical presence/hash audit; not current clone presence |

`npm run handoff:verify` checks the included-copy hashes, JSON readability and navigation in the new handoff documents. It does not download sources, validate their medical conclusions or execute the old proposed test suites.

## What deliberately remains outside Git

Original ZIPs, most raw publisher HTML/PDF captures, larger waveform/research files, metadata duplicates and generated page renders remain in the original research archive. Some acquired files are incomplete or failed retrieval pages; the manifest marks these rather than treating them as evidence. Restricted data was never made accessible by this export.

Two original registration/contact drafts are excluded. Included text has private archive/drafting/preview links, registration/contact links, contact details and transient workspace paths removed where encountered; original and repository hashes distinguish edited copies. No provider access token, signed download URL, local database, credential, runtime report or virtual environment is part of this handoff. No archive permissions were changed.

The current application works from the clone after dependency installation; it does not depend on private Drive access. Additional research can be recovered selectively using the source URLs in the catalogs, after checking present-day access and terms, or from the owner's existing named archive. The archive hashes let the owner verify an exact retained package without publishing its private account/file links.

## Recovery workflow for a later dataset

1. Choose a specific product/validation need using the data-family and source-use maps.
2. Locate the source URL and expected artifact in the asset/file catalogs. Preserve the historical recorded acquisition state; do not overwrite it with a new assumption.
3. Read the source study, license/access and cohort/method limits. A public metadata record is not permission or ability to download restricted measurements.
4. Fetch the intended artifact into an ignored local research location; record the current URL, date/version, bytes/hash and whether it matches the earlier snapshot.
5. Validate format, units, time, quality, identity and row-level lineage before proposing an adapter. Keep human research separate from fictional operational records.

The handoff is an organized reconstruction of the project's research and development context. It is not a verbatim export of every chat message, a backup of every raw source or a claim that the complete challenge and rules have been verified.
