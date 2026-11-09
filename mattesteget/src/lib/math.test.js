// @ts-check
import { test, assert } from '../../tests/harness.js';
import { parseExpr } from './math.js';
import { parseRich, richToSpeech, richToPlain } from './richText.js';

test('math: bråk utan mellanslag, division med mellanslag', () => {
  assert.deepEqual(parseExpr('25% = 1/4'), [
    { type: 'num', text: '25' }, { type: 'op', text: '%' }, { type: 'op', text: '=' },
    { type: 'frac', num: '1', den: '4' },
  ]);
  assert.deepEqual(parseExpr('800 / 4 = 200'), [
    { type: 'num', text: '800' }, { type: 'op', text: '÷' }, { type: 'num', text: '4' },
    { type: 'op', text: '=' }, { type: 'num', text: '200' },
  ]);
});

test('math: gånger, minus och decimalkomma visas på svenska', () => {
  const t = parseExpr('50 * 10 - 1.5');
  assert.deepEqual(t.map((x) => x.text), ['50', '×', '10', '−', '1,5']);
});

test('richText: delar upp fetstil och formler', () => {
  const segs = parseRich({ text: 'Du har **tre** {{f1}} kvar.' });
  assert.deepEqual(segs.map((s) => s.type), ['text', 'bold', 'text', 'formula', 'text']);
});

test('richText: talversion används, annars byggs den av formlernas talversion', () => {
  assert.equal(richToSpeech({ text: '25 %', speak: '25 procent' }), '25 procent');
  const rt = { text: 'Det är {{f1}} av priset.', formulas: { f1: { speak: 'en fjärdedel' } } };
  assert.equal(richToSpeech(rt), 'Det är en fjärdedel av priset.');
  assert.equal(richToPlain({ text: 'Det är **bra**.' }), 'Det är bra.');
});
