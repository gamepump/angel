const CACHE_NAME = 'angelina-love-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  // Firebase SDK files (optional: you can cache if you want faster loads)
  'https://www.gstatic.com/firebasejs/10.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.6.1/firebase-firestore.js',
  'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js',
  // Add any CSS or image files here if you have any
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached resource if found, else fetch from network
      return response || fetch(event.request);
    })
  );
});
