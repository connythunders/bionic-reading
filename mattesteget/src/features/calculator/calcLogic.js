// @ts-check
// Miniräknarens logik. Ren, utan DOM. Räknar exakt med decimaltal (BigInt), så att
// 0,1 + 0,2 blir 0,3 och inte 0,30000000000000004.
//
// Räknaren fungerar som en enkel fickräknare: operationer räknas från vänster till höger,
// så 2 + 3 × 4 blir 20. Procent-knappen gör om talet på skärmen till hundradelar
// (25 % blir 0,25), så "25 % av 800" skrivs 800 × 25 % =.

const PRECISION = 10;      // decimaler vid division
const MAX_DIGITS = 15;     // längsta tal eleven kan skriva

/** @typedef {{ n: bigint, s: number }} Dec  värdet är n / 10^s */

/** @param {Dec} d @returns {Dec} utan onödiga nollor i slutet */
function norm(d) {
  let { n, s } = d;
  while (s > 0 && n % 10n === 0n) { n /= 10n; s--; }
  return { n, s };
}

/** "-12.50" till Dec. @param {string} str @returns {Dec} */
export function parseDec(str) {
  const m = /^(-?)(\d*)(?:\.(\d*))?$/.exec(str);
  if (!m) throw new Error(`Ogiltigt tal: ${str}`);
  const frac = m[3] ?? '';
  let n = BigInt(`${m[2] || '0'}${frac}`);
  if (m[1]) n = -n;
  return norm({ n, s: frac.length });
}

/** Dec till text med punkt, till exempel "-12.5". @param {Dec} d */
export function formatDec(d) {
  const neg = d.n < 0n;
  const digits = (neg ? -d.n : d.n).toString().padStart(d.s + 1, '0');
  const int = digits.slice(0, digits.length - d.s);
  const frac = digits.slice(digits.length - d.s);
  return `${neg ? '-' : ''}${int}${d.s ? `.${frac}` : ''}`;
}

/** @param {Dec} a @param {Dec} b @returns {[bigint, bigint, number]} */
function align(a, b) {
  const s = Math.max(a.s, b.s);
  return [a.n * 10n ** BigInt(s - a.s), b.n * 10n ** BigInt(s - b.s), s];
}

/** @param {Dec} a @param {Dec} b */
export const add = (a, b) => { const [x, y, s] = align(a, b); return norm({ n: x + y, s }); };
/** @param {Dec} a @param {Dec} b */
export const sub = (a, b) => { const [x, y, s] = align(a, b); return norm({ n: x - y, s }); };
/** @param {Dec} a @param {Dec} b */
export const mul = (a, b) => norm({ n: a.n * b.n, s: a.s + b.s });

/** Division med 10 decimaler, avrundad. Kastar vid division med noll. @param {Dec} a @param {Dec} b */
export function div(a, b) {
  if (b.n === 0n) throw new RangeError('Division med noll');
  const num = a.n * 10n ** BigInt(b.s + PRECISION);
  const den = b.n * 10n ** BigInt(a.s);
  const neg = (num < 0n) !== (den < 0n);
  const absN = num < 0n ? -num : num;
  const absD = den < 0n ? -den : den;
  const q = (absN * 2n + absD) / (2n * absD); // avrunda halvt uppåt
  return norm({ n: neg ? -q : q, s: PRECISION });
}

const SYMBOLS = { '+': '+', '-': '−', '*': '×', '/': '÷' };
const OPS = { '+': add, '-': sub, '*': mul, '/': div };

/**
 * @typedef {{
 *   display: string, acc: Dec | null, op: '+' | '-' | '*' | '/' | null,
 *   fresh: boolean, operandReady: boolean, error: string | null, expr: string
 * }} CalcState
 */

/** @returns {CalcState} */
export function initialCalc() {
  return { display: '0', acc: null, op: null, fresh: true, operandReady: false, error: null, expr: '' };
}

