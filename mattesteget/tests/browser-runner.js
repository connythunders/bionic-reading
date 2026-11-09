// @ts-check
import './all.js';
import { runAll } from './harness.js';

const results = await runAll({ isBrowser: true });
const list = /** @type {HTMLElement} */ (document.getElementById('results'));
const summary = /** @type {HTMLElement} */ (document.getElementById('summary'));

let failed = 0;
for (const r of results) {
  const li = document.createElement('li');
  li.dataset.status = r.status;
  const label = r.status === 'ok' ? 'Klart' : r.status === 'skip' ? 'Hoppad' : 'Misslyckades';
  li.textContent = `${label}: ${r.name}${r.error ? ` – ${r.error}` : ''}`;
  list.append(li);
  if (r.status === 'fail') failed++;
}
const ok = results.filter((r) => r.status === 'ok').length;
summary.textContent = failed
  ? `${failed} test misslyckades, ${ok} lyckades.`
  : `Alla ${ok} tester lyckades.`;
summary.dataset.failed = String(failed);
document.title = `${failed ? 'Misslyckades' : 'Klart'} – Tester`;
