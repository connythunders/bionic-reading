// @ts-check
// Pengar som modell för positionssystemet: hundralappar, tior, enkronor, tioöringar och ettöringar.
// Tio av samma sort växlas automatiskt mot en av nästa sort, precis som i positionssystemet.
import { h } from '../../lib/dom.js';
import { speakMoney } from '../../lib/speakNumbers.js';

/** Värde i ören per sort, från största till minsta. */
export const COLUMNS = [
  { name: 'Hundralappar', one: 'hundralapp', ore: 10000, short: '100 kr', kind: 'note' },
  { name: 'Tior', one: 'tia', ore: 1000, short: '10 kr', kind: 'coin' },
  { name: 'Enkronor', one: 'enkrona', ore: 100, short: '1 kr', kind: 'coin' },
  { name: 'Tioöringar', one: 'tioöring', ore: 10, short: '10 öre', kind: 'coin' },
  { name: 'Ettöringar', one: 'ettöring', ore: 1, short: '1 öre', kind: 'coin' },
];

/** Belopp i ören. @param {number[]} counts */
export function totalOre(counts) {
  return counts.reduce((sum, c, i) => sum + c * COLUMNS[i].ore, 0);
}

/** "12,35 kr" av ören. @param {number} ore */
export function formatMoney(ore) {
  const kr = Math.floor(ore / 100);
  const rest = String(ore % 100).padStart(2, '0');
  return `${new Intl.NumberFormat('sv-SE').format(kr)},${rest} kr`;
}

/**
 * Lägger till en av en sort och växlar vid tio, steg för steg uppåt.
 * @param {number[]} counts @param {number} index
 * @returns {{ counts: number[], message: string | null, ok: boolean }}
 */
export function addOne(counts, index) {
  const next = [...counts];
  /** @type {string[]} */
  const messages = [];
  let i = index;
  next[i] += 1;
  while (next[i] >= 10) {
    if (i === 0) return { counts, message: 'Det går inte att lägga till fler hundralappar.', ok: false };
    next[i] = 0;
    next[i - 1] += 1;
    messages.push(`10 ${COLUMNS[i].name.toLowerCase()} växlades mot 1 ${COLUMNS[i - 1].one}.`);
    i--;
  }
  return { counts: next, message: messages.join(' ') || null, ok: true };
}

/** @param {number[]} counts @param {number} index */
export function removeOne(counts, index) {
  if (counts[index] <= 0) return counts;
  const next = [...counts];
  next[index] -= 1;
  return next;
}

/**
 * @param {{ values?: number[], interactive?: boolean, onChange?: (counts: number[]) => void }} o
 * @returns {{ el: HTMLElement, getCounts: () => number[] }}
 */
export function createMoney({ values = [0, 0, 0, 0, 0], interactive = true, onChange }) {
  let counts = COLUMNS.map((_, i) => Math.min(9, Math.max(0, Math.floor(values[i] ?? 0))));
  const root = h('div', { class: 'money', role: 'group', 'aria-label': 'Pengar och positionssystemet' });
  const total = h('p', { class: 'money-total' });
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  const cols = h('div', { class: 'money-cols' });

  /** @type {{ count: HTMLElement, coins: HTMLElement, minus: HTMLButtonElement | null }[]} */
  const cells = COLUMNS.map((col, i) => {
    const coins = h('div', { class: `coins ${col.kind}s`, 'aria-hidden': 'true' });
    const count = h('output', { class: 'money-count' });
    /** @type {HTMLButtonElement | null} */
    let minus = null;
    const children = [h('h3', null, col.name), h('p', { class: 'money-short' }, col.short), coins, count];
    if (interactive) {
      minus = /** @type {HTMLButtonElement} */ (h('button', {
        type: 'button', class: 'btn btn-secondary', 'aria-label': `Ta bort en ${col.one}`,
        onclick: () => {
          if (counts[i] === 0) { live.textContent = `Det finns ingen ${col.one} att ta bort.`; return; }
          change(removeOne(counts, i), null);
        },
      }, 'Ta bort'));
      children.push(h('div', { class: 'money-buttons' },
        minus,
        h('button', {
          type: 'button', class: 'btn', 'aria-label': `Lägg till en ${col.one}`,
          onclick: () => { const r = addOne(counts, i); change(r.counts, r.message); },
        }, 'Lägg till'),
      ));
    }
    cols.append(h('div', { class: 'money-col' }, children));
    return { count, coins, minus };
  });

  /** @param {number[]} next @param {string | null} message */
  function change(next, message) {
    counts = next;
    draw();
    live.textContent = `${message ? `${message} ` : ''}Summa: ${speakMoney(totalOre(counts))}.`;
    onChange?.([...counts]);
  }

  function draw() {
    cells.forEach((cell, i) => {
      cell.count.textContent = String(counts[i]);
      cell.coins.replaceChildren(...Array.from({ length: counts[i] }, () => h('span', { class: 'coin' })));
      // aria-disabled i stället för disabled, så att fokus inte försvinner när knappen blir overksam.
      if (cell.minus) cell.minus.setAttribute('aria-disabled', String(counts[i] === 0));
    });
    total.textContent = `Summa: ${formatMoney(totalOre(counts))}`;
  }

  draw();
  root.append(cols, total, live);
  return { el: root, getCounts: () => [...counts] };
}