/** Text för skärmen med decimalkomma och tusentalsavgränsare. @param {string} dotted */
export function toSwedish(dotted) {
  const neg = dotted.startsWith('-');
  const [int, frac] = dotted.replace('-', '').split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${neg ? '−' : ''}${grouped}${frac !== undefined ? `,${frac}` : ''}`;
}

/** @param {Dec} d */
const show = (d) => toSwedish(formatDec(d));

/**
 * Tryck på en tangent. Tangenter: 0-9, ",", "+", "-", "*", "/", "=", "C", "back", "neg", "%".
 * @param {CalcState} state @param {string} key @returns {CalcState}
 */
export function press(state, key) {
  const s = state.error ? initialCalc() : state; // efter ett felmeddelande börjar vi om

  if (/^[0-9]$/.test(key)) {
    if (s.fresh) return { ...s, display: key, fresh: false, operandReady: true };
    const digits = s.display.replace(/[-.]/g, '');
    if (digits.length >= MAX_DIGITS) return s;
    return { ...s, display: s.display === '0' ? key : s.display === '-0' ? `-${key}` : s.display + key, operandReady: true };
  }

  switch (key) {
    case ',':
    case '.':
      if (s.fresh) return { ...s, display: '0.', fresh: false, operandReady: true };
      return s.display.includes('.') ? s : { ...s, display: `${s.display}.` };

    case '+': case '-': case '*': case '/': {
      const sym = SYMBOLS[key];
      if (s.acc && s.op && s.operandReady) {
        // 2 + 3 + ...: räkna ut det som står först
        const r = compute(s);
        if (r.error) return r;
        return { ...r, acc: parseDec(r.display), op: key, fresh: true, operandReady: false, expr: `${toSwedish(r.display)} ${sym}` };
      }
      if (s.acc && s.op) return { ...s, op: key, expr: `${show(s.acc)} ${sym}` }; // byt räknesätt
      const acc = parseDec(trimDot(s.display));
      return { ...s, acc, op: key, fresh: true, operandReady: false, expr: `${show(acc)} ${sym}` };
    }

    case '=': {
      if (!s.acc || !s.op || !s.operandReady) return s;
      const left = s.acc;
      const op = s.op;
      const right = parseDec(trimDot(s.display));
      const r = compute(s);
      if (r.error) return r;
      return { ...r, acc: null, op: null, fresh: true, operandReady: false, expr: `${show(left)} ${SYMBOLS[op]} ${show(right)} =` };
    }

    case 'C':
      return initialCalc();

    case 'back':
      if (s.fresh) return s; // ett färdigt resultat går inte att radera siffra för siffra
      return { ...s, display: s.display.length <= 1 || s.display === '-0' || /^-.$/.test(s.display) ? '0' : s.display.slice(0, -1) };

    case 'neg':
      if (parseDec(trimDot(s.display)).n === 0n && !s.display.includes('.')) return s;
      return { ...s, display: s.display.startsWith('-') ? s.display.slice(1) : `-${s.display}` };

    case '%': {
      const v = div(parseDec(trimDot(s.display)), parseDec('100'));
      return { ...s, display: formatDec(v), fresh: true, operandReady: true };
    }
    default:
      return s;
  }
}

/** "5." blir "5". @param {string} d */
function trimDot(d) {
  return d.endsWith('.') ? d.slice(0, -1) : d;
}

/** Räknar ut acc op display. @param {CalcState} s @returns {CalcState} */
function compute(s) {
  try {
    const result = OPS[/** @type {'+' | '-' | '*' | '/'} */ (s.op)](/** @type {Dec} */ (s.acc), parseDec(trimDot(s.display)));
    return { ...s, display: formatDec(result), error: null };
  } catch (e) {
    if (e instanceof RangeError) {
      return { ...initialCalc(), error: 'Det går inte att dela med noll.' };
    }
    throw e;
  }
}

/** Det som står på skärmen. @param {CalcState} s */
export function displayText(s) {
  return toSwedish(s.display);
}

/** Tangenternas namn när de läses upp. */
const SPOKEN = {
  ',': 'komma', '+': 'plus', '-': 'minus', '*': 'gånger', '/': 'delat med', '=': 'är lika med',
  C: 'rensa', back: 'radera', neg: 'byt tecken', '%': 'procent',
};

/** @param {string} key */
export function spokenKey(key) {
  return /** @type {Record<string, string>} */ (SPOKEN)[key] ?? key;
}

/** Resultatet som text för uppläsning. @param {CalcState} s */
export function spokenResult(s) {
  if (s.error) return s.error;
  return `Skärmen visar ${displayText(s).replace('−', 'minus ').replace(/ /g, '')}`;
}
