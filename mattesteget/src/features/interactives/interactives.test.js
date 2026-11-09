// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { loadRealLesson } from '../../../tests/helpers.js';
import { snap } from './slider.js';
import { addOne, removeOne, totalOre, formatMoney } from './money.js';
import { speakFraction, speakMoney } from '../../lib/speakNumbers.js';
import { initialState, currentView, reduce, isQuestion } from '../lesson/lessonFlow.js';
import { answerToInput } from '../../lib/answers.js';

// ---------- Ren logik (körs även i Node) ----------

test('slider: snap avrundar till steg utan flyttalsfel och håller sig inom intervallet', () => {
  assert.equal(snap(0.34, 0, 1, 0.1), 0.3);
  assert.equal(snap(0.26, 0, 1, 0.1), 0.3);
  assert.equal(snap(-5, 0, 1, 0.1), 0);
  assert.equal(snap(7, 0, 1, 0.1), 1);
  assert.equal(snap(0.1 + 0.2, 0, 1, 0.1), 0.3);
  assert.equal(snap(37, 0, 100, 5), 35);
});

test('pengar: tio av samma sort växlas mot en av nästa sort, hela vägen upp', () => {
  let r = addOne([0, 0, 0, 0, 9], 4);
  assert.deepEqual(r.counts, [0, 0, 0, 1, 0]);
  assert.ok(r.message?.includes('växlades'));
  r = addOne([0, 9, 9, 9, 9], 4);
  assert.deepEqual(r.counts, [1, 0, 0, 0, 0]);
  assert.ok(r.ok);
  r = addOne([9, 0, 0, 0, 0], 0);
  assert.equal(r.ok, false, 'fler än nio hundralappar går inte');
  assert.deepEqual(r.counts, [9, 0, 0, 0, 0]);
});

test('pengar: ta bort, summa i ören och svensk skrivning', () => {
  assert.deepEqual(removeOne([0, 1, 0, 0, 0], 1), [0, 0, 0, 0, 0]);
  assert.deepEqual(removeOne([0, 0, 0, 0, 0], 1), [0, 0, 0, 0, 0]);
  assert.equal(totalOre([0, 1, 2, 3, 5]), 1235);
  assert.equal(formatMoney(1235).replace(/\s/g, ' '), '12,35 kr');
  assert.equal(formatMoney(5).replace(/\s/g, ' '), '0,05 kr');
});

test('talversioner: bråk och pengar på svenska', () => {
  assert.equal(speakFraction(1, 2), 'en halv');
  assert.equal(speakFraction(3, 4), 'tre fjärdedelar');
  assert.equal(speakFraction(1, 5), 'en femtedel');
  assert.equal(speakFraction(2, 3), 'två tredjedelar');
  assert.equal(speakFraction(5, 20), '5 av 20 delar');
  assert.equal(speakMoney(1235), '12 kronor och 35 öre');
  assert.equal(speakMoney(100), '1 krona');
  assert.equal(speakMoney(5), '5 öre');
});

test('lektionsflöde: lektion med tallinje går att spela igenom', async () => {
  const lesson = await loadRealLesson('tallinjen-1');
  let s = initialState();
  const kinds = [];
  for (let i = 0; i < 10; i++) {
    const v = currentView(lesson, s);
    if (v.kind === 'done') break;
    kinds.push(v.kind);
    if (isQuestion(v)) {
      s = reduce(lesson, s, { type: 'answer', input: answerToInput(v.question.answer) });
      assert.equal(s.result, 'correct');
    }
    s = reduce(lesson, s, { type: 'next' });
  }
  assert.deepEqual(kinds, ['interactive', 'practice']);
  assert.ok(s.finished);
});

// ---------- Komponenter i webbläsaren ----------

/** @param {HTMLElement} el @param {(el: HTMLElement) => void} body */
function mounted(el, body) {
  document.body.append(el);
  try { body(el); } finally { el.remove(); }
}

/** @param {HTMLElement} root @param {string} text */
const button = (root, text) =>
  /** @type {HTMLButtonElement} */ ([...root.querySelectorAll('button')].find((b) => (b.textContent || '').replace(/\s/g, ' ') === text));

