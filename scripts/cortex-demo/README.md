# Cortex shared demo

This is a limited demo built from the Cortex frontend. It uses a separate
Cloudflare D1 database and Worker. It does not use the production database.

The demo has one public account: `demo@cortex.example` / `CortexDemo123!`.
The credential is intentionally public. It is not a security boundary. All
visitors share the same notes. Do not enter private data. The seed note is
read-only. New notes expire after one hour. Cloudflare applies approximate
per-IP request limits. The API also has an atomic 100-note limit. The demo
supports note creation, editing, and a sample course catalog. AI, collaboration,
daily tools, and account settings are unavailable.

## Source and build

The source base is Cortex commit `a4c48825e1df9c2622a11b0042052f780e6d4489`.
The overlay also preserves the checked local editor and settings changes from
that checkout. The preparation script reads the commit with `git archive` and
copies the overlay to a new directory. It does not alter the source repository.

```bash
./scripts/cortex-demo/prepare.sh '/path/to/Graduation Project' /tmp/cortex-demo-build
cd /tmp/cortex-demo-build/frontend
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
```

The generated `.env.production` contains only the public Worker URL. For local
API testing, set `NEXT_PUBLIC_EXPRESS_API_URL=http://127.0.0.1:8791` in a
local environment file and run the Worker with Wrangler in local mode.

## API and database

`api/src/index.js` implements the limited demo API. `api/schema.sql` creates
and seeds a fresh database. `api/migration-002.sql` is the one-time upgrade
for a database created with the earlier schema; do not run it on a fresh
schema. The existing D1 binding and Worker URL are recorded in the config.
Use `npx wrangler d1 execute cortex-demo --local --file schema.sql` and
`npx wrangler dev --local --port 8791` from `api/` for local tests. Then run
`python3 tests/local-safety.py`. The optional `local-capacity.py` deletes all
non-seed notes from the local test database; use it only on disposable data.
The Worker stores no private account or service credentials.

The data is public. Rate limits apply per IP and Cloudflare location. The
limits are approximate. They do not isolate users. The database is subject to
the Cloudflare account's free-plan limits.
