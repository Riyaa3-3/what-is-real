import type { ExperienceState, Option, SubtitleChoice } from '../types';

/** Locked research material from the supplied V1.2 storyboard. */
export const SUBTITLE_COPY = {
  Joi: {
    en: 'I wanna be real for you.',
    A: '我想为你变得真实。',
    B: '我想真正触碰到你。'
  },
  K: {
    en: 'You are real for me.',
    A: '对我而言，你就是真实的。',
    B: '在我心里，你就是真实的存在。'
  }
} as const;
export function subtitleText(state: ExperienceState, speaker: 'Joi' | 'K'): string {
  const choice: SubtitleChoice | undefined = speaker === 'Joi' ? state.subtitleJoi : state.subtitleK;
  if (!choice) return '';
  if (choice === 'CUSTOM') return (speaker === 'Joi' ? state.customJoi : state.customK).trim();
  return SUBTITLE_COPY[speaker][choice];
}
export function subtitlesReady(state: ExperienceState): boolean {
  return Boolean(subtitleText(state, 'Joi') && subtitleText(state, 'K'));
}
export const translationReasonOptions: Option[] = [{
  value: 'CLARITY',
  en: 'CLARITY / The characters’ intentions should be clear.',
  zh: '更清楚地传达人物意图。'
}, {
  value: 'EMOTION',
  en: 'EMOTION / The dialogue should feel natural and moving.',
  zh: '符合情感与人物说话方式。'
}, {
  value: 'OPENNESS',
  en: 'OPENNESS / The ambiguity should remain.',
  zh: '保留原文含蓄、重复与开放性。'
}, {
  value: 'FAITHFULNESS',
  en: 'FAITHFULNESS / Avoid adding meanings not stated.',
  zh: '避免增加原文未明说的信息。'
}, {
  value: 'OTHER',
  en: 'OTHER / Explain in your own words.',
  zh: '其他理由，自行说明。'
}];
export const translationNotes: Option[] = [{
  value: 'CONTEXT',
  en: 'CONTEXT / Pointing back to Mariette.',
  zh: '语境回指：Mariette。'
}, {
  value: 'EMBODIMENT',
  en: 'EMBODIMENT / Making physical touch explicit.',
  zh: '将身体接触显化。'
}, {
  value: 'PERSPECTIVE',
  en: 'PERSPECTIVE / Translating “for me” emotionally.',
  zh: '强化K的主观情感立场。'
}];
