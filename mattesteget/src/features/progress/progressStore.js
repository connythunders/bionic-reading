// @ts-check
// Elevens progression, sparad lokalt. Inget lämnar enheten.
//
// Nycklar i lagringen:
//   item:<uppgifts-id>   en post per steg (försök, ledtrådar, klar, senast sett, vanliga svar)
//   type:<uppgiftstyp>   Leitner-låda per uppgiftstyp
//   profile              valfritt smeknamn
//
// Allt läses in i minnet vid start, så resten av appen kan läsa synkront. Skrivningar
// görs direkt mot lagringen och misslyckas tyst (då gäller bara den här sessionen).
import { nextTypeRecord, outcomeOf, localDay } from '../practice/leitner.js';

/**
 * @typedef {{
 *   attempts: number, hintsUsed: number, hintMax: number, done: boolean,
 *   lastSeen: string, reviews: number, wrongAnswers: string[]
 * }} ItemRecord
 * @typedef {{ id: string, type: string, itemType?: string }} StepMeta
 * @typedef {{ attempts?: number, hintLevel?: number, correct?: boolean, wrongInputs?: string[] }} StepInfo
 */

const MAX_WRONG = 5;

/** Slumpat id utan koppling till någon person. */
function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

/**
 * @param {{ backend: import('./db.js').Backend, today?: () => string }} o
 */
export function createProgress({ backend, today = () => localDay() }) {
  /** @type {Map<string, ItemRecord>} */
  let items = new Map();
  /** @type {Map<string, import('../practice/leitner.js').TypeRecord>} */
  let types = new Map();
  /** @type {{ nickname?: string, createdAt?: string, studentId?: string }} */
  let profile = {};
  let persistent = backend.kind === 'idb';
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /** @param {string} key @param {any} value */
  function persist(key, value) {
    backend.set(key, value).catch(() => { persistent = false; });
  }
  const notify = () => listeners.forEach((fn) => fn());

  const ready = (async () => {
    try {
      for (const [key, value] of await backend.all()) {
        if (key.startsWith('item:')) items.set(key.slice(5), value);
        else if (key.startsWith('type:')) types.set(key.slice(5), value);
        else if (key === 'profile') profile = value ?? {};
      }
    } catch {
      persistent = false; // lagringen går inte att läsa: börja med tomt
    }
  })();

  return {
    ready,
    today,
    /** Sparas progressionen mellan besök? */
    isPersistent: () => persistent,
    getItem: (/** @type {string} */ id) => items.get(id),
    getType: (/** @type {string} */ name) => types.get(name),
    isDone: (/** @type {string} */ id) => items.get(id)?.done === true,
    itemsMap: () => items,
    typesMap: () => types,
    getProfile: () => ({ ...profile }),

    /**
     * Registrerar att ett steg är klart. För övningsuppgifter (med uppgiftstyp) flyttas
     * uppgiftstypen också mellan Leitner-lådorna.
     * @param {StepMeta} meta @param {StepInfo} [info]
     */
    recordStep(meta, info = {}) {
      const day = today();
      const old = items.get(meta.id);
      /** @type {ItemRecord} */
      const rec = {
        attempts: (old?.attempts ?? 0) + (info.attempts ?? 0),
        hintsUsed: (old?.hintsUsed ?? 0) + (info.hintLevel ?? 0),
        hintMax: Math.max(old?.hintMax ?? 0, info.hintLevel ?? 0),
        done: true,
        lastSeen: day,
        reviews: (old?.done ? old.reviews : 0) + (old?.done ? 1 : 0),
        wrongAnswers: [...new Set([...(info.wrongInputs ?? []), ...(old?.wrongAnswers ?? [])])].slice(0, MAX_WRONG),
      };
      items.set(meta.id, rec);
      persist(`item:${meta.id}`, rec);

      if (meta.type === 'practice' && meta.itemType) {
        const outcome = outcomeOf({ correct: info.correct !== false, hintLevel: info.hintLevel ?? 0 });
        const next = nextTypeRecord(types.get(meta.itemType), outcome, day);
        types.set(meta.itemType, next);
        persist(`type:${meta.itemType}`, next);
      }
      notify();
    },

    /** @param {string} nickname */
    setNickname(nickname) {
      const clean = nickname.trim().slice(0, 30);
      profile = { ...profile, nickname: clean || undefined, createdAt: profile.createdAt ?? today() };
      persist('profile', profile);
      notify();
    },

    /** Elevens slumpade id, som används i exportfilen. Skapas första gången det behövs. */
    ensureStudentId() {
      if (!profile.studentId) {
        profile = { ...profile, studentId: makeId() };
        persist('profile', profile);
      }
      return /** @type {string} */ (profile.studentId);
    },

    /**
     * Allt eleven väljer att dela med läraren: steg och uppgiftstyper. Inget namn, bara smeknamnet.
     * @param {Date} [now]
     */
    exportData(now = new Date()) {
      const id = this.ensureStudentId();
      return {
        app: 'mattesteget', version: 1, exportedAt: now.toISOString(),
        student: { id, nickname: profile.nickname },
        items: Object.fromEntries(items),
        types: Object.fromEntries(types),
      };
    },

    /** Tar bort allt eleven har sparat. Lärarens elevdata i samma lagring rörs inte. */
    async clearAll() {
      items = new Map();
      types = new Map();
      profile = {};
      try {
        for (const [key] of await backend.all()) {
          if (key.startsWith('item:') || key.startsWith('type:') || key === 'profile') await backend.del(key);
        }
      } catch { /* ingenting mer att göra */ }
      notify();
    },

    /** @param {() => void} fn @returns {() => void} */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
