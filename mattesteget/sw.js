// Service worker: gör att Mattesteget fungerar helt utan internet efter första besöket.
// Filerna som sparas står i precache.js (skapas av tools/precache.ps1). Ändras en fil ändras
// versionen, och webbläsaren hämtar då den nya versionen i bakgrunden. Den tas i bruk först när
// eleven själv väljer att uppdatera, så att ingen blir avbruten mitt i en uppgift.
importScripts('precache.js');

const VERSION = self.PRECACHE.version;
const CACHE = `mattesteget-${VERSION}`;
const SCOPE = self.registration.scope;
const URLS = self.PRECACHE.files.map((f) => new URL(f, SCOPE).href);
const INDEX = new URL('index.html', SCOPE).href;

self.addEventListener('install', (event) => {
  // Allt eller inget: lyckas inte hela hämtningen blir det ingen ny version.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(URLS)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('mattesteget-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // appen anropar aldrig andra domäner

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Sidan öppnas alltid via index.html (routingen använder # i adressen).
    if (request.mode === 'navigate') {
      return (await cache.match(INDEX)) || (await cache.match(SCOPE)) || fetch(request);
    }
    const hit = await cache.match(request);
    if (hit) return hit;
    try {
      return await fetch(request);
    } catch {
      return new Response('Den här filen finns inte offline.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
  })());
});
