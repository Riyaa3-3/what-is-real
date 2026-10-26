import { AUDIO_KEYS } from '../data/audioCueMap';

type Entry = { key: string; offset: number; length: number; mime: string };
type Manifest = { magic: string; files: Entry[] };
type Pack = { blob: Blob; offset: number; entries: Map<string, Entry> };

const DB_NAME = 'what-is-real-local-audio-v1';
const STORE = 'audio';
const MAX_BYTES = 30 * 1024 * 1024;
let activePack: Pack | null = null;
const objectUrls = new Map<string, string>();

function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function remember(blob: Blob): Promise<void> {
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readwrite');
      transaction.objectStore(STORE).put(blob, 'pack');
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } finally { db.close(); }
}
async function recall(): Promise<Blob | null> {
  const db = await database();
  try {
    return await new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(STORE, 'readonly');
      const request = transaction.objectStore(STORE).get('pack');
      request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : null);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}
function releaseUrls() {
  for (const url of objectUrls.values()) URL.revokeObjectURL(url);
  objectUrls.clear();
}
async function parse(blob: Blob): Promise<Pack> {
  if (blob.size < 24 || blob.size > MAX_BYTES) throw Error('Audio pack must be smaller than 30 MB.');
  const length = new DataView(await blob.slice(0, 4).arrayBuffer()).getUint32(0, true);
  if (length < 40 || length > 15000 || length + 4 >= blob.size) throw Error('Invalid audio pack header.');
  let manifest: Manifest;
  try { manifest = JSON.parse(await blob.slice(4, 4 + length).text()) as Manifest; }
  catch { throw Error('Invalid audio pack manifest.'); }
  if (manifest.magic !== 'WHAT_IS_REAL_AUDIO_PACK_V1' || !Array.isArray(manifest.files)) {
    throw Error('This is not a WHAT IS REAL? audio pack.');
  }
  const entries = new Map<string, Entry>();
  const payloadBytes = blob.size - length - 4;
  for (const entry of manifest.files) {
    if (!AUDIO_KEYS.includes(entry.key) || entries.has(entry.key) ||
      !Number.isSafeInteger(entry.offset) || !Number.isSafeInteger(entry.length) ||
      entry.offset < 0 || entry.length < 1 || entry.offset + entry.length > payloadBytes) {
      throw Error('The audio pack contains an invalid or unexpected clip.');
    }
    entries.set(entry.key, entry);
  }
  if (entries.size !== AUDIO_KEYS.length) throw Error('The audio pack must contain all nine tracks.');
  return { blob, offset: 4 + length, entries };
}
export async function installAudioPack(blob: Blob): Promise<void> {
  const pack = await parse(blob);
  activePack = pack;
  releaseUrls();
  try { await remember(blob); }
  catch { /* Browser storage blocked/full; audio still works in this tab. */ }
}
export async function restoreAudioPack(): Promise<boolean> {
  try {
    const saved = await recall();
    if (!saved) return false;
    const pack = await parse(saved);
    activePack = pack;
    releaseUrls();
    return true;
  } catch { return false; }
}
export function hasAudioPack(): boolean { return activePack !== null; }
export function audioFileUrl(key: string): string {
  if (!AUDIO_KEYS.includes(key)) throw Error('Unknown audio track: ' + key);
  const entry = activePack?.entries.get(key);
  if (activePack && entry) {
    const old = objectUrls.get(key);
    if (old) return old;
    const start = activePack.offset + entry.offset;
    const url = URL.createObjectURL(activePack.blob.slice(start, start + entry.length, entry.mime));
    objectUrls.set(key, url);
    return url;
  }
  // Published files, when available, take the same canonical filenames.
  return import.meta.env.BASE_URL + 'audio/' + key;
}
