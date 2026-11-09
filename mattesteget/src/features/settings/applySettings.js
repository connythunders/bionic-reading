// @ts-check
// Skriver inställningarna till html-elementet som data-attribut och CSS-variabler.
// CSS-variabler sätts via CSSOM (setProperty), vilket CSP tillåter.

/**
 * @param {import('./settingsStore.js').Settings} s
 * @param {HTMLElement} [root]
 */
export function applySettings(s, root = document.documentElement) {
  root.dataset.bg = s.background;
  root.dataset.font = s.font;
  root.dataset.motion = s.motion;
  root.style.setProperty('--fs', `${s.fontSize}px`);
  root.style.setProperty('--lh', String(s.lineHeight));
  root.style.setProperty('--ls', `${s.letterSpacing}em`);
  // Ordavstånd följer bokstavsavståndet (WCAG-förhållandet 0,16/0,12).
  root.style.setProperty('--ws', `${Math.round(s.letterSpacing * 1.33 * 1000) / 1000}em`);
}
