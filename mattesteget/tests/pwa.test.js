// @ts-check
// PWA och offline: manifest, ikoner, precache-lista, service worker och att inga externa adresser används.
import { test, assert } from './harness.js';
import { readAppText, readAppBytes, listAppFilesOnDisk } from './helpers.js';
import { isPrecached, computeVersion, pngSize } from './precacheHash.js';
import { shouldRegisterServiceWorker, registerServiceWorker } from '../src/app/pwa.js';

/** Läser precache.js utan att köra den i sidans globala miljö. */
async function readPrecache() {
  const text = await readAppText('precache.js');
  const self = /** @type {any} */ ({});
  new Function('self', text)(self);
  return /** @type {{ version: string, files: string[] }} */ (self.PRECACHE);
}

test('offline: precache.js har en sorterad lista utan dubbletter och utan filer som inte ska med', async () => {
  const { files, version } = await readPrecache();
  assert.ok(/^[0-9a-f]{12}$/.test(version), `version: ${version}`);
  assert.equal(new Set(files).size, files.length, 'dubbletter');
  assert.deepEqual(files, [...files].sort(), 'listan ska vara sorterad');
  for (const f of files) assert.ok(isPrecached(f), `${f} ska inte vara med`);
  for (const f of ['index.html', 'manifest.webmanifest', 'src/main.js', 'src/app/pwa.js', 'content/index.json', 'content/glossary.json', 'fonts/fonts.css', 'fonts/atkinson-400.woff2', 'icons/icon-192.png', 'icons/icon-512.png']) {
    assert.ok(files.includes(f), `${f} saknas i precache.js`);
  }
  for (const f of ['sw.js', 'precache.js', 'package.json']) assert.ok(!files.includes(f), `${f} ska inte cachas av sig själv`);
});

test('offline: precache.js är inte gammal (versionen stämmer med filernas innehåll)', async () => {
  const { files, version } = await readPrecache();
  const entries = [];
  for (const path of files) entries.push({ path, bytes: await readAppBytes(path) });
  const actual = await computeVersion(entries);
  assert.equal(actual, version, `precache.js är gammal. Kör ./tools/precache.ps1 (version ${version}, borde vara ${actual})`);
});

test('offline: alla filer som borde cachas finns med (listan är komplett)', async () => {
  const { files } = await readPrecache();
  const onDisk = (await listAppFilesOnDisk()).filter(isPrecached).sort();
  assert.deepEqual(files, onDisk, 'filerna på disk och listan i precache.js skiljer sig. Kör ./tools/precache.ps1');
}, { nodeOnly: true });

