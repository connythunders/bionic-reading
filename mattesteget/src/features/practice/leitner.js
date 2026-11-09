// @ts-check
// Leitner-lådor för repetition. Enkel och genomskinlig, ingen AI och inget slumpmoment.
//
// Varje uppgiftstyp (till exempel "procent av ett tal") ligger i en låda, 1 till 5:
//   - rätt utan ledtråd  => upp en låda
//   - rätt med ledtråd   => samma låda
//   - inte klar (fick se lösningen) => tillbaka till låda 1
// Ju högre låda, desto längre tid till nästa repetition: 0, 1, 3, 7 och 14 dagar.

/** Dagar till nästa repetition när uppgiftstypen ligger i lådan. */
export const INTERVALS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };
export const MAX_BOX = 5;

/** @param {number} n */
const pad = (n) => String(n).padStart(2, '0');

/** Dagens datum i lokal tid som "ÅÅÅÅ-MM-DD". @param {Date} [date] */
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Lägger till dagar på ett datum "ÅÅÅÅ-MM-DD". @param {string} day @param {number} n */
export function addDays(day, n) {
  const [y, m, d] = day.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

/**
 * @param {{ correct: boolean, hintLevel?: number }} r
 * @returns {'up' | 'same' | 'again'}
 */
export function outcomeOf({ correct, hintLevel = 0 }) {
  if (!correct) return 'again';
  return hintLevel > 0 ? 'same' : 'up';
}

/** @param {number} box @param {'up' | 'same' | 'again'} outcome */
export function nextBox(box, outcome) {
  if (outcome === 'up') return Math.min(MAX_BOX, box + 1);
  if (outcome === 'same') return box;
  return 1;
}

/**
 * @typedef {{ box: number, due: string, lastSeen: string, reviews: number }} TypeRecord
 */

/**
 * Nytt tillstånd för en uppgiftstyp efter ett resultat.
 * @param {TypeRecord | undefined} record  undefined första gången typen övas
 * @param {'up' | 'same' | 'again'} outcome
 * @param {string} today
 * @returns {TypeRecord}
 */
export function nextTypeRecord(record, outcome, today) {
  const box = nextBox(record?.box ?? 1, outcome);
  return {
    box,
    due: addDays(today, INTERVALS[/** @type {1 | 2 | 3 | 4 | 5} */ (box)]),
    lastSeen: today,
    reviews: (record?.reviews ?? 0) + 1,
  };
}

/** Är det dags att repetera? @param {TypeRecord} record @param {string} today */
export function isDue(record, today) {
  return record.due <= today;
}
