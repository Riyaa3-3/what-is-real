# WHAT IS REAL? — Audio assets and second-round motion

Audio is **off by default**. The header SOUND button enables playback; the VOL slider controls volume. Browser autoplay policies may still block playback until the first user gesture.

## Adding licensed assets
Edit `src/components/Enhancements.tsx`. Set `chapterAudio` paths and the `baselineAudio` entries. Place your files in `public/audio/background/` or `public/audio/baseline/`, using paths relative to `public`.

For example:
```ts
const chapterAudio: Record<string,string> = {
  'WHOSE MEMORY?': 'audio/background/memory.mp3',
  'TRANSLATING REAL': 'audio/background/translation.mp3',
  // other chapter IDs can remain empty
};
const baselineAudio: Record<string,string> = {
  ambient: 'audio/baseline/room.mp3',
  cells: 'audio/baseline/cells.mp3',
  interlinked: 'audio/baseline/interlinked.mp3',
  within: 'audio/baseline/within.mp3',
  response: 'audio/baseline/response.mp3'
};
```
The baseline section receives its own looping ambience, and buttons trigger optional audio cues. The current delivery does **not** contain any film audio, original compositions, or downloaded third-party music. Empty mappings mean silence.

## Motion
A chapter interlude is shown on navigation into a new chapter, including back navigation and manual chapter navigation. Users can skip it. System reduced-motion users receive a static interlude with a Continue action. Ambient electrical visual effects are entirely decorative.

## Important limits
Audio playback currently has fade-in on start, but **not yet proper crossfading between real audio tracks**. The audio cue playback helper plays supplied cues independently, so long cues need a stop/cancellation manager before commercial use. Test actual audio files on Safari and mobile devices before publication. The audio control is working as an interface, but without user-provided tracks there is no background music to hear.

Do not include copyrighted film soundtracks or dialogues without appropriate publication rights.
