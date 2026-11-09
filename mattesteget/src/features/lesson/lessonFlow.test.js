// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { loadRealLesson } from '../../../tests/helpers.js';
import { initialState, currentView, reduce, isQuestion } from './lessonFlow.js';
import { answerToInput } from '../../lib/answers.js';
import { feedbackFor } from './feedbackText.js';

const LESSON_ID = 'procent-vardag-1';

/** Spelar igenom hela lektionen med rätt svar. Returnerar vilka skärmar som visades.
 * @param {any} lesson */
function playThrough(lesson) {
  let state = initialState();
  const kinds = [];
  for (let i = 0; i < 200; i++) {
    const view = currentView(lesson, state);
    if (view.kind === 'done') return { state, kinds };
    kinds.push(view.kind);
    if (isQuestion(view)) {
      state = reduce(lesson, state, { type: 'answer', input: answerToInput(view.question.answer) });
      assert.equal(state.result, 'correct', `${view.kind} borde godkänna facit`);
    }
    state = reduce(lesson, state, { type: 'next' });
  }
  throw new Error('Lektionen tar aldrig slut');
}

test('lektionsflöde: hela exempellektionen går att spela igenom med facit', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  const { state, kinds } = playThrough(lesson);
  assert.ok(state.finished);
  // ex1 statiskt, ex2 med en dold fråga + statiskt, gs1 två delsteg, ex3 med två dolda frågor + statiskt, gs2, 6 uppgifter
  assert.deepEqual(kinds, [
    'workedStatic',
    'workedAsk', 'workedStatic',
    'guidedPart', 'guidedPart',
    'workedAsk', 'workedAsk', 'workedStatic',
    'guidedPart', 'guidedPart',
    'practice', 'practice', 'practice', 'practice', 'practice', 'practice',
  ]);
});

test('lektionsflöde: man kommer inte vidare utan att lösa frågan', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  let s = initialState();
  s = reduce(lesson, s, { type: 'next' }); // ex1 är statiskt
  s = reduce(lesson, s, { type: 'next' }); // ex2: dold fråga
  assert.equal(currentView(lesson, s).kind, 'workedAsk');
  const same = reduce(lesson, s, { type: 'next' });
  assert.equal(same, s, 'next ska ignoreras innan frågan är löst');
});

test('lektionsflöde: fel svar, ogiltigt svar, vanligt felsvar och visa svaret', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  // hoppa fram till första övningsuppgiften
  let s = initialState();
  while (currentView(lesson, s).kind !== 'practice') {
    const v = currentView(lesson, s);
    if (isQuestion(v)) s = reduce(lesson, s, { type: 'answer', input: answerToInput(v.question.answer) });
    s = reduce(lesson, s, { type: 'next' });
  }
  const invalid = reduce(lesson, s, { type: 'answer', input: 'abc' });
  assert.equal(invalid.result, 'invalid');
  assert.equal(invalid.attempts, 0, 'ogiltig inmatning räknas inte som försök');

  const common = reduce(lesson, s, { type: 'answer', input: '1 200' });
  assert.equal(common.result, 'incorrect');
  assert.ok(common.matched, 'första uppgiftens vanliga felsvar ska kännas igen');

  const wrong = reduce(lesson, s, { type: 'answer', input: '7' });
  assert.equal(wrong.result, 'incorrect');
  assert.equal(wrong.matched, null);
  assert.equal(wrong.attempts, 1);

  const revealed = reduce(lesson, wrong, { type: 'reveal' });
  assert.equal(revealed.result, 'revealed');
  const after = reduce(lesson, revealed, { type: 'next' });
  assert.equal(after.stepIndex, s.stepIndex + 1);
  assert.equal(after.attempts, 0);
});

test('lektionsflöde: återställning börjar om', async () => {
  const lesson = await loadRealLesson(LESSON_ID);
  const { state } = playThrough(lesson);
  assert.deepEqual(reduce(lesson, state, { type: 'restart' }), initialState());
});

test('återkoppling: aldrig ordet "fel" eller kryss', () => {
  const answers = [
    { kind: 'number', value: 1 }, { kind: 'fraction', num: 1, den: 2 },
    { kind: 'choice', options: [{ text: 'a' }, { text: 'b' }], correct: [0] },
  ];
  for (const answer of answers) {
    for (const result of /** @type {const} */ (['correct', 'incorrect', 'invalid', 'unsimplified', 'revealed'])) {
      for (const attempts of [0, 1, 2, 3]) {
        const { text } = feedbackFor(result, { attempts, answer });
        assert.ok(!/\bfel\b/i.test(text) && !/[✗✘❌]/.test(text), `"${text}" innehåller förbjudet ord eller tecken`);
      }
    }
  }
});
