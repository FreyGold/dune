# Go Boilerplate: application startup

**Source root:** `/home/frey/personal/go-boilerplate`.

## Follow startup and a request

1. Read `apps/backend/cmd/go-boilerplate/main.go`. List what it constructs and
   the order in which it starts and closes resources.
2. Follow configuration in `apps/backend/internal/config/`, database setup in
   `internal/database/`, and the server in `internal/server/`.
3. `internal/router/router.go` builds the router. `system.go` registers system
   routes, including `/status` and `/docs`.
4. Follow the handlers into `internal/service/` and `internal/repository/`.
   Note how dependencies are passed into constructors.
5. `compose.yaml` describes the local services. The root README explains the
   project creation script and the Docker startup path.

The checked-in OpenAPI file documents `/status`. Check the current router before
assuming that the generated reference covers every route. The local Docker
socket was not accessible during this review.

## Study exercises

- Draw the dependency graph created in `main.go`.
- Trace `/status` and identify what happens when a dependency is unavailable.
- Explain the role of context cancellation during shutdown.
- Read the queue notes in the README and distinguish existing handlers from
  an enqueue path that is still marked as missing there.
