// @ts-check
// Tallinje. Visar tal och marker, eller låter eleven placera en markör.
// Placera: dra, klicka på linjen, piltangenter (PageUp/PageDown, Home/End) eller knapparna under linjen.
import { h } from '../../lib/dom.js';
import { formatNumber } from '../../lib/answers.js';
import { attachSlider, snap } from './slider.js';

let counter = 0;

/**
 * @param {{
 *   min: number, max: number, step: number, labelEvery?: number,
 *   value?: number | null, interactive?: boolean,
 *   marks?: { value: number, label?: string }[], label?: string,
 *   onChange?: (v: number) => void
 * }} o
 * @returns {{ el: HTMLElement, getValue: () => number | null, setValue: (v: number) => void, thumb: HTMLElement | null }}
 */
export function createNumberLine({ min, max, step, labelEvery, value = null, interactive = false, marks = [], label = 'Tallinje', onChange }) {
  const count = Math.round((max - min) / step);
  const every = labelEvery ?? Math.max(1, Math.ceil(count / 10));
  /** @type {number | null} */
  let current = value;
  const pct = (/** @type {number} */ v) => `${((v - min) / (max - min)) * 100}%`;

  const track = h('div', { class: 'nl-track' }, h('div', { class: 'nl-line' }));

  for (let i = 0; i <= count; i++) {
    const major = i % every === 0;
    if (!major && count > 200) continue; // för många streck gör bara linjen otydlig
    const v = snap(min + i * step, min, max, step);
    const tick = h('div', { class: major ? 'nl-tick nl-major' : 'nl-tick' });
    tick.style.left = pct(v);
    track.append(tick);
    if (major) {
      const text = h('span', { class: 'nl-label' }, formatNumber(v));
      text.style.left = pct(v);
      track.append(text);
    }
  }

  for (const m of marks) {
    const mark = h('div', { class: 'nl-mark' }, h('span', null, m.label ?? formatNumber(m.value)));
    mark.style.left = pct(m.value);
    track.append(mark);
  }

  const describe = () => {
    if (current === null) return 'Markören är inte placerad ännu';
    return `Markören står på ${formatNumber(current)}`;
  };
  const readout = h('p', { class: 'nl-readout' }, describe());
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  const root = h('div', { class: 'nl' });

  /** @type {HTMLElement | null} */
  let thumb = null;

  /** @param {number} v @param {boolean} [announce] */
  function setValue(v, announce = false) {
    current = snap(v, min, max, step);
    if (thumb) {
      thumb.style.left = pct(current);
      thumb.classList.remove('nl-unplaced');
      thumb.setAttribute('aria-valuenow', String(current));
      thumb.setAttribute('aria-valuetext', formatNumber(current));
    }
    readout.textContent = describe();
    if (announce) live.textContent = describe();
    onChange?.(current);
  }

  if (interactive) {
    const id = `tallinje-${++counter}`;
    thumb = h('div', {
      id, class: 'nl-thumb', role: 'slider', tabindex: '0',
      'aria-label': label, 'aria-valuemin': min, 'aria-valuemax': max,
      'aria-valuenow': current ?? min,
      'aria-valuetext': current === null ? 'Inte placerad' : formatNumber(current),
    });
    if (current === null) thumb.classList.add('nl-unplaced');
    thumb.style.left = pct(current ?? min);
    track.append(thumb);
    attachSlider({
      track, thumb, min, max, step,
      getValue: () => current ?? min,
      onInput: (v) => setValue(v),
    });
    const move = (/** @type {number} */ dir) => setValue((current ?? min) + dir * step, true);
    root.append(
      track,
      readout,
      h('div', { class: 'nl-controls' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'aria-label': 'Flytta markören åt vänster', onclick: () => move(-1) }, 'Åt vänster'),
        h('button', { type: 'button', class: 'btn btn-secondary', 'aria-label': 'Flytta markören åt höger', onclick: () => move(1) }, 'Åt höger'),
      ),
      live,
    );
    root.setAttribute('role', 'group');
    root.setAttribute('aria-label', label);
  } else {
    if (current !== null) {
      const marker = h('div', { class: 'nl-marker' });
      marker.style.left = pct(current);
      track.append(marker);
    }
    const parts = [...marks.map((m) => m.label ?? formatNumber(m.value))];
    if (current !== null) parts.push(`markör på ${formatNumber(current)}`);
    root.setAttribute('role', 'img');
    root.setAttribute('aria-label', `${label} från ${formatNumber(min)} till ${formatNumber(max)}${parts.length ? `. ${parts.join(', ')}` : ''}`);
    root.append(track);
  }

  return { el: root, getValue: () => current, setValue: (v) => setValue(v), thumb };
}
