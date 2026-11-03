# Tamatem: study and focus

**Source roots:** `Important/Tamatem`, `Important/tamatem-backend`, and
`Important/tamatem-mobile` in the Fedora Backup folder.

## Follow a focus session

1. In the web app, start with `hooks/use-pomodoro-timer.ts` and
   `lib/pomodoro-clock.ts`. The clock logic is separate from the React hook.
2. Find the focus UI in `components/daily/`. Follow requests through
   `lib/api.ts` to the backend's `src/routes/daily.ts`.
3. Continue through `DailyController.ts`, `DailyService.ts`, and
   `DailyRepository.ts`. Find the data stored through Supabase.
4. Compare this flow with `extension/background.js` and the mobile app. They
   are separate clients and may not have the same feature coverage.

`tests/pomodoro-clock.test.ts` and `tests/pomodoro-timer.test.tsx` are useful
starting points for timer behavior. The Supabase project was inactive during
this review and was resumed. Check its current status before testing.

## Study exercises

- Explain why a timer needs to handle time passing while a tab is inactive.
- Trace the user's identity from `components/auth-provider.tsx` to backend
  `src/middleware/authMiddleware.ts`.
- Identify which timer behavior is pure logic and which needs a browser or API.
- Run the clock tests locally and add a test for a case you can explain.
