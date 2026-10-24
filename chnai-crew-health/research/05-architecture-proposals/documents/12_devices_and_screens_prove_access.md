> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Devices and screens: prove access

20 October 2026. Recommended design; implementation not tested.

CSA describes Bio-Monitor as a shirt/headband/tablet system that collects physiological data. This supports the importance of integrated measurement and activity context. It does not give CHNAI LAB a public flight API, permission to connect, or a current universal astronaut screen specification.

The Polar SDK is an optional Earth-device reference, with documented Android and iOS support. A browser interface and a native SDK are different integration boundaries. Web Bluetooth has limited browser availability; a chosen tablet/browser cannot be assumed to support the sensor.

- The first adapter is a replay/file import with documented schema and clocks. Label replay time and simulated operational identity visibly.
- For live hardware, capture a permitted sample from the exact model/firmware. Test payload units, rates, reconnect, buffering, reset segments and access permissions.
- If native access is required, a gateway uses the vendor SDK and sends a versioned envelope to the backend. The API remains the record owner.
- Test the actual viewport, touch, keyboard, zoom and interrupted tasks. Do not claim NASA prefers our screen size or that old device examples establish current mission hardware.
- Design the attention view around reason, evidence, missing context, next actor and follow-up; keep technical troubleshooting in its own role-limited view.

Evidence and cross-references: ADR01; ADR14-15; G02; G11; RQ68-77; S020; S021; T019; T020; T029; T030

- [S020](https://www.nasa.gov/reference/10-0-crew-interfaces-vol-2/)
- [S021](https://www.nasa.gov/reference/appendix-f-vol-2/)
- [T019](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API)
- [T020](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
- [T029](https://github.com/polarofficial/polar-ble-sdk)
- [T030](https://www.asc-csa.gc.ca/eng/sciences/bio-monitor.asp)
