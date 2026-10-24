> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Resource budgets without invented speed

20 October 2026. Recommended design; implementation not tested.

A 4-billion-parameter model at an idealized 4 bits per parameter contains about 2 GB of weight bits. That is a mathematical lower-bound illustration, not a GGUF download size or total runtime-memory requirement. Quantization metadata, caches, context, activations and the rest of the application add memory.

The existing sizing model assumes 6 crew, 180 days and 10 scalar channels per crew at 1 Hz. It yields 933.12 million scalar samples and 14.93 GB for an assumed 16-byte value/time payload. A separate continuous one-channel 130 Hz waveform at 4 bytes/sample adds 48.52 GB. These are planning assumptions, not mission telemetry specifications.

- The combined 63.45 GB payload excludes indexes, record metadata, WAL, original files, temporary processing, encryption and backups. Measure these costs.
- First prove the small complete episode. Then test nominal 60 samples/s and a proposed 10x burst while querying and running inference.
- Choose context and output limits deliberately. A model advertising a long context does not mean the host can process it efficiently.
- Record p50/p95/p99, peak memory, queue depth, storage growth, restart time and rejected counts on the selected hardware.
- PostgreSQL becomes relevant when concurrency or policy requirements justify it. A larger archive alone does not prove that migration is needed.

Evidence and cross-references: Workload sheet in baseline; S004; E004; ADR05; ADR08; ADR11; G06-09; T008; T013; T024

- [S004](https://ntrs.nasa.gov/api/citations/20240000914)
- [E004](https://raw.githubusercontent.com/polarofficial/polar-ble-sdk/master/documentation/products/PolarH10.md)
- [T008](https://www.sqlite.org/wal.html)
- [T013](https://duckdb.org/docs/current/data/parquet/overview)
- [T024](https://huggingface.co/Qwen/Qwen3.5-4B)
