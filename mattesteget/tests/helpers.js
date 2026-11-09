// @ts-check
// Gemensamma hjälpare för tester som behöver det riktiga innehållet.
import { loadContent, fetchReader } from '../src/lib/contentLoader.js';

/** Läsare för content/: fetch i webbläsaren, fs i Node (CI). */
export async function readerForEnvironment() {
  const base = new URL('../content/', import.meta.url);
  if (typeof document !== 'undefined') return fetchReader(base.href);
  // Importen sker här så att webbläsaren aldrig försöker ladda den.
  // @ts-ignore node:fs/promises saknar typer i den här konfigurationen
  const { readFile } = await import('node:fs/promises');
  return (/** @type {string} */ p) => readFile(new URL(p, base), 'utf8');
}

/** Läser en fil i appmappen som bytes. Fetch i webbläsaren, fs i Node. @param {string} relPath */
export async function readAppBytes(relPath) {
  const base = new URL('../', import.meta.url);
  if (typeof document !== 'undefined') {
    const res = await fetch(new URL(relPath, base));
    if (!res.ok) throw new Error(`${relPath}: HTTP ${res.status}`);
    return new Uint8Array(await res.arrayBuffer());
  }
  // @ts-ignore node:fs/promises saknar typer i den här konfigurationen
  const { readFile } = await import('node:fs/promises');
  return new Uint8Array(await readFile(new URL(relPath, base)));
}

/** @param {string} relPath */
export async function readAppText(relPath) {
  return new TextDecoder().decode(await readAppBytes(relPath));
}

/** Alla filer i appmappen på disk (bara Node). @returns {Promise<string[]>} */
export async function listAppFilesOnDisk() {
  // @ts-ignore node-moduler saknar typer i den här konfigurationen
  const { readdir } = await import('node:fs/promises');
  // @ts-ignore
  const { relative, join } = await import('node:path');
  // @ts-ignore
  const { fileURLToPath } = await import('node:url');
  const root = fileURLToPath(new URL('../', import.meta.url));
  const entries = await readdir(root, { recursive: true, withFileTypes: true });
  return entries
    .filter((/** @type {any} */ e) => e.isFile())
    .map((/** @type {any} */ e) => relative(root, join(e.parentPath ?? e.path, e.name)).split('\\').join('/'))
    .filter((/** @type {string} */ p) => !p.startsWith('node_modules/') && !p.startsWith('.git/'));
}

export async function loadRealContent() {
  return loadContent(await readerForEnvironment());
}

/** @param {string} lessonId */
export async function loadRealLesson(lessonId) {
  const { modules } = await loadRealContent();
  const lesson = modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId);
  if (!lesson) throw new Error(`Lektionen ${lessonId} finns inte`);
  return lesson;
}
