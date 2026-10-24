> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data: how it is organised

Health data for a space mission comes from two places and they must never be mixed up.

```
02-data/
├── catalog.md            every source, where it lives, and whether it answered on 1 Oct 2026
├── space/                what is measured during the mission
│   ├── crew-health.md        the person: body, mind, sleep, exercise, food
│   └── cabin-and-radiation.md the surroundings: air, noise, radiation, space weather
├── earth/                what is known on the ground
│   ├── baselines-and-recovery.md  the person before and after flight
│   └── research-and-analogs.md    studies, archives, Earth-based mission simulations
└── standards/            the limits everything is compared against
    ├── thresholds.md
    └── the two NASA-STD-3001 PDFs
```

## The two sides

| | Space side | Earth side |
| --- | --- | --- |
| When | During the mission | Before launch, after landing, and in studies on Earth |
| What it answers | "How am I right now?" | "What is normal for me, and what is the limit?" |
| Who produces it | The crew member, wearables, cabin sensors, radiation detectors, the Sun | Clinics, laboratories, analog studies, research archives, NASA's standards office |
| Openly available? | The surroundings: yes. A named astronaut's medical data: no | Standards and research: yes. A named astronaut's baseline: no |

A reading from space means nothing alone. "Hip bone density 96%" needs the Earth-side
baseline (the same person before launch) and the Earth-side limit (95%, V1 4027).

## Four kinds of data, by how far they can be trusted

Every value carries one of these labels, from the moment it enters the system to the moment
it is shown.

| Label | Meaning | Examples |
| --- | --- | --- |
| **Measured** | A real measurement from a NASA or partner source, fetched from the source | Solar flare events, proton flux, open datasets from OSDR |
| **Published** | A real number taken from a NASA document or paper | The limits in `standards/thresholds.md`; averages reported in studies |
| **Reference** | A normal range from general medicine, not from NASA | Resting heart rate ranges, blood count ranges |
| **Simulated** | Made by the team to stand in for private crew data | A sample astronaut's daily readings |

Real medical data for individual astronauts is private and is not published. Any project in
this challenge shows simulated crew members. The honest way is to say so on the screen and
on the project page, and to build each simulated value from a Published or Measured one.

## Rules for handling data

1. **One record, one source.** Every value keeps its source name, link, unit, time of
   measurement, time fetched, and its label from the table above.
2. **Units are explicit.** mSv is not mGy. mmHg is not kPa. Store the unit beside the number.
3. **Time is UTC**, in ISO 8601, with the mission day beside it where it helps.
4. **Space and Earth are kept apart** in storage and in names, and joined only when
   comparing a reading to its baseline or limit.
5. **Thresholds come from the standard**, with the requirement ID stored beside them.
6. **Medical data is private by default.** NASA requires medical records to be protected
   (V1 3004 a) and medical data to be sent privately (V1 3004 s). No real person's data.
7. **Every outside source has a saved copy.** Several NASA servers were slow or unreachable
   from Phnom Penh on 1 October (`catalog.md`). A fetched copy with its date is kept, and
   the screen says when it is showing a saved copy.
8. **Every source is written down when it is first used**, because the project page must
   list all of them.

## The areas of health data

| Area | Space side | Earth side |
| --- | --- | --- |
| Heart and fitness | Heart rate, blood pressure, exercise sessions, fitness tests | Pre-flight VO2max, post-flight recovery |
| Bone and muscle | Resistance exercise done, diet, urine markers | DXA scans before and after, strength tests |
| Immune and blood | Blood counts, saliva markers, symptoms | Pre-flight laboratory baseline |
| Mind and behaviour | Sleep, cognitive test scores, mood and workload ratings | Pre-flight cognitive baseline, analog studies |
| Eyes and head | Eye imaging, vision checks | Pre-flight eye imaging |
| Radiation | Personal and cabin dose, solar events | Career dose so far, limits |
| Cabin | CO2, oxygen, pressure, temperature, humidity, noise | Limits |
| Food and water | Intake against personal need | Calculated need |
| Care | Symptoms, medication, medical calls | Medical history |
