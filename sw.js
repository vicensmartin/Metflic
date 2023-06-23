const CACHE = "version1";

importScripts(
"https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");

const precachedAssets = [
  '/index.html',
  '/favoritos.html',
  '/trailer.html',
  '/images/icono.png',
  '/js/index.js',
  '/js/favoritos.js',
  '/js/trailer.js',
  '/css/main.css',
  '/css/favoritos.css',
];


self.addEventListener('install', (event) => {

  event.waitUntil(caches.open(CACHE).then((cache) => {
    return cache.addAll(precachedAssets);
  }));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp("/*"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  })
);
