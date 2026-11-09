// @ts-check
// Vänligt meddelande när uppläsning inte går att använda, med instruktion för att installera en svensk röst.
import { h } from '../../lib/dom.js';
import { NO_VOICE_HELP } from './voices.js';

/**
 * @param {ReturnType<typeof import('./speech.js').createSpeech>} speech
 * @param {{ add: (fn: () => void) => void }} scope
 * @returns {HTMLElement}
 */
export function createVoiceNotice(speech, scope) {
  const box = h('div', { class: 'notice', role: 'note', tabindex: '-1', hidden: true });

  /** @param {import('./speech.js').SpeechState} s */
  function render(s) {
    if (s.support === 'unsupported') {
      box.replaceChildren(h('p', null, NO_VOICE_HELP.unsupported));
      box.hidden = false;
    } else if (s.support === 'no-swedish') {
      box.replaceChildren(
        h('h2', null, 'Ingen svensk röst hittades'),
        h('p', null, NO_VOICE_HELP.intro),
        h('ul', null, NO_VOICE_HELP.steps.map((t) => h('li', null, t))),
        h('p', null, NO_VOICE_HELP.after),
      );
      box.hidden = false;
    } else {
      box.hidden = true;
    }
  }

  render(speech.getState());
  scope.add(speech.subscribe((s, e) => {
    render(s);
    // Någon tryckte på "Läs upp" utan röst: dra uppmärksamheten till förklaringen.
    if (e.type === 'blocked' && !box.hidden) box.focus();
  }));
  return box;
}
