// @ts-check
// Elevfiler som läraren har läst in. Sparas lokalt på lärarens enhet, under nyckeln student:<id>.
// Samma elev (samma id) ersätts när en nyare fil läses in.

/**
 * @param {{ backend: import('../progress/db.js').Backend, now?: () => string }} o
 */
export function createStudentsStore({ backend, now = () => new Date().toISOString() }) {
  /** @type {Map<string, import('../progress/exportData.js').StudentData & { importedAt: string }>} */
  const students = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();
  const notify = () => listeners.forEach((fn) => fn());

  const ready = (async () => {
    try {
      for (const [key, value] of await backend.all()) {
        if (key.startsWith('student:')) students.set(key.slice(8), value);
      }
    } catch { /* börja med tomt */ }
  })();

  return {
    ready,
    /** Alla elever, sorterade på smeknamn. */
    list: () => [...students.values()].sort((a, b) => (a.nickname ?? '').localeCompare(b.nickname ?? '', 'sv') || a.id.localeCompare(b.id)),

    /** @param {import('../progress/exportData.js').StudentData} student */
    add(student) {
      const rec = { ...student, importedAt: now() };
      students.set(student.id, rec);
      backend.set(`student:${student.id}`, rec).catch(() => {});
      notify();
    },

    /** @param {string} id */
    remove(id) {
      students.delete(id);
      backend.del(`student:${id}`).catch(() => {});
      notify();
    },

    async clear() {
      const ids = [...students.keys()];
      students.clear();
      for (const id of ids) await backend.del(`student:${id}`).catch(() => {});
      notify();
    },

    /** @param {() => void} fn @returns {() => void} */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
