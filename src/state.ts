import type { ExperienceState } from './types';
export const SESSION_KEY = 'what-is-real.v1.2';
export function initialState(): ExperienceState {
  return {
    baselineOriginal: {
      cells: 0,
      interlinked: 0,
      within: 0
    },
    customJoi: '',
    customK: '',
    subtitlesConfirmed: false,
    translationReasons: [],
    translationReasonText: '',
    finalThought: '',
    finalThought2: ''
  };
}
export function restoreState(raw: string | null): ExperienceState {
  const fresh = initialState();
  if (!raw) return fresh;
  try {
    const value = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return fresh;
    const textKeys = ['openingMemory', 'openingMemoryReconsidered', 'qMemory', 'qEmotion', 'qAutonomy', 'memoryFrame', 'aiExperience', 'aiScenario1', 'aiScenario2', 'aiScenario3', 'customJoi', 'customK', 'translationReasonText', 'finalThought', 'finalThought2'] as const;
    for (const key of textKeys) if (typeof value[key] === 'string') fresh[key] = value[key];
    for (const key of ['subtitleJoi', 'subtitleK'] as const) if (['A', 'B', 'CUSTOM'].includes(value[key])) fresh[key] = value[key];
    fresh.subtitlesConfirmed = value.subtitlesConfirmed === true;
    fresh.translationReasons = Array.isArray(value.translationReasons) ? value.translationReasons.filter((x: unknown) => typeof x === 'string') : [];
    for (const [key, max] of [['cells', 3], ['interlinked', 4], ['within', 1]] as const) {
      const count = value.baselineOriginal?.[key];
      fresh.baselineOriginal[key] = Number.isInteger(count) ? Math.min(max, Math.max(0, count)) : 0;
    }
    return fresh;
  } catch {
    return fresh;
  }
}
export function advanceBaseline(state: ExperienceState, key: 'cells' | 'interlinked' | 'within'): ExperienceState['baselineOriginal'] {
  const max = {
    cells: 3,
    interlinked: 4,
    within: 1
  };
  return {
    ...state.baselineOriginal,
    [key]: Math.min(max[key], state.baselineOriginal[key] + 1)
  };
}
