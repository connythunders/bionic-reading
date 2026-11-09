// @ts-check
// Inställningar som sparas lokalt (localStorage). Ingen data lämnar enheten.

export const STORAGE_KEY = 'ms.settings';

export const FONTS = ['atkinson', 'verdana', 'arial', 'opendyslexic'];
export const BACKGROUNDS = ['cream', 'grey', 'blue', 'dark'];
export const MOTIONS = ['system', 'reduce'];

/**
 * @typedef {{
 *   font: string, fontSize: number, lineHeight: number, letterSpacing: number,
 *   background: string, motion: string, speechRate: number, autoRead: boolean
 * }} Settings
 */

/** @type {Settings} */
export const DEFAULTS = Object.freeze({
  font: 'atkinson',
  fontSize: 20,        // px, 18-28
  lineHeight: 1.6,     // 1,5-2,0
  letterSpacing: 0.02, // em, 0-0,12
  background: 'cream',
  motion: 'system',
  speechRate: 1,       // 0,7-1,3
  autoRead: false,     // läs upp ny text automatiskt
});

/** @param {unknown} v @param {number} min @param {number} max @param {number} fallback */
function clampNumber(v, min, max, fallback) {
  const n = typeof v === 'number' ? v : Number.NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** @param {unknown} v @param {string[]} allowed @param {string} fallback */
function pick(v, allowed, fallback) {
  return typeof v === 'string' && allowed.includes(v) ? v : fallback;
}

/**
 * Gör om vad som helst till giltiga inställningar. Okända eller trasiga värden ersätts av standard.
 * @param {unknown} raw
 * @returns {Settings}
 */
export function sanitize(raw) {
  const r = raw && typeof raw === 'object' ? /** @type {Record<string, unknown>} */ (raw) : {};
  return {
    font: pick(r.font, FONTS, DEFAULTS.font),
    fontSize: Math.round(clampNumber(r.fontSize, 18, 28, DEFAULTS.fontSize)),
    lineHeight: Math.round(clampNumber(r.lineHeight, 1.5, 2.0, DEFAULTS.lineHeight) * 100) / 100,
    letterSpacing: Math.round(clampNumber(r.letterSpacing, 0, 0.12, DEFAULTS.letterSpacing) * 100) / 100,
    background: pick(r.background, BACKGROUNDS, DEFAULTS.background),
    motion: pick(r.motion, MOTIONS, DEFAULTS.motion),
    speechRate: Math.round(clampNumber(r.speechRate, 0.7, 1.3, DEFAULTS.speechRate) * 10) / 10,
    autoRead: r.autoRead === true,
  };
}

/** @returns {Storage | null} localStorage kan saknas eller kasta fel (privat läge, blockerad). */
export function safeStorage() {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

/**
 * @param {Pick<Storage, 'getItem' | 'setItem'> | null} [storage]
 * @returns {Settings}
 */
export function loadSettings(storage = safeStorage()) {
  try {
    const text = storage?.getItem(STORAGE_KEY);
    return sanitize(text ? JSON.parse(text) : null);
  } catch {
    return { ...DEFAULTS };
  }
}

/**
 * @param {Settings} settings
 * @param {Pick<Storage, 'getItem' | 'setItem'> | null} [storage]
 */
export function saveSettings(settings, storage = safeStorage()) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Sparandet misslyckas tyst. Inställningarna gäller ändå under sessionen.
  }
}

/**
 * Enkel store med get/update/reset/subscribe.
 * @param {Pick<Storage, 'getItem' | 'setItem'> | null} [storage]
 */
export function createSettingsStore(storage = safeStorage()) {
  let current = loadSettings(storage);
  /** @type {Set<(s: Settings) => void>} */
  const listeners = new Set();

  /** @param {Settings} next */
  function commit(next) {
    current = next;
    saveSettings(current, storage);
    listeners.forEach((fn) => fn(current));
  }

  return {
    get: () => current,
    /** @param {Partial<Settings>} patch */
    update: (patch) => commit(sanitize({ ...current, ...patch })),
    reset: () => commit({ ...DEFAULTS }),
    /** @param {(s: Settings) => void} fn @returns {() => void} */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
