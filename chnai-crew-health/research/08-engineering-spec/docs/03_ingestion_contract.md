> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Canonical ingestion contract

## Common envelope

Required: contract_version, namespace_id, producer_ref, adapter_version, source_asset hash/reference, idempotency_key and records. Each record carries source_record_key, original payload hash, subject or context scope, quantity identity, original value/unit, method/version, original time expression and provenance label. Response returns batch ID and accounting state. Received is not qualified-for-comparison.

## Record outcome accounting

During processing: expected_count = accepted + quarantined + rejected + duplicate + pending. At terminal completion pending must be zero. Accepted means structurally imported under the declared mapping. Quarantined preserves usable source bytes while interpretation is blocked. Rejected means the record cannot be represented safely. Duplicate references the prior identity; it does not create another clinical observation.

## Idempotency and clocks

Deduplication is scoped to authenticated producer, namespace and key. Identical bytes return the original result. Reusing a key for different content returns 409. Other mutations use command_receipt, committed with the domain action; recheck authorization before replaying its response. Store sample, receive and replay times separately. Preserve negative offsets and L-/R+ labels. A device restart creates a new segment.

## Numbers and units

Wire measurement values are decimal strings. Native JSON NaN/Infinity are invalid. Keep raw unit spelling and a reviewed canonical mapping. A dimensionally incompatible unit is quarantined. Do not use the largest VO2 sample as VO2max or turn a percent-labeled transformed lab result into g/dL by renaming the field. [N05, D01]

## Example fixtures

fictional_crew_seed.json is a domain fixture, not a ready-to-run database insert or a claim that an API exists. sc01_timeline.json defines expected workflow ordering. device_transport_packets.json supplies six synthetic arrivals with reorder, duplicate, missing value/gap and reset behavior. development_cases.json defines 36 input/expected-outcome cards. A future runner must translate these into the final pinned request contract.

## Bounds to finalize before implementation

Freeze request byte/record limits, chunk duration, clock drift tolerance, retry limits, pagination size and error-code vocabulary from actual data and measurements. Do not present arbitrary limits as NASA requirements. The first implementation may accept bounded completed-assessment files before any streaming channel exists.
