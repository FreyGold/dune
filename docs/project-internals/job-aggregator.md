# Job Aggregator: ingestion and search

**Source root:** `Important/jobaggregator` in the Fedora Backup folder.

## Follow a listing

1. `apps/api/src/app.ts` installs middleware and mounts `/api/jobs` and
   `/api/sources`. `apps/api/src/server.ts` starts the server.
2. Explore `apps/api/src/scrapers/` to see how source-specific data enters the
   system. Follow a scraper's caller in `jobs/` or `services/`.
3. Follow its normalized result into the entities, repositories, and database
   migrations in `apps/api/src/`. Check how duplicates and source identities
   are handled for that scraper.
4. Find the listing route and controller under `routes/` and `controllers/`.
   Trace query parameters through to the repository.
5. In `apps/web/src/`, follow the job list and filter controls to the API
   client. The repository also has mobile and extension folders.

A hosted page can load while its listing request is still pending. Check both
network responses and rendered results before describing the app as functional.

## Study exercises

- Draw the path from one source page to a stored listing and then to a filter.
- Compare two scrapers. Which fields are common and which are source-specific?
- Find how a failed scrape is reported and whether an old listing remains.
- Trace keyword and location filters end to end.
