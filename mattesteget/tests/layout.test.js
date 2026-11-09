// @ts-check
// WCAG 1.4.12 (textavstånd) och 1.4.10 (reflow): ladda varje vy i en iframe, tvinga fram textavstånden
// via CSS och kontrollera att inget klipps bort och att sidan inte får sidscroll.
import { test, assert } from './harness.js';

const TEXT_SPACING_CSS = `
  * { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
  p { margin-bottom: 2em !important; }
`;

const ROUTES = ['/', '/moduler', '/lektion/procent-vardag-1', '/ordlista', '/min-resa', '/installningar', '/lararvy', '/hjalp', '/idag'];

const wait = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Laddar appen i en iframe med given bredd och väntar tills vyn är ritad.
 * @param {string} route @param {number} width
 * @returns {Promise<{ frame: HTMLIFrameElement, win: Window & typeof globalThis, doc: Document }>}
 */
async function openApp(route, width) {
  const frame = document.createElement('iframe');
  frame.style.cssText = `width:${width}px;height:900px;border:0;position:absolute;left:-10000px;top:0`;
  frame.src = `../index.html?t=${Date.now()}#${route}`;
  document.body.append(frame);
  await new Promise((resolve) => frame.addEventListener('load', resolve, { once: true }));
  const win = /** @type {any} */ (frame.contentWindow);
  const doc = /** @type {Document} */ (frame.contentDocument);
  for (let i = 0; i < 60 && !doc.querySelector('main h1'); i++) await wait(50);
  await wait(100);
  return { frame, win, doc };
}

/** @param {Document} doc @param {any} win */
function applyTextSpacing(doc, win) {
  const sheet = new win.CSSStyleSheet();
  sheet.replaceSync(TEXT_SPACING_CSS);
  doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
}

/** Hittar innehåll som klipps bort eller gör sidan bredare än fönstret.
 * @param {Document} doc @param {any} win @returns {string[]} */
function findProblems(doc, win) {
  /** @type {string[]} */
  const problems = [];
  const root = doc.documentElement;
  if (root.scrollWidth > root.clientWidth + 1) problems.push(`sidan får sidscroll (${root.scrollWidth} > ${root.clientWidth})`);
  for (const el of /** @type {NodeListOf<HTMLElement>} */ (doc.body.querySelectorAll('*'))) {
    if (el.closest('.visually-hidden, .skip, [hidden], .table-wrap')) continue;
    const cs = win.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const clipsX = cs.overflowX === 'hidden' || cs.overflowX === 'clip';
    const clipsY = cs.overflowY === 'hidden' || cs.overflowY === 'clip';
    if ((clipsX && el.scrollWidth > el.clientWidth + 1) || (clipsY && el.scrollHeight > el.clientHeight + 1)) {
      problems.push(`klippt innehåll i <${el.tagName.toLowerCase()} class="${el.className}">`);
    }
    // Text som sticker utanför sin behållare till höger om fönstret (men inte i en egen scrollruta)
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > root.clientWidth + 2 && !el.closest('.table-wrap') && el.children.length === 0 && (el.textContent || '').trim()) {
      problems.push(`text utanför fönstret i <${el.tagName.toLowerCase()} class="${el.className}">: "${(el.textContent || '').trim().slice(0, 30)}"`);
    }
  }
  return problems;
}

/** Kör en kontroll på alla vyer. @param {{ width: number, spacing: boolean }} o */
async function checkAllViews({ width, spacing }) {
  /** @type {string[]} */
  const all = [];
  for (const route of ROUTES) {
    const { frame, win, doc } = await openApp(route, width);
    try {
      if (spacing) applyTextSpacing(doc, win);
      await wait(50);
      for (const p of findProblems(doc, win)) all.push(`${route}: ${p}`);
    } finally {
      frame.remove();
    }
  }
  return all;
}

/** Går fram till en övningsuppgift med öppen ledtrådstrappa, i appen i iframen. @param {Document} doc */
async function toPracticeWithHints(doc) {
  const btn = (/** @type {string} */ t) => /** @type {HTMLButtonElement | undefined} */ ([...doc.querySelectorAll('button')].find((b) => (b.textContent || '').replace(/\s/g, ' ') === t));
  const submit = (/** @type {string} */ v) => {
    const i = /** @type {HTMLInputElement} */ (doc.querySelector('input.answer-input'));
    i.value = v;
    /** @type {HTMLFormElement} */ (i.form).requestSubmit();
  };
  for (let i = 0; i < 60 && !doc.querySelector('.hints'); i++) {
    if (doc.querySelector('input.answer-input')) { submit('abc'); submit('-99999'); }
    btn('Visa svaret')?.click();
    btn('Fortsätt')?.click();
  }
  submit('7');
  for (const label of ['Läs upp uppgiften igen', 'Visa en bild', 'Visa första steget', 'Visa hela lösningen']) btn(label)?.click();
  await wait(100);
}

