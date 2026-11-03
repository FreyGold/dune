# Cortex: academic workspace

**Your role:** You built the project with AI assistance.

**Source root:** `Important/college/Graduation Project` in the Fedora Backup
folder. The `frontend`, `backend`, `supabase`, `extension`, and
`gnome-extension` folders have separate responsibilities.

## Follow a note

1. Start with `frontend/app/notes/` and `frontend/hooks/use-notes.ts`. Find how
   the screen requests and updates note data.
2. Follow the frontend API calls into `backend/src/routes/notes.ts`, then
   `NoteController.ts`, `NoteService.ts`, and `NoteRepository.ts`.
3. Read the relevant schema and policies in `supabase/`. Check which data is
   stored as a note and which operations require a signed-in user.
4. For collaboration and AI, start with `frontend/components/editor/`,
   `backend/src/routes/ai.ts`, and `backend/src/services/AIService.ts`.
   The repository README describes Yjs and vector search; follow the actual
   imports to verify the path used by this version.

The README describes a broad system. Do not assume that every described feature
is enabled in the current deployment. The public site and local source can be
at different versions.

## Study exercises

- Draw the route, controller, service, and repository for one note operation.
- Explain the difference between a normal database search and an embedding
  search. Find where the project creates and uses embeddings.
- Trace a focus timer from `extension/` to the backend. Compare it with
  `gnome-extension/`.
- Use the existing `docs/` chapters as deeper references, then check their
  claims against the source.