test('tallinje: tangentbord flyttar markören och uppdaterar slider-värdet', async () => {
  const { createNumberLine } = await import('./numberLine.js');
  const nl = createNumberLine({ min: 0, max: 1, step: 0.1, interactive: true, label: 'Test' });
  mounted(nl.el, () => {
    const thumb = /** @type {HTMLElement} */ (nl.thumb);
    assert.equal(thumb.getAttribute('role'), 'slider');
    assert.equal(nl.getValue(), null, 'markören är inte placerad från början');
    const key = (/** @type {string} */ k) => thumb.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
    key('ArrowRight'); key('ArrowRight'); key('ArrowRight');
    assert.equal(nl.getValue(), 0.3);
    assert.equal(thumb.getAttribute('aria-valuenow'), '0.3');
    assert.equal(thumb.getAttribute('aria-valuetext'), '0,3');
    key('PageUp');
    assert.equal(nl.getValue(), 1, 'PageUp hoppar tio steg och stannar vid max');
    key('Home');
    assert.equal(nl.getValue(), 0);
    key('End');
    assert.equal(nl.getValue(), 1);
  });
}, { browserOnly: true });

test('tallinje: knappar och klick på linjen är alternativ till dragning', async () => {
  const { createNumberLine } = await import('./numberLine.js');
  const nl = createNumberLine({ min: 0, max: 1, step: 0.1, interactive: true });
  mounted(nl.el, (root) => {
    button(root, 'Åt höger').click();
    button(root, 'Åt höger').click();
    assert.equal(nl.getValue(), 0.2);
    button(root, 'Åt vänster').click();
    assert.equal(nl.getValue(), 0.1);
    for (const b of root.querySelectorAll('button')) assert.atLeast(b.getBoundingClientRect().height, 44, 'knappen är för låg');

    const track = /** @type {HTMLElement} */ (root.querySelector('.nl-track'));
    const rect = track.getBoundingClientRect();
    track.dispatchEvent(new PointerEvent('pointerdown', { clientX: rect.left + rect.width * 0.7, pointerId: 1, pointerType: 'mouse', button: 0, bubbles: true, cancelable: true }));
    track.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true }));
    assert.equal(nl.getValue(), 0.7);
    assert.ok(!nl.thumb?.classList.contains('nl-unplaced'));
  });
}, { browserOnly: true });

test('tallinje: visningsläge är en bild med beskrivning och ingen markör att flytta', async () => {
  const { createNumberLine } = await import('./numberLine.js');
  const nl = createNumberLine({ min: 0, max: 1, step: 0.25, value: 0.5, label: 'Tallinje' });
  assert.equal(nl.el.getAttribute('role'), 'img');
  assert.ok(nl.el.getAttribute('aria-label')?.includes('markör på 0,5'));
  assert.equal(nl.thumb, null);
}, { browserOnly: true });

test('procentstapel: knappar och tangentbord ändrar procent och belopp', async () => {
  const { createPercentBar } = await import('./percentBar.js');
  const pb = createPercentBar({ whole: 800, percent: 25, unit: 'kr', interactive: true });
  mounted(pb.el, (root) => {
    assert.ok(root.querySelector('.pb-summary')?.textContent?.replace(/\s/g, ' ').includes('25 % av 800 kr är 200 kr'));
    button(root, 'Öka med 5 %').click();
    assert.equal(pb.getPercent(), 30);
    assert.ok(root.querySelector('.pb-summary')?.textContent?.replace(/\s/g, ' ').includes('240 kr'));
    const thumb = /** @type {HTMLElement} */ (pb.thumb);
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
    assert.equal(pb.getPercent(), 100);
    assert.equal(thumb.getAttribute('aria-valuetext'), '100 procent, 800 kronor');
    assert.equal(thumb.getAttribute('role'), 'slider');
  });
}, { browserOnly: true });

test('procentstapel: dolda värden visas som frågetecken och beskrivs med ord', async () => {
  const { createPercentBar } = await import('./percentBar.js');
  const pb = createPercentBar({ whole: 200, part: 50, unit: 'kr', hidePercent: true });
  assert.equal(pb.getPercent(), 25);
  assert.ok(pb.el.querySelector('.pb-summary')?.textContent?.startsWith('?'));
  assert.ok(pb.el.getAttribute('aria-label')?.includes('okänt antal procent'));
}, { browserOnly: true });

