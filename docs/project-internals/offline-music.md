# Offline Music Library: iPhone app and server

**Source root:** `Important/iosmusic` in the Fedora Backup folder.

The iPhone app connects to a local or remote server to find and download music.
The server uses `yt-dlp` and `ffmpeg` to prepare audio. The app stores completed
downloads on the iPhone, so it can play them when the server is offline.

## Follow a track

1. Start with `mobile/App.tsx` and `mobile/src/screens/`. Follow the Add,
   Library, and Player screens to see how a user finds and plays a track.
2. `mobile/src/api/client.ts` connects the app to the server.
   `mobile/src/services/download-manager.ts` manages downloads.
3. `mobile/src/storage/database.ts`, `repositories.ts`, and `files.ts` manage
   the library records and audio files on the device.
4. `mobile/src/state/PlayerContext.tsx` manages player state. The native iOS
   audio module is in `mobile/modules/offline-audio/ios/`.
5. On the server, `backend/src/library/app.py` creates the FastAPI app.
   `acquisition.py` defines acquisition types and adapters; `ytdlp.py` handles
   the `yt-dlp` integration.

The repository also has a separate client in `web/`. The native iPhone app uses
its own storage; it cannot read the web client's private browser storage.

## Study exercises

- Trace a download from the Add screen to a completed file on the iPhone.
- Draw where the app stores track metadata and audio bytes.
- Explain which actions need the server and which work offline.
- Follow how the native player handles background audio and playback state.
- Use the mobile and backend tests to study a transfer failure path.
