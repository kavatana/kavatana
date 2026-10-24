> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Hardware qualification record

Status: not measured. This record identifies the information needed to confirm ADR01 and ADR11. Prior references to laptops or tablets do not establish the hardware assigned to this project.

| Field | Current evidence | Required capture |
| --- | --- | --- |
| Local service host | Unconfirmed | Actual model, OS/build, architecture, CPU, RAM and free durable storage |
| Accelerator | Unconfirmed | GPU/VRAM or unified memory, backend/driver version and available memory under normal use |
| Runtime package | Not built | Python/Node versions, native libraries, linked SQLite version/options, model runtime build |
| Model artifact | Candidate only | Publisher revision, conversion/quantization provenance, file hash, license and actual file size |
| Power and heat | Not measured | Measurement method, duration, concurrent workload, thermal throttling and power limits |
| Tablet client | Unconfirmed | Exact OS/browser, display/viewport/zoom, touch/keyboard behavior and permissions |
| Local network | Not qualified | Local address, secure origin, certificate trust and behavior with external network absent |
| Real sensor | Optional; none qualified | Device model/firmware, SDK, captured payload, timestamps, rates, reconnect and consent |
| Recovery | Not tested | Cold start, interrupted writes, node loss, disk full, DB/object restore and key recovery if encrypted |

Do not buy hardware based on the theoretical 2 GB model-weight illustration. Record total measured RAM/VRAM, latency and the rest of the application workload. No hardware purchase or installation is authorized by this record.

Build-period pass evidence belongs in G02, G05, G07, G09 and G11 of the evaluation register. The first narrow demo can proceed with file replay and a non-model explanation path if optional hardware or model capability is not qualified.
