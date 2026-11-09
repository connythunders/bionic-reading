// @ts-check
// boot.js ska ge exakt samma resultat som den riktiga inställningskoden (sanitize + applySettings).
import { test, assert } from '../tests/harness.js';
import { readAppText } from '../tests/helpers.js';
import { sanitize, DEFAULTS } from './features/settings/settingsStore.js';
import { applySettings } from './features/settings/applySettings.js';

/** Ett låtsas-html-element som samlar attribut och CSS-variabler. */
function fakeRoot() {
  /** @type {Record<string, string>} */
  const vars = {};
  return { dataset: /** @type {Record<string, string>} */ ({}), style: { setProperty: (/** @type {string} */ k, /** @type {string} */ v) => { vars[k] = v; } }, vars };
}

/** Kör boot.js med givna sparade inställningar. @param {string} source @param {string | null} saved */
function runBoot(source, saved, throwOnRead = false) {
  const root = fakeRoot();
  const document = { documentElement: root };
  const localStorage = { getItem: () => { if (throwOnRead) throw new Error('blockerad'); return saved; } };
  new Function('document', 'localStorage', source)(document, localStorage);
  return { dataset: root.dataset, vars: root.vars };
}

/** Samma sak via den riktiga koden. @param {unknown} settings */
function runReal(settings) {
  const root = fakeRoot();
  applySettings(sanitize(settings), /** @type {any} */ (root));
  return { dataset: root.dataset, vars: root.vars };
}

const CASES = [
  { background: 'dark', font: 'opendyslexic', fontSize: 26, lineHeight: 1.8, letterSpacing: 0.1, motion: 'reduce' },
  { background: 'grey', font: 'verdana', fontSize: 18, lineHeight: 1.5, letterSpacing: 0, motion: 'system' },
  { background: 'blue', font: 'arial', fontSize: 28, lineHeight: 2, letterSpacing: 0.12, motion: 'system' },
  { background: 'cream', font: 'atkinson', fontSize: 22.4, lineHeight: 1.65, letterSpacing: 0.035, motion: 'system' },
  { background: 'dark', fontSize: 100, lineHeight: 9, letterSpacing: 5 },
  { background: 'rosa', font: 'comic', fontSize: 'stor' },
];

test('boot.js: ger samma tema och typografi som den riktiga inställningskoden', async () => {
  const source = await readAppText('src/boot.js');
  for (const c of CASES) {
    const boot = runBoot(source, JSON.stringify(c));
    const real = runReal(c);
    // boot.js sätter bara det som är giltigt, den riktiga koden sätter standard för resten.
    // Det som boot.js sätter ska alltid vara identiskt.
    for (const [k, v] of Object.entries(boot.dataset)) assert.equal(real.dataset[k], v, `data-${k} för ${JSON.stringify(c)}`);
    for (const [k, v] of Object.entries(boot.vars)) assert.equal(real.vars[k], v, `${k} för ${JSON.stringify(c)}`);
  }
});

test('boot.js: giltiga inställningar sätts, ogiltiga lämnas till standard', async () => {
  const source = await readAppText('src/boot.js');
  const dark = runBoot(source, JSON.stringify({ background: 'dark', fontSize: 26 }));
  assert.equal(dark.dataset.bg, 'dark');
  assert.equal(dark.vars['--fs'], '26px');
  const bad = runBoot(source, JSON.stringify({ background: 'rosa', fontSize: 'stor', lineHeight: null }));
  assert.deepEqual(bad.dataset, {});
  assert.deepEqual(bad.vars, {});
  assert.equal(DEFAULTS.background, 'cream', 'standard är krämvit (satt i HTML)');
});

test('boot.js: tom, trasig eller blockerad lagring ger inga fel', async () => {
  const source = await readAppText('src/boot.js');
  assert.deepEqual(runBoot(source, null).dataset, {});
  assert.deepEqual(runBoot(source, '{inte json').dataset, {});
  assert.deepEqual(runBoot(source, 'null').dataset, {});
  assert.deepEqual(runBoot(source, null, true).dataset, {});
});

test('boot.js: laddas som vanligt skript i index.html, före modulerna', async () => {
  const html = await readAppText('index.html');
  const boot = html.indexOf('<script src="src/boot.js"></script>');
  const main = html.indexOf('<script type="module" src="src/main.js"></script>');
  assert.ok(boot > 0 && main > boot, 'boot.js ska komma före main.js');
});
