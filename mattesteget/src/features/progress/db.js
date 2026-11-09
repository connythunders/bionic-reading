// @ts-check
// Lagring på enheten. IndexedDB när det går, annars minnet (då sparas inget mellan besök).
// Gränssnittet är detsamma: get, set, del, all och clear.

/**
 * @typedef {{
 *   kind: 'idb' | 'memory',
 *   get: (key: string) => Promise<any>,
 *   set: (key: string, value: any) => Promise<void>,
 *   del: (key: string) => Promise<void>,
 *   all: () => Promise<[string, any][]>,
 *   clear: () => Promise<void>
 * }} Backend
 */

/** Lagring i minnet. Används i tester och när IndexedDB saknas. @returns {Backend} */
export function createMemoryBackend() {
  /** @type {Map<string, any>} */
  const data = new Map();
  return {
    kind: 'memory',
    get: async (key) => structuredClone(data.get(key)),
    set: async (key, value) => { data.set(key, structuredClone(value)); },
    del: async (key) => { data.delete(key); },
    all: async () => [...data.entries()].map(([k, v]) => [k, structuredClone(v)]),
    clear: async () => { data.clear(); },
  };
}

/**
 * @param {{ dbName?: string, storeName?: string, idb?: IDBFactory }} [o]
 * @returns {Backend}
 */
export function createIdbBackend({ dbName = 'mattesteget', storeName = 'kv', idb = globalThis.indexedDB } = {}) {
  /** @type {Promise<IDBDatabase> | null} */
  let opened = null;
  const open = () => {
    opened ??= new Promise((resolve, reject) => {
      const req = idb.open(dbName, 1);
      req.onupgradeneeded = () => req.result.createObjectStore(storeName);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Databasen är blockerad'));
    });
    return opened;
  };

  /** @template T @param {IDBTransactionMode} mode @param {(store: IDBObjectStore) => IDBRequest<T>} fn @returns {Promise<T>} */
  const run = async (mode, fn) => {
    const db = await open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const req = fn(tx.objectStore(storeName));
      tx.oncomplete = () => resolve(req.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  };

  return {
    kind: 'idb',
    get: (key) => run('readonly', (s) => s.get(key)),
    set: async (key, value) => { await run('readwrite', (s) => s.put(value, key)); },
    del: async (key) => { await run('readwrite', (s) => s.delete(key)); },
    all: async () => {
      const keys = await run('readonly', (s) => s.getAllKeys());
      const values = await run('readonly', (s) => s.getAll());
      return keys.map((k, i) => [String(k), values[i]]);
    },
    clear: async () => { await run('readwrite', (s) => s.clear()); },
  };
}

/** Väljer IndexedDB om det finns, annars minnet. @returns {Backend} */
export function createBestBackend() {
  try {
    if (typeof indexedDB !== 'undefined' && indexedDB) return createIdbBackend();
  } catch {
    // faller tillbaka på minnet
  }
  return createMemoryBackend();
}
