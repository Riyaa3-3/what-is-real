/**
 * User-confirmed alignment of eight licensed film dialogue clips with
 * the original 3 + 4 + 1 baseline questions. No automatic question advances.
 */
export const BACKGROUND_KEY = 'background/atmosphere-loop.mp3';
export const BASELINE_CLIPS = {
  '04': [
    'baseline/cells-01-institution.mp3',
    'baseline/cells-02-cell.mp3',
    'baseline/cells-03-duties.mp3'
  ],
  '05': [
    'baseline/interlinked-01-hold-hand.mp3',
    'baseline/interlinked-02-finger.mp3',
    'baseline/interlinked-03-heart.mp3',
    'baseline/interlinked-04-dream.mp3'
  ],
  '06': ['baseline/within-cells-interlinked.mp3']
} as const;
export type BaselineScreenId = keyof typeof BASELINE_CLIPS;
export const AUDIO_KEYS: string[] = [BACKGROUND_KEY, ...Object.values(BASELINE_CLIPS).flat()];
export function baselineClip(screenId: string, index: number): string | null {
  if (!(screenId in BASELINE_CLIPS) || !Number.isInteger(index)) return null;
  const clips: readonly string[] = BASELINE_CLIPS[screenId as BaselineScreenId];
  return clips[index] ?? null;
}
