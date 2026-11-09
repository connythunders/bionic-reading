// @ts-check
// En text som kan läsas upp: ritar texten ord för ord (för markering) och knapparna
// "Läs upp", "Pausa", "Fortsätt läsa", "Läs igen" och "Stopp".
import { h } from '../../lib/dom.js';
import { renderFormula } from '../lesson/richView.js';
import { buildPlan } from './speakPlan.js';

let counter = 0;

/**
 * @param {{ text: string, speak?: string, formulas?: Record<string, { expr: string, speak: string }> }} rt
 * @param {{
 *   speech: ReturnType<typeof import('./speech.js').createSpeech>,
 *   scope: { add: (fn: () => void) => void },
 *   label: string,
 *   extraSpeech?: string
 * }} o  label beskriver vad som läses ("uppgiften", "steg 2") och används i knappens tillgängliga namn
 */
export function createSpeakable(rt, { speech, scope, label, extraSpeech }) {
  const id = `text-${++counter}`;
  const plan = buildPlan(rt, { extraSpeech });

  const text = h('span', { class: 'speakable' });
  /** @type {HTMLElement[]} */
  const marks = [];
  for (const u of plan.units) {
    if (u.space) text.append(document.createTextNode(' '));
    /** @type {HTMLElement} */
    let mark;
    if (u.kind === 'formula' && u.formula) {
      mark = renderFormula(u.formula);
      mark.classList.add('w');
      text.append(mark);
    } else {
      mark = h('span', { class: 'w' }, u.text);
      text.append(u.bold ? h('strong', null, mark) : mark);
    }
    marks.push(mark);
  }

  /** @param {import('./speech.js').SpeechState} s */
  function highlight(s) {
    for (const m of marks) m.classList.remove('reading-sentence', 'reading-word');
    if (s.activeId !== id || s.status === 'idle') return;
    const sentence = plan.sentences[s.sentence];
    if (!sentence) return;
    for (const i of sentence.units) marks[i]?.classList.add('reading-sentence');
    const unit = s.word >= 0 && sentence.wordMap ? sentence.wordMap[s.word] : undefined;
    if (unit !== undefined) marks[unit]?.classList.add('reading-word');
  }

  const primary = h('button', { type: 'button', class: 'btn btn-secondary speak-btn' }, 'Läs upp');
  const stop = h('button', { type: 'button', class: 'btn btn-secondary speak-stop', hidden: true, 'aria-label': `Stoppa uppläsningen av ${label}` }, 'Stopp');
  const controls = h('div', { class: 'speak-controls' }, primary, stop);

  /** @type {'idle' | 'speaking' | 'paused' | 'finished'} */
  let mode = 'idle';
  /** @param {import('./speech.js').SpeechState} s */
  function update(s) {
    const mine = s.activeId === id;
    mode = mine ? s.status : s.finishedId === id ? 'finished' : 'idle';
    const words = { idle: 'Läs upp', speaking: 'Pausa', paused: 'Fortsätt läsa', finished: 'Läs igen' }[mode];
    const aria = {
      idle: `Läs upp ${label}`, speaking: `Pausa uppläsningen av ${label}`,
      paused: `Fortsätt läsa ${label}`, finished: `Läs ${label} igen`,
    }[mode];
    primary.textContent = words;
    primary.setAttribute('aria-label', aria);
    stop.hidden = !(mine && s.status !== 'idle');
    highlight(s);
  }

  primary.addEventListener('click', () => {
    if (mode === 'speaking') speech.pause();
    else if (mode === 'paused') speech.resume();
    else speech.speak(id, plan);
  });
  stop.addEventListener('click', () => {
    speech.stop();
    primary.focus();
  });

  update(speech.getState());
  scope.add(speech.subscribe((s) => update(s)));

  return { text, controls, plan, speak: () => speech.speak(id, plan) };
}
