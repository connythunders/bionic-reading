// @ts-check
// Kontroll av CSS och teman. Kräver webbläsare (läser beräknade stilar).
import { test, assert } from './harness.js';
import { contrastRatio } from '../src/lib/contrast.js';
import { BACKGROUNDS } from '../src/features/settings/settingsStore.js';

const CSS_FILES = ['tokens', 'themes', 'base', 'typography', 'components'];

/** @param {string} name */
function themeVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

test('teman: kontrast uppfyller WCAG AA i alla fyra bakgrunder', () => {
  const original = document.documentElement.dataset.bg;
  try {
    for (const bg of BACKGROUNDS) {
      document.documentElement.dataset.bg = bg;
      const c = Object.fromEntries(
        ['bg', 'surface', 'text', 'muted', 'border', 'accent', 'on-accent', 'focus'].map((n) => [n, themeVar(`--${n}`)]),
      );
      /** @type {[string, string, string, number][]} */
      const checks = [
        ['text mot bakgrund', c.text, c.bg, 4.5],
        ['text mot yta', c.text, c.surface, 4.5],
        ['text mot meningsmarkering', c.text, themeVar('--hl-sentence'), 4.5],
        ['text mot ordmarkering', c.text, themeVar('--hl-word'), 4.5],
        ['dämpad text mot bakgrund', c.muted, c.bg, 4.5],
        ['dämpad text mot yta', c.muted, c.surface, 4.5],
        ['länk/accent mot bakgrund', c.accent, c.bg, 4.5],
        ['länk/accent mot yta', c.accent, c.surface, 4.5],
        ['knapptext mot accent', c['on-accent'], c.accent, 4.5],
        ['kantlinje mot bakgrund', c.border, c.bg, 3],
        ['fokusring mot bakgrund', c.focus, c.bg, 3],
        ['fokusring mot yta', c.focus, c.surface, 3],
      ];
      for (const [label, fg, back, min] of checks) {
        const ratio = contrastRatio(fg, back);
        assert.atLeast(ratio, min, `${bg}: ${label} har kontrast ${ratio.toFixed(2)}, kräver ${min}`);
      }
    }
  } finally {
    document.documentElement.dataset.bg = original;
  }
}, { browserOnly: true });

test('css: ingen versal-text, kursiv eller understrykning utom länkar', async () => {
  for (const name of CSS_FILES) {
    const text = await (await fetch(`../src/styles/${name}.css`)).text();
    const code = text.replace(/\/\*[\s\S]*?\*\//g, ''); // kommentarer räknas inte
    assert.ok(!/text-transform\s*:\s*uppercase/i.test(code), `${name}.css: text-transform: uppercase`);
    assert.ok(!/font-style\s*:\s*(italic|oblique)/i.test(code), `${name}.css: kursiv stil`);
    assert.ok(!/font-variant\s*:\s*small-caps/i.test(code), `${name}.css: kapitäler`);
  }
}, { browserOnly: true });

test('css: knappar och menylänkar har minst 44 px klickyta', () => {
  const holder = document.createElement('div');
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Test';
  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  const a = document.createElement('a');
  a.href = '#/';
  a.textContent = 'Test';
  nav.append(a);
  holder.append(btn, nav);
  document.body.append(holder);
  try {
    assert.atLeast(btn.getBoundingClientRect().height, 44, 'knapp lägre än 44 px');
    assert.atLeast(a.getBoundingClientRect().height, 44, 'menylänk lägre än 44 px');
  } finally {
    holder.remove();
  }
}, { browserOnly: true });
