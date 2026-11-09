// @ts-check
// Ledtrådstrappan, parallella uppgifter och återkoppling.
import { test, assert } from '../../../tests/harness.js';
import { loadRealLesson } from '../../../tests/helpers.js';
import { initialState, currentView, reduce, isQuestion, HINT_LEVELS } from './lessonFlow.js';
import { feedbackFor } from './feedbackText.js';
import { answerToInput } from '../../lib/answers.js';

const LESSON_ID = 'procent-vardag-1';

/** Spelar fram till första övningsuppgiften.
 * @param {any} lesson */
function toFirstPractice(lesson) {
  let s = initialState();
  while (currentView(lesson, s).kind !== 'practice') {
    const v = currentView(lesson, s);
    if (isQuestion(v)) s = reduce(lesson, s, { type: 'answer', input: answerToInput(v.question.answer) });
    s = reduce(lesson, s, { type: 'next' });
  }
  return s;
}

test('ledtrådstrappa: fyra nivåer i ordning, och nivå 4 räknas som löst med hjälp', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  let s = toFirstPractice(lesson);
  assert.equal(s.hintLevel, 0);
  for (let level = 1; level <= 3; level++) {
    s = reduce(lesson, s, { type: 'hint' });
    assert.equal(s.hintLevel, level);
    assert.equal(s.result, null, 'nivå 1-3 löser inte uppgiften');
  }
  s = reduce(lesson, s, { type: 'hint' });
  assert.equal(s.hintLevel, 4);
  assert.equal(s.result, 'revealed');
  assert.equal(reduce(lesson, s, { type: 'hint' }), s, 'det finns ingen nivå 5');
  assert.equal(HINT_LEVELS.length, 4);
});

test('ledtrådstrappa: hjälp går bara att få på övningsuppgifter som inte är lösta', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  const start = initialState();
  assert.equal(reduce(lesson, start, { type: 'hint' }), start, 'inte på ett löst exempel');

  let s = toFirstPractice(lesson);
  s = reduce(lesson, s, { type: 'answer', input: '300' });
  assert.equal(s.result, 'correct');
  assert.equal(reduce(lesson, s, { type: 'hint' }), s, 'inte efter rätt svar');
});

test('ledtrådstrappa: svar efter hjälp på nivå 1-3 ger ingen parallell uppgift', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  let s = toFirstPractice(lesson);
  const index = s.stepIndex;
  s = reduce(lesson, s, { type: 'hint' });
  s = reduce(lesson, s, { type: 'hint' });
  s = reduce(lesson, s, { type: 'answer', input: '300' });
  s = reduce(lesson, s, { type: 'next' });
  assert.equal(s.stepIndex, index + 1);
  assert.equal(s.hintLevel, 0);
  assert.equal(s.parallel, false);
});

test('ledtrådstrappa: efter hela lösningen kommer en parallell uppgift, sedan nästa steg', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  let s = toFirstPractice(lesson);
  const index = s.stepIndex;
  for (let i = 0; i < 4; i++) s = reduce(lesson, s, { type: 'hint' });
  s = reduce(lesson, s, { type: 'next' });
  assert.equal(s.stepIndex, index, 'samma steg, men nu den parallella uppgiften');
  const v = currentView(lesson, s);
  assert.equal(v.kind, 'parallel');
  assert.equal(v.question.answer.value, 200);
  assert.equal(reduce(lesson, s, { type: 'hint' }), s, 'ingen ledtrådstrappa på den parallella uppgiften');
  assert.equal(reduce(lesson, s, { type: 'next' }), s, 'måste lösas först');

  s = reduce(lesson, s, { type: 'answer', input: '200' });
  assert.equal(s.result, 'correct');
  s = reduce(lesson, s, { type: 'next' });
  assert.equal(s.stepIndex, index + 1);
  assert.equal(s.parallel, false);
  assert.equal(currentView(lesson, s).kind, 'practice');
});

test('ledtrådstrappa: uppgifter i exempellektionen har alla fyra nivåer och en parallell uppgift', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  const practices = lesson.steps.filter((/** @type {any} */ s) => s.type === 'practice');
  assert.equal(practices.length, 6);
  for (const p of practices) {
    assert.equal(p.hints.reread, true, p.id);
    assert.ok(p.hints.representation && p.hints.firstStep && p.hints.fullSolution.steps.length >= 2, `${p.id}: nivå 2-4`);
    assert.ok(p.parallel, `${p.id}: parallell uppgift saknas`);
  }
});

