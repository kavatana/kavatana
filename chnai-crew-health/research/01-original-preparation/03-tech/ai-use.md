> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Using AI, and saying so

AI tools are allowed in Space Apps. Their use must be disclosed. The 2026 wording arrives
with the Project Submission Guide on 13 November; this follows the 2025 guide.

## The disclosure rules

| What was made with AI | What the team must do |
| --- | --- |
| Images or video | A visible "AI-generated" mark on each one |
| Text, code, audio, data | State it in the "Use of Artificial Intelligence" field |
| Anything | No NASA logos, insignia or branding in generated content |

Keep a running list during the weekend: tool, what it was used for, where the result is.
Writing it from memory at 11 PM on Sunday is how things get left out.

## AI inside the product

| Use | Verdict |
| --- | --- |
| Deciding whether a reading is dangerous | No. That is done by tested rules built on NASA's limits, which give the same answer every time and can be explained |
| Finding a slow trend a person would miss | Yes, with simple statistics first. A model only if it clearly does better |
| Explaining a result in plain words | Yes, if the explanation is built from the rule's own output and cannot add facts |
| A free-form medical chatbot | No. It can state things that are untrue, and a judge with a medical background will test it |
| Anything that needs a server to answer | Only as an extra. The astronaut is cut off from Earth, so the core cannot depend on it |

## If a language model is used

- It runs on the device where possible, so the product still works when cut off.
- If a hosted model is used for the demo, the product works fully without it, and the
  project page says which model and why.
- Its key never reaches the browser or the repository.
- It is told only what the rules already decided, and its wording is checked against that.

## Building with AI

The team builds with AI coding tools as it always does. Say so plainly in the disclosure
field: which tools, for what. Judges score the project, and an honest disclosure costs
nothing.
