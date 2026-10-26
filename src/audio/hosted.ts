import { AUDIO_KEYS } from '../data/audioCueMap';

/** URL of a published MP3, independent of chapter navigation or hash fragments. */
export function resolveHostedAudioUrl(key: string, appBaseUrl: string): string {
  if (!AUDIO_KEYS.includes(key)) throw new Error('Unrecognized audio file');
  const base = new URL(appBaseUrl);
  return new URL('audio/' + key, base).href;
}
