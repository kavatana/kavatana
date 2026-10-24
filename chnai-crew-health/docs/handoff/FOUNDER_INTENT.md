# Founder intent and project story

Reconstructed from this CHNAI project's conversation and retained project documents. Consolidated 23 October 2026; this is a structured summary, not a verbatim transcript. It includes ambitions without presenting them as delivered functionality or NASA requirements.

## The problem we chose

Team: **CHNAI LAB**, originally two software members in Phnom Penh. Product working name: **CHNAI Crew Health**. The team name and project name are separate. Recruiting priorities were a health/life-science reviewer and a designer/storyteller. No reviewer sign-off or completed recruitment is established by these notes.

Challenge: **Create Health Monitoring Software for Astronauts on Space Missions**; supplied event context: NASA Space Apps 2026, Intermediate, Human Exploration / Software / Space Exploration.

The supplied challenge summary describes radiation, isolation/confinement, altered gravity and a hostile closed environment, with immune changes, bone loss, cardiovascular events and behavioral health problems. It asks for software that gathers indicators and enables astronauts to evaluate and act on their health. Distance from Earth is a further mission constraint in the research, not a fifth outcome named by this summary.

Official entry points:

- [Challenge](https://www.spaceappschallenge.org/2026/challenges/create-health-monitoring-software-for-astronauts-on-space-missions/)
- [Team page](https://www.spaceappschallenge.org/2026/find-a-team/chnai-lab/)
- [Awards](https://www.spaceappschallenge.org/awards/)

The founder's working test is **gather → evaluate → act**. A display of red numbers is insufficient: the crew needs reliable context and an accountable next action while Earth may be unavailable. This does not imply NASA lacks physicians, flight surgeons, medical operations or existing digital assistants. The research records existing work; our gap is a particular, testable workflow, not a claim to replace all NASA medicine.

## Questions the founder asked us to investigate

| Area | Questions that must shape the design |
| --- | --- |
| Mission and people | Who uses the system, in which mission phase, doing what task? What are their job, qualifications, current duty and accepted responsibility? Who can see or share which information? |
| Health and context | Which indicators address the named hazards/outcomes? What can they actually establish? What context comes from work, exercise, sleep, cabin conditions and communication? |
| Devices and transport | What is documented as used in space? Which interfaces are actually public? What format, timing, wearer association, calibration, quality and connectivity information arrives? |
| Data engineering | What is a source reference, study catalog, file inventory, raw research artifact, normalized observation, simulated event or operational record? How are each retained, validated, queried and corrected? |
| Automation and AI | Which repetitive work can run in the background? When must automation stop, expose uncertainty or ask an accountable person? Does a model improve the workflow on the available hardware? |
| Interface | What does a person need at this moment? Which evidence and action matter? How does the interface behave with stale data, uncertain identity, role changes, delayed Earth contact and incomplete commands? |
| Delivery | How are web, API, database, shared contracts, tests and environments organized? How do failures, retries, backups, migrations and acceptance evidence work? |
| Competition | Can judges see a working, relevant, honest product and repeat its purpose in one sentence? Which NASA source actually changes product behavior? |

The request for a large data foundation is about justified coverage and organization, not downloading everything or forcing every source into the crew database. Each data family needs a purpose, applicability limit, provenance, access/rights status, proposed adapter and validation path. Restricted astronaut health records are not made public by the challenge.

## Desired experience

The founder rejected toy-like screens, arbitrary dashboards, excessive buttons and a generic chatbot beside numbers. The desired direction is a calm, professional, visually informative task interface. Show context, quality, uncertainty, responsibility and useful actions. Study NASA human-factors work and observed public winner interfaces; a NASA color palette alone does not establish crew usability.

Automation should gather and organize validated information with low crew burden. Explicit human ownership and sharing controls are still meaningful. The request for advanced AI/AGI is an aspiration to useful automation, not evidence that autonomous clinical decisions are appropriate or implemented. The current deterministic path is the comparison baseline for any future model.

The founder imagined an interactive 3D mission environment for end-to-end testing. Preserve that idea as a later view over the same scenario engine: scenario events, expected state, faults and outcomes must match the app. A rendered space station is not a validated physiological simulator.

Earlier team-image preferences were natural professional faces, complementary software/AI engineering duties, Cambodian shoulder flags, convincing lighting and correct team-card cropping; no awkward shared tablet or official NASA endorsement. Identity reference photos/logo are not included in this code handoff. Do not fabricate a likeness or silently use unrelated people if imagery is revisited. The application code currently uses its own mark and no NASA logo.

## How the concept became the current bounded slice

The broad research was narrowed to one fictional completed assessment and its full review/handoff episode. This exposes difficult engineering requirements without claiming to diagnose all four health outcomes. An unavailable primary reviewer requires an offer and explicit backup acceptance. An approved snapshot must stay exact across corrections and delayed delivery. Receipt, ground review and onboard follow-up are different states. A unit-label conflict in real public research must remain visible instead of being silently normalized.

These are observable claims a judge or reviewer can inspect. The broad health-domain requirements remain in the research register; they are not all covered by this implemented slice.

## What “winning” means in engineering terms

Aim for a finished, intelligible, defensible demonstration: a concise purpose; visible source names and their actual use; a meaningful complete action; tested failure/recovery behavior; and honest labels for real research versus simulation. A health/life-science review and user testing would strengthen evidence, but neither can be invented.

The winner studies distinguish official award descriptions from direct observations of public sites on the review date. Those sites may differ from judged versions. We do not know private judging deliberations. An interactive dashboard can be award-worthy; form alone does not decide scientific validity. No award or NASA adoption is guaranteed.

The original notes include provisional local/global deadlines, a 30-second video or seven-slide limit from older guidance, a no-early-build claim and expected 2026 release dates. Later instructions explicitly requested implementation and GitHub delivery. Preparation timestamps remain real; current eligibility and final submission requirements remain unresolved. Research and building authorization is not evidence of competition eligibility.

## Working relationship

Proceed independently on authorized, reversible work, using the repository and primary evidence before asking the founder to repeat context. Communicate briefly in concrete terms: what works, what is unknown, what decision comes next and why. Be ambitious through understanding and verification, not unsupported claims about novelty, “AGI,” medical validity or flight readiness.

Target host is the founder's **16-inch MacBook Pro, M3 Pro, 18 GB unified RAM**. The prior personal-Drive migration is complete according to retained checkpoints; account identifiers and private archive links are intentionally absent from this public handoff. Runtime use does not require Drive credentials.
