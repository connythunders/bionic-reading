// @ts-check
// Miniräknare i en panel bredvid innehållet. Stora knappar, tangentbord och valfri uppläsning.
// Panelen ligger i sidans flöde (den täcker inget), och Esc stänger den.
import { h } from '../../lib/dom.js';
import { initialCalc, press, displayText, spokenKey, spokenResult } from './calcLogic.js';
import { buildPlan } from '../tts/speakPlan.js';

/** [tangent, synlig text, tillgängligt namn, variant] i rader om fyra. */
const KEYS = [
  ['C', 'Rensa', 'Rensa', 'fn'], ['back', 'Radera', 'Radera sista siffran', 'fn'], ['%', '%', '% procent', 'fn'], ['/', '÷', '÷ delat med', 'op'],
  ['7', '7', '7'], ['8', '8', '8'], ['9', '9', '9'], ['*', '×', '× gånger', 'op'],
  ['4', '4', '4'], ['5', '5', '5'], ['6', '6', '6'], ['-', '−', '− minus', 'op'],
  ['1', '1', '1'], ['2', '2', '2'], ['3', '3', '3'], ['+', '+', '+ plus', 'op'],
  ['neg', '±', '± byt tecken', 'fn'], ['0', '0', '0'], [',', ',', ', komma'], ['=', '=', '= är lika med', 'eq'],
];

/** Tangentbordstangent till räknartangent. @param {KeyboardEvent} e */
function keyFor(e) {
  if (/^[0-9]$/.test(e.key)) return e.key;
  switch (e.key) {
    case ',': case '.': return ',';
    case '+': case '-': case '*': case '/': return e.key;
    case 'x': case 'X': return '*';
    case 'Enter': case '=': return '=';
    case 'Backspace': return 'back';
    case 'Delete': return 'C';
    case '%': return '%';
    default: return null;
  }
}

/**
 * @param {{
 *   speech?: ReturnType<typeof import('../tts/speech.js').createSpeech>,
 *   settings?: ReturnType<typeof import('../settings/settingsStore.js').createSettingsStore>
 * }} [deps]
 * @returns {{ toggle: HTMLButtonElement, panel: HTMLElement, open: () => void, close: () => void, isOpen: () => boolean, getState: () => import('./calcLogic.js').CalcState }}
 */
export function createCalculator({ speech, settings } = {}) {
  let state = initialCalc();
  let opened = false;

  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  const expr = h('div', { class: 'calc-expr' });
  const display = h('output', { class: 'calc-display', 'aria-label': 'Skärm' });
  const error = h('p', { class: 'calc-error', hidden: true });
  const heading = h('h2', { tabindex: '-1', id: 'miniraknare-rubrik' }, 'Miniräknare');

  /** Läser upp en kort text om eleven slagit på det. @param {string} text */
  function say(text) {
    if (!settings?.get().calcSpeak || !speech || speech.getState().support !== 'ready') return;
    void speech.speak('calc', buildPlan({ text }));
  }

  function draw() {
    display.textContent = displayText(state);
    expr.textContent = state.expr || ' ';
    error.hidden = !state.error;
    error.textContent = state.error ?? '';
  }

  /** @param {string} key */
  function handle(key) {
    const before = state;
    state = press(state, key);
    draw();
    if (state.error) live.textContent = state.error;
    else if (key === '=' || key === 'C' || key === '%') live.textContent = spokenResult(state);
    // Uppläsning: tangenten, och resultatet när det är klart.
    if (key === '=' || state.error) say(`${state.error ?? spokenResult(state)}`);
    else if (state !== before || key === 'C') say(spokenKey(key));
  }

  const keypad = h('div', { class: 'calc-keys' },
    KEYS.map(([key, text, name, kind]) =>
      h('button', {
        type: 'button', class: `calc-key${kind ? ` calc-${kind}` : ''}`, 'aria-label': name, 'data-key': key,
        onclick: () => handle(key),
      }, text),
    ),
  );

  const speakBox = h('input', {
    type: 'checkbox', id: 'calc-speak', checked: !!settings?.get().calcSpeak,
    onchange: (/** @type {Event} */ e) => settings?.update({ calcSpeak: /** @type {HTMLInputElement} */ (e.target).checked }),
  });

  const toggle = /** @type {HTMLButtonElement} */ (h('button', {
    type: 'button', class: 'btn btn-secondary calc-toggle', 'aria-expanded': 'false', 'aria-controls': 'miniraknare',
    onclick: () => (opened ? close() : open()),
  }, 'Miniräknare'));

  const panel = h('aside', { id: 'miniraknare', class: 'calc', 'aria-labelledby': 'miniraknare-rubrik', hidden: true },
    heading,
    expr, display, error, keypad,
    h('label', { class: 'choice calc-speak', for: 'calc-speak' }, speakBox, h('span', null, 'Läs upp knapptryck och resultat')),
    h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => close() }, 'Stäng miniräknaren')),
    live,
  );

  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const target = /** @type {HTMLElement} */ (e.target);
    // Enter och mellanslag på en knapp ska aktivera knappen, inte räkna ut.
    if ((e.key === 'Enter' || e.key === ' ') && target instanceof HTMLButtonElement) return;
    if (target instanceof HTMLInputElement) return;
    const key = keyFor(e);
    if (key) { e.preventDefault(); handle(key); }
  });

  function open() {
    opened = true;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('calc-open');
    draw();
    heading.focus();
    panel.scrollIntoView({ block: 'nearest' });
  }

  function close() {
    opened = false;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('calc-open');
    toggle.focus();
  }

  draw();
  return { toggle, panel, open, close, isOpen: () => opened, getState: () => state };
}
