// @ts-check
// Tolkar formeluttryck (expr) till en enkel tokenlista som sedan ritas som MathML.
// Regler: "1/4" utan mellanslag är ett bråk, "800 / 4" med mellanslag är division (÷),
// "*" blir ×, "-" blir −, decimalpunkt blir decimalkomma.

/** @typedef {{ type: 'num' | 'op' | 'id' | 'frac', text?: string, num?: string, den?: string }} MathToken */

/**
 * @param {string} expr
 * @returns {MathToken[]}
 */
export function parseExpr(expr) {
  const re = /(\d+(?:[.,]\d+)?)|([+\-−=*×÷·/%()?])|([a-zA-ZåäöÅÄÖ]+)|(\s+)/g;
  /** @type {{ kind: 'num' | 'op' | 'id', text: string, spaceBefore: boolean, spaceAfter: boolean }[]} */
  const raw = [];
  let spaceBefore = false;
  let m;
  while ((m = re.exec(expr)) !== null) {
    if (m[4]) { spaceBefore = true; continue; }
    const kind = m[1] ? 'num' : m[2] ? 'op' : 'id';
    raw.push({ kind, text: m[0], spaceBefore, spaceAfter: false });
    spaceBefore = false;
  }
  for (let i = 0; i < raw.length - 1; i++) raw[i].spaceAfter = raw[i + 1].spaceBefore;

  /** @type {MathToken[]} */
  const out = [];
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i];
    const next = raw[i + 1];
    const after = raw[i + 2];
    if (
      t.kind === 'num' && next && next.text === '/' && !t.spaceAfter && !next.spaceAfter &&
      after && after.kind === 'num'
    ) {
      out.push({ type: 'frac', num: t.text.replace('.', ','), den: after.text.replace('.', ',') });
      i += 2;
    } else if (t.kind === 'num') {
      out.push({ type: 'num', text: t.text.replace('.', ',') });
    } else if (t.kind === 'id') {
      out.push({ type: 'id', text: t.text });
    } else {
      out.push({ type: 'op', text: t.text === '/' ? '÷' : t.text === '*' ? '×' : t.text === '-' ? '−' : t.text });
    }
  }
  return out;
}
