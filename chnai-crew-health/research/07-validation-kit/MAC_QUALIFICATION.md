> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# M3 Pro / 18GB - qualification procedure

20 October 2026 | Proposed experiment v0.1 | Actual Mac execution: Not run

The user's 16-inch M3 Pro MacBook Pro with 18GB unified memory is the candidate host. Its configuration is user-reported. The assistant's cloud environment is not that Mac.

## Stage A - inventory only

Run `mac_inventory.sh` from this package and return `inventory.txt`. Add power mode, memory-pressure color and a generic description of normal background work. No model or package installation is needed. Review disk capacity on the volume that will actually store the model and data; the script measures the volume containing its output.

Unknown values remain unknown. If the Terminal process is translated, use a native Apple-silicon Terminal for future experiments. Do not interpret a missing `sysctl.proc_translated` key as proof of translation. Physical memory bytes, GPU fields and OS/build identify the observed host; they do not establish usable model memory.

## Stage B - artifact and runtime qualification, when permitted

Before executing any candidate, record these in `qualification_record.json`:

- Publisher model identity, source revision and license. The current Qwen source card is for Qwen3.5-4B in Transformers format; it is not itself a pinned 4-bit GGUF. [T03]
- Exact GGUF repository, revision, filename, conversion/quantization lineage, license/notice requirements, byte length and SHA-256. Search found community conversions; none was selected or downloaded. Do not silently substitute Qwen3-4B for Qwen3.5-4B.
- Runtime release/commit, build flags, binary hash, linked backend and native architecture. Retain its actual `--help` and `--version` output. Current online documentation is a reference, not proof of the installed build.
- All model sidecars/templates used and their hashes. Text-only testing needs no vision projector in this experiment; record what is actually loaded. Preserve a manifest for every required artifact.

Use a known, reviewed build and a verified local file. This package installs and fetches nothing. Do not run a model or runtime merely because a filename looks correct.

## Stage C - inference microbenchmark

This is a resource experiment using the upstream `llama-bench` tool, not a health-software test. The options below were checked against the upstream README [T01]. Verify them against the selected binary before running. Set real paths to trusted local files; do not paste unresolved placeholders.

```bash
chnai_bench="/absolute/path/to/llama-bench"
chnai_model="/absolute/path/to/verified-model.gguf"
mkdir -p chnai-model-results
"$chnai_bench" --help > chnai-model-results/bench-help.txt
/usr/bin/shasum -a 256 "$chnai_model" > chnai-model-results/model.sha256
/usr/bin/stat -f '%z' "$chnai_model" > chnai-model-results/model-bytes.txt
/usr/sbin/sysctl vm.swapusage > chnai-model-results/swap-before.txt
/usr/bin/vm_stat > chnai-model-results/vm-before.txt
/usr/bin/time -l "$chnai_bench" -m "$chnai_model" -ngl 99 \
  -b 512 -ub 128 -p 0 -n 0 \
  -pg 512,128 -pg 2048,256 -pg 3840,256 \
  -r 5 -o json \
  > chnai-model-results/bench.json \
  2> chnai-model-results/bench-stderr-and-time.txt
/usr/sbin/sysctl vm.swapusage > chnai-model-results/swap-after.txt
/usr/bin/vm_stat > chnai-model-results/vm-after.txt
```

Run from a fresh result directory for each configuration; the example output files would overwrite same-named prior files. Record command exit status. Do not discard failed runs. GPU offload must be confirmed from backend logs; `-ngl 99` is a request, not proof.

The three prompt/generation lengths, five repetitions and batch sizes are CHNAI experiment choices, not NASA specifications. The near-limit run is synthetic token load, not a guarantee that a real templated request fits. Upstream results omit tokenization and sampling and report throughput across repetitions; five runs are not a robust tail-latency estimate. [T01]

Observe Activity Monitor's Memory view during the run. Record pressure, compressed memory and swap before/after [T04]. `/usr/bin/time -l` reports process resource statistics; its peak RSS is not total unified-memory consumption and must not be labeled GPU memory. Do not sum RSS and GPU allocations as if guaranteed disjoint. Retain evidence of OOM, yellow/red pressure or persistent paging. A pre-existing swap value alone is not failure.

## Stage D - bounded local server experiment

Only after the artifact and preparation-timing checks. Use an empty, new results directory. Current documented controls [T02] support this starting configuration; stop and record incompatibility if the selected build/template cannot honor them.

