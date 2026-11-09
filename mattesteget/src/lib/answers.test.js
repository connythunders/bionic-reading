// @ts-check
import { test, assert } from '../../tests/harness.js';
import { parseInput, checkAnswer, matchCommonWrong, formatAnswer, formatNumber } from './answers.js';
import { canonical, frac, equals, fromNumber } from './fractions.js';

/** @param {string} s */
const val = (s) => {
  const p = parseInput(s);
  return p ? canonical(p.value) : null;
};
/** @param {string} s */
const flat = (s) => s.replace(/\s/g, ' ');

test('fractions: förkortar, hanterar tecken och exakta decimaler', () => {
  assert.deepEqual(frac(2, 10), { n: 1, d: 5 });
  assert.deepEqual(frac(1, -2), { n: -1, d: 2 });
  assert.ok(equals(fromNumber(0.1), frac(1, 10)));
  assert.ok(equals(fromNumber(0.3), frac(3, 10)), '0,3 ska vara exakt 3/10');
  assert.throws(() => frac(1, 0));
});

test('svar: komma, punkt, mellanslag och bråk tolkas som samma tal', () => {
  for (const s of ['0,25', '0.25', ' 0,25 ', '1/4', '  1 / 4 ', '25/100']) {
    assert.equal(val(s), '1/4', `"${s}" ska tolkas som 1/4`);
  }
});

test('svar: tusentalsavgränsare, enheter, minustecken och blandat tal', () => {
  assert.equal(val('1 200'), '1200');
  assert.equal(val('1 200'), '1200');
  assert.equal(val('1.200,50'), '2401/2');
  assert.equal(val('1,000,000'), '1000000');
  assert.equal(val('25 %'), '25');
  assert.equal(val('200 kr'), '200');
  assert.equal(val('−5'), '-5');
  assert.equal(val('1 1/2'), '3/2');
});

test('svar: ogiltig inmatning ger null', () => {
  for (const s of ['', '   ', 'abc', '1/0', '1,2,3x', '--5', 'kr']) assert.equal(parseInput(s), null, `"${s}"`);
  assert.equal(parseInput(undefined), null);
});

test('svar: tal jämförs exakt och godtar bråk där det är matematiskt korrekt', () => {
  const a = { kind: 'number', value: 0.25 };
  for (const s of ['0,25', '0.25', ' 0,25 ', '1/4']) assert.equal(checkAnswer(a, s).status, 'correct', s);
  assert.equal(checkAnswer(a, '0,3').status, 'incorrect');
  assert.equal(checkAnswer(a, 'x').status, 'invalid');
  assert.equal(checkAnswer({ kind: 'number', value: 0.3 }, '3/10').status, 'correct');
  assert.equal(checkAnswer({ kind: 'number', value: 300, unit: 'kr' }, '300 kr').status, 'correct');
});

test('svar: tolerans', () => {
  const a = { kind: 'number', value: 10, tolerance: 0.5 };
  assert.equal(checkAnswer(a, '10,4').status, 'correct');
  assert.equal(checkAnswer(a, '11').status, 'incorrect');
});

test('svar: bråk godtar likvärdiga former och kan kräva förkortning', () => {
  const a = { kind: 'fraction', num: 1, den: 5 };
  for (const s of ['1/5', '2/10', '0,2', '0.2']) assert.equal(checkAnswer(a, s).status, 'correct', s);
  assert.equal(checkAnswer(a, '1/4').status, 'incorrect');
  const strict = { kind: 'fraction', num: 1, den: 5, mustBeSimplified: true };
  assert.equal(checkAnswer(strict, '2/10').status, 'unsimplified');
  assert.equal(checkAnswer(strict, '1/5').status, 'correct');
  assert.equal(checkAnswer(strict, 'hej').status, 'invalid');
});

test('svar: flerval kräver exakt rätt uppsättning', () => {
  const a = { kind: 'choice', options: [{ text: 'A' }, { text: 'B' }, { text: 'C' }], correct: [0, 2] };
  assert.equal(checkAnswer(a, [2, 0]).status, 'correct');
  assert.equal(checkAnswer(a, [0]).status, 'incorrect');
  assert.equal(checkAnswer(a, []).status, 'invalid');
});

test('svar: tallinje godtar värden inom toleransen', () => {
  const a = { kind: 'numberLine', target: 0.5, tolerance: 0.05 };
  assert.equal(checkAnswer(a, '0,52').status, 'correct');
  assert.equal(checkAnswer(a, '0,7').status, 'incorrect');
});

test('svar: vanliga svar hittas matematiskt', () => {
  const list = [{ value: '1200', message: { text: 'För mycket.' } }];
  assert.equal(matchCommonWrong(list, '1 200')?.message.text, 'För mycket.');
  assert.equal(matchCommonWrong(list, '1200,0')?.message.text, 'För mycket.');
  assert.equal(matchCommonWrong(list, '300'), null);
  assert.equal(matchCommonWrong(undefined, '1200'), null);
});

test('svar: facit skrivs med svensk talform och enhet', () => {
  assert.equal(flat(formatNumber(1000)), '1 000');
  assert.equal(formatNumber(0.25), '0,25');
  assert.equal(flat(formatAnswer({ kind: 'number', value: 200, unit: 'kr' })), '200 kr');
  assert.equal(formatAnswer({ kind: 'fraction', num: 1, den: 5 }), '1/5');
});
