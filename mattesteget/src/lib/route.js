// @ts-check
// Ren routinglogik (ingen DOM), så den går att testa i både webbläsare och Node.

/**
 * Gör om en hash som "#/moduler/4?x=1" till en ren sökväg: "/moduler/4".
 * @param {string} hash
 * @returns {string}
 */
export function parseHash(hash) {
  let path = String(hash || '').replace(/^#/, '').split('?')[0];
  if (!path.startsWith('/')) path = '/' + path;
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

/**
 * Matchar en sökväg mot rutter som kan ha parametrar, t.ex. "/moduler/:id".
 * @template {{ path: string }} R
 * @param {string} path
 * @param {R[]} routes
 * @returns {{ route: R, params: Record<string, string> } | null}
 */
export function matchRoute(path, routes) {
  const parts = path.split('/');
  for (const route of routes) {
    const pattern = route.path.split('/');
    if (pattern.length !== parts.length) continue;
    /** @type {Record<string, string>} */
    const params = {};
    let ok = true;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i].startsWith(':')) {
        try {
          params[pattern[i].slice(1)] = decodeURIComponent(parts[i]);
        } catch {
          ok = false;
          break;
        }
      } else if (pattern[i] !== parts[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return { route, params };
  }
  return null;
}
