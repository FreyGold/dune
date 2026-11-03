# Voice Typer: audio to text

**Source root:** `Important/voice_typer` in the Fedora Backup folder.

## Follow a recording

1. `main.py` creates the Qt window and wires `WorkerSignals` to UI updates.
   It constructs a `Recorder`, a `Transcriber`, and a `TyperController`.
2. `typer_controller.py` handles the configured trigger and text input. Follow
   the press and release callbacks back to `VoiceTyperApp`.
3. `recorder.py` captures audio. Trace the data returned when recording stops.
4. `transcriber.py` handles transcription. Compare the local and cloud paths,
   their dependencies, and their failure behavior.
5. Follow the returned text back to the controller that types or pastes it.

The app integrates with the desktop and microphone. Use an isolated config and
sample audio when you study it. Do not put API keys in a screenshot or recording.

## Study exercises

- Draw the sequence from hotkey press to text insertion.
- Identify which work runs in a background thread and how it updates Qt safely.
- Compare local and cloud modes for latency, data flow, and dependencies.
- Find the platform-specific launcher and input behavior for your system.
