// @ts-check
import { h } from '../lib/dom.js';

/**
 * Bygger sidramen: hoppa-länk, sidhuvud med meny och hjälpknapp, och main.
 * Hjälpknappen sitter alltid sist i sidhuvudet (WCAG 3.2.6).
 * @param {HTMLElement} root
 * @param {{ path: string, name: string, nav: boolean }[]} routes
 */
export function buildLayout(root, routes) {
  const main = h('main', { id: 'main', tabindex: '-1' });

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
    h('a', { class: 'btn btn-secondary help-link', href: '#/hjalp', 'data-path': '/hjalp' }, 'Hjälp'),
  );

  root.replaceChildren(skip, header, main);

  const helpLink = /** @type {HTMLElement} */ (header.querySelector('.help-link'));

  return {
    main,
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
