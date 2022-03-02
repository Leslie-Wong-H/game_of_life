var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = ["https://i.loli.net/2020/02/19/8cWUDIM1ERltom4.png"];

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
      // if (response) {
      //   return response;
      // }
      return fetch(event.request);
    })
  );
});
