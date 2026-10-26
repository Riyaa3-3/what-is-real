/**
 * Presentation-only punctuation setting for the site.
 * Keep the locked translations, research source copy, user inputs,
 * numeric decimals and URLs unchanged in data and application state.
 */
export function withoutSentencePeriods(text: string): string {
  return text
    .replace(/。/g, '')
    // Preserve ellipses (...) and decimal points (2.2, 2049.5).
    .replace(/(^|[^.])\.(?=\s|$|["'”’])/g, '$1');
}
