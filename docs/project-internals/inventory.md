# Inventory: UI and desktop boundary

**Source root:** `Important/inventory` in the Fedora Backup folder.

## Follow the dashboard

1. `src/main.tsx` renders `src/app.tsx`. The app chooses a screen and displays
   `LoginView` until `useAuth` has a user.
2. `src/features/layout/AppShell.tsx` handles navigation. Follow the dashboard
   selection to `DashboardScreen.tsx` and `useDashboard.ts`.
3. The hook calls `src/services/api.ts`. That module forwards calls to
   `window.api`, the boundary expected from the desktop application.
4. Compare the contracts in `src/services/types.ts` and `src/lib/types.ts` with
   the mock in `src/__tests__/setup.ts`. They show the expected data shapes.
5. Study `src/features/products/`, `invoices/`, and `reports/` in the same way.

The inspected copy references Electron and SQLite, but the `window.api` bridge
implementation was not found in the files reviewed. Locate it before claiming
how the database is implemented. The portfolio demo supplies a separate mock
bridge and is read-only; it does not test the desktop database.

## Study exercises

- Trace `listProducts` from the dashboard hook to the API contract.
- Explain why `window.api` is needed for the browser-rendered UI.
- Compare the test mock with `scripts/inventory-demo/portfolio-demo.ts` in the
  portfolio. Which methods are real, mocked, or disabled?
- Find where low-stock values are selected and how sales data is grouped.
