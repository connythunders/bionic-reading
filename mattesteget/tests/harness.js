// @ts-check
// Minimal testkörare som fungerar i både webbläsare (tests/index.html) och Node (CI).

/** @type {{ name: string, fn: () => void | Promise<void>, browserOnly: boolean }[]} */
export const registry = [];

/**
 * @param {string} name
 * @param {() => void | Promise<void>} fn
 * @param {{ browserOnly?: boolean }} [opts]
 */
export function test(name, fn, opts = {}) {
  registry.push({ name, fn, browserOnly: !!opts.browserOnly });
}

export const assert = {
  /** @param {unknown} value @param {string} [msg] */
  ok(value, msg = 'Förväntade sant värde') {
    if (!value) throw new Error(msg);
  },
  /** @param {unknown} actual @param {unknown} expected @param {string} [msg] */
  equal(actual, expected, msg) {
    if (actual !== expected) {
      throw new Error(msg || `Förväntade ${JSON.stringify(expected)} men fick ${JSON.stringify(actual)}`);
    }
  },
  /** @param {unknown} actual @param {unknown} other @param {string} [msg] */
  notEqual(actual, other, msg) {
    if (actual === other) throw new Error(msg || `Förväntade ett annat värde än ${JSON.stringify(other)}`);
  },
  /** @param {unknown} actual @param {unknown} expected @param {string} [msg] */
  deepEqual(actual, expected, msg) {
    const a = JSON.stringify(actual);
    const b = JSON.stringify(expected);
    if (a !== b) throw new Error(msg || `Förväntade ${b} men fick ${a}`);
  },
  /** @param {number} actual @param {number} min @param {string} [msg] */
  atLeast(actual, min, msg) {
    if (!(actual >= min)) throw new Error(msg || `Förväntade minst ${min} men fick ${actual}`);
  },
  /** @param {() => unknown} fn @param {string} [msg] */
  throws(fn, msg = 'Förväntade att ett fel kastades') {
    let threw = false;
    try { fn(); } catch { threw = true; }
    if (!threw) throw new Error(msg);
  },
};

/**
 * Kör alla registrerade tester.
 * @param {{ isBrowser: boolean }} o
 * @returns {Promise<{ name: string, status: 'ok' | 'fail' | 'skip', error?: string }[]>}
 */
export async function runAll({ isBrowser }) {
  /** @type {{ name: string, status: 'ok' | 'fail' | 'skip', error?: string }[]} */
  const results = [];
  for (const t of registry) {
    if (t.browserOnly && !isBrowser) {
      results.push({ name: t.name, status: 'skip' });
      continue;
    }
    try {
      await t.fn();
      results.push({ name: t.name, status: 'ok' });
    } catch (e) {
      results.push({ name: t.name, status: 'fail', error: e instanceof Error ? e.message : String(e) });
    }
  }
  return results;
}
