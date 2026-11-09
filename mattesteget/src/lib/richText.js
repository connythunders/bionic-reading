// @ts-check
// Gemensam hantering av RichText: { text, speak?, formulas? }.
// text kan innehålla **fetstil** och platshållare {{nyckel}} som ersätts av formler.

/** @typedef {{ type: 'text' | 'bold' | 'formula', value: string }} RichSegment */

/**
 * Delar upp en text i vanlig text, fetstil och formelplatshållare.
 * @param {{ text: string }} rt
 * @returns {RichSegment[]}
 */
export function parseRich(rt) {
  /** @type {RichSegment[]} */
  const out = [];
  for (const part of rt.text.split(/(\*\*[^*]+\*\*|\{\{\w+\}\})/)) {
    if (!part) continue;
    if (part.startsWith('**')) out.push({ type: 'bold', value: part.slice(2, -2) });
    else if (part.startsWith('{{')) out.push({ type: 'formula', value: part.slice(2, -2) });
    else out.push({ type: 'text', value: part });
  }
  return out;
}

/**
 * Texten som ska läsas upp: egen talversion om den finns, annars texten
 * med formlerna ersatta av sina talversioner.
 * @param {{ text: string, speak?: string, formulas?: Record<string, { speak: string }> }} rt
 * @returns {string}
 */
export function richToSpeech(rt) {
  if (rt.speak) return rt.speak;
  return parseRich(rt)
    .map((s) => (s.type === 'formula' ? rt.formulas?.[s.value]?.speak ?? '' : s.value))
    .join('');
}

/** Ren text utan formatering (för tester och titlar). @param {{ text: string, formulas?: Record<string, { speak: string }> }} rt */
export function richToPlain(rt) {
  return parseRich(rt)
    .map((s) => (s.type === 'formula' ? rt.formulas?.[s.value]?.speak ?? '' : s.value))
    .join('');
}
