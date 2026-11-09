// @ts-check
// Uppläsning med Web Speech API. Kontrollern tar emot talsyntesen som parameter, så att den
// går att testa med en låtsasimplementation. Texten läses mening för mening: det undviker
// Chromes avbrott vid långa texter och ger meningsmarkering även när ordmarkering saknas.
import { pickSwedishVoice } from './voices.js';
import { tokenAt } from './speakPlan.js';

/**
 * @typedef {{
 *   support: 'unsupported' | 'loading' | 'ready' | 'no-swedish',
 *   voice: any, status: 'idle' | 'speaking' | 'paused',
 *   activeId: string | null, finishedId: string | null, sentence: number, word: number
 * }} SpeechState
 * @typedef {{ type: 'start' | 'sentence' | 'word' | 'end' | 'stop' | 'voices' | 'blocked' | 'pause' | 'resume' }} SpeechEvent
 */

/**
 * @param {{
 *   synth?: any, Utterance?: any, getRate?: () => number, voiceTimeout?: number
 * }} [options]
 */
export function createSpeech(options = {}) {
  const synth = 'synth' in options ? options.synth : globalThis.speechSynthesis ?? null;
  const Utterance = options.Utterance ?? globalThis.SpeechSynthesisUtterance;
  const getRate = options.getRate ?? (() => 1);
  const voiceTimeout = options.voiceTimeout ?? 1500;

  /** @type {SpeechState} */
  let state = {
    support: synth && Utterance ? 'loading' : 'unsupported',
    voice: null, status: 'idle', activeId: null, finishedId: null, sentence: -1, word: -1,
  };
  /** @type {Set<(s: SpeechState, e: SpeechEvent) => void>} */
  const listeners = new Set();
  let runId = 0;
  /** @type {Promise<void> | null} */
  let initPromise = null;

  /** @param {Partial<SpeechState>} patch @param {SpeechEvent} event */
  function set(patch, event) {
    state = { ...state, ...patch };
    for (const fn of listeners) fn(state, event);
  }

  function refreshVoices() {
    const voice = pickSwedishVoice(synth.getVoices());
    set({ voice, support: voice ? 'ready' : 'no-swedish' }, { type: 'voices' });
  }

  /** Läser in röster. getVoices() är ofta tom tills voiceschanged-händelsen kommer. */
  function init() {
    if (initPromise) return initPromise;
    initPromise = new Promise((resolve) => {
      if (!synth || !Utterance) return resolve();
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        refreshVoices();
        resolve();
      };
      // Lyssnaren får ligga kvar: röster kan tillkomma senare.
      synth.addEventListener?.('voiceschanged', () => (settled ? refreshVoices() : settle()));
      if (synth.getVoices().length > 0) settle();
      else setTimeout(settle, voiceTimeout); // vissa enheter skickar aldrig händelsen
    });
    return initPromise;
  }

  /**
   * Läser upp en plan. Returnerar false om uppläsning inte är möjlig.
   * @param {string} id
   * @param {import('./speakPlan.js').Plan} plan
   * @returns {Promise<boolean>}
   */
  async function speak(id, plan) {
    if (state.support === 'loading') await init();
    if (state.support !== 'ready') {
      set({}, { type: 'blocked' });
      return false;
    }
    const run = ++runId;
    synth.cancel();
    set({ status: 'speaking', activeId: id, finishedId: null, sentence: 0, word: -1 }, { type: 'start' });
    playSentence(id, plan, 0, run);
    return true;
  }

  /** @param {string} id @param {import('./speakPlan.js').Plan} plan @param {number} i @param {number} run */
  function playSentence(id, plan, i, run) {
    if (run !== runId) return;
    if (i >= plan.sentences.length) {
      set({ status: 'idle', activeId: null, finishedId: id, sentence: -1, word: -1 }, { type: 'end' });
      return;
    }
    const sentence = plan.sentences[i];
    const u = new Utterance(sentence.text);
    u.lang = 'sv-SE';
    if (state.voice) u.voice = state.voice;
    u.rate = getRate();
    u.onstart = () => {
      if (run === runId) set({ sentence: i, word: -1 }, { type: 'sentence' });
    };
    u.onboundary = (/** @type {{ name?: string, charIndex: number }} */ e) => {
      if (run !== runId || (e.name && e.name !== 'word')) return;
      const word = tokenAt(sentence.tokens, e.charIndex);
      if (word >= 0) set({ sentence: i, word }, { type: 'word' });
    };
    u.onend = () => playSentence(id, plan, i + 1, run);
    u.onerror = (/** @type {{ error?: string }} */ e) => {
      if (run !== runId || e.error === 'interrupted' || e.error === 'canceled') return;
      stop();
    };
    synth.speak(u);
  }

  function pause() {
    if (state.status !== 'speaking') return;
    synth.pause();
    set({ status: 'paused' }, { type: 'pause' });
  }

  function resume() {
    if (state.status !== 'paused') return;
    synth.resume();
    set({ status: 'speaking' }, { type: 'resume' });
  }

  function stop() {
    if (!synth) return;
    runId++; // gör att kvarvarande händelser från den avbrutna uppläsningen ignoreras
    synth.cancel();
    if (state.status !== 'idle' || state.activeId) {
      set({ status: 'idle', activeId: null, finishedId: null, sentence: -1, word: -1 }, { type: 'stop' });
    }
  }

  return {
    init, speak, pause, resume, stop,
    getState: () => state,
    /** @param {(s: SpeechState, e: SpeechEvent) => void} fn @returns {() => void} */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
