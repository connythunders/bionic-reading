// @ts-check
// Exakt bråkaritmetik med heltal. Används för att avgöra om ett svar är rätt,
// så att flyttalsfel (0,1 + 0,2) aldrig påverkar facit.

/** @typedef {{ n: number, d: number }} Frac  förkortat bråk, nämnaren är alltid positiv */

/** @param {number} a @param {number} b */
export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/**
 * Skapar ett förkortat bråk.
 * @param {number} n @param {number} [d]
 * @returns {Frac}
 */
export function frac(n, d = 1) {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error('Ogiltigt bråk');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

/** @param {Frac} a @param {Frac} b */
export function equals(a, b) {
  return a.n === b.n && a.d === b.d;
}

/** @param {Frac} f */
export function toNumber(f) {
  return f.n / f.d;
}

/** @param {number} n @param {number} d */
export function isSimplified(n, d) {
  return d > 0 && gcd(n, d) === 1;
}

/**
 * Tolkar ett decimaltal skrivet med punkt, t.ex. "-12.5" eller ".5". Max 15 siffror.
 * @param {string} s
 * @returns {Frac | null}
 */
export function parseDecimal(s) {
  const m = /^(-?)(\d*)(?:\.(\d+))?$/.exec(s);
  if (!m) return null;
  const [, sign, whole = '', decimals = ''] = m;
  if (whole === '' && decimals === '') return null;
  if (whole.length + decimals.length > 15) return null;
  const n = Number((whole || '0') + decimals);
  return frac(sign ? -n : n, 10 ** decimals.length);
}

/**
 * Gör om ett JavaScript-tal till ett exakt bråk via dess decimala skrivsätt.
 * @param {number} x
 * @returns {Frac}
 */
export function fromNumber(x) {
  const f = Number.isInteger(x) ? frac(x) : parseDecimal(String(x));
  if (!f) throw new Error(`Kan inte tolka ${x} exakt`);
  return f;
}

/** @param {Frac} f @returns {string} "3" eller "1/4" */
export function canonical(f) {
  return f.d === 1 ? String(f.n) : `${f.n}/${f.d}`;
}
