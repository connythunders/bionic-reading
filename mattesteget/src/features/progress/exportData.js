// @ts-check
// Export och import av elevers progression, och en kort sammanfattning att dela som text.
// Exportfilen innehåller inget namn, bara det valfria smeknamnet och ett slumpat id.
import { summarize } from './summary.js';

export const EXPORT_VERSION = 1;
const MAX_FILE_CHARS = 1_000_000;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * @typedef {{
 *   id: string, nickname?: string, exportedAt: string,
 *   items: Record<string, import('./progressStore.js').ItemRecord>,
 *   types: Record<string, import('../practice/leitner.js').TypeRecord>
 * }} StudentData
 */

/**
 * Filnamn för exporten, till exempel "mattesteget-kim-2026-11-10.json".
 * @param {{ nickname?: string, day: string }} o
 */
export function exportFileName({ nickname, day }) {
  const slug = (nickname ?? '')
    .toLowerCase()
    .replace(/å|ä/g, 'a').replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `mattesteget-${slug || 'elev'}-${day}.json`;
}

/**
 * Sammanfattning som eleven kan kopiera och skicka. Innehåller bara antal steg per modul.
 * @param {{ nickname?: string, modules: any[], isDone: (id: string) => boolean, helpedSteps: number, day: string }} o
 */
export function summaryText({ nickname, modules, isDone, helpedSteps, day }) {
  const s = summarize(modules.filter((m) => m.lessons.length > 0), isDone);
  const lines = [`Mattesteget – sammanfattning (${day})`];
  if (nickname) lines.push(`Smeknamn: ${nickname}`);
  for (const m of s.modules) lines.push(`${m.title}: ${m.done} av ${m.total} steg`);
  lines.push(`Totalt: ${s.done} av ${s.total} steg`);
  lines.push(`Steg där jag använde ledtråd: ${helpedSteps}`);
  return lines.join('\n');
}

/** @param {unknown} v @param {number} max */
const count = (v, max = 1_000_000) => (typeof v === 'number' && Number.isInteger(v) && v >= 0 ? Math.min(v, max) : 0);
/** @param {unknown} v */
const day = (v) => (typeof v === 'string' && DAY_RE.test(v) ? v : '');

/**
 * Läser en exportfil från en elev och rensar den, så att inget oväntat kommer med in.
 * @param {string} text
 * @returns {{ ok: true, student: StudentData } | { ok: false, error: string }}
 */
export function parseStudentExport(text) {
  if (typeof text !== 'string' || text.length > MAX_FILE_CHARS) return { ok: false, error: 'Filen är för stor.' };
  /** @type {any} */
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, error: 'Filen är inte en exportfil från Mattesteget.' };
  }
  if (!data || typeof data !== 'object' || data.app !== 'mattesteget') {
    return { ok: false, error: 'Filen är inte en exportfil från Mattesteget.' };
  }
  if (data.version !== EXPORT_VERSION) {
    return { ok: false, error: 'Filen är gjord med en annan version av Mattesteget.' };
  }
  const id = data.student?.id;
  if (typeof id !== 'string' || !/^[A-Za-z0-9-]{8,64}$/.test(id)) return { ok: false, error: 'Filen saknar ett giltigt elev-id.' };
  const nickname = typeof data.student.nickname === 'string' ? data.student.nickname.trim().slice(0, 30) : undefined;

  /** @type {StudentData['items']} */
  const items = {};
  for (const [key, raw] of Object.entries(data.items ?? {})) {
    if (key === '__proto__' || key.length > 80 || !raw || typeof raw !== 'object') continue;
    const r = /** @type {any} */ (raw);
    items[key] = {
      attempts: count(r.attempts), hintsUsed: count(r.hintsUsed), hintMax: count(r.hintMax, 4),
      done: r.done === true, lastSeen: day(r.lastSeen), reviews: count(r.reviews),
      wrongAnswers: Array.isArray(r.wrongAnswers)
        ? r.wrongAnswers.filter((/** @type {unknown} */ w) => typeof w === 'string').map((/** @type {string} */ w) => w.slice(0, 40)).slice(0, 5)
        : [],
    };
  }
  /** @type {StudentData['types']} */
  const types = {};
  for (const [key, raw] of Object.entries(data.types ?? {})) {
    if (key === '__proto__' || key.length > 80 || !raw || typeof raw !== 'object') continue;
    const r = /** @type {any} */ (raw);
    types[key] = { box: Math.min(5, Math.max(1, count(r.box) || 1)), due: day(r.due), lastSeen: day(r.lastSeen), reviews: count(r.reviews) };
  }
  const exportedAt = typeof data.exportedAt === 'string' ? data.exportedAt.slice(0, 40) : '';
  return { ok: true, student: { id, nickname: nickname || undefined, exportedAt, items, types } };
}

/** Namn att visa för en elev. Lägger till en kort kod om flera har samma smeknamn.
 * @param {{ id: string, nickname?: string }} student @param {{ id: string, nickname?: string }[]} all */
export function displayName(student, all) {
  const base = student.nickname || 'Elev';
  const same = all.filter((s) => (s.nickname || 'Elev') === base).length > 1 || !student.nickname;
  return same ? `${base} (${student.id.slice(0, 4)})` : base;
}
