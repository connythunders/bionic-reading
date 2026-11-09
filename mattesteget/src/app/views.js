// @ts-check
// Vyer och rutter. Varje vy returnerar { title, el } och har exakt en h1.
import { h } from '../lib/dom.js';
import { settingsView } from '../features/settings/settingsPage.js';
import { createLessonPlayer } from '../features/lesson/lessonPlayer.js';
import { createSpeech } from '../features/tts/speech.js';

/**
 * @typedef {{
 *   settings: ReturnType<typeof import('../features/settings/settingsStore.js').createSettingsStore>,
 *   content?: { modules: any[], errors: string[] },
 *   speech?: ReturnType<typeof import('../features/tts/speech.js').createSpeech>
 * }} Ctx
 * @typedef {{ title: string, el: HTMLElement, dispose?: () => void }} View
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

/** @param {Ctx} ctx @returns {View} */
export function modulesView(ctx) {
  const modules = ctx.content?.modules ?? [];
  if (modules.length === 0) {
    return {
      title: 'Moduler',
      el: h('div', null, h('h1', null, 'Moduler'), h('p', null, 'Innehållet kunde inte läsas in. Ladda om sidan och försök igen.')),
    };
  }
  return {
    title: 'Moduler',
    el: h('div', null,
      h('h1', null, 'Moduler'),
      h('p', { class: 'lead' }, 'Välj ett område och en lektion. Du bestämmer själv tempot.'),
      h('div', { class: 'card-grid' },
        modules.map((m) =>
          h('section', { class: 'card' },
            h('h2', null, m.title),
            h('p', null, m.summary),
            m.lessons.length === 0
              ? h('p', null, 'Kommer snart.')
              : h('ul', { class: 'lesson-list' },
                m.lessons.map((/** @type {any} */ l) => h('li', null, h('a', { href: `#/lektion/${l.id}` }, l.title)))),
          ),
        ),
      ),
    ),
  };
}

/** @param {Ctx} ctx @param {Record<string, string>} params @returns {View} */
export function lessonView(ctx, params) {
  const lesson = (ctx.content?.modules ?? []).flatMap((m) => m.lessons).find((/** @type {any} */ l) => l.id === params.lessonId);
  if (!lesson) return notFoundView();
  const speech = ctx.speech ?? createSpeech({ synth: null });
  const player = createLessonPlayer(lesson, { speech, settings: ctx.settings });
  return {
    title: lesson.title,
    el: h('div', null,
      h('p', null, h('a', { href: '#/moduler' }, 'Till modulerna')),
      h('h1', null, lesson.title),
      h('p', { class: 'lead' }, lesson.goal.text),
      player.el,
    ),
    dispose: () => player.dispose(),
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
  { path: '/moduler', name: 'Moduler', nav: true, view: (ctx) => modulesView(ctx) },
  { path: '/lektion/:lessonId', name: 'Lektion', nav: false, view: (ctx, params) => lessonView(ctx, params) },
  { path: '/min-resa', name: 'Min resa', nav: true, view: () => placeholder('Min resa', 'Den här delen är inte klar än.') },
  { path: '/installningar', name: 'Inställningar', nav: true, view: (ctx) => settingsView(ctx) },
  { path: '/hjalp', name: 'Hjälp', nav: false, view: () => helpView() },
];
