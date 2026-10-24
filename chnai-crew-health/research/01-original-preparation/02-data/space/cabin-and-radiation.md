> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Space side: the surroundings

The cabin and the radiation environment. Unlike personal medical data, much of this is
open and real, so it is the strongest place to use NASA data honestly.

## The cabin ("hostile closed environment")

NASA requires the spacecraft to record, display and alert on these (V2 6020, 6021, 6022).

| Indicator | Limit | Effect on health when it is off |
| --- | --- | --- |
| Carbon dioxide | One-hour average of 3 mmHg or less (V2 6004) | Headache, poor sleep, slower thinking |
| Oxygen | Table 6.2-1 (V2 6003) | Hypoxia; fire risk when too high |
| Total pressure | Program limits | Decompression sickness around spacewalks |
| Temperature and humidity | Figures 6.2-2 and 6.2-3 (V2 6012, 6013) | Heat stress, dehydration, mould |
| Noise | 24-hour dose of 100 or less (V2 6115); NC-40 in sleep areas (V2 6079) | Hearing loss, broken sleep |
| Trace gases and combustion products | Monitored with alerts (V2 6023, 6024) | Irritation, poisoning |
| Water quality | Safe at the point of use (V2 6026) | Illness |
| Lighting | Table 8.7-2 (V2 8055) | Body-clock disruption |

### Where real cabin data is

| Source | Status on 1 Oct 2026 |
| --- | --- |
| OSDR environmental data app: ISS cabin readings collected alongside experiments | Answered |
| ISS live telemetry feed | Connected, but no values arrived. Not usable yet |

## Radiation ("space radiation")

### Two kinds

| Kind | Behaviour | What a crew can do |
| --- | --- | --- |
| **Galactic cosmic rays** | A steady background, a little higher when the Sun is quiet | Little: shielding in the design, limiting time |
| **Solar particle events** | Sudden bursts after some solar flares and eruptions, lasting hours to days | A lot: move to the most shielded part of the vehicle, delay a spacewalk |

Solar particle events are where a warning changes what someone does, and the data for
them is open and live.

### What must be monitored (V2 6161 to 6164)

- Radiation in the habitable volume.
- Radiation received by each crew member, inside and on spacewalks.
- An alert to the crew when exposure rates pass set thresholds.
- Table 6.8-1 sets what is required in low Earth orbit, beyond it, and on a surface.

### Where real radiation and space-weather data is

| Source | What | Status on 1 Oct 2026 |
| --- | --- | --- |
| **DONKI** (NASA CCMC) | Flares, eruptions, particle events, storms, with times and classes | New address works from the US; timed out from Phnom Penh. Old address is dead |
| **NOAA SWPC GOES protons** (not NASA) | Proton flux near Earth every five minutes, the live sign of a particle event | Answered in 3 seconds |
| **OSDR RadLab** | Dose measured inside the ISS by several instruments | Server error. Re-test |
| CCMC Mars scoreboards (new in Sept 2026) | Eruption and particle forecasts for Mars | Seen in the CCMC announcement; not tested |

### DONKI in practice

- Base address since 30 September 2026: `https://ccmc.gsfc.nasa.gov/DONKI-API/get/`
- Event types include `FLR` (flare), `CME` (eruption), `SEP` (particle event), `GST`
  (geomagnetic storm). Add `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`.
- No key needed. The parameters and the JSON are unchanged from the old address.
- Documentation: https://ccmc.gsfc.nasa.gov/tools/DONKI/
- A real record fetched on 1 October: a C8.6 flare on 30 September 2026, 02:30 to 03:05
  UTC, from active region 14535, linked to an eruption at 03:12.

### A caution about numbers

DONKI and GOES describe the Sun and near-Earth space. They do not give the dose inside a
spacecraft on the way to Mars. Turning one into the other needs a model and assumptions.
Say so wherever such a number is shown.

## Distance from Earth

Not a measurement, but it sets the rules for everything else.

| Where | One-way message delay | Return to Earth |
| --- | --- | --- |
| Low Earth orbit (ISS) | Under a second | Hours |
| The Moon | About 1.3 seconds | Days |
| Mars | About 3 to 22 minutes, with blackouts when the Sun is in the way | Months |
