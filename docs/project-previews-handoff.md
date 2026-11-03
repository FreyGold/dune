# Project previews handoff

Date: 3 November 2026

## Goal

Improve the project pages, videos, and screenshots in the `dune` portfolio.
Amer is the first priority. Use real project interfaces and clear sample data.
Check each project before you record it. Do not present a mock or an older
version as the current app.

The owner asked to document all ten projects below. The owner also asked for
learning documents that explain how the projects work. Drafts are in
`docs/project-internals/`. Expand them from the source when useful.

## Portfolio workspace

- Portfolio source: `/home/frey/Fedora Backup/Important/dune`
- Live portfolio: https://dune-portfolio-showcase.vercel.app/
- Project descriptions, links, and media: `src/data/projects.ts`
- Project media: `public/projects/` and the older `public/project-4/`
- Earlier research: `docs/portfolio-project-research.md`
- Project internals: `docs/project-internals/README.md`
- The workspace has many existing changes. Preserve them. Check the build and
  the relevant project page after making changes.
- A new portfolio deployment requires a fresh build and deployment. Check the
  live page after deployment.

Paths under `Important` below are relative to
`/home/frey/Fedora Backup/Important`.

## 1. Amer / BAK — highest priority

- **What it is:** An employee management application with attendance,
  payroll, requests, projects, and messaging.
- **Owner's role:** Built the entire frontend. Do not claim that the owner
  built the backend.
- **Source:** The separate showcase copies are at `Important/amer-showcase/`
  in `frontend/` and `backend/`. The original work source is at
  `Important/Work/Amer_FrontEnd` and `Important/Work/Amer_BackEnd`.
- **Live app:** https://amer-showcase.vercel.app/
- **API:** https://amer-showcase-api.vercel.app/
- **Portfolio page:** https://dune-portfolio-showcase.vercel.app/projects/amer
- **Access:** The login page displays the shared demo email and password and
  can fill them in. The demo user has full administrator permissions. All
  visitors share the same data and can change or delete it. Do not put private
  data in the app. There is no automatic reset.
- **What was done:** Deployed separate frontend and backend copies with a
  separate Supabase database, Redis resource, and private file bucket. Added
  example records. Checked sign-in, app navigation, team changes, a file
  upload, and an authenticated socket connection. Added `Sample Cairo Office`
  as office location 1 after an office location request returned 404; the
  request then returned 200. The storage region is configured.
- **Current media:** `public/projects/amer/dashboard-live.png`,
  `members-live.png`, and `full-app-tour.mp4`. They show the hosted app with
  sample data. Older Amer media is also in that folder; check before using it.
- **Next:** Capture a polished walkthrough of the live app. Show the dashboard,
  a member profile, attendance or requests, and messaging where those flows
  work. Use sample records and show the real interface. Test each flow before
  claiming it works. Improve the screenshots and replace or supplement the
  current tour.
- **Limits:** Invitation and password-reset emails and push notifications are
  not configured. The frontend production build passed, but its typecheck had
  existing errors. See `Important/amer-showcase/README.md` for infrastructure
  details and private administrator access. Do not copy secrets into media or
  documentation.

## 2. Cortex

- **What it is:** A bilingual academic workspace with collaborative notes,
  study resources, AI help, habits, and focus tools. It also has browser and
  GNOME extensions.
- **Owner's role:** The owner built it with AI assistance.
- **Source:** `Important/college/Graduation Project`
- **Live:** https://cortex-eta-black.vercel.app/
- **Current media:** `public/projects/cortex/home.png` and `home-tour.mp4`
  show the public homepage. Signed-in features were not verified.
- **Next:** Check the current deployment and database. Capture the editor,
  study resources, and a focus workflow with sample data if they work. Do not
  imply that the current homepage tour shows the signed-in product.

## 3. Tamatem

- **What it is:** A student planner for tasks, habits, and focus sessions. It
  includes a web app, API, browser extension, and mobile prototype.
- **Source:** `Important/Tamatem`, `Important/tamatem-backend`, and
  `Important/tamatem-mobile`.
- **Live:** https://www.tamatem.me/; API health endpoint:
  https://tamatem-backend.vercel.app/api/health
- **Current media:** `public/projects/tamatem/sign-in.png`.
- **Status:** The Supabase project was resumed and reported healthy. The
  signed-in app was not verified.
- **Next:** Test sign-in and the database, then capture planning and focus
  workflows if they work. Treat the mobile app as a prototype until tested.

## 4. Autonatic

- **What it is:** An Obsidian plugin that turns text, shared AI conversations,
  and images into structured Markdown notes. It also has search and
  organization tools.
- **Source:** `Important/obsid`
- **Public links:** https://community.obsidian.md/plugins/autonatic and
  https://github.com/FreyGold/autonatic
- **Current media:** `public/projects/autonatic/create-current.png`,
  `search.png`, `organize.png`, and `tour.mp4`. The video is about 18 seconds.
  It shows local version 1.7.36 in an isolated Obsidian vault. It includes
  Create, Search, Organize, and Diagram screens. No AI provider was connected,
  so it does not show note generation.
