> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# CHNAI LAB - demo host decision

20 October 2026 | Hardware addendum v0.1 | Performance not measured

## Decision

Use the team's **16-inch MacBook Pro, Apple M3 Pro, 18GB unified memory** as the proposed local demo host. The model, chip and memory were confirmed by the team leader in this conversation. They have not been inspected on the physical machine.

This is a credible platform for testing the proposed small local model and application. It does not establish latency, sustained performance or clinical capability. No hardware upgrade is justified by the evidence collected so far.

## What changes in the plan

| Area | Updated position | Evidence status |
| --- | --- | --- |
| Local host | MacBook Pro 16-inch, M3 Pro, 18GB | User-reported configuration |
| CPU / GPU | Apple lists 12 CPU cores and 18 GPU cores for the 16-inch M3 Pro configuration | Manufacturer specification, not local inspection |
| Inference runtime | Keep llama.cpp as the first candidate, running natively on macOS with Metal GPU acceleration | Documented platform support; build not qualified |
| Initial model | Keep Qwen3.5-4B as a candidate; evaluate a traceable 4-bit GGUF conversion | Artifact/revision/hash and quantization not yet selected |
| Initial workload | One active generation; text-only explanation; 4,096-token total context budget; at most 256 generated tokens | Team-selected starting experiment, not a NASA requirement |
| Reasoning mode | Prefer the model's non-thinking mode for this bounded explanation if the selected runtime/template demonstrably honors it | Publisher documents a non-thinking option; local behavior untested |
| Application | Browser, FastAPI, SQLite and one inference process share this host | Proposed deployment; concurrent-load test pending |
| Fallback | Validated findings, evidence and allowed actions remain usable with the model off | Required behavior, not implemented |

The context budget must include the chat template, instructions, retrieved evidence and reserved output. Oversized input is bounded or rejected deliberately; it is never silently truncated in a way that drops applicability or permission constraints. The final runtime build must explicitly set context, output and concurrency rather than inheriting model/server defaults.

18GB is shared system memory, not 18GB reserved exclusively for the model. macOS, the browser, API, data processing, model weights, attention/recurrent state and runtime buffers compete for it. Four billion parameters at an idealized four bits each account for about 2GB of weights alone; actual mixed-precision artifacts, metadata and runtime allocations differ. This arithmetic is not a prediction of total RAM use.

No inference throughput, response time or safe concurrency number has been measured. MLX remains a possible comparator only if the existing qualification reveals a concrete reason to compare runtimes; the confirmed hardware does not require restarting the framework decision.

## Qualification on the actual Mac

Record the following when local testing becomes appropriate under the event rules:

1. macOS version/build, available disk, hardware configuration and normal background workload. Do not collect serial numbers or account identifiers.
2. Exact model source/revision/hash, quantization provenance, file size, license, runtime commit/build and enabled Metal backend.
3. Cold model load and warm requests: prompt size, first-token latency, complete validated-result latency, peak memory, memory pressure and change in swap usage.
4. The same requests while the browser, API, database and the declared synthetic ingestion workload are running. The target is a responsive complete workflow, not an isolated tokens-per-second score.
5. Repeated requests, cancellation, oversized input, model timeout, restart and external-network loss. Confirm bounded queue behavior and deterministic fallback.
6. Output quality against the existing template baseline and held-out case families. Preserve exact server-calculated values, supported citations and action authority.

If the model creates sustained memory pressure, repeated failures or unacceptable interaction delay, first reduce context/concurrency or choose a smaller qualified artifact. Preserve the deterministic path. A faster model is not automatically a better health explanation model.

## Status and remaining unknowns

- Host selection: recorded from the user.
- RAM selection: recorded from the user.
- macOS, free disk, thermal/power behavior, browser/viewport and client network: not measured.
- Model/runtime artifacts, memory use, speed, offline behavior and accuracy: not tested.
- Architecture gate G02 remains open; selecting a host does not pass hardware qualification. G05, G07, G09 and G11 also remain subject to their existing evidence requirements.
- The assistant's execution environment is not the user's Mac. No benchmark from this environment should be reported as an M3 Pro result.

This note supersedes only the earlier **unconfirmed host selection** in the dated architecture/workflow snapshots. The reports and archives remain historical v0.1 deliverables; no benchmark gate is changed to passed. No installation, model download or product implementation was performed.

## Primary references

- Apple, [MacBook Pro (16-inch, November 2023) technical specifications](https://support.apple.com/en-us/117737): M3 Pro CPU/GPU and unified-memory configurations. Read 20 October 2026.
- ggml-org, [llama.cpp build documentation](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md): Metal build and GPU execution on macOS. Read 20 October 2026.
- ggml-org, [llama.cpp server documentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md): explicit context, prediction and parallel-slot controls. Read 20 October 2026.
- Qwen, [Qwen3.5-4B model card](https://huggingface.co/Qwen/Qwen3.5-4B): model identity, parameter count and non-thinking option. Read 20 October 2026. Publisher benchmarks are not measurements of this project's workflow.