| Control | Proposed setting | Verification |
| --- | --- | --- |
| Model | Explicit local GGUF path; offline mode | No remote repository argument or network dependency |
| Context | 4,096 total tokens | Template + instructions + facts + reserved output counted with this tokenizer |
| Parallel requests | One active generation | Actual server properties and bounded client queue |
| Output | At most 256 generated tokens | Server and request limit; reasoning/output interpretation checked |
| Batch / microbatch | 512 / 128 | Log actual values |
| Prompt reuse | Off for the uncached baseline; RAM prompt cache disabled | Warm weights and cached prompt reuse are recorded separately |
| Thinking | Disabled only if the actual template honors it | Inspect template, response and token accounting; hiding reasoning is not disabling it |
| Network binding | Loopback 127.0.0.1 only | No public or LAN listener for this experiment |

Illustrative server launch, after reviewing actual help output:

```bash
chnai_server="/absolute/path/to/llama-server"
"$chnai_server" -m "$chnai_model" --alias chnai-eval \
  --host 127.0.0.1 --port 8765 --offline \
  -c 4096 -np 1 -n 256 -ngl 99 -b 512 -ub 128 \
  --cache-ram 0 --no-cache-prompt --no-context-shift \
  --jinja --chat-template-kwargs '{"enable_thinking":false}' \
  > chnai-model-results/server.log 2>&1
```

The foreground command occupies that Terminal; use another for requests and stop it with Ctrl-C after testing. The model card's non-thinking example and the runtime's template option do not establish this artifact's compatibility. Confirm before evaluating a non-thinking condition. Defaults must not silently expand context, slot count or prompt-cache memory. Loopback binding is an experiment boundary, not a complete security design.

Before each scenario-specific request, freeze its full input/output contract and reviewed expected behavior. This package contains case cards, not an operational health prompt. Reject over-budget requests; never drop permission or applicability facts to fit. Keep model evidence local and synthetic.

## Stage E - end-to-end qualification during permitted implementation

Use the same host/configuration and normal background workload. Record all conditions in advance.

1. **Startup:** three independent process starts. Measure process-launch to ready and ready to first validated draft. Label whether OS file caches were warm; a restarted process is not necessarily a cold disk cache. No cache-purge command is required.
2. **Steady requests:** at least 30 sequential requests across short, normal and near-limit inputs. Retain per-run queue, preprocessing, inference, validation and total elapsed times; report failures and timeouts in the denominator. Record p50, p95 and maximum with the sample count and percentile method, without implying production confidence.
3. **Concurrent app work:** repeat representative requests with browser, API, database and the declared ingestion workload. G06's proposed 60 samples/s then 600 samples/s burst are synthetic engineering loads, not measured flight-device rates. A microbenchmark without the app cannot close this item.
4. **Model failure:** stop the model, exercise the proposed 20-second deadline, cancel a request and submit an oversized input. Keep deterministic results and authorized actions available. Verify the job stops or is invalidated, releases its slot and cannot publish a late/stale result. An HTTP timeout alone does not prove cancellation.
5. **Network conditions:** separate external-network loss, tablet/LAN loss and local-node failure. First prove single-host loopback behavior with external connectivity absent. A later tablet test must keep LAN connectivity while blocking Internet; switching all Wi-Fi off is a different test. No script in this package changes network settings.
6. **Quality:** execute the 40 designed case cards against template and model after review; preserve unvalidated outputs separately. Run current correction, authorization, durable-save and recovery cases in the original workflow specification.

## Decision rules

These are project qualification proposals, not NASA standards or clinical thresholds:

- Core findings/actions must remain usable when inference is absent or rejected.
- For the proposed 20-second AI deadline, record queue-to-validated-draft latency and explicitly take the fallback at expiry; completion before that time is not a safety guarantee.
- Preserve the existing proposed review-summary p95 <=1 second separately from model generation. Measure on the actual UI; no shell benchmark can pass G07.
- Any wrong subject/revision, altered authoritative value, invented source or unauthorized action blocks promotion on this finite evaluation set. Review quality independently of speed.
- Treat sustained memory pressure, unbounded queue growth, repeated OOM or responsiveness loss as reasons to revise the configuration and repeat the affected tests. Set the observation interval before measuring; do not invent a universal available-RAM or swap cutoff.

Record one outcome: candidate unqualified / revise and retest / acceptable for this bounded demo with stated limits. Retain all evidence and failures. No host, model or application gate is marked Passed by this document.

Primary sources T01-T04 are listed in `sources.json`. Architecture gates G02, G05-G10 and G12 remain unchanged; G11 concerns an optional real-device adapter.
