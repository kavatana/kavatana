> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Space side: the crew member

What can be known about a person during the mission, how it is gathered, and what it is
compared against. The limits are in `../standards/thresholds.md`.

Open data for named astronauts does not exist (`../catalog.md`). This file describes the
kinds of data and where their real-world values and limits come from.

## How indicators are gathered in flight

| Way of gathering | Effort for the crew | Examples |
| --- | --- | --- |
| Worn all day | None | Wrist activity and sleep tracker, heart-rate sensor, personal radiation dosimeter |
| Logged by equipment | None | Exercise machine sessions, cabin sensors |
| A short task | Minutes | Cognitive tests, a vision check, a questionnaire |
| A sample or a scan | Significant | Blood, urine, saliva; ultrasound; eye imaging |
| Told by the person | Seconds | Symptoms, mood, pain, how they slept |

Crew time is the scarcest resource on a mission. Anything that asks for effort has a cost.

## The indicators, by area

### Heart and fitness (challenge: "cardiovascular events")

| Indicator | How often | Compared against |
| --- | --- | --- |
| Resting heart rate, heart-rate variability | Continuous | The person's own baseline; general reference ranges |
| Blood pressure | Periodic | The person's own baseline |
| Aerobic fitness (VO2max, measured or estimated from exercise) | Monthly or so | V1 4001: 32.9 ml/min/kg; V1 4003: 80% of pre-mission |
| Aerobic exercise done | Daily | The prescribed plan |
| Neck and leg vein checks by ultrasound | Periodic | V1 3003 n requires periodic monitoring |

### Bone and muscle (challenge: "bone loss")

| Indicator | How often | Compared against |
| --- | --- | --- |
| Resistance exercise done (loads, sets) | Daily | The prescribed plan |
| Strength | Periodic | V1 4024: 80% of baseline |
| Bone density | Not measurable in flight today; estimated from exercise, diet and urine markers | V1 4027: 95% hip and spine, 90% femoral neck |
| Calcium in urine, hydration | Periodic | Kidney-stone risk |
| Vitamin D and calcium intake | Daily | V1 3003 c |

### Immune and blood (challenge: "immune changes")

| Indicator | How often | Compared against |
| --- | --- | --- |
| White blood cell counts | Periodic | V1 4016: the normal range |
| Stress and immune markers in saliva or blood | Periodic | The person's own baseline |
| Symptoms: rash, cold sores, congestion, slow healing | When they happen | n/a |
| Sleep and stress, which drive immune change | Continuous | See below |

Real example data: the Inspiration4 crew's blood counts before, during and after flight
are open in OSDR (OSD-569).

### Mind and behaviour (challenge: "behavioral health problems")

| Indicator | How often | Compared against |
| --- | --- | --- |
| Sleep duration and timing | Nightly | The schedule limits of V1 4014 and V1 6001 |
| Cognitive test battery (ten short tests) | Weekly or so | V1 4011; the person's own baseline |
| Mood, stress, workload ratings | Daily to weekly | The person's own baseline |
| Work and rest hours | Daily | V1 4014 |
| Contact with family and ground | Weekly | V1 3004 r |

Workload is rated with the NASA Task Load Index or the Bedford scale; Volume 1 names both.

### Eyes and head

| Indicator | How often | Compared against |
| --- | --- | --- |
| Vision check | Periodic | The person's own baseline |
| Eye imaging | Periodic | V1 3003 m requires periodic SANS monitoring |
| Headache, congestion | When they happen | Cabin CO2 at that time |

### Food, water, medication

| Indicator | How often | Compared against |
| --- | --- | --- |
| Energy and nutrient intake | Daily | V1 4020: 100% of personal need |
| Water intake | Daily | Personal need |
| Body mass | Weekly or so | Baseline |
| Medication taken | When it happens | V1 3004 m |

### Radiation to the person

| Indicator | How often | Compared against |
| --- | --- | --- |
| Personal dose so far this mission | Continuous | V1 4030: 600 mSv career, including earlier flights |
| Dose rate now | Continuous | V1 4033 design rates; V2 6164 alert thresholds |

## What links the areas

The areas affect each other, and that is where software can help a person see what they
would miss:

- Poor sleep lowers cognitive scores and immune defence.
- High cabin CO2 brings headaches and poorer sleep.
- Missed resistance exercise shows up weeks later in strength, and months later in bone.
- A solar storm raises dose for hours; sheltering lowers it.
- Low food intake undermines bone, muscle and immune function together.

## Where each indicator's numbers can come from

| Need | Source | Label |
| --- | --- | --- |
| The limit | NASA-STD-3001 | Published |
| Typical in-flight changes | HRP evidence reports, Standard Measures publications | Published |
| A real multi-person example | Inspiration4 datasets in OSDR | Measured |
| Normal ranges for healthy adults | A clinical reference | Reference |
| A sample astronaut's day-by-day readings | Built by the team from the rows above | Simulated |
