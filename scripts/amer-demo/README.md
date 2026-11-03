# Amer sample dashboard

The live demo uses an isolated copy of the Amer frontend. It shows the
original dashboard with sample values. It does not call the original API.
Changes are disabled. Other screens are not part of this demo.

The demo uses a separate Vercel project, `amer-portfolio-demo`. Its content
security policy blocks network connections. The sample login token has no
backend privileges. The demo does not use the production database or secrets.

## Build a new copy

1. Copy the frontend to a temporary folder. Exclude `.env*`, `.git`,
   `node_modules`, `dist`, and `production_deploy`.
2. Install the dependencies in the copy.
3. Run `python3 scripts/amer-demo/prepare.py /path/to/copy` from the portfolio
   folder. This changes the copy. It replaces the routes and API adapter,
   uses sample values, removes the configured Firebase details, and removes
   unused public assets.
4. Run the copy's build command. Put `scripts/amer-demo/vercel.json` next to
   the built `index.html` in a clean deployment folder.
5. Check the build for old company names, personal data, credentials, and
   unwanted assets. Test the sample values and disabled actions. Confirm that
   the page makes no external requests. Do not publish it if a check fails.
6. Deploy the clean folder to the `amer-portfolio-demo` project. Check the live
   page and its content security policy after the deployment.

The preparation script targets the source version reviewed on 3 November 2026.
Review it after changes to the source. Do not run it on the original project.
