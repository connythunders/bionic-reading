// @ts-check
import { h } from '../lib/dom.js';
import { createCalculator } from '../features/calculator/calculatorPanel.js';

/**
 * Bygger sidramen: hoppa-länk, sidhuvud med meny, miniräknare och hjälpknapp, och innehållet.
 * Hjälpknappen sitter alltid sist i sidhuvudet (WCAG 3.2.6).
 * @param {HTMLElement} root
 * @param {{ path: string, name: string, nav: boolean }[]} routes
 * @param {{ speech?: any, settings?: any }} [extras]
 */
export function buildLayout(root, routes, extras = {}) {
  const main = h('main', { id: 'main', tabindex: '-1' });
  const calculator = createCalculator({ speech: extras.speech, settings: extras.settings });

  // En knapp i stället för ankarlänk, eftersom hash används för routing.
  const skip = h('button', {
    type: 'button', class: 'btn skip',
    onclick: () => main.focus(),
  }, 'Hoppa till innehållet');

  const navLinks = routes.filter((r) => r.nav).map((r) =>
    h('a', { href: `#${r.path}`, 'data-path': r.path }, r.name),
  );

  const header = h('header', { class: 'site-header' },
    h('a', { class: 'brand', href: '#/' }, 'Mattesteget'),
    h('nav', { class: 'site-nav', 'aria-label': 'Huvudmeny' },
      h('ul', null, navLinks.map((a) => h('li', null, a))),
    ),
    calculator.toggle,
    h('a', { class: 'btn btn-secondary help-link', href: '#/hjalp', 'data-path': '/hjalp' }, 'Hjälp'),
  );

  // Meddelande när en ny version finns. Eleven väljer själv när hen vill uppdatera.
  /** @type {(() => void) | null} */
  let applyUpdate = null;
  const updateBar = h('div', { class: 'update-bar', role: 'status', hidden: true },
    h('p', null, 'Det finns en ny version av Mattesteget. Uppdatera när det passar dig, helst inte mitt i en uppgift.'),
    h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'btn', onclick: () => applyUpdate?.() }, 'Uppdatera nu'),
      h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { updateBar.hidden = true; } }, 'Senare'),
    ),
  );

  // Innehåll och miniräknare ligger bredvid varandra på breda skärmar och under varandra på smala.
  const workspace = h('div', { class: 'workspace' }, main, calculator.panel);
  root.replaceChildren(skip, header, updateBar, workspace);

  const helpLink = /** @type {HTMLElement} */ (header.querySelector('.help-link'));

  return {
    main,
    calculator,
    updateBar,
    /** Visar uppdateringsmeddelandet. @param {() => void} apply */
    offerUpdate(apply) {
      applyUpdate = apply;
      updateBar.hidden = false;
    },
    /** Markerar aktuell sida i menyn. @param {string} path */
    setCurrent(path) {
      for (const a of [...navLinks, helpLink]) {
        const p = a.getAttribute('data-path') || '';
        if (path === p || path.startsWith(p + '/')) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      }
    },
  };
}
