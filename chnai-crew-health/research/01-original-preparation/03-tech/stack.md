> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Tools to have ready

This is a readiness list: tools the team should already know how to use on the morning of
14 November. It does not describe a product. What gets built is decided after 9:00 AM that day.

Everything here is free and open source or has a free tier, as the Space Apps terms and
the studio's zero-dollar rule both require.

## What the challenge demands of the technology

| Demand | Why | What it means |
| --- | --- | --- |
| Works with no connection | The user is far from Earth, and the venue Wi-Fi is shared by 285 people | The app runs fully in the browser and keeps its data on the device |
| Never shows a wrong number | It is health software, and Validity is a judging criterion | Typed data, explicit units, tested rules |
| Usable in seconds | Crew time is scarce; judges give it a minute | One screen that answers "am I all right, and what should I do?" |
| A public link with no login | Submission rule | Static hosting, sample data built in |
| Open source | Participant terms | Public repository with a licence from the first commit |

## The recommended set

| Layer | Choice | Why this one |
| --- | --- | --- |
| Language | **TypeScript**, strict mode | Catches unit and shape mistakes before they reach the screen |
| App | **Next.js 16** with React 19, static export where possible | The team ships it already; one codebase for screens and data routes |
| Offline | **Installable web app** (service worker) with data in **IndexedDB** through Dexie | Opens and works with the network off; nothing to install from a store |
| Data checks | **Zod** schemas on every value entering the app | A malformed NASA response is rejected, never drawn |
| NASA data | Small **server routes** that fetch, check and save NASA data, plus saved copies in the repository | NASA servers were unreachable from Phnom Penh on 1 October; see `reliability.md` |
| Charts | **Hand-drawn SVG** for the few key charts, or Recharts | Full control of labels, units and limit lines |
| Motion and 3D | CSS and Motion for transitions; **React Three Fiber** only if one 3D view carries the story | A 3D scene that stutters on the judges' projector costs more than it gives |
| Analysis | Plain, tested functions first: comparison to baseline, trend over days, limit checks | Explainable, and correct every time |
| Machine learning | On the device with **ONNX Runtime Web** or **Transformers.js** on WebGPU, if [teammate] has a model worth showing | No server, so it works when cut off |
| Language model | Optional, for wording only, and never for the judgement itself | See `ai-use.md` |
| Real sensor | **Web Bluetooth** with a standard heart-rate strap | A live reading in the demo makes "gathers health indicators" real. Chrome on a laptop or Android only |
| Tests | **Vitest** for the rules, **Playwright** for one start-to-finish check | The limit checks are the part that must not be wrong |
| Hosting | **Vercel** or **Cloudflare Pages**, free tier | Both already authorised on this laptop |
| Code | Public **GitHub** repository, **Apache-2.0** licence | The terms' default licence |

## What "latest" is worth using, and what is not

| Worth it | Why |
| --- | --- |
| Local-first web app | It is the mission's real constraint, and few teams will do it |
| On-device inference with WebGPU | "The model runs on the spacecraft" is true of the demo |
| Web Bluetooth | A real sensor in a room of simulated ones |

| Not worth it in 29 hours | Why |
| --- | --- |
| A native mobile app | Store builds and installs; the judges need a link |
| A custom-trained large model | No open astronaut data to train on; nothing to validate against |
| Virtual or augmented reality | Judges cannot open it from the project page |
| A complex backend with accounts | Login is forbidden for the demo, and it can fail |

## To practise before the day

Practice must be on unrelated material, never on the project.

- [ ] Both laptops: Node, the package manager, Git, the editor, and Playwright browsers installed.
- [ ] Each person has created and deployed a new empty app to a public link in under ten minutes.
- [ ] Each person has made a web app work with the network switched off.
- [ ] Someone has read a heart-rate strap over Web Bluetooth in Chrome.
- [ ] Someone has recorded, cut and subtitled a 30-second screen video.
- [ ] GitHub, Vercel or Cloudflare, and Google Drive or YouTube accounts are signed in.
- [ ] A phone hotspot with data is ready as a second network.
