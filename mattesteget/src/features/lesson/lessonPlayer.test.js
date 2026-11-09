// @ts-check
// Tester av lektionsspelaren i webbläsaren: riktiga knappar, fokus och live-region.
import { test, assert } from '../../../tests/harness.js';
import { loadRealLesson } from '../../../tests/helpers.js';
import { createLessonPlayer } from './lessonPlayer.js';
import { renderFormula } from './richView.js';

/** @param {ParentNode} root @param {string} text */
const button = (root, text) =>
  /** @type {HTMLButtonElement | undefined} */ ([...root.querySelectorAll('button')].find((b) => b.textContent === text));

/** Svarar i formuläret på skärmen. @param {HTMLElement} root @param {string} value */
function answer(root, value) {
  const input = /** @type {HTMLInputElement} */ (root.querySelector('input.answer-input'));
  input.value = value;
  /** @type {HTMLFormElement} */ (input.form).requestSubmit();
}

const live = (/** @type {HTMLElement} */ root) => root.querySelector('[role="status"]')?.textContent ?? '';

/** Monterar spelaren i dokumentet (fokus kräver det) och städar efteråt.
 * @param {(root: HTMLElement) => void} body */
async function withPlayer(body) {
  const lesson = await loadRealLesson('procent-vardag-1');
  const host = document.createElement('div');
  document.body.append(host);
  try {
    host.append(createLessonPlayer(lesson).el);
    body(host);
  } finally {
    host.remove();
  }
}

test('spelare: formel ritas som MathML med talversion som etikett', () => {
  const el = renderFormula({ expr: '1/4', speak: 'en fjärdedel' });
  assert.equal(el.getAttribute('role'), 'img');
  assert.equal(el.getAttribute('aria-label'), 'en fjärdedel');
  assert.ok(el.querySelector('mfrac'), 'bråket ska ritas som mfrac');
  assert.equal(el.querySelector('math')?.getAttribute('aria-hidden'), 'true');
}, { browserOnly: true });

test('spelare: första skärmen är ett löst exempel med en rubrik och ett steg', async () => {
  await withPlayer((root) => {
    assert.equal(root.querySelector('h2')?.textContent, 'Visa');
    assert.ok(root.querySelector('ol.solution li'), 'lösningen ska synas');
    assert.ok(root.querySelector('.formula'), 'formler ska synas');
    assert.ok(button(root, 'Fortsätt'));
    assert.ok(root.textContent?.includes('Steg 1 av 11'));
    assert.ok(!/\bfel\b/i.test(root.textContent || ''));
  });
}, { browserOnly: true });

test('spelare: svar ger återkoppling i live-regionen och flyttar fokus', async () => {
  await withPlayer((root) => {
    button(root, 'Fortsätt')?.click(); // ex1 -> ex2 (dold fråga)
    assert.ok(root.querySelector('input.answer-input'), 'frågan ska ha ett svarsfält');
    assert.equal(button(root, 'Visa svaret'), undefined, 'ingen "Visa svaret" före första försöket');

    answer(root, 'abc');
    assert.ok(live(root).includes('Skriv ett tal'), `ogiltigt svar: ${live(root)}`);

    answer(root, '5');
    assert.equal(live(root), 'Inte riktigt. Prova igen.');
    assert.equal(document.activeElement?.className, 'answer-input', 'fokus ska tillbaka till fältet');
    assert.ok(button(root, 'Visa svaret'), '"Visa svaret" ska finnas efter ett försök');

    answer(root, '300');
    assert.equal(live(root), 'Rätt. Bra jobbat.');
    assert.equal(document.activeElement?.textContent, 'Fortsätt', 'fokus ska flytta till Fortsätt');
    assert.ok(!root.textContent?.match(/\bfel\b/i));
  });
}, { browserOnly: true });

test('spelare: tips kan visas och döljas, och svar kan visas', async () => {
  await withPlayer((root) => {
    button(root, 'Fortsätt')?.click(); // ex1 -> ex2
    answer(root, '300');
    button(root, 'Fortsätt')?.click(); // -> ex2 statiskt
    button(root, 'Fortsätt')?.click(); // -> gs1 del 1
    const hintBtn = /** @type {HTMLButtonElement} */ (button(root, 'Visa ett tips'));
    assert.equal(hintBtn.getAttribute('aria-expanded'), 'false');
    hintBtn.click();
    assert.ok(root.querySelector('.hint'), 'tipset ska synas');
    assert.equal(button(root, 'Dölj tipset')?.getAttribute('aria-expanded'), 'true');

    answer(root, '1/3');
    button(root, 'Visa svaret')?.click();
    assert.ok(root.querySelector('.feedback')?.textContent?.includes('Svaret är 1/5'));
    assert.ok(button(root, 'Fortsätt'));
  });
}, { browserOnly: true });

test('spelare: hela lektionen går att klara och slutar med en avslutsskärm', async () => {
  await withPlayer((root) => {
    for (let i = 0; i < 120; i++) {
      if (root.querySelector('h2')?.textContent === 'Lektionen är klar') break;
      const input = root.querySelector('input.answer-input');
      if (input) {
        // Ge upp: visa svaret, eller (på övningsuppgifter) gå hela ledtrådstrappan.
        answer(root, 'abc');
        answer(root, '-99999');
        const showAnswer = button(root, 'Visa svaret');
        if (showAnswer) showAnswer.click();
        else {
          for (const label of ['Läs upp uppgiften igen', 'Visa en bild', 'Visa första steget', 'Visa hela lösningen']) button(root, label)?.click();
        }
      }
      button(root, 'Fortsätt')?.click();
    }
    assert.equal(root.querySelector('h2')?.textContent, 'Lektionen är klar');
    assert.ok(root.querySelector('a[href="#/moduler"]'));
    assert.ok(button(root, 'Gör om lektionen'));
    assert.equal(root.querySelectorAll('[style]').length, 0, 'inga inline-stilar');
    assert.equal(root.querySelectorAll('em,i,u').length, 0);
  });
}, { browserOnly: true });
