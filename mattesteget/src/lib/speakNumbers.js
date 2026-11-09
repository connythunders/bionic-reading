// @ts-check
// Svenska talversioner av bråk och pengar. Används för tillgängliga namn och uppläsning.

const NUM = ['noll', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'];
const DEL = {
  3: 'tredjedel', 4: 'fjärdedel', 5: 'femtedel', 6: 'sjättedel', 7: 'sjundedel',
  8: 'åttondel', 9: 'niondel', 10: 'tiondel', 11: 'elftedel', 12: 'tolftedel',
};

/**
 * "tre fjärdedelar" för 3/4. Faller tillbaka på "k av n delar" för stora nämnare.
 * @param {number} k täljare @param {number} n nämnare
 */
export function speakFraction(k, n) {
  if (!Number.isInteger(k) || !Number.isInteger(n) || n < 1 || k < 0) return `${k} av ${n} delar`;
  if (n === 1) return k === 1 ? 'en hel' : `${NUM[k] ?? k} hela`;
  if (n === 2) return k === 1 ? 'en halv' : `${NUM[k] ?? k} halva`;
  const word = /** @type {Record<number, string>} */ (DEL)[n];
  if (!word || k > 12) return `${k} av ${n} delar`;
  return k === 1 ? `en ${word}` : `${NUM[k]} ${word}ar`;
}

/**
 * "12 kronor och 35 öre" av ett belopp i ören (heltal).
 * @param {number} totalOre
 */
export function speakMoney(totalOre) {
  const kr = Math.floor(totalOre / 100);
  const ore = totalOre % 100;
  const krText = `${kr} ${kr === 1 ? 'krona' : 'kronor'}`;
  return ore === 0 ? krText : kr === 0 ? `${ore} öre` : `${krText} och ${ore} öre`;
}

/** @param {string} text */
export function sentenceCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
