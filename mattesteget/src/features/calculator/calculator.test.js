// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { initialCalc, press, displayText, parseDec, formatDec, spokenKey, spokenResult, toSwedish } from './calcLogic.js';

/** Trycker tangenter i följd. b = radera, n = byt tecken. @param {string} keys */
function run(keys) {
  const map = /** @type {Record<string, string>} */ ({ b: 'back', n: 'neg' });
  let s = initialCalc();
  for (const ch of keys) s = press(s, map[ch] ?? ch);
  return s;
}
/** @param {string} keys */
const shown = (keys) => displayText(run(keys)).replace(/ /g, '');

test('miniräknare: decimaltal räknas exakt', () => {
  assert.equal(shown('0,1+0,2='), '0,3');
  assert.equal(shown('0,1*3='), '0,3');
  assert.equal(shown('0,7+0,1='), '0,8');
  assert.equal(shown('1,1*1,1='), '1,21');
});

test('miniräknare: procent gör om talet till hundradelar, så 25 % av 800 skrivs 800 × 25 % =', () => {
  assert.equal(shown('800*25%='), '200');
  assert.equal(shown('50%'), '0,5');
  assert.equal(shown('7%'), '0,07');
});

test('miniräknare: räknar från vänster till höger som en fickräknare', () => {
  assert.equal(shown('2+3*4='), '20');
  assert.equal(shown('10-4-3='), '3');
});

test('miniräknare: division avrundas till tio decimaler och noll ger ett vänligt meddelande', () => {
  assert.equal(shown('1/3='), '0,3333333333');
  assert.equal(shown('2/3='), '0,6666666667');
  assert.equal(shown('1/8='), '0,125');
  const s = run('5/0=');
  assert.equal(s.error, 'Det går inte att dela med noll.');
  assert.equal(displayText(s), '0');
  assert.ok(!/\bfel\b/i.test(s.error || ''), 'felmeddelandet använder inte ordet "fel"');
  assert.equal(shown('5/0=7'), '7', 'nästa tryck börjar om');
});

test('miniräknare: kedjade räkningar visar mellanresultat', () => {
  const s = run('5+5+');
  assert.equal(displayText(s), '10');
  assert.equal(s.expr, '10 +');
  assert.equal(shown('5+*3='), '15', 'räknesättet kan bytas innan andra talet skrivs');
  assert.equal(run('3+4=').expr, '3 + 4 =');
});

test('miniräknare: likhetstecknet gör inget utan räknesätt, och inte två gånger', () => {
  assert.equal(shown('7='), '7');
  assert.equal(shown('3+4=='), '7');
  assert.equal(shown('3+='), '3', 'saknar andra talet');
});

test('miniräknare: decimalkomma, nollor och långa tal', () => {
  assert.equal(shown('1,,5'), '1,5');
  assert.equal(shown(','), '0,');
  assert.equal(shown('007'), '7');
  assert.equal(shown('1234567'), '1234567');
  assert.equal(displayText(run('1234567')), '1 234 567');
  assert.equal(shown('1234567890123456789'), '123456789012345', 'högst 15 siffror');
});

test('miniräknare: radera och byt tecken', () => {
  assert.equal(shown('123b'), '12');
  assert.equal(shown('5b'), '0');
  assert.equal(shown('3+4=b'), '7', 'ett färdigt resultat raderas inte siffra för siffra');
  assert.equal(shown('5n'), '−5');
  assert.equal(shown('5nn'), '5');
  assert.equal(shown('0n'), '0');
  assert.equal(shown('5nb'), '0');
  assert.equal(shown('3-5='), '−2');
  assert.equal(shown('5n+2='), '−3');
});

test('miniräknare: C rensar allt', () => {
  const s = run('3+4=C');
  assert.deepEqual(s, initialCalc());
});

test('miniräknare: mycket stora tal blir exakta', () => {
  assert.equal(shown('999999999999*999999999999='), '999999999998000000000001');
});

test('miniräknare: tal tolkas och skrivs exakt', () => {
  assert.equal(formatDec(parseDec('-12.50')), '-12.5');
  assert.equal(formatDec(parseDec('0.0')), '0');
  assert.equal(formatDec(parseDec('.5')), '0.5');
  assert.throws(() => parseDec('abc'));
  assert.equal(toSwedish('-1234.5'), '−1 234,5');
});

test('miniräknare: tangenter och resultat kan läsas upp med ord', () => {
  assert.equal(spokenKey('+'), 'plus');
  assert.equal(spokenKey('*'), 'gånger');
  assert.equal(spokenKey('/'), 'delat med');
  assert.equal(spokenKey('7'), '7');
  assert.equal(spokenResult(run('1,5+1=')), 'Skärmen visar 2,5');
  assert.equal(spokenResult(run('3-5=')), 'Skärmen visar minus 2');
  assert.equal(spokenResult(run('1/0=')), 'Det går inte att dela med noll.');
});

// ---------- Panelen (webbläsare) ----------

