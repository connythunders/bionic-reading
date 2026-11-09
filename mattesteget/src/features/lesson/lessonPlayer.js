// @ts-check
// Spelar upp en lektion, en skärm i taget. Fokus, live-region och uppläsning hanteras här.
import { h, createScope } from '../../lib/dom.js';
import { formatAnswer } from '../../lib/answers.js';
import { richToPlain } from '../../lib/richText.js';
import { initialState, currentView, canContinue, reduce, PHASES, HINT_LEVELS } from './lessonFlow.js';
import { feedbackFor } from './feedbackText.js';
import { renderRich, renderFormula } from './richView.js';
import { createAnswerForm } from './answerForm.js';
import { createSpeakable } from '../tts/speakable.js';
import { createVoiceNotice } from '../tts/voiceNotice.js';
import { createSpeedControl } from '../tts/speedControl.js';
import { createSpeech } from '../tts/speech.js';
import { createRepresentation } from '../interactives/representation.js';
import { createHintLadder } from './hintLadder.js';

/**
 * @param {any} lesson
 * @param {{
 *   speech?: ReturnType<typeof createSpeech>,
 *   settings?: ReturnType<typeof import('../settings/settingsStore.js').createSettingsStore>,
 *   onStep?: (step: any, info: { attempts?: number, hintLevel?: number, correct?: boolean, wrongInputs?: string[] }) => void,
 *   labels?: { step?: string, doneTitle?: string, doneText?: string, restart?: boolean, links?: { href: string, text: string }[] }
 * }} [deps]  onStep anropas när ett steg är klart. labels byter texter (till exempel för Dagens pass)
 * @returns {{ el: HTMLElement, dispose: () => void }}
 */
