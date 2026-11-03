# SBC Solver: extension and optimization

**Source root:** `Important/solva-sbc-solver-fork` in the Fedora Backup folder.

## Follow a solve request

1. Read `manifest.json` to see where the extension runs. `injected.js` works in
   the page context; `content.js` and `background.js` bridge extension work.
2. The README describes how club data and challenge information reach the
   local server. Follow the actual message and request handlers in those files.
3. `local-server/server.py` exposes `/api/v1/solver/solve`. It receives the
   request and prepares the solver input.
4. `constraint_translator.py` turns challenge requirements into solver settings.
   `optimize.py` builds and solves the constraint model.
5. Follow the result back through the extension to the squad screen.

`changes.md` records design decisions and regression examples. The repository
is a fork, so separate existing upstream work from your own changes when writing
about authorship.

## Study exercises

- Draw the boundaries between page script, extension, and local server.
- Explain the difference between a hard constraint and an objective preference.
- Trace the squad-rating calculation and run the related regression tests.
- Find how the solver treats special cards and what happens if no squad fits.
