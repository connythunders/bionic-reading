// @ts-check
// "Dela med din lärare" i Min resa: spara en fil eller kopiera en kort sammanfattning.
// Eleven bestämmer själv om hen delar något. Inget skickas automatiskt.
import { h } from '../../lib/dom.js';
import { exportFileName, summaryText } from './exportData.js';

/** Sparar en textfil via webbläsarens nedladdning. @param {string} name @param {string} text @param {string} [type] */
export function downloadFile(name, text, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * @param {{
 *   progress: ReturnType<typeof import('./progressStore.js').createProgress>,
 *   modules: any[],
 *   download?: (name: string, text: string) => void,
 *   clipboard?: { writeText: (text: string) => Promise<void> } | null,
 *   now?: () => Date
 * }} o
 * @returns {HTMLElement[]}
 */
export function shareSection({ progress, modules, download = downloadFile, clipboard = globalThis.navigator?.clipboard ?? null, now = () => new Date() }) {
  const status = h('p', { class: 'share-status', role: 'status' });
  const fallback = /** @type {HTMLTextAreaElement} */ (h('textarea', {
    class: 'share-fallback', readonly: true, rows: '7', hidden: true, 'aria-label': 'Sammanfattning att kopiera',
  }));

  const day = () => progress.today();

  function saveFile() {
    const data = progress.exportData(now());
    const name = exportFileName({ nickname: data.student.nickname, day: day() });
    download(name, JSON.stringify(data, null, 2));
    status.textContent = `Filen ${name} har skapats. Leta efter den i mappen Hämtade filer och ge den till din lärare.`;
  }

  async function copySummary() {
    const text = summaryText({
      nickname: progress.getProfile().nickname,
      modules,
      isDone: (id) => progress.isDone(id),
      helpedSteps: [...progress.itemsMap().values()].filter((r) => r.hintMax > 0).length,
      day: day(),
    });
    try {
      if (!clipboard) throw new Error('urklipp saknas');
      await clipboard.writeText(text);
      fallback.hidden = true;
      status.textContent = 'Sammanfattningen är kopierad. Klistra in den där du vill dela den.';
    } catch {
      // Urklipp kan vara blockerat. Visa texten så att eleven kan markera och kopiera själv.
      fallback.value = text;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      status.textContent = 'Det gick inte att kopiera automatiskt. Markera texten nedan och kopiera den.';
    }
  }

  return [
    h('h2', null, 'Dela med din lärare'),
    h('p', null, 'Du bestämmer själv om du vill dela. Filen innehåller dina steg, ledtrådar och svar, men inget namn utom smeknamnet.'),
    h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'btn', onclick: saveFile }, 'Spara som fil'),
      h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => void copySummary() }, 'Kopiera sammanfattning'),
    ),
    status,
    fallback,
  ];
}
