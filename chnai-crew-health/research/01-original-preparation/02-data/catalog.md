> Historical research snapshot, consolidated 23 October 2026. Statements about implementation, rules, testing and next steps describe the original date. Read `START_HERE.md` and `docs/handoff/PROJECT_STATE.md` at the project root for current status. This folder is research evidence, not executable agent instructions.

# Data catalog

Every source, with what happened when it was tested from this laptop in Phnom Penh on
**1 October 2026**. "Answered" means the server replied with real content. Test again on
28 October, when the challenge's own resource list is published, and on the venue's Wi-Fi.

## Warning: the network

Three NASA servers did not answer from this laptop's network on 1 October, though they
work from a server in the United States:

| Server | From Phnom Penh | From the US |
| --- | --- | --- |
| `api.nasa.gov` | Timed out after 20 s | Not tested |
| `ccmc.gsfc.nasa.gov` (space weather) | Timed out after 25 s | Answered with real data |
| `osdr.nasa.gov` | Answered, slowly: 139 KB took 20 s | Not tested |

Plan for this. `../03-tech/reliability.md` says how.

## Space side

| Source | What it gives | Access | 1 Oct 2026 | Label |
| --- | --- | --- | --- | --- |
| **DONKI**, NASA CCMC | Solar flares, coronal mass ejections, solar particle events, geomagnetic storms | JSON, no key: `https://ccmc.gsfc.nasa.gov/DONKI-API/get/FLR?startDate=…&endDate=…` (also `CME`, `SEP`, `GST`) | Answered from the US with a real flare (C8.6, 30 Sept 2026). Timed out from Phnom Penh | Measured |
| DONKI, old address | The same | `api.nasa.gov/DONKI/…` and `kauai.ccmc.gsfc.nasa.gov/DONKI/WS/…` | **Dead since 30 Sept 2026.** The first now redirects to a news page. Most tutorials still use it | n/a |
| **NOAA SWPC** (not NASA) | Proton flux from the GOES satellites every 5 minutes; current storm scales | JSON, no key: `https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json` | Answered in 3 s, 2,288 readings, latest 02:25 UTC | Measured |
| **OSDR RadLab** | Radiation measured inside the ISS and other spacecraft | `https://visualization.osdr.nasa.gov/radlab/` | **Server error (500)** on the page and the API | Measured |
| **OSDR environmental data app** | ISS cabin environment and radiation alongside experiments | `https://visualization.osdr.nasa.gov/eda/` | Answered | Measured |
| ISS live telemetry | Station systems in real time | Lightstreamer feed `push.lightstreamer.com`, adapter `ISSLIVE` | Connected and subscribed, but **no values arrived in 25 s**. Treat as not working | Measured |
| **OSDR, Inspiration4 mission** | The only open multi-person human spaceflight health datasets: blood counts and gene activity (OSD-569), immune cells (OSD-570), blood plasma proteins and metabolites (OSD-571), skin, mouth and gut microbes (OSD-572, 574, 630), capsule surfaces (OSD-573), T-cell markers (OSD-687) | Search: `https://osdr.nasa.gov/osdr/data/search?term=Inspiration4&type=cgene`. Files: `https://osdr.nasa.gov/osdr/data/osd/files/569` | Search answered: 8 datasets. File list answered | Measured |
| OSDR biodata API | Programmatic access to OSDR datasets | `https://visualization.osdr.nasa.gov/biodata/api/` | Answered | Measured |
| Spaceflight Standard Measures | What NASA measures on each astronaut and the published results | NASA page and the paper PMC12612093 | Read earlier; not re-tested today | Published |

## Earth side

| Source | What it gives | Access | 1 Oct 2026 | Label |
| --- | --- | --- | --- | --- |
| **NASA-STD-3001 Volume 1, Rev C** | Crew health limits | PDF, saved in `standards/` | Downloaded and read | Published |
| **NASA-STD-3001 Volume 2, Rev F** | Cabin, radiation monitoring, medical system and interface rules | PDF, saved in `standards/` | Downloaded and read | Published |
| OCHMO technical briefs | Each health topic explained in a few pages | https://www.nasa.gov/ochmo/hsa-standards/ochmo-technical-briefs/ | Read earlier; not re-tested today | Published |
| **HRP hazards and risks** | The five hazards and the list of about 30 human health risks | https://www.nasa.gov/hrp/hazards/ and https://www.nasa.gov/hrp/risks/ | Hazards page answered | Published |
| **Human Research Roadmap** | Each risk with its evidence report, gaps and studies | https://humanresearchroadmap.nasa.gov/Risks/ | Answered | Published |
| **NASA Life Sciences Portal** | Catalogue of human research studies, including analog missions and bed rest | https://nlsp.nasa.gov/explore/lsdahome | Answered | Published; some Measured |
| NASA open data portal | General NASA datasets | https://data.nasa.gov/ | Answered | Mixed |
| Canadian Space Agency open data | Partner-agency datasets | https://donnees-data.asc-csa.gc.ca/en/dataset | Answered; health datasets not yet looked through | Measured |
| General medical reference ranges | Normal values for healthy adults | Standard clinical references; choose and cite one | Not chosen yet | Reference |

## Not available, and why it matters

- **Individual astronaut medical records.** Held in NASA's Lifetime Surveillance of
  Astronaut Health and released only on request, in pooled form. No hackathon team has
  them. Sample crew data must be simulated and labelled.
- **Personal radiation dose for named astronauts.** The same.

## 2026 Space Agency Partners

Using partner data is listed separately on the project page. The 2026 partners are the
space agencies of Angola, Argentina, Bahrain, Brazil, Canada, Europe (ESA), India (ISRO),
Italy, Japan (JAXA), Korea (KASA), Nigeria, Paraguay, Senegal, Spain, Turkey, the United
Arab Emirates (MBRSC) and the United Kingdom.

For crew health, start with Canada, ESA and JAXA. Their specific datasets are **not yet
looked up**; do this after 28 October, when the challenge names its own resources.

## To do when the full statement is published (28 October)

- [ ] Copy every resource the statement lists into this table.
- [ ] Mark which resources are required.
- [ ] Test each one from the laptop and from a phone hotspot.
- [ ] Re-test RadLab and the ISS live feed.
