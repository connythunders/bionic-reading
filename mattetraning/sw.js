/* Gör att Matteträning fungerar offline. Höj VERSION när du ändrar filer, så hämtas de nya. */
var VERSION = 'mattetraning-v2';
var FILER = [
  './', 'index.html', 'app.css', 'manifest.webmanifest',
  'fonts/atkinson-400.woff2', 'fonts/atkinson-700.woff2',
  'js/motor.js', 'js/visual.js', 'js/visual2.js', 'js/verktyg.js', 'js/app.js',
  'data/omraden.js', 'data/diagnos.js'
];
// Momentfilerna läses från data/omraden.js, så listan behöver inte ändras för hand.
self.window = self;
try {
  importScripts('data/omraden.js');
  self.MATTE_DATA.omraden.forEach(function (o) {
    o.moment.forEach(function (m) { if (m.fil) FILER.push('data/moment/' + m.fil + '.js'); });
  });
} catch (e) {}

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILER); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Nätet först (så att ändringar syns direkt), cache om man är offline.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var kopia = res.clone();
      caches.open(VERSION).then(function (c) { c.put(e.request, kopia); });
      return res;
    }).catch(function () { return caches.match(e.request, { ignoreSearch: true }); })
  );
});
