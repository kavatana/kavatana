> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Capacity comes from a workload, not a large folder

13 / Sizing and benchmark protocol

The workbook contains editable planning inputs, not a NASA mission specification: six crew, 180 days, ten scalar channels at one sample per second, and a separately modeled one-channel 130-Hz waveform. Values, widths and duty cycles are explicit assumptions.

That scalar envelope produces 933,120,000 samples. Assuming 16 bytes per sample for only value plus timestamp yields 14.93 GB decimal before identity, quality, indexing, transactions, replication or backups. This is a payload-only arithmetic estimate, not a storage product benchmark.

A six-person 130-Hz single-channel stream at four bytes per sample continuously over 180 days adds 48.52 GB of waveform values. Four bytes is an editable sizing assumption, not a claim about a particular device's wire encoding. Duty cycle, compression, shared timestamps and retention materially change actual storage.

Benchmark a small demonstration dataset and increasing stress envelopes. Report actual file sizes, ingest throughput, query latency distribution, peak RAM/VRAM, cold start, interrupted-write recovery and outbound queue growth. Use source-backed fixtures plus explicitly synthetic scale data; do not duplicate subjects and claim a larger clinical cohort.

- Compare raw retention, derived summaries and onboard versus ground retention policies.
- Measure waveform slicing separately from scalar queries.
- Set performance acceptance targets after hardware and task selection; NASA control-feedback targets remain separate.

Evidence / cross-references: AS10; RQ83; E004; S009 10022; Workload sheet