/** @param {{ calcSpeak?: boolean }} [opts] */
async function setup({ calcSpeak = false } = {}) {
  const { createCalculator } = await import('./calculatorPanel.js');
  /** @type {string[]} */
  const spoken = [];
  const speech = /** @type {any} */ ({
    getState: () => ({ support: 'ready' }),
    speak: async (/** @type {string} */ _id, /** @type {{ spoken: string }} */ plan) => { spoken.push(plan.spoken); return true; },
  });
  const settings = /** @type {any} */ ({ get: () => ({ calcSpeak }), update: () => {} });
  const calc = createCalculator({ speech, settings });
  const host = document.createElement('div');
  host.append(calc.toggle, calc.panel);
  document.body.append(host);
  return { calc, spoken, cleanup: () => { calc.close(); host.remove(); document.documentElement.classList.remove('calc-open'); } };
}

/** @param {HTMLElement} panel @param {string} key */
const keyButton = (panel, key) => /** @type {HTMLButtonElement} */ (panel.querySelector(`[data-key="${key}"]`));

test('miniräknarpanel: öppnas och stängs med knapp och Esc, med fokus på rätt ställe', async () => {
  const { calc, cleanup } = await setup();
  try {
    assert.equal(calc.panel.hidden, true);
    assert.equal(calc.toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(calc.toggle.getAttribute('aria-controls'), calc.panel.id);
    calc.toggle.click();
    assert.equal(calc.panel.hidden, false);
    assert.equal(calc.toggle.getAttribute('aria-expanded'), 'true');
    assert.equal(document.activeElement?.tagName, 'H2', 'fokus på panelens rubrik');
    assert.ok(document.documentElement.classList.contains('calc-open'));

    calc.panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
    assert.equal(calc.panel.hidden, true);
    assert.equal(document.activeElement, calc.toggle, 'fokus tillbaka på knappen som öppnade');
    assert.ok(!document.documentElement.classList.contains('calc-open'));
  } finally { cleanup(); }
}, { browserOnly: true });

test('miniräknarpanel: knappar och tangentbord räknar, och resultatet meddelas', async () => {
  const { calc, cleanup } = await setup();
  try {
    calc.open();
    for (const k of ['1', '2', '+', '3', '=']) keyButton(calc.panel, k).click();
    assert.equal(calc.panel.querySelector('.calc-display')?.textContent, '15');
    assert.equal(calc.panel.querySelector('[role="status"]')?.textContent, 'Skärmen visar 15');

    const press = (/** @type {string} */ key, /** @type {EventTarget} */ target = calc.panel) =>
      target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    press('C', calc.panel);
    press('7'); press('*'); press('2'); press('Enter');
    assert.equal(calc.panel.querySelector('.calc-display')?.textContent, '14', 'tangentbordet fungerar i panelen');

    // Enter och mellanslag på en knapp ska aktivera knappen, inte räkna ut
    const before = calc.panel.querySelector('.calc-display')?.textContent;
    keyButton(calc.panel, '5').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    assert.equal(calc.panel.querySelector('.calc-display')?.textContent, before);

    for (const k of ['C', '5', '/', '0', '=']) keyButton(calc.panel, k).click();
    assert.ok(calc.panel.querySelector('.calc-error')?.textContent?.includes('dela med noll'));
    assert.equal(calc.panel.querySelector('.calc-error')?.hasAttribute('hidden'), false);
  } finally { cleanup(); }
}, { browserOnly: true });

test('miniräknarpanel: stora knappar, och namnet innehåller alltid den synliga texten', async () => {
  const { calc, cleanup } = await setup();
  try {
    calc.open();
    const buttons = [...calc.panel.querySelectorAll('.calc-key')];
    assert.equal(buttons.length, 20);
    for (const b of buttons) {
      assert.atLeast(b.getBoundingClientRect().height, 44, `knappen "${b.textContent}" är för låg`);
      assert.atLeast(b.getBoundingClientRect().width, 44, `knappen "${b.textContent}" är för smal`);
      assert.ok((b.getAttribute('aria-label') || '').includes(b.textContent || '#'), `namnet "${b.getAttribute('aria-label')}" saknar den synliga texten "${b.textContent}"`);
    }
  } finally { cleanup(); }
}, { browserOnly: true });

test('miniräknarpanel: läser upp knapptryck och resultat bara när det är påslaget', async () => {
  const off = await setup({ calcSpeak: false });
  try {
    off.calc.open();
    keyButton(off.calc.panel, '7').click();
    assert.deepEqual(off.spoken, []);
  } finally { off.cleanup(); }

  const on = await setup({ calcSpeak: true });
  try {
    on.calc.open();
    for (const k of ['7', '+', '1', '=']) keyButton(on.calc.panel, k).click();
    assert.deepEqual(on.spoken, ['7', 'plus', '1', 'Skärmen visar 8']);
  } finally { on.cleanup(); }
}, { browserOnly: true });
