> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Space health in plain words

A short course for a software team. Read it once before the 18 October meetup. Every claim
links to a NASA source in `../sources.md`.

## The five hazards

NASA's Human Research Program groups everything that harms a crew into five hazards. The
challenge summary names four of them.

| Hazard | What it is | What it does to a person |
| --- | --- | --- |
| **Space radiation** | Galactic cosmic rays all the time, and bursts of particles from the Sun | Raises lifetime cancer risk; can affect the heart, the nervous system and, in a strong solar storm, cause acute sickness |
| **Isolation and confinement** | A few people in a small space for months | Poor sleep, low mood, conflict, slower thinking |
| **Distance from Earth** | Messages delayed by up to about 20 minutes each way at Mars; no quick return | The crew must diagnose and treat without a doctor |
| **Gravity fields** | Weightlessness, then Moon or Mars gravity, then Earth again | Bone and muscle loss, weaker heart and lungs, balance problems, fluid moving toward the head and eye changes |
| **Hostile, closed environments** | A sealed cabin: recycled air and water, noise, microbes | Carbon dioxide headaches, weaker immune defence, hearing loss, infections |

## The four outcomes the challenge names

### Immune changes
Stress, poor sleep, radiation and the closed cabin weaken immune defence. Dormant viruses
can reactivate and rashes are common. It is measured through blood counts and markers in
blood and saliva. NASA requires values to stay in the normal range for healthy adults.

### Bone loss
Without weight on the skeleton, bone thins, mostly at the hip and spine. Calcium leaving
bone also raises the risk of kidney stones. It is measured on Earth by a DXA scan before
and after flight; in flight the signals are exercise done, diet, and markers in urine.
The countermeasures are resistance exercise, vitamin D and nutrition.

### Cardiovascular events
The heart and vessels adapt to weightlessness: less blood volume, a deconditioned heart,
fainting on return to gravity, and rarely, clots in the neck veins. Fitness is tracked as
VO2max, the most oxygen the body can use during exercise.

### Behavioural health
Isolation, workload and broken sleep wear down mood, attention and teamwork. It is measured
by sleep tracking, short computer tests of thinking speed and accuracy, and questionnaires.

## One more that software teams should know

**SANS**, Spaceflight Associated Neuro-Ocular Syndrome: fluid shifting toward the head
changes the shape of the eye and blurs vision. It is monitored with eye imaging. NASA's
standard lists periodic SANS monitoring as required in-mission care.

## What NASA measures on every astronaut

The **Spaceflight Standard Measures** project collects the same core set from crew members
before, during and after flight, so missions can be compared:

- Sleep and activity from a wrist device (actigraphy)
- A battery of ten short cognitive tests
- Blood, urine and saliva markers
- Questionnaires on mood, team and workload
- Cardiovascular and muscle measures
- Microbiome samples

This list is the most defensible answer to "which health indicators?".

## Words to know

| Term | Meaning |
| --- | --- |
| HRP | NASA's Human Research Program, which studies and reduces crew health risks |
| OCHMO | Office of the Chief Health and Medical Officer, which owns the health standards |
| NASA-STD-3001 | The standard that sets crew health limits (Volume 1) and what the spacecraft must provide (Volume 2) |
| Countermeasure | Anything done to prevent harm: exercise, diet, medication, sleep schedule |
| Flight surgeon | The crew's doctor, on the ground |
| Private medical conference | A scheduled private call between a crew member and the flight surgeon |
| Earth-independent medical operations | Care the crew gives itself when Earth cannot help in time |
| EVA | A spacewalk or a walk on the surface |
| LEO, BLEO | Low Earth orbit; beyond low Earth orbit (Moon, Mars) |
| GCR, SPE | Galactic cosmic rays; solar particle event |
| mSv | Millisievert, the unit of radiation dose to a person |
| ALARA | "As low as reasonably achievable", the rule for radiation exposure |
| VO2max | The most oxygen the body can use per minute per kilogram, a measure of fitness |
| BMD, DXA | Bone mineral density; the X-ray scan that measures it |
| Analog | A study on Earth that imitates a mission: an isolation habitat, bed rest, Antarctica |
| OSDR | NASA's Open Science Data Repository for space biology data |
