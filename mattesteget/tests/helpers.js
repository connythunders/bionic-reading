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