test('textavstånd (1.4.12): inget klipps bort i någon vy med 0,12 em bokstavs-, 0,16 em ord- och 2 em styckeavstånd', async () => {
  const problems = await checkAllViews({ width: 360, spacing: true });
  assert.deepEqual(problems, [], `Problem med textavstånd:\n${problems.join('\n')}`);
}, { browserOnly: true });

test('reflow (1.4.10): ingen vy får sidscroll vid 320 px bredd', async () => {
  const problems = await checkAllViews({ width: 320, spacing: false });
  assert.deepEqual(problems, [], `Problem vid 320 px:\n${problems.join('\n')}`);
}, { browserOnly: true });

test('textavstånd och reflow: lektion med ledtrådstrappa och miniräknare öppen', async () => {
  const { frame, win, doc } = await openApp('/lektion/procent-vardag-1', 320);
  try {
    await toPracticeWithHints(doc);
    /** @type {HTMLButtonElement} */ (doc.querySelector('.calc-toggle')).click();
    for (const k of ['8', '0', '0', '*', '2', '5', '%', '=']) /** @type {HTMLButtonElement} */ (doc.querySelector(`[data-key="${CSS.escape(k)}"]`)).click();
    await wait(100);
    assert.ok(doc.querySelector('.hint-item ol.solution'), 'hela lösningen visas');
    const plain = findProblems(doc, win);
    applyTextSpacing(doc, win);
    await wait(50);
    const spaced = findProblems(doc, win);
    assert.deepEqual([...plain, ...spaced], [], `Problem:\n${[...plain, ...spaced].join('\n')}`);
  } finally {
    frame.remove();
  }
}, { browserOnly: true });

test('textavstånd och reflow: tallinje, bråkstavar, pengar och procentstapel', async () => {
  for (const lesson of ['tallinjen-1', 'decimaltal-1', 'brak-1', 'bdp-1']) {
    const { frame, win, doc } = await openApp(`/lektion/${lesson}`, 320);
    try {
      applyTextSpacing(doc, win);
      await wait(100);
      const problems = findProblems(doc, win);
      assert.deepEqual(problems, [], `${lesson}:\n${problems.join('\n')}`);
      assert.ok(doc.querySelector('.nl, .fb, .money, .pb'), `${lesson}: en representation ska synas`);
    } finally {
      frame.remove();
    }
  }
}, { browserOnly: true });

test('mörkt läge och stor text: sidan startar direkt med sparade inställningar (ingen blinkning)', async () => {
  localStorage.setItem('ms.settings', JSON.stringify({ background: 'dark', fontSize: 28, font: 'opendyslexic' }));
  try {
    const frame = document.createElement('iframe');
    frame.style.cssText = 'width:400px;height:600px;border:0;position:absolute;left:-10000px';
    frame.src = `../index.html?t=${Date.now()}#/`;
    document.body.append(frame);
    // Direkt när dokumentet finns, innan modulerna hunnit köra, ska attributen redan vara satta.
    // Vänta tills sidans HTML finns men innan appens moduler har ritat något (main saknas än).
    /** @type {string | undefined} */
    let bgBeforeApp;
    for (let i = 0; i < 400; i++) {
      const d = frame.contentDocument;
      if (d && d.documentElement && d.querySelector('#app') && !d.querySelector('main')) { bgBeforeApp = d.documentElement.dataset.bg; break; }
      if (d && d.querySelector('main')) break;
      await wait(2);
    }
    for (let i = 0; i < 60 && !frame.contentDocument?.querySelector('main h1'); i++) await wait(50);
    const d = /** @type {Document} */ (frame.contentDocument);
    assert.equal(d.documentElement.dataset.bg, 'dark');
    assert.equal(d.documentElement.style.getPropertyValue('--fs'), '28px');
    // Om vi hann se sidan före appen ska temat redan ha varit rätt då (annars blinkar den krämvit).
    if (bgBeforeApp !== undefined) assert.equal(bgBeforeApp, 'dark', 'mörkt läge ska vara på redan innan appen ritat');
    frame.remove();
  } finally {
    localStorage.removeItem('ms.settings');
  }
}, { browserOnly: true });
