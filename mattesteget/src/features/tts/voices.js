// @ts-check
// Val av svensk röst. Ren logik, så den går att testa utan webbläsare.

/** @param {unknown} lang */
export function normalizeLang(lang) {
  return String(lang || '').replace('_', '-').toLowerCase(); // Android kan ge "sv_SE"
}

/**
 * Väljer en svensk röst. Föredrar sv-SE framför andra svenska varianter, och
 * röster som finns på enheten (fungerar utan internet) framför nätröster.
 * @param {ArrayLike<{ lang: string, localService?: boolean }>} voices
 */
export function pickSwedishVoice(voices) {
  const list = Array.from(voices || []);
  const exact = list.filter((v) => normalizeLang(v.lang) === 'sv-se');
  const any = list.filter((v) => normalizeLang(v.lang).startsWith('sv'));
  const pool = exact.length ? exact : any;
  if (!pool.length) return null;
  return pool.find((v) => v.localService) || pool[0];
}

/** Hjälptext när ingen svensk röst finns. Visas för eleven. */
export const NO_VOICE_HELP = {
  unsupported: 'Den här webbläsaren kan inte läsa upp text. Prova Chrome om du vill ha uppläsning.',
  intro: 'Ingen svensk röst hittades på den här enheten, så uppläsningen är avstängd. Du kan fortfarande använda allt annat i appen.',
  steps: [
    'Chromebook: Inställningar, Tillgänglighet, Text till tal, Röster. Välj svenska.',
    'Android: Inställningar, System, Språk och inmatning, Text till tal. Installera svensk röstdata.',
    'Windows: Inställningar, Tid och språk, Tal. Lägg till svenska röster.',
  ],
  after: 'Ladda om sidan när rösten är installerad.',
};
