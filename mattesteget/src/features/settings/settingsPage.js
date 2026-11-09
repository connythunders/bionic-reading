// @ts-check
import { h, createScope } from '../../lib/dom.js';
import { createSpeedControl } from '../tts/speedControl.js';
import { createVoiceNotice } from '../tts/voiceNotice.js';
import { createSpeech } from '../tts/speech.js';

const FONT_LABELS = [
  ['atkinson', 'Atkinson Hyperlegible (standard)'],
  ['verdana', 'Verdana'],
  ['arial', 'Arial'],
  ['opendyslexic', 'OpenDyslexic'],
];
const BG_LABELS = [
  ['cream', 'Krämvit (standard)'],
  ['grey', 'Ljusgrå'],
  ['blue', 'Ljusblå'],
  ['dark', 'Mörkt läge'],
];

/**
 * @param {string} legend
 * @param {string} name
 * @param {string[][]} options  [värde, text]
 * @param {string} current
 * @param {(value: string) => void} onChange
 */
function radioGroup(legend, name, options, current, onChange) {
  return h('fieldset', { class: 'setting' },
    h('legend', null, legend),
    h('div', { class: 'choices' },
      options.map(([value, text]) =>
        h('label', { class: 'choice' },
          h('input', {
            type: 'radio', name, value,
            checked: value === current,
            onchange: () => onChange(value),
          }),
          h('span', null, text),
        ),
      ),
    ),
  );
}

/**
 * @param {{ id: string, label: string, min: number, max: number, step: number, value: number,
 *           format: (v: number) => string, onInput: (v: number) => void }} o
 */
function rangeField(o) {
  const output = h('output', { for: o.id }, o.format(o.value));
  const input = /** @type {HTMLInputElement} */ (h('input', {
    id: o.id, type: 'range', min: o.min, max: o.max, step: o.step, value: o.value,
    oninput: (/** @type {Event} */ e) => {
      const v = Number(/** @type {HTMLInputElement} */ (e.target).value);
      output.textContent = o.format(v);
      o.onInput(v);
    },
  }));
  return h('div', { class: 'setting' },
    h('label', { for: o.id }, o.label),
    h('div', { class: 'range-row' }, input, output),
  );
}

/**
 * @param {{ settings: ReturnType<typeof import('./settingsStore.js').createSettingsStore>,
 *           speech?: ReturnType<typeof import('../tts/speech.js').createSpeech> }} ctx
 */
export function settingsView(ctx) {
  const s = ctx.settings.get();
  const scope = createScope();
  const speech = ctx.speech ?? createSpeech({ synth: null });
  const percent = (/** @type {number} */ v) => v.toFixed(2).replace('.', ',');

  const el = h('div', null,
    h('h1', null, 'Inställningar'),
    h('p', { class: 'lead' }, 'Ändringarna sparas på den här enheten och syns direkt.'),
    h('p', { class: 'preview' }, 'Så här ser texten ut: Rabatten är 25 procent av 800 kronor.'),
    radioGroup('Typsnitt', 'font', FONT_LABELS, s.font, (v) => ctx.settings.update({ font: v })),
    rangeField({
      id: 'set-size', label: 'Textstorlek', min: 18, max: 28, step: 1, value: s.fontSize,
      format: (v) => `${v} px`, onInput: (v) => ctx.settings.update({ fontSize: v }),
    }),
    rangeField({
      id: 'set-line', label: 'Radavstånd', min: 1.5, max: 2.0, step: 0.05, value: s.lineHeight,
      format: percent, onInput: (v) => ctx.settings.update({ lineHeight: v }),
    }),
    rangeField({
      id: 'set-letter', label: 'Bokstavsavstånd', min: 0, max: 0.12, step: 0.01, value: s.letterSpacing,
      format: (v) => `${percent(v)} em`, onInput: (v) => ctx.settings.update({ letterSpacing: v }),
    }),
    radioGroup('Bakgrund', 'background', BG_LABELS, s.background, (v) => ctx.settings.update({ background: v })),
    h('div', { class: 'setting' },
      h('label', { class: 'choice' },
        h('input', {
          type: 'checkbox', checked: s.motion === 'reduce',
          onchange: (/** @type {Event} */ e) =>
            ctx.settings.update({ motion: /** @type {HTMLInputElement} */ (e.target).checked ? 'reduce' : 'system' }),
        }),
        h('span', null, 'Minska rörelse i appen'),
      ),
    ),
    h('h2', null, 'Uppläsning'),
    createVoiceNotice(speech, scope),
    createSpeedControl(ctx.settings),
    h('div', { class: 'setting' },
      h('label', { class: 'choice' },
        h('input', {
          type: 'checkbox', checked: s.autoRead,
          onchange: (/** @type {Event} */ e) => ctx.settings.update({ autoRead: /** @type {HTMLInputElement} */ (e.target).checked }),
        }),
        h('span', null, 'Läs upp ny text automatiskt'),
      ),
    ),
    h('div', { class: 'actions' },
      h('button', {
        type: 'button', class: 'btn btn-secondary',
        onclick: () => {
          ctx.settings.reset();
          // Rita om vyn så att reglage och val visar standardvärdena.
          scope.dispose();
          el.replaceWith(settingsView(ctx).el);
        },
      }, 'Återställ standard'),
    ),
  );
  return { title: 'Inställningar', el, dispose: () => scope.dispose() };
}
