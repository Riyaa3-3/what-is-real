/** Deterministic GitHub Pages audio URL, safe under nested deployments. */
export function resolveHostedAudioUrl(key: string, appBaseUrl: string): string {
  if (!/^(background|baseline)\/[a-z0-9-]+\.mp3$/.test(key)) {
    throw new Error('Unrecognized audio file');
  }
  return new URL('audio/' + key, new URL(appBaseUrl)).href;
}
