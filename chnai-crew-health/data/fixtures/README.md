# Fictional fixture ownership

Crew profiles, baseline/current observations and deliberate boundary values are authored in `packages/domain/src/domain.mjs`. Eight replay scenarios are in `packages/domain/src/simulation.mjs`. The durable local seed is `seed()` in `packages/domain/src/service.mjs`: assessment-day after intake, primary reviewer occupied.

Tests execute these sources directly rather than a second diverging copy. SIM-CHNAI-01 is not a NASA dataset. No real crew profile, calibration record or clinical qualification is asserted.
