# Portfolio project research

This is a working draft. The descriptions come from local project files. They
need a product review before publication. A deployment link in this file is a
lead, not proof that the deployment works.

The current portfolio is published at `https://dune-portfolio-showcase.vercel.app/`.
Its Vercel project is `dune-portfolio-showcase`. The first deployment used a
static build from this workspace. Later deployments need a new build.

## 1. Amer / BAK management system

**Priority:** First.

**Role:** The owner built the entire frontend.

**Draft description:** An employee management system that brings HR,
attendance, payroll, requests, projects, and internal communication into one
workspace. The frontend has separate screens for these workflows. The backend
uses permissions to control access and supports real-time messaging.

**Source:** `Important/Work/Amer_FrontEnd` and `Important/Work/Amer_BackEnd`.

**Technology:** React, TypeScript, Node.js, Express, PostgreSQL, Sequelize,
Valkey, Socket.IO, and S3-compatible storage.

**Demo plan:** Show a dashboard, employee record, attendance or leave request,
and messaging flow with sample data. The owner says the project uses a generic
name and its original identity has been removed. The owner confirmed that he
built the entire frontend.

**Status:** An isolated copy of the full frontend and backend is live at
`https://amer-showcase.vercel.app/`. It uses a separate Supabase database,
Redis resource, and private file bucket. The app contains example records and
requires sign-in. Login, dashboard and member data, team changes, private file
uploads, and an authenticated WebSocket were checked. Push notifications and
delivery of invitation or password-reset emails still need separate providers.
The frontend's production build passes, but its typecheck has existing errors.
The portfolio screenshots and recording show this hosted copy with sample data.

The source copies and private login instructions are in
`Important/amer-showcase/README.md`.

## 2. Cortex

**Draft description:** A bilingual academic workspace for students. It brings
collaborative notes, study resources, AI assistance, habits, and focus tools
together. The repository also includes a browser extension and a GNOME widget.

**Source:** `Important/college/Graduation Project`.

**Technology:** Next.js, TypeScript, Express, PostgreSQL, Supabase, Yjs, and
pgvector.

**Demo plan:** Show the editor, study resources, and one focus workflow with
sample data. The owner built the project with AI assistance.

**Status:** `https://cortex-eta-black.vercel.app/` opens publicly. Its homepage
was captured and recorded. Signed-in features and database access are not
verified.

## 3. Tamatem

**Draft description:** A student productivity app for planning work,
tracking habits, and recording focus sessions. It includes a web app, an API,
a browser extension, and a mobile prototype.

**Source:** `Important/Tamatem`, `Important/tamatem-backend`, and
`Important/tamatem-mobile`.

**Technology:** Next.js, React, TypeScript, Express, Supabase, and Expo.

**Demo plan:** Show planning and a focus session in the web app. Treat the
mobile app as a prototype until its device checks pass.

**Deployment:** `https://www.tamatem.me/` opens its sign-in page, and
`https://tamatem-backend.vercel.app/api/health` responds. The linked Supabase
project was resumed and now reports a healthy status. Signed-in database
features have not been verified.

**Status:** The hosted sign-in page was captured. The database reports healthy.
The full signed-in app still needs verification.

## 4. Autonatic

**Draft description:** An Obsidian plugin that turns text, shared AI
conversations, and images into structured Markdown notes. It can search source
passages and help organize a vault. Users can select from multiple AI providers.

**Source:** `Important/obsid`.

**Technology:** TypeScript, Obsidian plugin API, and AI provider APIs.

**Demo plan:** Show source input, note creation, and the generated note in a
sample vault. An existing screenshot is available at
`assets/screenshots/create-workspace-dark.png` in the source project. It shows
version 1.7.9, so it may not represent the current interface.

**Release:** `https://github.com/FreyGold/autonatic/releases/latest` points to
the public 1.7.17 release. The inspected local manifest is version 1.7.36.
They are different versions.

**Plugin directory:** `https://community.obsidian.md/plugins/autonatic` is a
public page for Autonatic in the Obsidian community plugin directory.

