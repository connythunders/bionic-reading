// @ts-check
import { h } from '../../lib/dom.js';
import { renderRich } from './richView.js';

let counter = 0;

/**
 * Svarsformulär för tal, bråk och flerval. Enter i fältet skickar svaret.
 * @param {{
 *   label: any, labelNode?: Node, answer: any, value?: string, locked?: boolean,
 *   onSubmit: (input: string | number[]) => void
 * }} o  labelNode: färdigritad frågetext (t.ex. uppläsningsbar), används i stället för label
 * @returns {{ el: HTMLElement, focus: () => void }}
 */
export function createAnswerForm({ label, labelNode, answer, value = '', locked = false, onSubmit }) {
  const labelContent = () => labelNode ?? renderRich(label);
  const id = `svar-${++counter}`;
  const form = h('form', { class: 'answer-form', novalidate: true });
  /** @type {() => string | number[]} */
  let read;
  /** @type {HTMLElement} */
  let focusTarget;

  if (answer.kind === 'choice') {
    const multiple = answer.correct.length > 1;
    const inputs = answer.options.map((/** @type {any} */ opt, /** @type {number} */ i) =>
      h('label', { class: 'choice' },
        h('input', { type: multiple ? 'checkbox' : 'radio', name: id, value: i, disabled: locked }),
        h('span', null, renderRich(opt)),
      ),
    );
    form.append(h('fieldset', { class: 'setting' },
      h('legend', { class: 'question' }, labelContent()),
      multiple ? h('p', { class: 'lead' }, 'Du kan välja flera.') : null,
      h('div', { class: 'choices' }, inputs),
    ));
    read = () => [...form.querySelectorAll('input')]
      .filter((i) => /** @type {HTMLInputElement} */ (i).checked)
      .map((i) => Number(/** @type {HTMLInputElement} */ (i).value));
    focusTarget = /** @type {HTMLElement} */ (form.querySelector('input'));
  } else {
    const unitId = `${id}-enhet`;
    const input = /** @type {HTMLInputElement} */ (h('input', {
      id, type: 'text', class: 'answer-input', value,
      inputmode: answer.kind === 'fraction' ? 'text' : 'decimal',
      autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', enterkeyhint: 'done',
      readonly: locked,
      'aria-describedby': answer.unit ? unitId : null,
    }));
    form.append(
      h('label', { for: id, class: 'question' }, labelContent()),
      h('div', { class: 'input-row' }, input, answer.unit ? h('span', { id: unitId, class: 'unit' }, answer.unit) : null),
    );
    read = () => input.value;
    focusTarget = input;
  }

  if (!locked) form.append(h('button', { type: 'submit', class: 'btn' }, 'Kontrollera'));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!locked) onSubmit(read());
  });

  return { el: form, focus: () => focusTarget?.focus() };
}
