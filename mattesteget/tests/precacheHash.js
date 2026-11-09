// @ts-check
// Samma regler och samma hash som tools/precache.ps1. Används av testerna för att se om
// precache.js är gammal, både i webbläsaren och i Node (CI).

const TEXT_EXT = ['.html', '.js', '.css', '.json', '.webmanifest', '.svg', '.txt'];
const EXCLUDED_FILES = ['sw.js', 'precache.js', 'package.json', 'package-lock.json', 'tsconfig.json', '.gitignore', 'playwright.config.js', 'lighthouserc.json'];

/** Ska filen följa med offline? Samma regler som Test-Precached i precache.ps1. @param {string} path */
export function isPrecached(path) {
  if (/^(tests|tools|node_modules|\.github)\//.test(path)) return false;
  if (/\.(md|ps1)$/.test(path)) return false;
  if (/\.test\.js$/.test(path)) return false;
  return !EXCLUDED_FILES.includes(path);
}

/** @param {string} path */
const extOf = (path) => (path.lastIndexOf('.') >= 0 ? path.slice(path.lastIndexOf('.')).toLowerCase() : '');

/** @param {Uint8Array} bytes */
async function sha256Hex(bytes) {
  const digest = await crypto.subtle.digest('SHA-256', /** @type {BufferSource} */ (bytes));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * @param {{ path: string, bytes: Uint8Array }[]} entries
 * @returns {Promise<string>} versionen, 12 tecken
 */
export async function computeVersion(entries) {
  const sorted = [...entries].sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  let joined = '';
  for (const { path, bytes } of sorted) {
    let data = bytes;
    if (TEXT_EXT.includes(extOf(path))) {
      // Radbrytningar normaliseras så att Windows och Linux ger samma hash.
      const text = new TextDecoder('utf-8', { ignoreBOM: true }).decode(bytes).replaceAll('\r\n', '\n');
      data = new TextEncoder().encode(text);
    }
    joined += `${path}:${await sha256Hex(data)}\n`;
  }
  return (await sha256Hex(new TextEncoder().encode(joined))).slice(0, 12);
}

/** Bredd och höjd i en PNG-fil, eller null om det inte är en PNG. @param {Uint8Array} b */
export function pngSize(b) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (b.length < 24 || sig.some((v, i) => b[i] !== v)) return null;
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}