**Status:** Captured the Create, Search, and Organize screens and an 18-second
screen recording from local version 1.7.36 in an isolated Obsidian vault. The
recording also shows the Diagram screen. It is a display recording cropped to
the Obsidian window. No AI provider was connected, so the recording does not
show note generation. The release page is public. The checked Cloudflare
account has no Autonatic deployment.

## 5. Job Aggregator

**Draft description:** A job search product that collects listings from
different job boards and presents them in one interface. The repository has
web, mobile, and API components.

**Source:** `Important/jobaggregator`.

**Technology:** React, Next.js, TypeScript, Express, PostgreSQL, and Redis.

**Demo plan:** Show search, filters, and a job detail with sample or public
listings. The current portfolio already has screenshots and video for this
project; check whether they still match the current app.

**Deployment leads:** `https://jobagg.vercel.app/register` and
`https://nimble-buttercream-897ec0.netlify.app/jobs`. The first returned 404.
The second returned 200, but its data and functions have not been checked.

**Status:** The hosted page opens, but listings were still loading during the
browser check. The Cloudflare deployment at
`https://jobaggregater-web.ahmedtawfik833.workers.dev/` opens, but its browser
reports `__name is not defined`; job listings did not appear in the check.
Existing portfolio media is available; its freshness is not verified.

## 6. Go Boilerplate

**Draft description:** A starter for projects with a Go backend and a frontend
workspace. It includes project creation scripts, Docker Compose, PostgreSQL,
Redis, and database migrations.

**Source:** `personal/go-boilerplate`.

**Technology:** Go, React, TypeScript, PostgreSQL, Redis, Docker, and Turborepo.

**Demo plan:** No demo is needed for this starter project.

**Deployment lead:** `https://github.com/FreyGold/go-boilerplate` is referenced
by the project creation script. Public access is unconfirmed.

**Status:** The public repository responds. The portfolio includes a system
diagram and source link.

## 7. Inventory

**Draft description:** A desktop inventory app with product and stock
management, invoices, and reports. The dashboard includes sales and low-stock
information.

**Source:** `Important/inventory`.

**Technology:** Electron, React, TypeScript, and SQLite.

**Demo plan:** Show sample products, an invoice, and a stock report. Check
whether a safe browser demo can represent the desktop app.

**Status:** A read-only browser demo uses sample records and replaces the
desktop API with mock responses. Its dashboard and products screens were
captured. A recording shows navigation between them. The demo is available at
`/demos/inventory/index.html` in the portfolio. The desktop app itself was not
tested.

## 8. Voice Typer

**Draft description:** A speech-to-text tool that types transcription into
other applications. Its documentation describes local and cloud transcription
and support for Egyptian Arabic.

**Source:** `Important/voice_typer`. The `Important/s` folder has a related
version; confirm which version is current.

**Technology:** Python, faster-whisper, and Groq.

**Status:** The owner provided a recording that shows speech being transcribed
into another desktop app. The portfolio includes the recording and a frame
from it.

## 9. SBC Solver

**Draft description:** A browser extension and local solver for EA FC 26 squad
building challenges. The local solver selects a squad against challenge
requirements and card preferences.

**Source:** `Important/solva-sbc-solver-fork`.

**Technology:** JavaScript, Python, Flask, and Google OR-Tools.

**Demo plan:** No demo is needed. Confirm which parts were developed in this
fork before writing the author's contribution.

**Public source:** `https://github.com/FreyGold/solva-sbc-solver`.

**Status:** Public repository found. No live demo or recording verified.

## 10. Offline Music Library

**Draft description:** An iPhone music app that connects to a local or remote
server. The server uses yt-dlp to download music. The app saves tracks on the
iPhone for offline playback.

**Source:** `Important/iosmusic`.

**Technology:** React Native, Expo, SQLite, FastAPI, Python, yt-dlp, and ffmpeg.

**Demo plan:** Capture the native iPhone app with sample audio. Show how it
connects to a server and plays a saved track while offline.

**Related deployment:** `https://iosmusic.pages.dev/` opens a separate web
client. It is not a demo of the native iPhone app.

**Status:** The owner provided an iPhone recording of an older browser version.
The portfolio labels it as such. Native iPhone screenshots and a recording are
still needed. The backend still needs a check.
