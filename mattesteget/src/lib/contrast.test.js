// @ts-check
import { test, assert } from '../../tests/harness.js';
import { contrastRatio, parseHex } from './contrast.js';

test('contrast: svart mot vitt är 21:1', () => {
  assert.equal(Math.round(contrastRatio('#000000', '#ffffff')), 21);
});

test('contrast: samma färg är 1:1 och ordningen spelar ingen roll', () => {
  assert.equal(contrastRatio('#777777', '#777777'), 1);
  assert.equal(contrastRatio('#123456', '#fafafa'), contrastRatio('#fafafa', '#123456'));
});

test('contrast: parseHex tar kort form och avvisar ogiltigt', () => {
  assert.deepEqual(parseHex('#fff'), [255, 255, 255]);
  assert.throws(() => parseHex('rött'));
});
