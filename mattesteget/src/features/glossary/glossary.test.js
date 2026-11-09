// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { loadRealContent } from '../../../tests/helpers.js';
import { validateGlossary } from '../../lib/validate.js';

const term = (/** @type {object} */ over = {}) => ({
  id: 'andel', term: 'Andel', explanation: { text: 'Andel är en del av en helhet.' }, ...over,
});

test('ordlista: korrekt ordlista ger inga fel', () => {
  assert.deepEqual(validateGlossary({ terms: [term(), term({ id: 'del', term: 'Del' })] }), []);
});

test('ordlista: tom, dubblettord, versaler och saknad förklaring ger fel', () => {
  assert.ok(validateGlossary({ terms: [] }).length > 0);
  assert.ok(validateGlossary(null).length > 0);
  assert.ok(validateGlossary({ terms: [term(), term({ id: 'andel2' })] }).some((e) => e.includes('två gånger')));
  assert.ok(validateGlossary({ terms: [term({ term: 'ANDEL' })] }).some((e) => e.includes('versaler')));
  assert.ok(validateGlossary({ terms: [term({ explanation: undefined })] }).length > 0);
});

test('ordlista: förklaringar följer samma regler som lektionerna', () => {
  const errs = (/** @type {object} */ over) => validateGlossary({ terms: [term(over)] });
  assert.ok(errs({ explanation: { text: 'Det är 25 % av helheten.' } }).some((e) => e.includes('talversion saknas')), '% kräver talversion');
  assert.ok(errs({ explanation: { text: 'Ett. Två. Tre.' } }).some((e) => e.includes('meningar')), 'max två meningar');
  assert.ok(errs({ explanation: { text: 'Det är *kursivt*.' } }).some((e) => e.includes('fetstil')));
  assert.ok(errs({ example: { text: 'Bråket {{f}} är bra.', formulas: { f: { expr: '1/2' } } } }).some((e) => e.includes('speak')), 'formler kräver talversion');
});

test('ordlista: bilder kontrolleras', () => {
  const rep = (/** @type {object} */ r) => validateGlossary({ terms: [term({ representation: r })] });
  assert.deepEqual(rep({ kind: 'fractionBars', config: { rows: [{ n: 4, k: 1 }] }, caption: { text: 'Staven.' } }), []);
  assert.ok(rep({ kind: 'cirkel', config: {}, caption: { text: 'X.' } }).length > 0);
  assert.ok(rep({ kind: 'fractionBars', config: { rows: [{ n: 4, k: 9 }] }, caption: { text: 'Staven.' } }).length > 0);
  assert.ok(rep({ kind: 'percentBar', config: { whole: 100, percent: 5 } }).length > 0, 'bildtext krävs');
});

test('ordlista: innehållet i content/glossary.json är giltigt och har orden eleverna behöver', async () => {
  const { glossary, errors } = await loadRealContent();
  assert.deepEqual(errors, [], errors.join('\n'));
  const names = glossary.terms.map((/** @type {any} */ t) => t.term.toLowerCase());
  for (const w of ['andel', 'procent', 'decimaltal', 'täljare', 'nämnare', 'bråk', 'rabatt', 'moms']) {
    assert.ok(names.includes(w), `ordet "${w}" saknas`);
  }
  const withPicture = glossary.terms.filter((/** @type {any} */ t) => t.representation).length;
  assert.atLeast(withPicture, 8, 'de flesta orden ska ha en bild');
});

test('ordlista: sidan visar ord i bokstavsordning med bild och uppläsning, och sökning fungerar', async () => {
  const { glossaryView } = await import('./glossaryPage.js');
  const { glossary } = await loadRealContent();
  const view = glossaryView({ content: { glossary } });
  document.body.append(view.el);
  try {
    assert.equal(view.el.querySelectorAll('h1').length, 1);
    const heads = [...view.el.querySelectorAll('.term h2')].map((h) => h.textContent);
    assert.equal(heads.length, glossary.terms.length);
    assert.deepEqual(heads, [...heads].sort((a, b) => /** @type {string} */ (a).localeCompare(/** @type {string} */ (b), 'sv')));
    assert.equal(heads[0], 'Andel');
    assert.equal(heads.indexOf('Täljare') > heads.indexOf('Tiondel'), true, 'svensk sortering: ä efter i');

    const procent = [...view.el.querySelectorAll('.term')].find((c) => c.querySelector('h2')?.textContent === 'Procent');
    assert.ok(procent?.querySelector('.pb'), 'Procent har en bild');
    assert.ok(procent?.querySelector('.speak-btn'), 'Läs upp finns');
    assert.ok(!/\bfel\b/i.test(view.el.textContent || ''));

    const input = /** @type {HTMLInputElement} */ (view.el.querySelector('#ordsok'));
    const status = view.el.querySelector('[role="status"]');
    const visible = () => [...view.el.querySelectorAll('.term')].filter((c) => !(/** @type {HTMLElement} */ (c).hidden)).map((c) => c.querySelector('h2')?.textContent);
    input.value = 'täljare';
    input.dispatchEvent(new Event('input'));
    assert.deepEqual(visible(), ['Täljare']);
    assert.equal(status?.textContent, `Visar 1 av ${heads.length} ord.`);
    input.value = 'xyzzy';
    input.dispatchEvent(new Event('input'));
    assert.deepEqual(visible(), []);
    assert.ok(status?.textContent?.includes('Inga ord matchade'));
    input.value = '';
    input.dispatchEvent(new Event('input'));
    assert.equal(visible().length, heads.length);
  } finally {
    view.el.remove();
    view.dispose();
  }
}, { browserOnly: true });

test('ordlista: utan innehåll visas ett vänligt meddelande', async () => {
  const { glossaryView } = await import('./glossaryPage.js');
  const view = glossaryView({});
  assert.ok(view.el.textContent?.includes('kunde inte läsas in'));
  assert.equal(view.el.querySelectorAll('h1').length, 1);
  view.dispose();
}, { browserOnly: true });
