> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# What offline actually means

20 October 2026. Recommended design; implementation not tested.

The primary demo runs on one development laptop representing an onboard service node. It serves the built interface, API, record store, approved evidence and optional local model. Earth contact is an optional transfer path. Actual team hardware and flight deployment are not yet qualified.

A tablet may connect over the onboard LAN. If that link fails, it shows a connection fault and last refresh time. In this first design, the disconnected tablet does not accept authoritative record changes. A local draft is explicitly unsent.

- Earth outage: local review and saving continue; released packets queue.
- LAN outage: the laptop remains usable; the tablet cannot truthfully claim a server save.
- Node outage: neither a cached screen nor a PWA is a replacement database. Recover the node or invoke the documented fallback.
- Use a verified secure origin for LAN clients. Loopback and an ordinary HTTP LAN address are different browser security contexts.
- A standalone iPad requirement would reopen ADR01 and ADR15: native storage, device permissions, conflict handling and recovery become a separate architecture.

Evidence and cross-references: ADR01; F01-03; RQ61-64; S003; T018; T019; T020

- [S003](https://ntrs.nasa.gov/api/citations/20240001402)
- [T018](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)
- [T019](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [T020](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
