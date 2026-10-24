> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Design rules for crew health software

Principles to know before the day. They come from NASA's interface requirements
(NASA-STD-3001 Volume 2, chapter 10) and from how the project is judged. No screens are
drawn before 14 November.

## The user

An astronaut months into a mission: trained and capable, not a doctor, short of time,
possibly tired or unwell, and unable to ask anyone for twenty minutes or more.
V2 7045 requires medical equipment to be "usable by non-physician crewmembers".

## Order of information

Every screen answers in this order:

1. **Status:** am I all right?
2. **Meaning:** what is off, compared with what?
3. **Action:** what should I do now, and when should I check again?

A number alone is not an answer. "Sleep 5 h 10 min" needs "below your plan for four
nights" and "move tomorrow's first task; lights down at 21:30".

## Alerts

NASA classes alerts by urgency and requires the urgent ones to reach two senses.

| Rule | Source |
| --- | --- |
| Alerts are prioritised by type: emergency, warning, caution | V2 10175, Table 10.3-1 |
| Emergency, warning and caution alerts are both seen and heard | Section 10.3 |
| The crew can inhibit and suppress an alert, and the system reports what is inhibited | V2 10155, 10156, 10177 |
| An alarm is no louder than 95 dBA at the listener | V2 6081 |

For the design this means: few alerts, ranked, each with one action, none that cannot be
silenced, and a record of what was silenced.

## Reading conditions

- **Never colour alone.** Pair colour with a word, a shape or a position.
- **Dark and light.** Cabin lighting changes through the day; the projector in the judging
  room will wash out low contrast.
- **Large touch targets and large type.** The user may be floating, restrained or gloved.
- **Units always shown**, with the limit and its source beside the value.
- **Plain words.** "Bone density at the hip", then the medical term if needed.

## Trust

- Every value shows where it came from and when: measured, published, reference or simulated.
- Simulated crew data is labelled as simulated on the screen.
- When the software does not know, it says so.
- Medical data is private (V1 3004 a, r, s). Who can see what is a design decision, made
  on purpose.

## For the judges

A judge gives the project page about a minute.

- The first screen explains itself without scrolling.
- One clear path through the demo, not a tour of features.
- NASA's data is visible and named on the screen, not only in the description.
- It looks finished: consistent spacing, one typeface family, no placeholder text.
- No NASA logo or insignia in the team's own design.

## CHNAI LAB's bar

The studio's own standard applies: real motion, a real interface, nothing generic. Within
29 hours that means one view done to a high finish, not five done roughly.
