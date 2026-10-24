> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# NASA's own health limits

Read on 1 October 2026 from the two documents in this folder:

- `NASA-STD-3001-vol1-revC.pdf`: NASA Spaceflight Human-System Standard, Volume 1, Crew
  Health, Revision C (86 pages)
- `NASA-STD-3001-vol2-revF.pdf`: Volume 2, Human Factors, Habitability and Environmental
  Health, Revision F, approved 14 July 2026 (398 pages)

Each requirement has an ID such as `[V1 4027]`. Citing the ID next to a number is what
turns a made-up threshold into NASA's threshold. Quote the wording exactly and re-open the
PDF before putting any number on a slide.

## What an in-mission health system must do

| ID | Requirement, shortened |
| --- | --- |
| V1 3003 | Programs shall provide capabilities "to monitor physiological and psychosocial well-being" and deliver preventive care in mission |
| V1 3004 | Programs shall provide in-mission medical capabilities to diagnose and treat |
| V1 3004 a | Electronic medical records, "including data encryption/protection" |
| V1 3004 h | "Assessing, recording, monitoring, and trending vital signs and additional physiological and behavioral health signs" |
| V1 3004 p | "Monitoring and balancing work/rest schedule" |
| V1 3004 r | Private two-way communication with ground medical and psychological support, family and crew support |
| V1 3004 s | "Private transmission of medical data" to ground medical support |
| V1 3004 t | "Means of providing autonomous medical care and advanced life support" |
| V1 3018 | Returning crew are monitored over the long term "in a standardized manner" |
| V1 6002, 6003 | Private medical communications are scheduled routinely and treated as private |
| V2 7045 | Medical equipment "shall be usable by non-physician crewmembers" |

### The monitoring list in V1 3003

In-mission preventive care includes periodic monitoring of: general health status;
nutrition intake; aerobic and strength fitness; flexibility, agility and balance; work/rest
schedules and sleep; environmental parameters; hearing; psychosocial countermeasures (team
cohesion, privacy, isolation); eye health (SANS); the neck and leg veins; immune function.
Also vitamin D supplementation and preventive dental care.

## Limits for the body

| What | Limit | ID |
| --- | --- | --- |
| Aerobic fitness, missions with spacewalks in weightlessness | In-mission VO2max at or above **32.9 ml/min/kg** | V1 4001 |
| Aerobic fitness, missions with surface walks | In-mission VO2max at or above **36.5 ml/min/kg** | V1 4002 |
| Aerobic fitness, relative | At or above **80%** of the pre-mission value | V1 4003 |
| Muscle strength | At or above **80%** of baseline | V1 4024 |
| Pre-mission strength, minimum | Deadlift 1.0 × body weight, bench press 0.7 × body weight (higher for EVA missions) | V1 4023, Table 4.6-1 |
| Bone density, hip and spine | At or above **95%** of the pre-mission value | V1 4027 |
| Bone density, femoral neck | At or above **90%** of the pre-mission value | V1 4027 |
| Nutrition | **100%** of each person's calculated nutrient and energy needs | V1 4020 |
| Blood and immune values | Within the normal range; never at critical values | V1 4016, V1 4017 |
| Mind and thinking | "within clinically accepted values as determined by behavioral health evaluations" | V1 4011 |
| Sensorimotor | Limits defined per task; no single number | V1 4006 to V1 4009 |
| Schedule | Work, exercise and sleep hours "shall have established limits" | V1 4014 |
| Fatigue | Schedule planning includes circadian and work/rest assessment | V1 6001 |

## Limits for radiation

| What | Limit | ID |
| --- | --- | --- |
| Principle | Keep every exposure as low as reasonably achievable | V1 4029 |
| Whole career | Less than **600 mSv** effective dose, "universal for all ages and sexes" | V1 4030 |
| One design-reference solar storm | Less than **250 mSv** effective dose | V1 4031 |
| Nuclear power sources | Less than **20 mSv per mission year** | V1 4032 |
| Cosmic rays, habitats used over 60 days | Less than **1.3 mSv/day** in free space, **0.9 mSv/day** on a surface | V1 4033 |
| Monitoring the cabin | Radiation in habitable volumes shall be monitored | V2 6161 |
| Monitoring each person | Exposure "received by individual crew members" shall be monitored | V2 6162 |
| Alerting | The system "shall alert the crew and operations teams when radiation exposure rates exceed predefined thresholds" | V2 6164 |

The 600 mSv limit keeps each crew member below a 3% mean risk of dying from
exposure-induced cancer. V1 4030 explains the calculation.

## Limits for the cabin

| What | Limit | ID |
| --- | --- | --- |
| Carbon dioxide | One-hour average partial pressure no more than **3 mmHg** | V2 6004 |
| Oxygen | Within the ranges of Table 6.2-1 | V2 6003 |
| Temperature and humidity | Within Figure 6.2-2 (health) and Figure 6.2-3 (performance) | V2 6012, V2 6013 |
| Recording | Pressure, humidity, temperature, oxygen and CO2 recorded automatically | V2 6020 |
| Display | The same values shown to the crew in real time | V2 6021 |
| Alerting | Crew alerted when any of them is "outside safe limits" | V2 6022 |
| Noise over 24 hours | Noise dose at or below 100 | V2 6115 |
| Noise in sleep areas, missions over 30 days | At or below the NC-40 curve | V2 6079 |
| Noise per person | Exposure monitored for each crew member | V2 6088 |
| Sleep | Volume, restraint, environmental control and privacy for sleep for each crew member | V2 7070 |

## Rules for alerts and screens

Volume 2, chapter 10 covers crew interfaces. Read section 10.3 before designing any alert.

| What | Rule | ID |
| --- | --- | --- |
| Priority | Alerts are prioritised by type per Table 10.3-1 (emergency, warning, caution) | V2 10175 |
| Two senses | Emergency, warning and caution alerts are both seen and heard | Section 10.3 |
| Control | The operator can enable, inhibit and suppress alerts, and inhibited alerts are reported | V2 10154 to V2 10156, V2 10177 |

## Not yet read

- Volume 1's levels-of-care table: what care is expected at each mission distance.
- Volume 2 Table 6.8-1 in full: which radiation monitoring is required in low Earth
  orbit, beyond it, and on a surface.
- The OCHMO technical briefs, which explain each topic in a few pages:
  https://www.nasa.gov/ochmo/hsa-standards/ochmo-technical-briefs/
