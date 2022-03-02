var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/App.*.css",
  "/App.*.js",
  "/help-bd2f9e.*.svg",
  "/GitHub.*.png",
  "/jsxgraph-game-of-life-icon-192.*.png",
  "/jsxgraph-game-of-life-icon-512.*.png",
  "/loading.*.svg",
  "/main.*.css",
  "https://i.loli.net/2020/02/19/8cWUDIM1ERltom4.png",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
