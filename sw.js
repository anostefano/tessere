/* Tessere: service worker per l'uso offline.
   Strategia: risponde subito dalla cache e aggiorna in background,
   così l'app si apre all'istante anche in cassa con poca rete.
   Quando modifichi i file, aumenta il numero di VERSION. */
var VERSION = 'tessere-v1';
var ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'vendor/bwip-js.min.js',
  'vendor/zxing.min.js',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION)
      .then(function (cache) { return cache.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  var key = req.mode === 'navigate' ? 'index.html' : req;

  var network = caches.open(VERSION).then(function (cache) {
    return fetch(req).then(function (res) {
      if (res && res.ok && res.type === 'basic') cache.put(key, res.clone());
      return res;
    });
  }).catch(function () { return null; });

  event.waitUntil(network.then(function () { }));
  event.respondWith(
    caches.match(key, { ignoreSearch: true }).then(function (cached) {
      return cached || network.then(function (res) {
        return res || new Response('Sei offline e questa risorsa non è ancora salvata.', {
          status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      });
    })
  );
});