test('manifest: installerbar app med svenska, rätt start och ikoner som finns', async () => {
  const m = JSON.parse(await readAppText('manifest.webmanifest'));
  assert.equal(m.name, 'Mattesteget');
  assert.ok(m.short_name && m.short_name.length <= 12);
  assert.equal(m.lang, 'sv');
  assert.equal(m.start_url, './');
  assert.equal(m.scope, './');
  assert.equal(m.display, 'standalone');
  assert.ok(/^#[0-9a-f]{6}$/i.test(m.background_color) && /^#[0-9a-f]{6}$/i.test(m.theme_color));
  const sizes = new Set();
  for (const icon of m.icons) {
    const png = pngSize(await readAppBytes(icon.src));
    assert.ok(png, `${icon.src} är ingen PNG`);
    assert.equal(`${png?.width}x${png?.height}`, icon.sizes, `${icon.src}: storleken stämmer inte med manifestet`);
    sizes.add(`${icon.sizes}:${icon.purpose}`);
  }
  assert.ok(sizes.has('192x192:any') && sizes.has('512x512:any'), 'ikoner i 192 och 512 krävs');
  assert.ok(sizes.has('512x512:maskable'), 'en maskbar ikon behövs');
  assert.ok(pngSize(await readAppBytes('icons/apple-touch-icon.png')));
});

test('sidan: pekar på manifestet, har tema- och ikonlänkar, svenska och en sträng CSP', async () => {
  const html = await readAppText('index.html');
  assert.ok(html.includes('<html lang="sv"'));
  assert.ok(html.includes('rel="manifest" href="manifest.webmanifest"'));
  assert.ok(html.includes('name="theme-color"'));
  assert.ok(html.includes('rel="apple-touch-icon"'));
  assert.ok(html.includes("default-src 'self'"));
  assert.ok(!html.includes("'unsafe-inline'") && !html.includes("'unsafe-eval'"), 'CSP ska inte tillåta inline eller eval');
});

test('service worker: sparar allt från precache.js, svarar från cachen och rör inga andra domäner', async () => {
  const sw = await readAppText('sw.js');
  assert.ok(sw.includes("importScripts('precache.js')"));
  assert.ok(sw.includes("addEventListener('install'") && sw.includes('cache.addAll'));
  assert.ok(sw.includes("addEventListener('activate'") && sw.includes('caches.delete'), 'gamla cachar rensas');
  assert.ok(sw.includes("addEventListener('fetch'"));
  assert.ok(sw.includes('url.origin !== self.location.origin'), 'andra domäner släpps förbi, appen anropar dem aldrig');
  assert.ok(sw.includes('SKIP_WAITING'), 'uppdatering sker först när eleven väljer det');
  assert.ok(!sw.includes('self.skipWaiting()') || sw.indexOf('SKIP_WAITING') < sw.indexOf('self.skipWaiting()'), 'ingen automatisk skipWaiting');
  assert.ok(!/https?:\/\//.test(sw), 'inga adresser i service workern');
});

test('inga externa anrop: ingen fil i appen innehåller en adress till en annan domän', async () => {
  const { files } = await readPrecache();
  const textFiles = [...files, 'sw.js'].filter((f) => /\.(js|html|css|json|webmanifest)$/.test(f));
  const found = [];
  for (const f of textFiles) {
    const text = await readAppText(f);
    // MathML-namnrymden är en identifierare och inget anrop. Allt annat med http(s):// är otillåtet.
    for (const m of text.matchAll(/https?:\/\/[^\s"'`)<>]+/g)) {
      if (!m[0].startsWith('http://www.w3.org/')) found.push(`${f}: ${m[0]}`);
    }
  }
  assert.deepEqual(found, [], `externa adresser hittades:\n${found.join('\n')}`);
});

test('inga externa anrop: koden använder inga andra nätverksvägar än fetch av egna filer', async () => {
  const { files } = await readPrecache();
  const js = files.filter((f) => f.endsWith('.js'));
  /** @type {string[]} */
  const problems = [];
  for (const f of js) {
    const text = await readAppText(f);
    for (const bad of ['XMLHttpRequest', 'sendBeacon', 'WebSocket', 'EventSource', 'importScripts(\'http']) {
      if (text.includes(bad)) problems.push(`${f}: ${bad}`);
    }
    for (const m of text.matchAll(/fetch\(([^)]*)\)/g)) {
      // tillåtet: fetch(new URL(...)) av egna filer. Aldrig fetch med en bokstavlig adress.
      if (/^\s*['"`]https?:/.test(m[1])) problems.push(`${f}: ${m[0]}`);
    }
  }
  assert.deepEqual(problems, []);
});

test('service worker: registreras på https och på localhost bara med ?sw=1', () => {
  const s = shouldRegisterServiceWorker;
  assert.equal(s({ hostname: 'bionicreading.se', protocol: 'https:', search: '' }), true);
  assert.equal(s({ hostname: 'bionicreading.se', protocol: 'http:', search: '' }), false);
  assert.equal(s({ hostname: 'localhost', protocol: 'http:', search: '' }), false, 'inte under utveckling');
  assert.equal(s({ hostname: 'localhost', protocol: 'http:', search: '?sw=1' }), true);
  assert.equal(s({ hostname: '127.0.0.1', protocol: 'http:', search: '?x=1&sw=1' }), true);
  assert.equal(s({ hostname: 'localhost', protocol: 'http:', search: '?sw=10' }), false);
});

/** Låtsas-webbläsare för registreringstester. @param {{ controller: boolean, waiting?: boolean }} o */
function fakeBrowser({ controller, waiting = false }) {
  /** @type {Record<string, any[]>} */
  const swListeners = {};
  /** @type {Record<string, any[]>} */
  const regListeners = {};
  const posted = /** @type {any[]} */ ([]);
  const worker = { state: 'installing', postMessage: (/** @type {any} */ m) => posted.push(m), listeners: /** @type {Record<string, any[]>} */ ({}),
    addEventListener(/** @type {string} */ t, /** @type {any} */ fn) { (this.listeners[t] ||= []).push(fn); } };
  const reg = {
    waiting: waiting ? worker : null, installing: /** @type {any} */ (null),
    addEventListener: (/** @type {string} */ t, /** @type {any} */ fn) => { (regListeners[t] ||= []).push(fn); },
  };
  const registered = /** @type {string[]} */ ([]);
  const nav = /** @type {any} */ ({
    serviceWorker: {
      controller: controller ? {} : null,
      register: async (/** @type {string} */ url) => { registered.push(url); return reg; },
      addEventListener: (/** @type {string} */ t, /** @type {any} */ fn) => { (swListeners[t] ||= []).push(fn); },
    },
  });
  let reloaded = false;
  const loc = /** @type {any} */ ({ hostname: 'bionicreading.se', protocol: 'https:', search: '', reload: () => { reloaded = true; } });
  return {
    nav, loc, worker, reg, posted, registered,
    reloaded: () => reloaded,
    /** Låtsas att en ny version hittas och installeras. */
    installNew() {
      reg.installing = worker;
      regListeners.updatefound?.forEach((f) => f());
      worker.state = 'installed';
      worker.listeners.statechange?.forEach((f) => f());
    },
    takeOver() { swListeners.controllerchange?.forEach((f) => f()); },
  };
}

test('service worker: första installationen avbryter ingen, men en ny version erbjuds', async () => {
  const first = fakeBrowser({ controller: false });
  let offers = 0;
  await registerServiceWorker({ onUpdate: () => { offers++; }, nav: first.nav, loc: first.loc });
  assert.deepEqual(first.registered, ['sw.js']);
  first.installNew();
  assert.equal(offers, 0, 'ingen uppdateringsfråga vid första besöket');

  const later = fakeBrowser({ controller: true });
  /** @type {(() => void) | null} */
  let apply = null;
  await registerServiceWorker({ onUpdate: (a) => { offers++; apply = a; }, nav: later.nav, loc: later.loc });
  later.installNew();
  assert.equal(offers, 1, 'en ny version erbjuds när det redan finns en gammal');
  assert.equal(later.posted.length, 0, 'inget händer förrän eleven väljer');
  assert.equal(later.reloaded(), false);
  /** @type {any} */ (apply)();
  assert.deepEqual(later.posted, [{ type: 'SKIP_WAITING' }]);
  later.takeOver();
  assert.equal(later.reloaded(), true, 'sidan laddas om när den nya versionen tagit över');
});

test('service worker: en version som redan väntar erbjuds, och fel vid registrering stoppar inte appen', async () => {
  const waiting = fakeBrowser({ controller: true, waiting: true });
  let offers = 0;
  await registerServiceWorker({ onUpdate: () => { offers++; }, nav: waiting.nav, loc: waiting.loc });
  assert.equal(offers, 1);

  const unsupported = await registerServiceWorker({ onUpdate: () => {}, nav: /** @type {any} */ ({}), loc: waiting.loc });
  assert.equal(unsupported, null);
  const dev = fakeBrowser({ controller: false });
  assert.equal(await registerServiceWorker({ onUpdate: () => {}, nav: dev.nav, loc: { ...dev.loc, hostname: 'localhost', protocol: 'http:' } }), null);
  assert.deepEqual(dev.registered, []);

  const broken = fakeBrowser({ controller: false });
  broken.nav.serviceWorker.register = async () => { throw new Error('blockerad'); };
  assert.equal(await registerServiceWorker({ onUpdate: () => {}, nav: broken.nav, loc: broken.loc }), null);
});

test('uppdateringsmeddelande: visas bara när det behövs, och eleven väljer själv', async () => {
  const { buildLayout } = await import('../src/app/layout.js');
  const root = document.createElement('div');
  const layout = buildLayout(root, []);
  assert.equal(layout.updateBar.hidden, true);
  let applied = 0;
  layout.offerUpdate(() => { applied++; });
  assert.equal(layout.updateBar.hidden, false);
  assert.equal(layout.updateBar.getAttribute('role'), 'status');
  assert.ok(layout.updateBar.textContent?.includes('ny version'));
  const buttons = [...layout.updateBar.querySelectorAll('button')];
  buttons.find((b) => b.textContent === 'Senare')?.click();
  assert.equal(layout.updateBar.hidden, true);
  assert.equal(applied, 0);
  layout.offerUpdate(() => { applied++; });
  [...layout.updateBar.querySelectorAll('button')].find((b) => b.textContent === 'Uppdatera nu')?.click();
  assert.equal(applied, 1);
}, { browserOnly: true });
