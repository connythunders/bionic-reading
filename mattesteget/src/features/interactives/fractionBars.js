// @ts-check
// Bråkstavar: en stav delad i lika stora delar där några delar är ifyllda.
// Interaktiv: klicka (eller tryck Enter/Mellanslag) på en del för att fylla upp till den,
// och ändra antalet delar med knapparna.
import { h } from '../../lib/dom.js';
import { speakFraction, sentenceCase } from '../../lib/speakNumbers.js';
import { renderFormula } from '../lesson/richView.js';

/**
 * @param {{
 *   rows: { n: number, k: number, label?: string }[],
 *   interactive?: boolean, maxParts?: number, hideLabel?: boolean,
 *   onChange?: (rows: { n: number, k: number }[]) => void
 * }} o
 * @returns {{ el: HTMLElement, getRows: () => { n: number, k: number }[] }}
 */
export function createFractionBars({ rows, interactive = false, maxParts = interactive ? 8 : 12, hideLabel = false, onChange }) {
  const state = rows.map((r) => ({ n: r.n, k: r.k }));
  const root = h('div', { class: 'fb', role: 'group', 'aria-label': 'Bråkstavar' });
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  /** @type {HTMLElement[]} */
  const rowEls = [];

  /** @param {number} i */
  function drawRow(i) {
    const { n, k } = state[i];
    const spoken = speakFraction(k, n);
    const bar = h('div', { class: 'fb-bar' });
    for (let p = 0; p < n; p++) {
      const on = p < k;
      if (interactive) {
        bar.append(h('button', {
          type: 'button', class: on ? 'fb-seg on' : 'fb-seg', 'aria-pressed': String(on),
          'aria-label': `Del ${p + 1} av ${n}`,
          onclick: () => { state[i].k = state[i].k === p + 1 ? p : p + 1; redraw(i, p); }, // fyll upp till delen
        }));
      } else {
        bar.append(h('span', { class: on ? 'fb-seg on' : 'fb-seg' }));
      }
    }
    // hideLabel: bilden ska hjälpa utan att skriva ut bråket, när bråket är svaret på uppgiften.
    const label = hideLabel ? null : h('div', { class: 'fb-label' }, renderFormula({ expr: `${k}/${n}`, speak: spoken }));
    /** @type {any[]} */
    const children = [label, bar];
    if (interactive) {
      children.push(h('div', { class: 'fb-controls' },
        h('button', {
          type: 'button', class: 'btn btn-secondary', 'aria-label': 'Färre delar', 'aria-disabled': String(n <= 1),
          onclick: () => {
            if (state[i].n <= 1) return;
            state[i].n -= 1;
            state[i].k = Math.min(state[i].k, state[i].n);
            redraw(i, 'fewer');
          },
        }, 'Färre delar'),
        h('button', {
          type: 'button', class: 'btn btn-secondary', 'aria-label': 'Fler delar', 'aria-disabled': String(n >= maxParts),
          onclick: () => {
            if (state[i].n >= maxParts) return;
            state[i].n += 1;
            redraw(i, 'more');
          },
        }, 'Fler delar'),
      ));
    } else {
      bar.setAttribute('role', 'img');
      bar.setAttribute('aria-label', hideLabel ? `Stav med ${n} lika delar där ${k} är ifyllda` : `${sentenceCase(spoken)}: ${k} av ${n} delar är ifyllda`);
    }
    return h('div', { class: 'fb-row' }, children);
  }

  /** Ritar om en rad och flyttar tillbaka fokus till samma kontroll.
   * @param {number} i @param {number | 'fewer' | 'more'} focus */
  function redraw(i, focus) {
    const next = drawRow(i);
    rowEls[i].replaceWith(next);
    rowEls[i] = next;
    if (typeof focus === 'number') /** @type {HTMLElement | undefined} */ (next.querySelectorAll('.fb-seg')[focus])?.focus();
    else /** @type {HTMLElement | undefined} */ (next.querySelectorAll('.fb-controls button')[focus === 'fewer' ? 0 : 1])?.focus();
    const { n, k } = state[i];
    live.textContent = `${k} av ${n} delar är ifyllda: ${speakFraction(k, n)}`;
    onChange?.(state.map((r) => ({ ...r })));
  }

  state.forEach((_, i) => {
    const row = drawRow(i);
    rowEls.push(row);
    root.append(row);
  });
  root.append(live);
  return { el: root, getRows: () => state.map((r) => ({ ...r })) };
}
