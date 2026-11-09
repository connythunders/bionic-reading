// @ts-check
// Vyer och rutter. Varje vy returnerar { title, el } och har exakt en h1.
import { h } from '../lib/dom.js';
import { settingsView } from '../features/settings/settingsPage.js';

/**
 * @typedef {{ settings: ReturnType<typeof import('../features/settings/settingsStore.js').createSettingsStore> }} Ctx
 * @typedef {{ title: string, el: HTMLElement }} View
 */

/** Tillfällig vy för delar som byggs i senare steg. */
/** @param {string} title @param {string} text @returns {View} */
function placeholder(title, text) {
  return {
    title,
    el: h('div', null, h('h1', null, title), h('p', { class: 'lead' }, text)),
  };
}

/** @returns {View} */
export function homeView() {
  const cards = [
    ['#/idag', 'Dagens pass', 'Kort repetition och blandade uppgifter, 10–15 minuter.'],
    ['#/moduler', 'Moduler', 'Välj ett område och öva i din egen takt.'],
    ['#/min-resa', 'Min resa', 'Se hur långt du har kommit.'],
    ['#/installningar', 'Inställningar', 'Ändra typsnitt, textstorlek, bakgrund och rörelse.'],
  ];
  return {
    title: 'Start',
    el: h('div', null,
      h('h1', null, 'Mattesteget'),
      h('p', { class: 'lead' }, 'Öva matte i din egen takt. Välj var du vill börja.'),
      h('div', { class: 'card-grid' },
        cards.map(([href, name, text]) =>
          h('section', { class: 'card' },
            h('h2', null, h('a', { href }, name)),
            h('p', null, text),
          ),
        ),
      ),
    ),
  };
}

/** @returns {View} */
export function helpView() {
  return {
    title: 'Hjälp',
    el: h('div', null,
      h('h1', null, 'Hjälp'),
      h('p', null, 'Mattesteget hjälper dig att öva matte steg för steg. Du väljer själv vad du vill öva på och hur snabbt du går fram.'),
      h('h2', null, 'Så använder du appen'),
      h('ul', null,
        h('li', null, 'Använd menyn högst upp för att byta mellan Dagens pass, Moduler, Min resa och Inställningar.'),
        h('li', null, 'Du kan använda appen enbart med tangentbordet. Tabb flyttar mellan knappar och länkar.'),
        h('li', null, 'Under Inställningar ändrar du typsnitt, textstorlek, avstånd och bakgrund.'),
      ),
      h('h2', null, 'Dina uppgifter'),
      h('p', null, 'Det du gör sparas bara på den här enheten. Inget skickas någonstans.'),
    ),
  };
}

/** @returns {View} */
function notFoundView() {
  return {
    title: 'Sidan finns inte',
    el: h('div', null,
      h('h1', null, 'Sidan finns inte'),
      h('p', null, 'Vi hittar inte den här sidan.'),
      h('p', null, h('a', { class: 'btn', href: '#/' }, 'Till startsidan')),
    ),
  };
}

export { notFoundView };

/**
 * @typedef {{ path: string, name: string, nav: boolean, view: (ctx: Ctx, params: Record<string, string>) => View }} RouteDef
 * @type {RouteDef[]}
 */
export const routes = [
  { path: '/', name: 'Start', nav: false, view: () => homeView() },
  { path: '/idag', name: 'Dagens pass', nav: true, view: () => placeholder('Dagens pass', 'Den här delen är inte klar än.') },
  { path: '/moduler', name: 'Moduler', nav: true, view: () => placeholder('Moduler', 'Den här delen är inte klar än.') },
  { path: '/min-resa', name: 'Min resa', nav: true, view: () => placeholder('Min resa', 'Den här delen är inte klar än.') },
  { path: '/installningar', name: 'Inställningar', nav: true, view: (ctx) => settingsView(ctx) },
  { path: '/hjalp', name: 'Hjälp', nav: false, view: () => helpView() },
];
