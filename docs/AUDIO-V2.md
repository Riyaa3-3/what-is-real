# WHAT IS REAL? — Publicly hosted audio (production)

## No audio import required

The complete nine-track soundtrack is uploaded to the project's public GitHub repository as the verified `WHAT_IS_REAL_audio_pack.wiraudio` source bundle. The GitHub Pages deployment unpacks it **during the build**, copies the resulting nine MP3s to `dist/audio/`, and publishes them to GitHub Pages.

Every visitor now loads audio directly from:

- `https://riyaa3-3.github.io/what-is-real/audio/background/atmosphere-loop.mp3`
- `https://riyaa3-3.github.io/what-is-real/audio/baseline/` (eight dialogue clips)

**Visitors do not need to download anything, import audio, use IndexedDB, or sign into GitHub.**

## Playback and timing

The 4m51s background score is enabled by default at **25%** volume, loops until the visitor leaves or turns it off, and is independent of the movie dialogue channel. Dialogue is enabled at **92%**, and starts as each film question appears. All eight movie samples are mapped exactly in the user-approved 3+4+1 sequence:

| Film screen | Question | File |
| --- | --- | --- |
| 04 / page 5 CELLS | 1 | `cells-01-institution.mp3` |
| 04 / page 5 CELLS | 2 | `cells-02-cell.mp3` |
| 04 / page 5 CELLS | 3 | `cells-03-duties.mp3` |
| 05 / page 6 INTERLINKED | 1 | `interlinked-01-hold-hand.mp3` |
| 05 / page 6 INTERLINKED | 2 | `interlinked-02-finger.mp3` |
| 05 / page 6 INTERLINKED | 3 | `interlinked-03-heart.mp3` |
| 05 / page 6 INTERLINKED | 4 | `interlinked-04-dream.mp3` |
| 06 / page 7 WITHIN CELLS | 1 | `within-cells-interlinked.mp3` |

The tests advance **only when a user clicks the response button**, never when an audio clip ends. REPLAY AUDIO restarts the current clip without advancing. The two audio channels do not mute or interrupt one another.

Browsers can block audible autoplay before a user interacts with the page. This is unavoidable: visitors may need to click to start sound, but **never have to upload audio**. The AUDIO panel offers a **START SOUND** control when the soundtrack is waiting for a gesture. A playback failure is displayed as an audio error rather than an import request.

## Release verification

`.github/workflows/deploy-pages.yml` refuses to release a site if neither approved source bundle exists; unpacks and hash-validates all nine tracks; tests the original narrative; builds the website; checks the resulting nine MP3s; publishes the site; then makes nine live HTTP checks against the public sound files, to ensure fresh visitors can retrieve them.

The published source is retained in the repository to allow reproducible deployments. Movie/source asset publication permissions were confirmed by the project owner.

**Manual post-release check:** open https://riyaa3-3.github.io/what-is-real/ in a private/incognito window on a new device, tap to initiate sound if browser security requires it, and test the eight baseline dialogue cues. The public site must offer no mandatory audio-import flow.
