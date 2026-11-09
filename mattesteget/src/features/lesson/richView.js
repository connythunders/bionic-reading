// @ts-check
// Ritar RichText och formler som DOM. Formler är MathML med aria-label = talversionen.
import { h } from '../../lib/dom.js';
import { parseRich } from '../../lib/richText.js';
import { parseExpr } from '../../lib/math.js';

const MATHML = 'http://www.w3.org/1998/Math/MathML';

/** @param {string} tag @param {string} [text] */
function mathEl(tag, text) {
  const el = document.createElementNS(MATHML, tag);
  if (text !== undefined) el.textContent = text;
  return el;
}

/**
 * En formel: synlig MathML, men skärmläsare får talversionen.
 * @param {{ expr: string, speak: string }} formula
 * @returns {HTMLElement}
 */
export function renderFormula(formula) {
  const math = mathEl('math');
  math.setAttribute('aria-hidden', 'true');
  for (const t of parseExpr(formula.expr)) {
    if (t.type === 'frac') {
      const f = mathEl('mfrac');
      f.append(mathEl('mn', t.num), mathEl('mn', t.den));
      math.append(f);
    } else if (t.type === 'num') math.append(mathEl('mn', t.text));
    else if (t.type === 'id') math.append(mathEl('mi', t.text));
    else math.append(mathEl('mo', t.text));
  }
  return h('span', { class: 'formula', role: 'img', 'aria-label': formula.speak }, math);
}

/**
 * RichText som ett fragment av text, fetstil och formler.
 * @param {{ text: string, formulas?: Record<string, { expr: string, speak: string }> }} rt
 * @returns {DocumentFragment}
 */
export function renderRich(rt) {
  const frag = document.createDocumentFragment();
  for (const seg of parseRich(rt)) {
    if (seg.type === 'bold') frag.append(h('strong', null, seg.value));
    else if (seg.type === 'formula') {
      const f = rt.formulas?.[seg.value];
      if (f) frag.append(renderFormula(f));
    } else frag.append(document.createTextNode(seg.value));
  }
  return frag;
}
