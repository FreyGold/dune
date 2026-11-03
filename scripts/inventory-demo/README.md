# Inventory browser demo

The demo is a static build of the Inventory renderer. It uses the sample API in
`portfolio-demo.ts`. It does not use the desktop database or call a backend.
The banner identifies the data as sample data. Changes cannot be saved.

To rebuild it:

1. Copy the Inventory project to a temporary directory. Exclude its environment
   files, databases, and dependencies.
2. Install its dependencies with `bun install --frozen-lockfile --ignore-scripts`.
3. Copy `portfolio-demo.ts` into `src/` and import it at the start of
   `src/main.tsx`.
4. In `src/features/auth/useAuth.ts`, initialize the user to
   `{ id: 1, username: "مستخدم تجريبي" }` so the demo opens without a login.
5. Replace the copy's `index.html` with this folder's `index.html`. This removes
   its localhost development script and adds the demo banner and font.
6. Copy `typography.css` and the `fonts/` folder into the copy's `public/`
   folder. In the copy's `src/index.css`, remove the Google Fonts import for
   Tajawal. Add `@source not "../portfolio-dist";` after the CSS imports.
   The demo uses IBM Plex Sans Arabic. Its license is in `fonts/LICENSE.txt`.
7. Copy `vite.portfolio.config.ts` to the copy's root and run
   `vite build --config vite.portfolio.config.ts`.
8. Review the result, then copy `portfolio-dist/` to `public/demos/inventory/`.

The source project remains the reference for the app. The demo does not include
the Electron process or SQLite database.
