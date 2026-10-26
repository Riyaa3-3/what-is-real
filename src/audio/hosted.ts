/** Resolve soundtrack assets by string paths; avoid URL() for legacy iOS webviews. */
export function resolveHostedAudioUrl(key: string, appBaseUrl: string): string {
  if (!/^(background|baseline)\/[a-z0-9-]+\.mp3$/.test(key)) {
    throw new Error('Unrecognized audio file');
  }
  const cleanPath = appBaseUrl.split('#', 1)[0].split('?', 1)[0];
  const lastSlash = cleanPath.lastIndexOf('/');
  if (lastSlash < 0) throw new Error('Invalid site location');
  return cleanPath.slice(0, lastSlash + 1) + 'audio/' + key;
}