test('återkoppling: erbjuder nästa nivå i trappan med vänliga ord', () => {
  const answer = { kind: 'number', value: 1 };
  const at = (/** @type {number} */ attempts, /** @type {number} */ hintLevel) =>
    feedbackFor('incorrect', { attempts, answer, ladder: true, hintLevel }).text;
  assert.equal(at(1, 0), 'Inte riktigt. Prova igen, eller vill du höra uppgiften igen?');
  assert.equal(at(2, 1), 'Inte riktigt än – vill du se en bild?');
  assert.equal(at(2, 2), 'Inte riktigt än – vill du se första steget?');
  assert.equal(at(2, 3), 'Inte riktigt än – vill du se hela lösningen?');
  assert.equal(feedbackFor('revealed', { attempts: 1, answer, ladder: true }).text, 'Här är hela lösningen. Läs den och gå vidare när du är redo.');
  // utan trappa är texterna som förut
  assert.equal(feedbackFor('incorrect', { attempts: 1, answer }).text, 'Inte riktigt. Prova igen.');
});

test('återkoppling: ingen text i trappan innehåller "fel" eller kryss', () => {
  const answer = { kind: 'number', value: 1 };
  for (const result of /** @type {const} */ (['correct', 'incorrect', 'invalid', 'unsimplified', 'revealed'])) {
    for (let hintLevel = 0; hintLevel <= 4; hintLevel++) {
      for (const attempts of [0, 1, 2, 3]) {
        const { text } = feedbackFor(result, { attempts, answer, ladder: true, hintLevel });
        assert.ok(!/\bfel\b/i.test(text) && !/[✗✘❌]/.test(text), text);
      }
    }
  }
  for (const h of HINT_LEVELS) assert.ok(!/\bfel\b/i.test(`${h.label} ${h.offer} ${h.announce} ${h.title}`));
});

// ---------- I webbläsaren ----------

/** @param {HTMLElement} root @param {string} text */
const button = (root, text) =>
  /** @type {HTMLButtonElement | undefined} */ ([...root.querySelectorAll('button')].find((b) => (b.textContent || '').replace(/\s/g, ' ') === text));

/** @param {HTMLElement} root @param {string} value */
function answer(root, value) {
  const input = /** @type {HTMLInputElement} */ (root.querySelector('input.answer-input'));
  input.value = value;
  /** @type {HTMLFormElement} */ (input.form).requestSubmit();
}

test('ledtrådstrappa i spelaren: en nivå i taget med fokus, bild, lösning och parallell uppgift', async () => {
  const { createLessonPlayer } = await import('./lessonPlayer.js');
  const lesson = await loadRealLesson(LESSON_ID);
  const host = document.createElement('div');
  document.body.append(host);
  const player = createLessonPlayer(lesson);
  try {
    host.append(player.el);
    // gå fram till första övningsuppgiften genom att visa svar och fortsätta
    for (let i = 0; i < 40 && !host.querySelector('.hints'); i++) {
      if (host.querySelector('input.answer-input')) {
        answer(host, 'abc');
        answer(host, '-99999');
        button(host, 'Visa svaret')?.click();
      }
      button(host, 'Fortsätt')?.click();
    }
    assert.ok(host.querySelector('.hints'), 'övningsuppgiften har en hjälpsektion');
    assert.equal(host.querySelectorAll('.hint-item').length, 0);
    assert.equal(button(host, 'Visa svaret'), undefined, 'ingen "Visa svaret" på övningsuppgifter');
    assert.equal(button(host, 'Visa en bild'), undefined, 'bara nästa nivå erbjuds');

    answer(host, '7');
    const live = () => host.querySelector('[role="status"]')?.textContent;
    assert.equal(live(), 'Inte riktigt. Prova igen, eller vill du höra uppgiften igen?');

    button(host, 'Läs upp uppgiften igen')?.click();
    assert.equal(host.querySelectorAll('.hint-item').length, 1);
    assert.equal(document.activeElement?.getAttribute('data-level'), '1', 'fokus flyttar till nya hjälpen');
    assert.ok(host.querySelector('.hint-item .prompt'), 'uppgiften visas igen');

    button(host, 'Visa en bild')?.click();
    assert.ok(host.querySelector('.hint-item .pb'), 'bilden är en procentstapel');
    const picture = host.querySelector('.hint-item .pb')?.textContent || '';
    assert.ok(!picture.includes('300'), 'bilden får inte avslöja svaret (300 kr)');
    assert.ok(picture.includes('600'), 'helheten visas');
    assert.equal(live(), 'En bild visas.');

    button(host, 'Visa första steget')?.click();
    button(host, 'Visa hela lösningen')?.click();
    assert.equal(host.querySelectorAll('.hint-item').length, 4);
    assert.ok(host.querySelector('.hint-item ol.solution'), 'lösningen visas som löst exempel');
    assert.equal(button(host, 'Visa hela lösningen'), undefined, 'inga fler nivåer');
    assert.ok(button(host, 'Fortsätt'));
    assert.ok(!/\bfel\b/i.test(host.textContent || ''));

    button(host, 'Fortsätt')?.click();
    assert.ok(host.querySelector('.lead')?.textContent?.includes('liknande uppgift'));
    assert.equal(host.querySelector('.hints'), null, 'ingen trappa på den parallella uppgiften');
    answer(host, '200');
    assert.equal(live(), 'Rätt. Bra jobbat.');
  } finally {
    player.dispose();
    host.remove();
  }
}, { browserOnly: true });
