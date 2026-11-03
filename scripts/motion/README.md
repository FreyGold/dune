# Project motion films

`render.py` builds an 18-second film from a JSON storyboard and a screen
recording. It uses Pillow and FFmpeg. Run it from the repository root:

```bash
python3 scripts/motion/render.py scripts/motion/cortex.json
```

The film has an animated title, an illustrated feature sequence, a labeled
screen recording, and a closing sequence. Each scene has moving graphics and a
wipe transition. The recording keeps its aspect ratio. The `portrait_closeup`
mode enlarges and pans a tall recording. The `job_montage` mode enlarges the
detail view after the list and filter shots.

To make another film, copy `cortex.json` and change its text, accent color,
`screen`, and `output`. Keep headline lines short. Use actual recordings.
State when the recording uses mock data, shows an older version, or shows only
a public page. Do not describe untested features as tested behavior.

Choose a `layout` for the illustrated feature sequence:

- `cards`: Three feature cards. This is the default.
- `flow`: Three linked workspace areas.
- `planner`: A study checklist and a focus timer.
- `transform`: Source material moves into a conceptual note.
- `stock`: Sample stock bars lead to invoices and reports.
- `jobs`: A query and filters lead to listing cards.
- `voice`: A waveform leads to text.
- `music`: A link moves through a server to an iPhone.
- `architecture`: A frontend connects to a Go service and its stores.
- `solver`: A challenge passes from the web app to the local solver.

The layouts show concepts. They do not verify an app feature. Change the
renderer when a project's workflow needs a different visual sequence.

The renderer expects the three Liberation fonts installed at
`/usr/share/fonts/liberation/`. Output is 1280 × 720 H.264 at 24 frames per
second. It contains no audio.