test('bråkstavar: klick fyller upp till delen, knappar ändrar antal delar', async () => {
  const { createFractionBars } = await import('./fractionBars.js');
  const fb = createFractionBars({ rows: [{ n: 4, k: 1 }], interactive: true });
  mounted(fb.el, (root) => {
    const segs = () => [...root.querySelectorAll('.fb-seg')];
    assert.equal(segs().length, 4);
    /** @type {HTMLElement} */ (segs()[2]).click();
    assert.deepEqual(fb.getRows(), [{ n: 4, k: 3 }]);
    assert.equal(segs()[2].getAttribute('aria-pressed'), 'true');
    assert.equal(segs()[3].getAttribute('aria-pressed'), 'false');
    assert.equal(document.activeElement, segs()[2], 'fokus ska stanna på delen');
    button(root, 'Fler delar').click();
    assert.deepEqual(fb.getRows(), [{ n: 5, k: 3 }]);
    for (let i = 0; i < 10; i++) button(root, 'Färre delar').click();
    assert.deepEqual(fb.getRows(), [{ n: 1, k: 1 }]);
    assert.equal(root.querySelector('[role="status"]')?.textContent, '1 av 1 delar är ifyllda: en hel');
    for (const seg of segs()) assert.atLeast(seg.getBoundingClientRect().height, 44);
  });
}, { browserOnly: true });

test('bråkstavar: visningsläge beskriver bråket med ord', async () => {
  const { createFractionBars } = await import('./fractionBars.js');
  const fb = createFractionBars({ rows: [{ n: 4, k: 3 }] });
  assert.ok(fb.el.querySelector('.fb-bar')?.getAttribute('aria-label')?.startsWith('Tre fjärdedelar'));
  assert.equal(fb.el.querySelectorAll('button').length, 0, 'inga knappar i visningsläge');
}, { browserOnly: true });

test('pengar: knappar lägger till, växlar och beskriver summan', async () => {
  const { createMoney } = await import('./money.js');
  const money = createMoney({ values: [0, 0, 0, 0, 9] });
  mounted(money.el, (root) => {
    assert.ok(root.querySelector('.money-total')?.textContent?.replace(/\s/g, ' ').includes('0,09 kr'));
    /** @type {HTMLButtonElement} */ (root.querySelector('button[aria-label="Lägg till en ettöring"]')).click();
    assert.deepEqual(money.getCounts(), [0, 0, 0, 1, 0]);
    const live = root.querySelector('[role="status"]')?.textContent || '';
    assert.ok(live.includes('växlades mot 1 tioöring'), live);
    assert.ok(live.includes('Summa: 10 öre'), live);
    /** @type {HTMLButtonElement} */ (root.querySelector('button[aria-label="Ta bort en tioöring"]')).click();
    assert.equal(root.querySelector('.money-total')?.textContent?.replace(/\s/g, ' '), 'Summa: 0,00 kr');
    const removeBtn = /** @type {HTMLButtonElement} */ (root.querySelector('button[aria-label="Ta bort en hundralapp"]'));
    assert.equal(removeBtn.getAttribute('aria-disabled'), 'true');
    removeBtn.click();
    assert.ok((root.querySelector('[role="status"]')?.textContent || '').includes('ingen hundralapp'));
  });
}, { browserOnly: true });

test('lektion med tallinje: placera markören med knappar och få återkoppling', async () => {
  const { createLessonPlayer } = await import('../lesson/lessonPlayer.js');
  const lesson = await loadRealLesson('tallinjen-1');
  const player = createLessonPlayer(lesson);
  mounted(player.el, (root) => {
    assert.ok(root.querySelector('.nl-thumb'), 'utforska-steget visar en tallinje');
    button(root, 'Fortsätt').click();
    assert.ok(root.querySelector('.nl-thumb'), 'uppgiften visar en tallinje');
    const live = () => root.querySelector('[role="status"]')?.textContent;
    button(root, 'Kontrollera').click();
    assert.equal(live(), 'Placera markören på tallinjen och tryck på Kontrollera.');
    for (let i = 0; i < 3; i++) button(root, 'Åt höger').click();
    button(root, 'Kontrollera').click();
    assert.equal(live(), 'Inte riktigt. Prova igen.');
    for (let i = 0; i < 4; i++) button(root, 'Åt höger').click();
    button(root, 'Kontrollera').click();
    assert.equal(live(), 'Rätt. Bra jobbat.');
    assert.equal(root.querySelectorAll('.nl-thumb').length, 0, 'markören låses efter rätt svar');
    assert.ok(root.querySelector('.nl-marker'));
  });
  player.dispose();
}, { browserOnly: true });
