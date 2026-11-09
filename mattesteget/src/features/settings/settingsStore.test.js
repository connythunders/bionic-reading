// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { sanitize, loadSettings, saveSettings, createSettingsStore, DEFAULTS, STORAGE_KEY } from './settingsStore.js';

/** Minneslager som liknar localStorage. */
function memoryStorage(initial = {}) {
  /** @type {Record<string, string>} */
  const data = { ...initial };
  return {
    getItem: (/** @type {string} */ k) => (k in data ? data[k] : null),
    setItem: (/** @type {string} */ k, /** @type {string} */ v) => { data[k] = v; },
    data,
  };
}

test('inställningar: standardvärden uppfyller kraven', () => {
  assert.equal(DEFAULTS.font, 'atkinson');
  assert.equal(DEFAULTS.background, 'cream');
  assert.equal(DEFAULTS.motion, 'system');
});

test('inställningar: sanitize begränsar till tillåtna intervall', () => {
  const s = sanitize({ fontSize: 99, lineHeight: 0.5, letterSpacing: 5, font: 'comic', background: 'rosa' });
  assert.equal(s.fontSize, 28);
  assert.equal(s.lineHeight, 1.5);
  assert.equal(s.letterSpacing, 0.12);
  assert.equal(s.font, 'atkinson');
  assert.equal(s.background, 'cream');
});

test('inställningar: uppläsningshastighet begränsas till 0,7-1,3 och autoRead är sant/falskt', () => {
  assert.equal(DEFAULTS.speechRate, 1);
  assert.equal(DEFAULTS.autoRead, false);
  assert.equal(sanitize({ speechRate: 5 }).speechRate, 1.3);
  assert.equal(sanitize({ speechRate: 0.1 }).speechRate, 0.7);
  assert.equal(sanitize({ speechRate: 1.04 }).speechRate, 1);
  assert.equal(sanitize({ autoRead: 'ja' }).autoRead, false);
  assert.equal(sanitize({ autoRead: true }).autoRead, true);
});

test('inställningar: sanitize klarar skräp', () => {
  assert.deepEqual(sanitize(null), { ...DEFAULTS });
  assert.deepEqual(sanitize('text'), { ...DEFAULTS });
  assert.deepEqual(sanitize({ fontSize: 'stor' }), { ...DEFAULTS });
});

test('inställningar: trasig JSON i lagringen ger standardvärden', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '{inte json' });
  assert.deepEqual(loadSettings(storage), { ...DEFAULTS });
});

test('inställningar: lagring som kastar fel stoppar inte appen', () => {
  const broken = {
    getItem: () => { throw new Error('blockerad'); },
    setItem: () => { throw new Error('blockerad'); },
  };
  assert.deepEqual(loadSettings(broken), { ...DEFAULTS });
  saveSettings({ ...DEFAULTS }, broken); // ska inte kasta
});

test('inställningar: store sparar, meddelar och återställer', () => {
  const storage = memoryStorage();
  const store = createSettingsStore(storage);
  let calls = 0;
  const off = store.subscribe(() => { calls++; });
  store.update({ background: 'dark', fontSize: 24 });
  assert.equal(store.get().background, 'dark');
  assert.equal(JSON.parse(storage.data[STORAGE_KEY]).fontSize, 24);
  assert.equal(calls, 1);
  store.reset();
  assert.deepEqual(store.get(), { ...DEFAULTS });
  off();
  store.update({ fontSize: 22 });
  assert.equal(calls, 2); // avregistrerad lyssnare anropas inte igen
});
