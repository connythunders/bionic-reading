// @ts-check
// Procentstapel: visar hur många procent av en helhet (till exempel ett pris) en del är.
// Interaktiv: dra, klicka, piltangenter eller knappar som ändrar med 5 procent i taget.
import { h } from '../../lib/dom.js';
import { formatNumber } from '../../lib/answers.js';
import { attachSlider, snap } from './slider.js';

let counter = 0;

/** Enhet som läses upp. @param {string} unit */
const spokenUnit = (unit) => (unit === 'kr' ? 'kronor' : unit);

/**
 * @param {{
 *   whole: number, percent?: number, part?: number, unit?: string,
 *   hideWhole?: boolean, hidePercent?: boolean,
 *   interactive?: boolean, step?: number, onChange?: (percent: number) => void
 * }} o
 * @returns {{ el: HTMLElement, getPercent: () => number, setPercent: (p: number) => void, thumb: HTMLElement | null }}
 */
export function createPercentBar({ whole, percent, part, unit = 'kr', hideWhole = false, hidePercent = false, hideAmount = false, interactive = false, step = 5, onChange }) {
  let current = percent ?? (part !== undefined ? (part / whole) * 100 : 0);
  const amountOf = (/** @type {number} */ p) => (whole * p) / 100;
  const money = (/** @type {number} */ v) => `${formatNumber(Math.round(v * 100) / 100)} ${unit}`;

  const fill = h('div', { class: 'pb-fill' });
  const track = h('div', { class: 'pb-track' }, fill);
  const scale = h('div', { class: 'pb-scale', 'aria-hidden': 'true' });
  for (const p of [0, 25, 50, 75, 100]) {
    const label = h('span', { class: 'pb-tick' },
      h('span', null, `${p} %`),
      // hideAmount: bilden ska hjälpa utan att avslöja svaret, så bara 0 och helheten visas.
      h('span', null, hideWhole && p > 0 ? '?' : hideAmount && p > 0 && p < 100 ? '' : money(amountOf(p))),
    );
    label.style.left = `${p}%`;
    scale.append(label);
  }

  const summary = h('p', { class: 'pb-summary' });
  const root = h('div', { class: 'pb' });
  /** @type {HTMLElement | null} */
  let thumb = null;

  const texts = () => {
    const p = hidePercent && !interactive ? '?' : formatNumber(Math.round(current * 100) / 100);
    const w = hideWhole ? '?' : money(whole);
    const unknownAmount = (hideWhole || hideAmount) && !interactive;
    const a = unknownAmount ? '?' : money(amountOf(current));
    return {
      visual: `${p} % av ${w} är ${a}.`,
      spoken: `${hidePercent && !interactive ? 'okänt antal' : p} procent av ${hideWhole ? 'okänt belopp' : `${formatNumber(whole)} ${spokenUnit(unit)}`} är ${unknownAmount ? 'okänt' : `${formatNumber(Math.round(amountOf(current) * 100) / 100)} ${spokenUnit(unit)}`}.`,
    };
  };

  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });

  /** @param {number} p @param {boolean} [announce] */
  function render(p, announce = false) {
    current = p;
    fill.style.width = `${p}%`;
    const t = texts();
    summary.textContent = t.visual;
    if (thumb) {
      thumb.style.left = `${p}%`;
      thumb.setAttribute('aria-valuenow', String(p));
      thumb.setAttribute('aria-valuetext', `${formatNumber(p)} procent, ${formatNumber(Math.round(amountOf(p) * 100) / 100)} ${spokenUnit(unit)}`);
    }
    if (announce) live.textContent = t.spoken;
  }

  if (interactive) {
    const id = `procentstapel-${++counter}`;
    thumb = h('div', {
      id, class: 'pb-thumb', role: 'slider', tabindex: '0',
      'aria-label': 'Procent av helheten', 'aria-valuemin': 0, 'aria-valuemax': 100,
    });
    track.append(thumb);
    attachSlider({
      track, thumb, min: 0, max: 100, step, bigStep: 25,
      getValue: () => current,
      onInput: (v) => { render(v); onChange?.(v); },
    });
    const move = (/** @type {number} */ dir) => {
      const v = snap(current + dir * step, 0, 100, step);
      render(v, true);
      onChange?.(v);
    };
    root.append(
      track, scale, summary,
      h('div', { class: 'nl-controls' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'aria-label': `Minska med ${step} procent`, onclick: () => move(-1) }, `Minska med ${step} %`),
        h('button', { type: 'button', class: 'btn btn-secondary', 'aria-label': `Öka med ${step} procent`, onclick: () => move(1) }, `Öka med ${step} %`),
      ),
      live,
    );
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', 'Procentstapel');
  } else {
    root.append(track, scale, summary);
    root.setAttribute('role', 'img');
  }
  render(snap(current, 0, 100, interactive ? step : 0.0001));
  if (!interactive) root.setAttribute('aria-label', `Procentstapel. ${texts().spoken}`);

  return { el: root, getPercent: () => current, setPercent: (p) => render(snap(p, 0, 100, step), true), thumb };
}
