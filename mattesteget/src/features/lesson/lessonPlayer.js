// @ts-check
// Spelar upp en lektion, en skärm i taget. Fokus, live-region och uppläsning hanteras här.
import { h, createScope } from '../../lib/dom.js';
import { formatAnswer } from '../../lib/answers.js';
import { richToPlain } from '../../lib/richText.js';
import { initialState, currentView, canContinue, reduce, PHASES } from './lessonFlow.js';
import { feedbackFor } from './feedbackText.js';
import { renderRich, renderFormula } from './richView.js';
import { createAnswerForm } from './answerForm.js';
import { createSpeakable } from '../tts/speakable.js';
import { createVoiceNotice } from '../tts/voiceNotice.js';
import { createSpeedControl } from '../tts/speedControl.js';
import { createSpeech } from '../tts/speech.js';

/**
 * @param {any} lesson
 * @param {{
 *   speech?: ReturnType<typeof createSpeech>,
 *   settings?: ReturnType<typeof import('../settings/settingsStore.js').createSettingsStore>
 * }} [deps]
 * @returns {{ el: HTMLElement, dispose: () => void }}
 */
export function createLessonPlayer(lesson, deps = {}) {
  const speech = deps.speech ?? createSpeech({ synth: null });
  const settings = deps.settings;
  let state = initialState();
  let lastInput = '';
  let hintShown = false;

  const playerScope = createScope(); // lever lika länge som spelaren
  const screenScope = createScope(); // byts ut för varje skärm

  // Live-regionen finns kvar mellan skärmarna så att skärmläsare hör återkopplingen.
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  const screen = h('div', { class: 'lesson-screen' });
  const tools = h('div', { class: 'lesson-tools' },
    createVoiceNotice(speech, playerScope),
    settings ? createSpeedControl(settings) : null,
  );
  const root = h('div', { class: 'lesson' }, live, tools, screen);

  /** Första uppläsningsbara texten på skärmen, för automatisk uppläsning.
   * @type {{ speak: () => unknown } | null} */
  let primary = null;

  /** @param {{ text: string, speak?: string, formulas?: any }} rt @param {string} label @param {{ primary?: boolean, extraSpeech?: string }} [opts] */
  function say(rt, label, opts = {}) {
    const s = createSpeakable(rt, { speech, scope: screenScope, label, extraSpeech: opts.extraSpeech });
    if (opts.primary && !primary) primary = s;
    return s;
  }

  /** @param {import('./lessonFlow.js').FlowAction} action */
  function dispatch(action) {
    const before = state;
    state = reduce(lesson, state, action);
    if (action.type === 'answer' && typeof action.input === 'string') lastInput = action.input;
    if (action.type === 'next' || action.type === 'restart') {
      lastInput = '';
      hintShown = false;
      speech.stop();
    }
    if (state === before) return;
    render(action.type);
  }

  /** @param {any[]} steps @param {number} count */
  function solutionList(steps, count) {
    return h('ol', { class: 'solution' },
      steps.slice(0, count).map((s, i) => {
        const talk = say(s.text, `steg ${i + 1}`, { extraSpeech: s.formula?.speak });
        return h('li', null,
          h('p', null, talk.text),
          s.formula ? h('p', { class: 'formula-line' }, renderFormula(s.formula)) : null,
          talk.controls,
        );
      }),
    );
  }

  /** @param {any} view @param {string} cause @returns {{ nodes: any[], input?: { focus: () => void }, cont?: HTMLElement }} */
  function questionBlock(view, cause) {
    const q = view.question;
    const locked = canContinue(state);
    const talk = say(q.label, 'frågan', { primary: view.kind === 'practice' });
    const form = createAnswerForm({
      label: q.label, labelNode: talk.text, answer: q.answer, value: lastInput, locked,
      onSubmit: (input) => dispatch({ type: 'answer', input }),
    });
    /** @type {any[]} */
    const nodes = [talk.controls, form.el];

    if (state.result) {
      const fb = feedbackFor(state.result, { attempts: state.attempts, answer: q.answer });
      const message = state.result === 'incorrect' && state.matched ? state.matched.message : null;
      nodes.push(h('div', { class: `feedback ${fb.tone}`, 'aria-hidden': 'true' },
        message ? h('p', null, renderRich(message)) : h('p', null, fb.text),
      ));
      // Bara när ett svar just lämnats: annars läser skärmläsaren upp samma text igen.
      if (cause === 'answer' || cause === 'reveal') live.textContent = message ? richToPlain(message) : fb.text;
    }

    if (q.hint && !locked) {
      const hintTalk = hintShown ? say(q.hint, 'tipset') : null;
      nodes.push(h('div', { class: 'help-row' },
        h('button', {
          type: 'button', class: 'btn btn-secondary', 'aria-expanded': String(hintShown),
          onclick: () => { hintShown = !hintShown; render('hint'); },
        }, hintShown ? 'Dölj tipset' : 'Visa ett tips'),
        hintTalk ? h('p', { class: 'hint' }, hintTalk.text) : null,
        hintTalk ? hintTalk.controls : null,
      ));
    }

    /** @type {HTMLElement | undefined} */
    let cont;
    if (canContinue(state)) {
      cont = h('button', { type: 'button', class: 'btn', onclick: () => dispatch({ type: 'next' }) }, 'Fortsätt');
      nodes.push(h('div', { class: 'actions' }, cont));
    } else if (state.attempts > 0) {
      nodes.push(h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => dispatch({ type: 'reveal' }) }, 'Visa svaret'),
      ));
    }
    return { nodes, input: form, cont };
  }

  /** @param {any} step */
  function promptBlock(step, primaryText = true) {
    const talk = say(step.prompt, 'uppgiften', { primary: primaryText });
    return [h('p', { class: 'prompt' }, talk.text), talk.controls];
  }

  /** @param {string} cause */
  function render(cause) {
    screenScope.dispose(); // avregistrera lyssnare från förra skärmen
    primary = null;
    const view = currentView(lesson, state);
    if (cause === 'next' || cause === 'restart' || cause === 'init') live.textContent = '';

    if (view.kind === 'done') {
      const heading = h('h2', { tabindex: '-1' }, 'Lektionen är klar');
      screen.replaceChildren(
        heading,
        h('p', null, 'Du har gjort alla steg i den här lektionen. Du kan göra om den eller välja en annan.'),
        h('div', { class: 'actions' },
          h('a', { class: 'btn', href: '#/moduler' }, 'Till modulerna'),
          h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => dispatch({ type: 'restart' }) }, 'Gör om lektionen'),
        ),
      );
      heading.focus();
      return;
    }

    const phase = PHASES[/** @type {'visa' | 'tillsammans' | 'sjalv'} */ (view.phase)];
    const heading = h('h2', { tabindex: '-1' }, phase.label);
    /** @type {any[]} */
    const body = [];
    /** @type {{ focus: () => void } | undefined} */
    let input;
    /** @type {HTMLElement | undefined} */
    let cont;

    if (view.kind === 'workedStatic') {
      body.push(
        ...promptBlock(view.step),
        solutionList(view.step.steps, view.step.steps.length),
        h('p', { class: 'answer-line' }, h('strong', null, 'Svar: '), formatAnswer(view.step.answer)),
      );
      cont = h('button', { type: 'button', class: 'btn', onclick: () => dispatch({ type: 'next' }) }, 'Fortsätt');
      body.push(h('div', { class: 'actions' }, cont));
    } else if (view.kind === 'interactive') {
      body.push(...promptBlock(view.step));
      cont = h('button', { type: 'button', class: 'btn', onclick: () => dispatch({ type: 'next' }) }, 'Fortsätt');
      body.push(h('div', { class: 'actions' }, cont));
    } else {
      if (view.kind === 'workedAsk') {
        body.push(...promptBlock(view.step), solutionList(view.step.steps, view.visibleSteps));
      } else if (view.kind === 'guidedPart') {
        body.push(...promptBlock(view.step));
      }
      const q = questionBlock(view, cause);
      body.push(...q.nodes);
      input = q.input;
      cont = q.cont;
    }

    const n = lesson.steps.length;
    screen.replaceChildren(
      h('p', { class: 'stepper' }, `Steg ${state.stepIndex + 1} av ${n}`),
      heading,
      h('p', { class: 'lead' }, phase.intro),
      ...body,
    );

    if (cause === 'answer' && !canContinue(state)) input?.focus();
    else if (cont && (cause === 'answer' || cause === 'reveal')) cont.focus();
    else if (cause === 'hint') input?.focus();
    else if (cause !== 'init') heading.focus();

    // Automatisk uppläsning av ny text. Bara efter en knapptryckning, eftersom webbläsare
    // inte tillåter ljud utan att användaren gjort något.
    if (cause === 'next' && settings?.get().autoRead && primary) void primary.speak();
  }

  render('init');
  return {
    el: root,
    dispose() {
      speech.stop();
      screenScope.dispose();
      playerScope.dispose();
    },
  };
}
