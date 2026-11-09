// @ts-check
// Sammanfattning av progressionen per modul och lektion. Ren logik.

/**
 * @typedef {{ id: string, title: string, done: number, total: number, status: 'notStarted' | 'inProgress' | 'done' }} LessonSummary
 * @typedef {{ id: string, title: string, done: number, total: number, lessons: LessonSummary[] }} ModuleSummary
 */

/** @param {number} done @param {number} total @returns {'notStarted' | 'inProgress' | 'done'} */
function statusOf(done, total) {
  if (total > 0 && done >= total) return 'done';
  return done > 0 ? 'inProgress' : 'notStarted';
}

/**
 * @param {any[]} modules
 * @param {(stepId: string) => boolean} isDone
 * @returns {{ done: number, total: number, modules: ModuleSummary[] }}
 */
export function summarize(modules, isDone) {
  /** @type {ModuleSummary[]} */
  const out = modules.map((m) => {
    const lessons = m.lessons.map((/** @type {any} */ l) => {
      const total = l.steps.length;
      const done = l.steps.filter((/** @type {any} */ s) => isDone(s.id)).length;
      return { id: l.id, title: l.title, done, total, status: statusOf(done, total) };
    });
    return {
      id: m.id, title: m.title, lessons,
      done: lessons.reduce((n, l) => n + l.done, 0),
      total: lessons.reduce((n, l) => n + l.total, 0),
    };
  });
  return {
    done: out.reduce((n, m) => n + m.done, 0),
    total: out.reduce((n, m) => n + m.total, 0),
    modules: out,
  };
}
