// Kör testerna i Node. Används bara av CI (GitHub Actions). Lokalt öppnar du tests/index.html.
import './all.js';
import { runAll } from './harness.js';

const results = await runAll({ isBrowser: false });
let failed = 0;
for (const r of results) {
  const mark = r.status === 'ok' ? 'OK  ' : r.status === 'skip' ? 'HOPP' : 'FEL ';
  console.log(`${mark} ${r.name}${r.error ? `\n     ${r.error}` : ''}`);
  if (r.status === 'fail') failed++;
}
const ok = results.filter((r) => r.status === 'ok').length;
const skipped = results.filter((r) => r.status === 'skip').length;
console.log(`\n${ok} lyckades, ${failed} misslyckades, ${skipped} hoppades över (kräver webbläsare).`);
process.exit(failed ? 1 : 0);
