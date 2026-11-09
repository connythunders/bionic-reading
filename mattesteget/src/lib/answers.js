// @ts-check
// Tolkning och kontroll av elevsvar. Ren logik utan DOM.
import { frac, equals, toNumber, isSimplified, parseDecimal, fromNumber, canonical } from './fractions.js';

/**
 * @typedef {{ value: import('./fractions.js').Frac, form: 'number' | 'fraction' | 'mixed', written?: { n: number, d: number } }} ParsedInput
 * @typedef {'correct' | 'incorrect' | 'invalid' | 'unsimplified'} CheckStatus
 */

/** Gör om "1.200,50" och "1,5" och "1.000.000" till en sträng med punkt som decimaltecken. @param {string} s */
function normalizeSeparators(s) {
  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');
  if (lastDot >= 0 && lastComma >= 0) {
    const decimal = lastDot > lastComma ? '.' : ',';
    const thousands = decimal === '.' ? ',' : '.';
    return s.split(thousands).join('').replace(decimal, '.');
  }
  for (const sep of ['.', ',']) {
    if (s.split(sep).length > 2) return s.split(sep).join(''); // flera av samma = tusentalsavgränsare
  }
  return s.replace(',', '.');
}

/**
 * Tolkar det eleven skrev. Godtar bland annat "0,25", "0.25", " 0,25 ", "1/4", "1 1/2",
 * "1 200", "25 %" och "200 kr". Returnerar null om det inte går att tolka.
 * @param {unknown} raw
 * @returns {ParsedInput | null}
 */
export function parseInput(raw) {
  if (typeof raw !== 'string') return null;
  let s = raw.trim().replace(/−/g, '-');
  s = s.replace(/\s*(kronor|kr|procent|%)\s*$/i, '').trim(); // enhet i slutet får stå med
  if (!s) return null;

  const mixed = /^(-?)(\d+)\s+(\d+)\/(\d+)$/.exec(s);
  if (mixed) {
    const [, sign, whole, num, den] = mixed;
    const d = Number(den);
    if (d === 0) return null;
    const n = Number(whole) * d + Number(num);
    return { value: frac(sign ? -n : n, d), form: 'mixed', written: { n, d } };
  }

  s = s.replace(/\s+/g, ''); // mellanslag (även hårda) som tusentalsavgränsare
  const fraction = /^(-?\d+)\/(\d+)$/.exec(s);
  if (fraction) {
    const n = Number(fraction[1]);
    const d = Number(fraction[2]);
    if (d === 0) return null;
    return { value: frac(n, d), form: 'fraction', written: { n, d } };
  }

  const value = parseDecimal(normalizeSeparators(s));
  return value ? { value, form: 'number' } : null;
}

/**
 * Kontrollerar ett svar mot facit. För flervalssvar är input en lista med valda index,
 * för övriga svarstyper en text.
 * @param {any} answer  facit enligt innehållsschemat
 * @param {unknown} input
 * @returns {{ status: CheckStatus }}
 */
export function checkAnswer(answer, input) {
  switch (answer.kind) {
    case 'number': {
      const p = parseInput(input);
      if (!p) return { status: 'invalid' };
      if (answer.tolerance > 0) {
        return { status: Math.abs(toNumber(p.value) - answer.value) <= answer.tolerance ? 'correct' : 'incorrect' };
      }
      return { status: equals(p.value, fromNumber(answer.value)) ? 'correct' : 'incorrect' };
    }
    case 'fraction': {
      const p = parseInput(input);
      if (!p) return { status: 'invalid' };
      if (!equals(p.value, frac(answer.num, answer.den))) return { status: 'incorrect' };
      if (answer.mustBeSimplified && p.written && !isSimplified(p.written.n, p.written.d)) return { status: 'unsimplified' };
      return { status: 'correct' };
    }
    case 'choice': {
      if (!Array.isArray(input) || input.length === 0) return { status: 'invalid' };
      const chosen = [...new Set(input)].sort();
      const correct = [...answer.correct].sort();
      return { status: JSON.stringify(chosen) === JSON.stringify(correct) ? 'correct' : 'incorrect' };
    }
    case 'numberLine': {
      const p = parseInput(input);
      if (!p) return { status: 'invalid' };
      return { status: Math.abs(toNumber(p.value) - answer.target) <= answer.tolerance ? 'correct' : 'incorrect' };
    }
    default:
      throw new Error(`Okänd svarstyp: ${answer.kind}`);
  }
}

/**
 * Hittar ett förberett meddelande för ett vanligt felsvar, om svaret matchar ett.
 * Jämförelsen är matematisk, så "1 200" och "1200" räknas som samma.
 * @param {{ value: string, message: any }[] | undefined} list
 * @param {unknown} input
 */
export function matchCommonWrong(list, input) {
  if (!list || typeof input !== 'string') return null;
  const p = parseInput(input);
  if (!p) return null;
  for (const w of list) {
    const pw = parseInput(w.value);
    if (pw && equals(pw.value, p.value)) return w;
  }
  return null;
}

/** Svensk talskrivning: tusentalsavgränsare och decimalkomma. @param {number} x */
export function formatNumber(x) {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 10 }).format(x);
}

/** Facit som text till eleven. @param {any} answer */
export function formatAnswer(answer) {
  switch (answer.kind) {
    case 'number':
      return answer.unit ? `${formatNumber(answer.value)} ${answer.unit}` : formatNumber(answer.value);
    case 'fraction':
      return `${answer.num}/${answer.den}`;
    case 'choice':
      return answer.correct.map((/** @type {number} */ i) => answer.options[i].text).join(', ');
    case 'numberLine':
      return formatNumber(answer.target);
    default:
      return '';
  }
}

/** Facit som text eleven kan skriva in (används i tester). @param {any} answer @returns {string | number[]} */
export function answerToInput(answer) {
  switch (answer.kind) {
    case 'number': return String(answer.value).replace('.', ',');
    case 'fraction': return `${answer.num}/${answer.den}`;
    case 'choice': return [...answer.correct];
    default: return String(answer.target);
  }
}

export { canonical };
