// @ts-check
// Läser innehållet. Själva filläsningen skickas in som en funktion, så att samma kod
// fungerar i webbläsaren (fetch), i Node (fs) och i tester.
import { validateModules, validateGlossary } from './validate.js';

/**
 * @param {(relativePath: string) => Promise<string>} readText  läser en fil under content/
 * @returns {Promise<{ modules: any[], glossary: { terms: any[] }, errors: string[] }>}
 */
export async function loadContent(readText) {
  const index = JSON.parse(await readText('index.json'));
  if (!index || !Array.isArray(index.modules)) {
    return { modules: [], glossary: { terms: [] }, errors: ['content/index.json: fältet modules saknas'] };
  }
  /** @type {any[]} */
  const modules = [];
  /** @type {string[]} */
  const errors = [];
  for (const file of index.modules) {
    try {
      modules.push(JSON.parse(await readText(file)));
    } catch (e) {
      errors.push(`${file}: kunde inte läsas (${e instanceof Error ? e.message : String(e)})`);
    }
  }
  modules.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
  errors.push(...validateModules(modules));

  /** @type {{ terms: any[] }} */
  let glossary = { terms: [] };
  if (index.glossary) {
    try {
      glossary = JSON.parse(await readText(index.glossary));
      errors.push(...validateGlossary(glossary));
    } catch (e) {
      errors.push(`${index.glossary}: kunde inte läsas (${e instanceof Error ? e.message : String(e)})`);
    }
  }
  return { modules, glossary, errors };
}

/**
 * Läsare för webbläsaren.
 * @param {string} baseUrl  t.ex. new URL('../content/', import.meta.url).href
 * @returns {(relativePath: string) => Promise<string>}
 */
export function fetchReader(baseUrl) {
  return async (relativePath) => {
    const res = await fetch(new URL(relativePath, baseUrl));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  };
}
