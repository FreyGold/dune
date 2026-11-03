# Amer: frontend and API

**Your role:** You built the entire frontend. The backend is part of the system;
these notes do not assign its authorship.

**Source roots:** `Important/Work/Amer_FrontEnd` and
`Important/Work/Amer_BackEnd` in the Fedora Backup folder.

## Follow a request

1. Start at `src/main.tsx` in the frontend. It installs the router, query client,
   translation setup, and UI provider. `src/App.tsx` adds shared providers.
2. Read `src/routes/AppRoutes.tsx`. It maps URLs to screens. `ProtectedRoute.tsx`
   checks login state. `PermissionRoute.tsx` checks access to selected pages.
3. Follow the dashboard: `src/pages/dashboard/index.tsx` renders
   `src/components/dashboard/Dashboard.tsx`. That component calls the query in
   `src/hooks/dashboard/dashboard.queries.ts`.
4. `src/services/dashboardService.ts` sends the request through
   `src/config/axios.ts`. `src/config/endPoints.ts` defines the path.
5. On the backend, start with `src/app.js` and `src/routes/dashboard.routes.js`.
   Follow the dashboard controller and service. The dashboard service combines
   results from other services; trace one of those to its data access code.

The frontend's permission checks control what it shows. Study the backend
middleware and policies to see where the server makes its own access decisions.
The frontend has a production API as a default. Use an isolated copy and sample
responses when you experiment.

## Example: the dashboard overview

The dashboard selects the sections it can show. It passes those section names
and a date range to `useDashboardOverview`. That hook uses TanStack Query. Its
query key includes the filters, so different filter values can have different
cached results. The hook sets a five-minute stale time.

`dashboardService.getOverview` turns the selected sections into a comma-separated
`include` parameter. It also adds the date range when one is present. The API
response has a `data` object with optional sections such as `members`,
`attendance`, and `requests`. The dashboard passes those sections to the
corresponding cards. If you add a new card, trace its permission, request,
response type, and empty state together.

## Example: frontend permissions

`PermissionProvider` reads the token and requests role and employee permission
data. When the backend supplies effective employee permissions, the provider
uses that list. Otherwise, it combines role permissions and direct permissions
from the token. The provider exposes helpers such as `can` and `getScope`.
The code treats role ID `1` as a super administrator in the frontend.

`PermissionRoute` waits for permission loading before it decides whether to
render its child. Individual dashboard sections also check permissions. These
checks improve the interface, but the server must still enforce access to its
data. Follow the backend middleware and policies to see that separate check.

## Study exercises

- Draw the path of a dashboard request from the component to the database.
- Compare `src/contexts/PermissionContext.tsx` with the backend's authorization
  middleware. What does each layer know?
- Trace a chat message through `src/services/chat/` and the backend's
  `src/socket/` folder. Identify where real-time events enter the UI.
- Find the loading, empty, and error states for a dashboard query.
