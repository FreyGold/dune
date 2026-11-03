# Autonatic: Obsidian plugin

**Source root:** `Important/obsid` in the Fedora Backup folder.

## Follow note creation

1. `src/main.ts` defines the plugin and its `onload` lifecycle. Find where it
   registers commands, workspace events, and the main workspace.
2. Follow the create interface in `src/modal.ts` and `src/workspace-ui.ts`.
   Find how the source text and options become a request.
3. `src/capture-queue.ts` holds queued requests. `src/api.ts` sends generation
   requests; `src/providers.ts` contains provider-related behavior.
4. `src/vault-indexer.ts`, `src/note-destination.ts`, and related review files
   help choose and validate destinations. Follow the call sites before assuming
   that every creation mode uses the same path.
5. `src/ask-notes-search.ts` is a separate search path. Compare finding passages
   with generating new Markdown.

The plugin works inside Obsidian. Its test harness provides an Obsidian mock;
that is different from testing the plugin in a real vault.

## Study exercises

- Trace one request from the Create button to the file written in the vault.
- Find how the queue behaves after a failure and when the next request starts.
- Explain what the vault index contains and when vault events update it.
- Run the repository tests and inspect a regression test before changing code.
