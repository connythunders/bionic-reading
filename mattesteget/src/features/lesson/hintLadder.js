// @ts-check
// Ledtrådstrappan på en övningsuppgift. Eleven får en nivå i taget:
//   1. läs upp uppgiften igen, 2. visa en bild, 3. visa första steget, 4. visa hela lösningen.
import { h } from '../../lib/dom.js';
import { formatAnswer } from '../../lib/answers.js';
import { renderRich } from './richView.js';
import { createRepresentation } from '../interactives/representation.js';
import { HINT_LEVELS } from './lessonFlow.js';

/**
 * @param {{
 *   step: any, level: number, locked: boolean,
 *   say: (rt: any, label: string, opts?: any) => { text: HTMLElement, controls: HTMLElement },
 *   solutionList: (steps: any[], count: number) => HTMLElement,
 *   onHint: () => void
 * }} o  locked: frågan är löst, så fler nivåer erbjuds inte
 * @returns {{ el: HTMLElement, focusLatest: () => void }}
 */
export function createHintLadder({ step, level, locked, say, solutionList, onHint }) {
  const hints = step.hints;
  const items = [];

  for (let n = 1; n <= Math.min(level, HINT_LEVELS.length); n++) {
    /** @type {any[]} */
    let content = [];
    if (n === 1) {
      const talk = say(step.prompt, 'uppgiften');
      content = [h('p', { class: 'prompt' }, talk.text), talk.controls];
    } else if (n === 2) {
      const rep = createRepresentation({ kind: hints.representation.kind, config: hints.representation.config, interactive: false });
      const caption = say(hints.representation.caption, 'bildtexten');
      content = [rep.el, h('p', null, caption.text), caption.controls];
    } else if (n === 3) {
      const talk = say(hints.firstStep, 'första steget');
      content = [h('p', null, talk.text), talk.controls];
    } else {
      content = [
        solutionList(hints.fullSolution.steps, hints.fullSolution.steps.length),
        h('p', { class: 'answer-line' }, h('strong', null, 'Svar: '), formatAnswer(step.answer)),
      ];
    }
    items.push(h('div', { class: 'hint-item', tabindex: '-1', 'data-level': String(n) },
      h('h4', null, HINT_LEVELS[n - 1].title),
      content,
    ));
  }

  const next = level < HINT_LEVELS.length && !locked ? HINT_LEVELS[level] : null;
  const el = h('section', { class: 'hints', 'aria-labelledby': 'hjalp-rubrik' },
    h('h3', { id: 'hjalp-rubrik' }, 'Hjälp'),
    level === 0 && next ? h('p', { class: 'lead' }, 'Kör fast? Du får hjälp steg för steg, ett steg i taget.') : null,
    items,
    next ? h('button', { type: 'button', class: 'btn btn-secondary hint-next', onclick: onHint }, next.label) : null,
  );

  return {
    el,
    focusLatest: () => /** @type {HTMLElement | undefined} */ ([...el.querySelectorAll('.hint-item')].at(-1))?.focus(),
  };
}
