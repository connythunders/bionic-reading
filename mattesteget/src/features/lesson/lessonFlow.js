// @ts-check
// Lektionsflödet som en ren tillståndsmaskin (ingen DOM), så att det går att testa utan webbläsare.
// En lektion är en lista av steg. Varje "skärm" visar en sak i taget:
//   workedExample: de första stegen visas färdiga. De sista `fading` stegen frågar eleven ett i taget.
//   guidedStep:    ett delsteg i taget.
//   practice:      en uppgift.
//   interactive:   en representation (byggs i steg 5, visas nu bara som text).
import { checkAnswer, matchCommonWrong } from '../../lib/answers.js';

/**
 * @typedef {{
 *   stepIndex: number, sub: number, attempts: number,
 *   result: null | 'correct' | 'incorrect' | 'invalid' | 'unsimplified' | 'revealed',
 *   matched: any, finished: boolean
 * }} FlowState
 * @typedef {{ type: 'answer', input: string | number[] } | { type: 'reveal' } | { type: 'next' } | { type: 'restart' }} FlowAction
 */

export const PHASES = {
  visa: { label: 'Visa', intro: 'Se hur en uppgift kan lösas.' },
  tillsammans: { label: 'Tillsammans', intro: 'Gör ett steg i taget. Du får hjälp på vägen.' },
  sjalv: { label: 'Själv', intro: 'Nu gör du uppgiften på egen hand.' },
};

/** @returns {FlowState} */
export function initialState() {
  return { stepIndex: 0, sub: 0, attempts: 0, result: null, matched: null, finished: false };
}

/**
 * Vad som ska visas just nu.
 * @param {any} lesson
 * @param {FlowState} state
 * @returns {any}
 */
export function currentView(lesson, state) {
  if (state.finished || state.stepIndex >= lesson.steps.length) return { kind: 'done' };
  const step = lesson.steps[state.stepIndex];
  switch (step.type) {
    case 'workedExample': {
      const hidden = step.fading || 0;
      if (state.sub < hidden) {
        const askIndex = step.steps.length - hidden + state.sub;
        const solved = state.result === 'correct' || state.result === 'revealed';
        return {
          kind: 'workedAsk', phase: 'visa', step, askIndex,
          visibleSteps: solved ? askIndex + 1 : askIndex,
          question: { answer: step.steps[askIndex].answer, label: step.steps[askIndex].ask },
        };
      }
      return { kind: 'workedStatic', phase: 'visa', step };
    }
    case 'guidedStep': {
      const part = step.parts[state.sub];
      return {
        kind: 'guidedPart', phase: 'tillsammans', step, partIndex: state.sub, part,
        question: { answer: part.answer, label: part.prompt, hint: part.hint },
      };
    }
    case 'practice':
      return {
        kind: 'practice', phase: 'sjalv', step,
        question: { answer: step.answer, label: step.prompt, commonWrong: step.commonWrong },
      };
    default:
      return { kind: 'interactive', phase: 'visa', step };
  }
}

/** @param {any} view */
export function isQuestion(view) {
  return view.kind === 'workedAsk' || view.kind === 'guidedPart' || view.kind === 'practice';
}

/** Är frågan löst (rätt eller visad), så att eleven får gå vidare? @param {FlowState} state */
export function canContinue(state) {
  return state.result === 'correct' || state.result === 'revealed';
}

/**
 * @param {any} lesson
 * @param {FlowState} state
 * @param {FlowAction} action
 * @returns {FlowState}
 */
export function reduce(lesson, state, action) {
  if (action.type === 'restart') return initialState();
  const view = currentView(lesson, state);
  if (view.kind === 'done') return state;

  if (action.type === 'answer') {
    if (!isQuestion(view) || canContinue(state)) return state;
    const { status } = checkAnswer(view.question.answer, action.input);
    if (status === 'invalid') return { ...state, result: 'invalid', matched: null };
    return {
      ...state,
      attempts: state.attempts + 1,
      result: status,
      matched: status === 'incorrect' ? matchCommonWrong(view.question.commonWrong, action.input) : null,
    };
  }

  if (action.type === 'reveal') {
    if (!isQuestion(view) || canContinue(state)) return state;
    return { ...state, result: 'revealed', matched: null };
  }

  if (action.type === 'next') {
    if (isQuestion(view) && !canContinue(state)) return state; // man måste lösa frågan först
    const cleared = { attempts: 0, result: null, matched: null };
    /** @param {FlowState} s */
    const nextStep = (s) => {
      const stepIndex = s.stepIndex + 1;
      return { ...s, ...cleared, stepIndex, sub: 0, finished: stepIndex >= lesson.steps.length };
    };
    switch (view.kind) {
      case 'workedAsk':
        return { ...state, ...cleared, sub: state.sub + 1 };
      case 'guidedPart':
        return state.sub + 1 < view.step.parts.length ? { ...state, ...cleared, sub: state.sub + 1 } : nextStep(state);
      default:
        return nextStep(state);
    }
  }
  return state;
}