export function createLessonPlayer(lesson, deps = {}) {
  const speech = deps.speech ?? createSpeech({ synth: null });
  const settings = deps.settings;
  const labels = deps.labels ?? {};
  let state = initialState();
  let lastInput = '';
  let hintShown = false;
  /** Felsvar på den pågående övningsuppgiften, för lärarens översikt. @type {string[]} */
  let wrongInputs = [];

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

  /**
   * Meddelar att ett steg är klart: övningsuppgifter när de löses, övriga steg när eleven går vidare.
   * @param {import('./lessonFlow.js').FlowState} before @param {any} viewBefore @param {import('./lessonFlow.js').FlowAction} action
   */
  function reportProgress(before, viewBefore, action) {
    if (!deps.onStep) return;
    if (viewBefore.kind === 'practice' && !canContinue(before) && canContinue(state)) {
      deps.onStep(viewBefore.step, {
        attempts: state.attempts, hintLevel: state.hintLevel,
        correct: state.result === 'correct', wrongInputs: [...new Set(wrongInputs)],
      });
    } else if (action.type === 'next' && state.stepIndex !== before.stepIndex && lesson.steps[before.stepIndex].type !== 'practice') {
      deps.onStep(lesson.steps[before.stepIndex], {});
    }
  }

  /** @param {import('./lessonFlow.js').FlowAction} action */
  function dispatch(action) {
    const before = state;
    const viewBefore = currentView(lesson, before);
    state = reduce(lesson, state, action);
    if (action.type === 'answer' && typeof action.input === 'string') lastInput = action.input;
    if (action.type === 'answer' && state.result === 'incorrect' && typeof action.input === 'string') {
      wrongInputs = [action.input.trim().slice(0, 40), ...wrongInputs];
    }
    if (state !== before) reportProgress(before, viewBefore, action);
    if (action.type === 'next' || action.type === 'restart') {
      lastInput = '';
      hintShown = false;
      wrongInputs = [];
      speech.stop();
    }
    if (state === before) return;
    render(action.type === 'hint' ? 'hintlevel' : action.type);
    // Nivå 1 i ledtrådstrappan: läs upp uppgiften igen. Utan svensk röst visas bara texten igen,
    // så att fokus inte hoppar till röstmeddelandet.
    if (action.type === 'hint' && state.hintLevel === 1 && speech.getState().support === 'ready') void primary?.speak();
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

  /** @param {any} view @param {string} cause @returns {{ nodes: any[], input?: { focus: () => void }, cont?: HTMLElement, ladder?: { focusLatest: () => void } }} */
  function questionBlock(view, cause) {
    const q = view.question;
    const locked = canContinue(state);
    // Bara övningsuppgifter med ledtrådar har trappan (parallella versioner i Dagens pass saknar den).
    const ladderQuestion = view.kind === 'practice' && !!view.step.hints;
    const talk = say(q.label, 'frågan', { primary: view.kind === 'practice' || view.kind === 'parallel' });
    // Visas svaret på en tallinje ska markören stå på rätt plats.
    const shownValue = state.result === 'revealed' && q.answer.kind === 'numberLine' ? String(q.answer.target) : lastInput;
    const form = createAnswerForm({
      label: q.label, labelNode: talk.text, answer: q.answer, value: shownValue, locked,
      onSubmit: (input) => dispatch({ type: 'answer', input }),
    });
    /** @type {any[]} */
    const nodes = [talk.controls, form.el];

    if (state.result) {
      const fb = feedbackFor(state.result, { attempts: state.attempts, answer: q.answer, ladder: ladderQuestion, hintLevel: state.hintLevel });
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

    /** @type {{ focusLatest: () => void } | undefined} */
    let ladder;
    if (ladderQuestion) {
      ladder = createHintLadder({
        step: view.step, level: state.hintLevel, locked,
        say, solutionList, onHint: () => dispatch({ type: 'hint' }),
      });
      nodes.push(/** @type {any} */ (ladder).el);
      if (cause === 'hintlevel') live.textContent = HINT_LEVELS[state.hintLevel - 1].announce;
    }

    /** @type {HTMLElement | undefined} */
    let cont;
    if (canContinue(state)) {
      cont = h('button', { type: 'button', class: 'btn', onclick: () => dispatch({ type: 'next' }) }, 'Fortsätt');
      nodes.push(h('div', { class: 'actions' }, cont));
    } else if (state.attempts > 0 && !ladderQuestion) {
      nodes.push(h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => dispatch({ type: 'reveal' }) }, 'Visa svaret'),
      ));
    }
    return { nodes, input: form, cont, ladder };
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
      const heading = h('h2', { tabindex: '-1' }, labels.doneTitle ?? 'Lektionen är klar');
      const links = labels.links ?? [{ href: '#/moduler', text: 'Till modulerna' }];
      screen.replaceChildren(
        heading,
        h('p', null, labels.doneText ?? 'Du har gjort alla steg i den här lektionen. Du kan göra om den eller välja en annan.'),
        h('div', { class: 'actions' },
          links.map((l, i) => h('a', { class: i === 0 ? 'btn' : 'btn btn-secondary', href: l.href }, l.text)),
          labels.restart === false ? null : h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => dispatch({ type: 'restart' }) }, 'Gör om lektionen'),
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
    /** @type {{ focusLatest: () => void } | undefined} */
    let ladder;

    if (view.kind === 'workedStatic') {
      body.push(
        ...promptBlock(view.step),
        solutionList(view.step.steps, view.step.steps.length),
        h('p', { class: 'answer-line' }, h('strong', null, 'Svar: '), formatAnswer(view.step.answer)),
      );
      cont = h('button', { type: 'button', class: 'btn', onclick: () => dispatch({ type: 'next' }) }, 'Fortsätt');
      body.push(h('div', { class: 'actions' }, cont));
    } else if (view.kind === 'interactive') {
      body.push(
        ...promptBlock(view.step),
        createRepresentation({ kind: view.step.kind, config: view.step.config, interactive: true, label: 'Utforska' }).el,
      );
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
      ladder = q.ladder;
    }

    const n = lesson.steps.length;
    screen.replaceChildren(
      h('p', { class: 'stepper' }, `${labels.step ?? 'Steg'} ${state.stepIndex + 1} av ${n}`),
      heading,
      h('p', { class: 'lead' }, view.intro ?? phase.intro),
      ...body,
    );

    if (cause === 'hintlevel') {
      // Flytta fokus till den nya hjälpen, så att skärmläsare läser den. På nivå 4 finns "Fortsätt".
      ladder?.focusLatest();
    } else if (cause === 'answer' && !canContinue(state)) input?.focus();
    else if (cont && (cause === 'answer' || cause === 'reveal')) cont.focus();
    else if (cause === 'hint') input?.focus();
    else if (cause !== 'init') heading.focus();

    // Automatisk uppläsning av ny text. Bara efter en knapptryckning, eftersom webbläsare
    // inte tillåter ljud utan att användaren gjort något.
    // (primary sätts i say() under ritningen, vilket typkontrollen inte ser)
    const first = /** @type {{ speak: () => unknown } | null} */ (primary);
    if (cause === 'next' && settings?.get().autoRead && first) void first.speak();
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
