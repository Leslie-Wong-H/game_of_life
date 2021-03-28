var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/",
  "/css/main.css",
  "/img/favicon.ico",
  "/img/help-bd2f9e.svg",
  "/img/GitHub.png",
  "https://i.loli.net/2020/02/19/8cWUDIM1ERltom4.png",
  "https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraphcore.js",
  "https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.bundle.min.js",
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
