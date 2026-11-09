// @ts-check
// Kontrollerar det riktiga innehållet i content/. Körs i både webbläsare och Node (CI).
import { test, assert } from './harness.js';
import { loadRealContent } from './helpers.js';

/** Hämtar alla formler (objekt med expr) rekursivt.
 * @param {unknown} node @param {string} path @param {{ path: string, formula: any }[]} out */
function collectFormulas(node, path, out = []) {
  if (Array.isArray(node)) node.forEach((v, i) => collectFormulas(v, `${path}[${i}]`, out));
  else if (node && typeof node === 'object') {
    if ('expr' in node) out.push({ path, formula: node });
    for (const [k, v] of Object.entries(node)) collectFormulas(v, `${path}.${k}`, out);
  }
  return out;
}

test('innehåll: alla moduler i content/ klarar valideringen', async () => {
  const { modules, errors } = await loadRealContent();
  assert.ok(modules.length > 0, 'inga moduler hittades');
  assert.deepEqual(errors, [], `Innehållsfel:\n${errors.join('\n')}`);
});

test('innehåll: varje formel har en talversion (speak)', async () => {
  const { modules } = await loadRealContent();
  const formulas = collectFormulas(modules, 'moduler');
  assert.ok(formulas.length > 0, 'inga formler hittades');
  for (const { path, formula } of formulas) {
    assert.ok(typeof formula.speak === 'string' && formula.speak.trim() !== '', `${path}: speak saknas`);
  }
});

test('innehåll: exempellektionen i Procent har alla tre faserna', async () => {
  const { modules } = await loadRealContent();
  const procent = modules.find((m) => m.id === 'procent-vardag');
  assert.ok(procent, 'modulen procent-vardag saknas');
  const steps = procent.lessons[0].steps;
  const count = (/** @type {string} */ t) => steps.filter((/** @type {any} */ s) => s.type === t).length;
  assert.atLeast(count('workedExample'), 3, 'minst tre lösta exempel (fading 0, 1, 2)');
  assert.atLeast(count('guidedStep'), 2);
  assert.atLeast(count('practice'), 6);
  const fadings = steps.filter((/** @type {any} */ s) => s.type === 'workedExample').map((/** @type {any} */ s) => s.fading);
  assert.deepEqual(fadings, [0, 1, 2]);
});
