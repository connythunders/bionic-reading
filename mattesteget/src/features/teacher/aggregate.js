// @ts-check
// Sammanställning för läraren: översikt per modul, ledtrådar per uppgift och vanligaste felsvar.
// Ren logik utan DOM.
import { summarize } from '../progress/summary.js';
import { richToPlain } from '../../lib/richText.js';

/** @typedef {import('../progress/exportData.js').StudentData} StudentData */

/** @param {StudentData} student */
const doneChecker = (student) => (/** @type {string} */ id) => student.items[id]?.done === true;

/**
 * Hur långt varje elev har kommit i varje modul.
 * @param {StudentData[]} students @param {any[]} modules
 */
export function moduleOverview(students, modules) {
  const withLessons = modules.filter((m) => m.lessons.length > 0);
  return students.map((student) => {
    const s = summarize(withLessons, doneChecker(student));
    return {
      student,
      total: { done: s.done, total: s.total },
      modules: s.modules.map((m) => ({
        id: m.id, title: m.title, done: m.done, total: m.total,
        status: /** @type {'notStarted' | 'inProgress' | 'done'} */ (m.total > 0 && m.done >= m.total ? 'done' : m.done > 0 ? 'inProgress' : 'notStarted'),
      })),
    };
  });
}

/**
 * Statistik per övningsuppgift: hur många som gjort den, hur många som behövde ledtråd,
 * hur långt i ledtrådstrappan de kom och vilka felsvar som var vanligast.
 * @param {StudentData[]} students @param {any[]} modules
 */
export function practiceStats(students, modules) {
  const out = [];
  for (const m of modules) {
    for (const l of m.lessons) {
      for (const step of l.steps) {
        if (step.type !== 'practice') continue;
        const records = students.map((s) => s.items[step.id]).filter((r) => r?.done);
        if (records.length === 0) continue;
        /** @type {Map<string, number>} */
        const wrong = new Map();
        for (const r of records) for (const w of new Set(r.wrongAnswers)) wrong.set(w, (wrong.get(w) ?? 0) + 1);
        out.push({
          id: step.id,
          prompt: richToPlain(step.prompt),
          moduleTitle: m.title,
          lessonTitle: l.title,
          students: records.length,
          neededHint: records.filter((r) => r.hintMax > 0).length,
          avgHintMax: records.reduce((n, r) => n + r.hintMax, 0) / records.length,
          avgAttempts: records.reduce((n, r) => n + r.attempts, 0) / records.length,
          topWrong: [...wrong.entries()]
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .slice(0, 3)
            .map(([value, count]) => ({ value, count })),
        });
      }
    }
  }
  return out;
}

/** Uppgifter där eleverna behövt mest hjälp först. @param {ReturnType<typeof practiceStats>} stats */
export function byHints(stats) {
  return [...stats].sort((a, b) => b.avgHintMax - a.avgHintMax || b.neededHint - a.neededHint || a.id.localeCompare(b.id));
}

/** Uppgifter med felsvar, de med flest först. @param {ReturnType<typeof practiceStats>} stats */
export function withWrongAnswers(stats) {
  return stats
    .filter((s) => s.topWrong.length > 0)
    .sort((a, b) => b.topWrong.reduce((n, w) => n + w.count, 0) - a.topWrong.reduce((n, w) => n + w.count, 0) || a.id.localeCompare(b.id));
}
