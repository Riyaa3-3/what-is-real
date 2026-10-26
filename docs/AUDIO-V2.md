# WHAT IS REAL? — Nine-track soundtrack integration

## User-confirmed soundtrack rules

The background soundtrack is `background/atmosphere-loop.mp3`, approximately 4m51s.
Music starts ON by default, loops one track, and is not reset by page or chapter changes.
Its volume defaults to 38%. Movie dialogue has a separate independent channel,
starts ON, and defaults to 92%. Playing film dialogue does **not** pause, fade,
restart or lower the independent background music.

Modern browsers may block unprompted audible autoplay. The code attempts to start
the soundtrack on entry and retries when the visitor first interacts with the page.
The SOUND settings are not misleadingly switched to OFF when autoplay is denied.

The dialogue clips are tied to the existing 3+4+1 movie baseline sequence. Each
question starts its own clip when displayed, and the next question and clip begin
**only after the visitor clicks the response button**. A clip ending never advances
the narrative. The REPLAY AUDIO control repeats the current clip only.

| Screen ID / visible page | Question | Expected file under `public/audio/` |
|---|---:|---|
| 04 / Page 5 CELLS | 1 | `baseline/cells-01-institution.mp3` |
| 04 / Page 5 CELLS | 2 | `baseline/cells-02-cell.mp3` |
| 04 / Page 5 CELLS | 3 | `baseline/cells-03-duties.mp3` |
| 05 / Page 6 INTERLINKED | 1 | `baseline/interlinked-01-hold-hand.mp3` |
| 05 / Page 6 INTERLINKED | 2 | `baseline/interlinked-02-finger.mp3` |
| 05 / Page 6 INTERLINKED | 3 | `baseline/interlinked-03-heart.mp3` |
| 05 / Page 6 INTERLINKED | 4 | `baseline/interlinked-04-dream.mp3` |
| 06 / Page 7 WITHIN CELLS INTERLINKED | 1 | `baseline/within-cells-interlinked.mp3` |

## Preview the supplied tracks without changing your GitHub account

The nine converted MP3s cannot be pushed as binary attachments through the
currently connected GitHub text-file integration, so the chat provides
`WHAT_IS_REAL_audio_pack.wiraudio` for one-time local browser import.

1. Download the single audio pack file from the ChatGPT conversation.
2. Open the GitHub Pages `/what-is-real/preview-v2/` page.
3. Click **AUDIO** in the upper right, then **IMPORT 9-TRACK AUDIO PACK**.
4. Choose the downloaded `.wiraudio` file. Wait for **ALL 9 TRACKS READY**.
5. Click **INITIALIZE EXPERIENCE** to ensure sound starts on browsers requiring
   a user gesture. Visit the CELLS / INTERLINKED test screens to hear all clips.

The pack is stored only in the current browser's IndexedDB. Nothing is uploaded
from the user's device to GitHub or another server by the importer. Other
visitors/devices must separately import the pack until the actual files are hosted.

## Publish MP3s for everyone (optional final production step)

A second chat artifact `WHAT_IS_REAL_V2_audio_for_GitHub.zip` contains the nine
real MP3 files under `public/audio/background/` and `public/audio/baseline/`.
Extract the ZIP and commit those same file paths to branch
`feat/chapter-motion-audio-v2`. The player automatically resolves hosted assets
when no local audio pack has been installed. Re-run the V2 preview deployment
after committing them. This is required for a public website that plays audio
without visitors importing the pack.

The user confirmed having the necessary permission to use the provided audio.

## Runtime, accessibility, and verification

- Music and film dialogue can each be muted and adjusted independently.
- On entering another question, leaving a test, or revisiting it, old movie
  clips stop; the BGM continues uninterrupted.
- On refresh, the local pack is recovered from IndexedDB where available;
  a user gesture may still be necessary for audible playback.
- CI runs tests for all nine audio keys, exact 3+4+1 order, original narrative
  state invariants, and Vite/TypeScript production compilation.
- Physical iOS/Android and Safari autoplay restrictions require device testing.
