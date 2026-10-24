> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# The challenge

**Create Health Monitoring Software for Astronauts on Space Missions**

- Difficulty: Intermediate
- Subjects: Human Exploration, Software, Space Exploration
- Page: https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/

## The summary, word for word

> Long-duration missions expose astronauts to space radiation, isolation and confinement,
> altered gravity, and a hostile closed environment, which can bring immune changes, bone
> loss, cardiovascular events, and behavioral health problems. On long missions, astronauts
> carry much of the responsibility for spotting these changes in themselves. Your challenge
> is to build a health monitoring software that gathers health indicators and enables
> astronauts to evaluate and act on the status of their health.

The full statement, with background, objectives, tips and required resources, is published
on **28 October**. "Certain challenges require resources to be used." Read it that day and
update this file.

## What the words ask for

| Words in the summary | What they mean for any solution |
| --- | --- |
| "space radiation, isolation and confinement, altered gravity, and a hostile closed environment" | Four of NASA's five hazards of human spaceflight. The fifth is distance from Earth. A solution that covers only heart rate misses most of the brief |
| "immune changes, bone loss, cardiovascular events, and behavioral health problems" | Four named health outcomes: body defence, skeleton, heart and vessels, mind |
| "astronauts carry much of the responsibility for spotting these changes in themselves" | The user is the astronaut, alone. The software cannot depend on a doctor on Earth |
| "gathers health indicators" | Input: bring many kinds of measurements into one place |
| "evaluate" | Meaning: tell the astronaut what the numbers say about them |
| "act" | Decision: what to do next. This is the verb most teams will skip |

## The three verbs are the test

A judge can ask of any project: does it **gather**, does it help the astronaut
**evaluate**, and does it lead to an **action**? In Phnom Penh the organisers said projects
are checked against the objectives in the challenge details. On 28 October, copy each
objective into a checklist.

## Who else is on this challenge

- **687 teams** worldwide had chosen it by 1 October. Expect well over a thousand projects.
- In Phnom Penh: Big Boss, Larpers, Space Mols, TerraX, and CHNAI LAB once the team page
  is created.

### What most of those teams will build

A dashboard of heart rate and oxygen numbers that the team made up, with an AI chat box
beside it. It looks fine and scores low on Validity and Relevance, because nothing in it
comes from NASA.

### Where the room is

These are observations about the challenge, not a design.

1. **NASA's own limits.** NASA publishes what "healthy enough" means for a crew member,
   with numbers: `../02-data/standards/thresholds.md`. Few teams will read an 86-page standard.
2. **The action.** NASA's standard requires "means of providing autonomous medical care".
   Telling an astronaut a number is red is not help. What to do about it is.
3. **Being cut off.** At Mars distance a message takes up to about 20 minutes each way,
   and there are periods with no contact. Software that needs a server is not a solution.
4. **Honesty about data.** Real astronaut medical data is private. A team that says plainly
   what is real and what is simulated scores higher on Validity than one that pretends.
5. **The mind.** Behavioural health is in the brief and is the hardest part to measure.
6. **Privacy.** NASA's standard requires medical conversations and medical data to be
   private, and medical records to be protected. Almost no hackathon project considers it.
