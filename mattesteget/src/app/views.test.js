// @ts-check
// Vytester. Kräver DOM och körs därför bara i webbläsaren.
import { test, assert } from '../../tests/harness.js';
import { routes, notFoundView } from './views.js';
import { createSettingsStore } from '../features/settings/settingsStore.js';
import { buildLayout } from './layout.js';

const memory = { getItem: () => null, setItem: () => {} };

function allViews() {
  const ctx = { settings: createSettingsStore(memory) };
  return [...routes.map((r) => ({ name: r.name, view: r.view(ctx, {}) })), { name: 'Sidan finns inte', view: notFoundView() }];
}

test('vyer: varje vy har exakt en h1 och inga rubrikhopp', () => {
  for (const { name, view } of allViews()) {
    const headings = [...view.el.querySelectorAll('h1,h2,h3,h4')];
    assert.equal(view.el.querySelectorAll('h1').length, 1, `${name}: ska ha exakt en h1`);
    let prev = 0;
    for (const hd of headings) {
      const level = Number(hd.tagName[1]);
      assert.ok(level <= prev + 1, `${name}: rubriknivån hoppar från ${prev} till ${level}`);
      prev = level;
    }
  }
}, { browserOnly: true });

test('vyer: ingen kursiv eller understruken markup, inga versalrubriker', () => {
  for (const { name, view } of allViews()) {
    assert.equal(view.el.querySelectorAll('em,i,u,cite').length, 0, `${name}: kursiv/understruken markup`);
    for (const hd of view.el.querySelectorAll('h1,h2,h3,h4')) {
      const text = hd.textContent || '';
      assert.ok(text !== text.toUpperCase() || !/[A-ZÅÄÖ]{2,}/.test(text), `${name}: versalrubrik "${text}"`);
    }
  }
}, { browserOnly: true });

test('vyer: texten innehåller aldrig ordet "fel" eller kryss', () => {
  for (const { name, view } of allViews()) {
    const text = view.el.textContent || '';
    assert.ok(!/\bfel\b/i.test(text), `${name}: innehåller ordet "fel"`);
    assert.ok(!/[✗✘❌]/.test(text), `${name}: innehåller kryss`);
  }
}, { browserOnly: true });

test('vyer: inga inline-stilar (CSP förbjuder dem)', () => {
  for (const { name, view } of allViews()) {
    assert.equal(view.el.querySelectorAll('[style]').length, 0, `${name}: har style-attribut`);
  }
}, { browserOnly: true });

test('layout: hjälpknappen finns sist i sidhuvudet och menyn har etikett', () => {
  const root = document.createElement('div');
  buildLayout(root, routes);
  const header = /** @type {HTMLElement} */ (root.querySelector('header'));
  const last = header.lastElementChild;
  assert.ok(last && last.classList.contains('help-link'), 'hjälpknappen ska vara sist i sidhuvudet');
  assert.equal(root.querySelector('nav')?.getAttribute('aria-label'), 'Huvudmeny');
  const toggle = /** @type {HTMLElement} */ (header.querySelector('.calc-toggle'));
  assert.ok(toggle, 'miniräknarknappen finns i sidhuvudet');
  assert.equal(root.querySelector(`#${toggle.getAttribute('aria-controls')}`)?.tagName, 'ASIDE');
  assert.ok(root.querySelector('main#main'), 'main#main saknas');
}, { browserOnly: true });
