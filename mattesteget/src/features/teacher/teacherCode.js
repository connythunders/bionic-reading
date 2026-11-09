// @ts-check
// Lärarkod som sätts på enheten. Koden skyddar lärarvyn mot misstag (till exempel att en
// elev klickar sig in av nyfikenhet). Den är INTE säkerhet: all data finns ändå lokalt på
// enheten, och vem som helst med tillgång till enheten kan ta bort koden.
import { safeStorage } from '../settings/settingsStore.js';

const KEY = 'ms.teacher';
export const MIN_CODE_LENGTH = 4;
export const MAX_CODE_LENGTH = 64;

/** @param {Uint8Array} bytes */
const toHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

/**
 * PBKDF2 med SHA-256 när webbläsaren har det (https och localhost). På andra adresser används
 * en enkel kontrollsumma, vilket räcker eftersom koden bara är ett skydd mot misstag.
 * @param {string} code @param {string} salt @param {SubtleCrypto | undefined} subtle
 */
async function hashCode(code, salt, subtle) {
  if (subtle) {
    const enc = new TextEncoder();
    const key = await subtle.importKey('raw', enc.encode(code), 'PBKDF2', false, ['deriveBits']);
    const bits = await subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100_000, hash: 'SHA-256' }, key, 256);
    return `p:${toHex(new Uint8Array(bits))}`;
  }
  let h = 2166136261;
  for (const ch of `${salt}:${code}`) { h ^= ch.codePointAt(0) ?? 0; h = Math.imul(h, 16777619) >>> 0; }
  return `f:${h.toString(16)}`;
}

/**
 * @param {{
 *   storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null,
 *   subtle?: SubtleCrypto | undefined,
 *   randomBytes?: (n: number) => Uint8Array
 * }} [o]
 */
export function createTeacherCode({
  storage = safeStorage(),
  subtle = globalThis.crypto?.subtle,
  randomBytes = (n) => globalThis.crypto.getRandomValues(new Uint8Array(n)),
} = {}) {
  let unlocked = false;
  /** Läser den sparade koden, om det finns en. @returns {{ salt: string, hash: string } | null} */
  const read = () => {
    try {
      const raw = storage?.getItem(KEY);
      const v = raw ? JSON.parse(raw) : null;
      return v && typeof v.salt === 'string' && typeof v.hash === 'string' ? v : null;
    } catch {
      return null;
    }
  };

  return {
    hasCode: () => read() !== null,
    isUnlocked: () => unlocked,

    /** Sätter en ny kod och låser upp. @param {string} code @returns {Promise<{ ok: true } | { ok: false, error: string }>} */
    async setCode(code) {
      if (code.length < MIN_CODE_LENGTH) return { ok: false, error: `Koden måste vara minst ${MIN_CODE_LENGTH} tecken.` };
      if (code.length > MAX_CODE_LENGTH) return { ok: false, error: `Koden får vara högst ${MAX_CODE_LENGTH} tecken.` };
      const salt = toHex(randomBytes(16));
      try {
        storage?.setItem(KEY, JSON.stringify({ salt, hash: await hashCode(code, salt, subtle) }));
      } catch {
        return { ok: false, error: 'Koden kunde inte sparas på den här enheten.' };
      }
      unlocked = true;
      return { ok: true };
    },

    /** @param {string} code */
    async unlock(code) {
      const saved = read();
      if (!saved) return false;
      unlocked = (await hashCode(code, saved.salt, subtle)) === saved.hash;
      return unlocked;
    },

    lock() { unlocked = false; },

    /** Tar bort koden. Elevfiler som lästs in finns kvar. */
    clear() {
      try { storage?.removeItem(KEY); } catch { /* ignorera */ }
      unlocked = false;
    },
  };
}
