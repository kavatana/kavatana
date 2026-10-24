> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Keeping the demo from failing

A demo that breaks in front of the judges loses the round. These are the known ways it
can break and what prevents each.

## What was seen on 1 October 2026

Tested from this laptop in Phnom Penh:

| Server | Result |
| --- | --- |
| `api.nasa.gov` | No answer in 20 seconds |
| `ccmc.gsfc.nasa.gov` (DONKI space weather) | No answer in 25 seconds, twice. The same address answered at once from a server in the US |
| `osdr.nasa.gov` | Answered, but 139 KB took 20 seconds and a larger file timed out |
| `visualization.osdr.nasa.gov/radlab` | Server error |
| `services.swpc.noaa.gov` | Answered in 1 to 3 seconds |
| `www.nasa.gov`, `humanresearchroadmap.nasa.gov`, `nlsp.nasa.gov` | Answered in 2 to 7 seconds |

Also: NASA moved the DONKI address on 30 September 2026. The old one, used in most
tutorials, now leads to a news page.

## The rules that follow

1. **The browser never calls NASA directly.** A small server route does, from a region
   that can reach NASA, and the app calls that route.
2. **Every NASA response is saved.** The route keeps the last good copy. The repository
   holds a dated copy of each dataset used.
3. **The app works with no network at all.** If the route cannot be reached, the app shows
   the saved copy and says so: "NASA DONKI, saved 14 Nov 2026 10:20 UTC".
4. **A saved copy is never passed off as live.** The label is on the screen.
5. **Addresses are checked, not remembered.** Each one is opened on the morning of the event.

## Failure list

| What can go wrong | Prevention |
| --- | --- |
| Venue Wi-Fi is slow or drops | App runs offline; phone hotspot as second network |
| A NASA server is down during the pitch | Saved copies; the label says "saved" |
| The hosting goes down | The same build on a second free host; a local copy on the laptop |
| The projector cuts off the screen or washes out colours | Test on a projector; large type; meaning never carried by colour alone |
| The laptop battery dies | Charger and a second laptop with the project open |
| The video link asks for sign-in | Open it in a private window before submitting |
| A late change breaks the app | Stop adding features at 11:00 AM Sunday; only fix after that |
| The video runs 31 seconds | Check the length in the file, not by feel |
| A member is missing from the team page | Check the Members tab on Saturday morning |
| The submit button is pressed at 11:58 PM and fails | Submit by 9:00 PM, edit afterwards |

## Checks before the pitch

- [ ] Open the public link on a phone using mobile data.
- [ ] Open it on the laptop with Wi-Fi off.
- [ ] Open it in a private window.
- [ ] Run the tests.
- [ ] Walk through the demo twice from a cold start, timed.
