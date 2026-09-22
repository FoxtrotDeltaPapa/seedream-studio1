// Minimal service worker: no caching, just a fetch handler so Chrome on
// Android recognizes this app as installable (full screen, no address bar).
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response("Hors ligne", { status: 503, statusText: "Offline" });
    })
  );
});
