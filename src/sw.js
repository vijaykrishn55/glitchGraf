const CACHE_NAME = 'glitch-ar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/*',
  '/src/components/ARScanner.jsx',
  '/src/lib/tfjs-backend-webgl.wasm' // Explicitly cache WASM backend
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  // Special handling for TensorFlow models
  if (event.request.url.includes('tf-models')) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
    return;
  }

  // Cache-first for AR assets
  if (event.request.url.match(/\.(glb|gltf|bin|png|webp)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
    );
  }
});