- **Next:** The owner explicitly permits use of the local copy and display
  recording. Record a clearer end-to-end flow in Obsidian, including note
  generation if a provider is available. Use a sample vault and check the
  screen for private content. The checked Cloudflare account had no Autonatic
  deployment. The public release checked earlier was 1.7.17, which differs
  from the local version; verify versions again before making claims.

## 5. Job Aggregator

- **What it is:** A job search product with web, mobile, and API components.
- **Source:** `Important/jobaggregator`
- **Public source:** https://github.com/FreyGold/jobaggregater
- **Current media:** `public/project-4/1.png`, `2.png`, `3.png`, `vid.mp4`,
  and `vidSrc.mp4`. They show an earlier version.
- **Status:** https://nimble-buttercream-897ec0.netlify.app/jobs opened, but
  its listings were not verified. A Cloudflare deployment opened with a
  JavaScript error and did not show listings during the earlier check.
- **Next:** Find a working current version or run it locally. Show search,
  filters, and a job detail. Check whether old media still represents it.

## 6. Go Boilerplate

- **What it is:** A full-stack starter with a Go backend, frontend workspace,
  Docker Compose, PostgreSQL, Redis, and database migrations. It is a
  boilerplate; the owner said it has no API to document.
- **Source:** `personal/go-boilerplate` under the home directory. Confirm the
  exact path before use.
- **Public source:** https://github.com/FreyGold/go-boilerplate
- **Current media:** `public/projects/go-boilerplate/architecture.svg`.
- **Next:** Improve the diagram or source-based explanation if useful. The
  owner does not want a demo or OpenAPI documentation for this project.

## 7. Inventory

- **What it is:** An Electron desktop app for products, stock, invoices, and
  reports.
- **Source:** `Important/inventory`
- **Current preview:** `/demos/inventory/index.html` on the portfolio. This is
  a read-only browser preview with mock desktop API responses and sample data.
  It is not the full desktop app. The desktop app was not tested in the
  earlier review.
- **Current media:** `public/projects/inventory/dashboard.png`, `products.png`,
  and `demo.mp4`. Preview build materials are in `scripts/inventory-demo/`.
- **Next:** Test the actual desktop app if possible. Show products, an invoice,
  and a stock report with sample data. The owner asked for a more beautiful
  Arabic font in the shown dashboard. Check whether the preview already has
  that change; implement and visually verify it if still needed. Do not label
  the mock browser preview as the full app.

## 8. Voice Typer

- **What it is:** A desktop speech-to-text tool that types into another app.
  The project describes local and cloud transcription and Egyptian Arabic.
- **Source:** `Important/voice_typer`; `Important/s` is a related version.
  Confirm which source is current.
- **Public source:** https://github.com/FreyGold/voice_typer
- **Owner-provided video:** https://x.com/TeslaLeftArm/status/2064334387412435062?a=0xr-PVQTpqbYuZzBkw4&s=20
- **Current media:** `public/projects/voice-typer/demo.mp4` and
  `demo-screen.png`; an extra `preview.png` is also present.
- **Next:** Improve the edit or screenshots from the supplied video, or make a
  clearer recording if the local app is available. The owner does not require
  a live demo.

## 9. SBC Solver

- **What it is:** A browser extension and local Python solver for EA FC 26
  squad building challenges.
- **Source:** `Important/solva-sbc-solver-fork`
- **Public source:** https://github.com/FreyGold/solva-sbc-solver
- **Current media:** `public/projects/sbc-solver/architecture.svg`.
- **Next:** Improve the diagram or explanation if useful. Confirm the owner's
  contribution to the fork before making specific authorship claims. The owner
  does not require a demo.

## 10. Offline Music Library / iOS Music

- **What it is:** An iPhone app, designed for iOS. It connects to a local or
  remote server that uses yt-dlp to download music. The app saves tracks to the
  iPhone for offline playback.
- **Source:** `Important/iosmusic`
- **Owner-provided video:** https://x.com/TeslaLeftArm/status/2087252365116051912?a=cL4ndGIGLytj1X1a0Ss&s=20
- **Current media:** `public/projects/offline-music/demo.mp4` and `screen.png`.
  The supplied recording shows an older browser version on an iPhone. The
  owner confirmed this. Other images in the folder need verification before
  use. https://iosmusic.pages.dev/ is a separate web client, not a demo of the
  current native app.
- **Next:** Obtain or record native iPhone footage. Show the server connection,
  a download, and offline playback if possible. Verify the backend. Keep the
  older browser recording clearly labeled until native footage is available.

## Capture and review checklist

1. Confirm the current source, app version, and whether the interface is live,
   local, native, or mocked. Record the result in the project notes.
2. Use sample data and inspect the screen for private information. Keep
   passwords, tokens, dashboard credentials, and personal notifications out of
   recordings.
3. Capture readable screenshots and a short video that demonstrates a real
   task. Check the exported media for legibility and unexpected windows.
4. Update `src/data/projects.ts` with accurate media paths and labels. Do not
   claim a workflow works unless it was tested.
5. Build and check the portfolio, then verify the deployed project pages if a
   deployment is made. Record any remaining gaps in this document.
