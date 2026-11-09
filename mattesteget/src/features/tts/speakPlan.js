// @ts-check
// Bygger en uppläsningsplan av en RichText. Ren logik utan DOM.
//
// Texten som visas och texten som läses upp skiljer sig ("25 %" läses "25 procent"),
// så för markeringen delar vi upp båda i meningar och ord:
//   - Ordmarkering görs bara i meningar där antalet visade och uppläsna ord stämmer.
//   - I övriga meningar markeras hela meningen.
//   - Om det inte går att para ihop meningarna markeras hela texten.
import { parseRich, richToSpeech } from '../../lib/richText.js';

const SENTENCE_END = /[.!?]["')»]*$/;
const PUNCTUATION_ONLY = /^[.,;:!?)"'»]+$/;

/**
 * @typedef {{ kind: 'word' | 'formula', text: string, bold: boolean, space: string,
 *             formula?: { expr: string, speak: string }, spoken: number }} Unit
 * @typedef {{ text: string, start: number, tokens: { start: number, end: number }[],
 *             units: number[], wordMap: number[] | null }} PlanSentence
 * @typedef {{ spoken: string, units: Unit[], sentences: PlanSentence[] }} Plan
 */

/** @param {string} str @returns {{ text: string, start: number, end: number }[]} */
export function tokenize(str) {
  const out = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(str)) !== null) out.push({ text: m[0], start: m.index, end: m.index + m[0].length });
  return out;
}

/**
 * De delar som visas, i ordning. `space` är mellanrummet före delen.
 * @param {{ text: string, formulas?: Record<string, { expr: string, speak: string }> }} rt
 * @returns {Unit[]}
 */
export function buildUnits(rt) {
  /** @type {Unit[]} */
  const units = [];
  let space = '';
  for (const seg of parseRich(rt)) {
    if (seg.type === 'formula') {
      const formula = rt.formulas?.[seg.value];
      units.push({ kind: 'formula', text: seg.value, bold: false, space, formula, spoken: formula ? tokenize(formula.speak).length : 0 });
      space = '';
      continue;
    }
    for (const part of seg.value.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) space += ' ';
      else {
        units.push({ kind: 'word', text: part, bold: seg.type === 'bold', space, spoken: PUNCTUATION_ONLY.test(part) ? 0 : 1 });
        space = '';
      }
    }
  }
  return units;
}

/**
 * @param {{ text: string, speak?: string, formulas?: Record<string, { expr: string, speak: string }> }} rt
 * @param {{ extraSpeech?: string }} [opts]  extra text som bara läses upp (t.ex. en formel som visas separat)
 * @returns {Plan}
 */
export function buildPlan(rt, opts = {}) {
  const units = buildUnits(rt);
  const spoken = [richToSpeech(rt), opts.extraSpeech].filter(Boolean).join(' ');
  const tokens = tokenize(spoken);

  /** @type {PlanSentence[]} */
  const sentences = [];
  /** @type {typeof tokens} */
  let group = [];
  const closeGroup = () => {
    if (!group.length) return;
    const start = group[0].start;
    const end = group[group.length - 1].end;
    sentences.push({
      text: spoken.slice(start, end), start,
      tokens: group.map((t) => ({ start: t.start - start, end: t.end - start })),
      units: [], wordMap: null,
    });
    group = [];
  };
  for (const t of tokens) {
    group.push(t);
    if (SENTENCE_END.test(t.text)) closeGroup();
  }
  closeGroup();

  // Samma indelning för det som visas.
  /** @type {number[][]} */
  const shown = [];
  /** @type {number[]} */
  let current = [];
  units.forEach((u, i) => {
    current.push(i);
    if (u.kind === 'word' && SENTENCE_END.test(u.text)) { shown.push(current); current = []; }
  });
  if (current.length) shown.push(current);

  if (sentences.length >= shown.length) {
    sentences.forEach((s, k) => {
      const idx = shown[k];
      if (!idx) return; // extra uppläst mening som inte visas
      s.units = idx;
      const count = idx.reduce((sum, i) => sum + units[i].spoken, 0);
      if (count === s.tokens.length) {
        /** @type {number[]} */
        const map = [];
        for (const i of idx) for (let n = 0; n < units[i].spoken; n++) map.push(i);
        s.wordMap = map;
      }
    });
  } else {
    // Går inte att para ihop: markera hela texten.
    const all = units.map((_, i) => i);
    for (const s of sentences) s.units = all;
  }
  return { spoken, units, sentences };
}

/**
 * Vilket uppläst ord ligger på teckenpositionen?
 * @param {{ start: number, end: number }[]} tokens @param {number} charIndex
 */
export function tokenAt(tokens, charIndex) {
  let found = -1;
  for (let i = 0; i < tokens.length; i++) if (tokens[i].start <= charIndex) found = i;
  return found;
}
