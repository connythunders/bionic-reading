// @ts-check
import { h } from '../../lib/dom.js';

let counter = 0;

/** @param {number} v */
export const formatRate = (v) => `${v.toFixed(1).replace('.', ',')} ×`;

/**
 * Reglage för uppläsningshastighet, 0,7 till 1,3.
 * @param {ReturnType<typeof import('../settings/settingsStore.js').createSettingsStore>} settings
 * @returns {HTMLElement}
 */
export function createSpeedControl(settings) {
  const id = `hastighet-${++counter}`;
  const rate = settings.get().speechRate;
  const output = h('output', { for: id }, formatRate(rate));
  const input = h('input', {
    id, type: 'range', min: 0.7, max: 1.3, step: 0.1, value: rate,
    oninput: (/** @type {Event} */ e) => {
      const v = Number(/** @type {HTMLInputElement} */ (e.target).value);
      output.textContent = formatRate(v);
      settings.update({ speechRate: v });
    },
  });
  return h('div', { class: 'setting' },
    h('label', { for: id }, 'Hastighet på uppläsningen'),
    h('div', { class: 'range-row' }, input, output),
  );
}
