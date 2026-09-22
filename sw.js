// Minimal service worker: no caching, just a fetch handler so Chrome on
// Android recognizes this app as installable (full screen, no address bar).
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (event) {
  const requestUrl = new URL(event.request.url);
  // Only handle requests to this app's own origin. Cross-origin calls
  // (the kie.ai / kieai.redpandaai.co API) must pass through untouched,
  // otherwise a network hiccup gets silently replaced by a fake
  // "offline" response and masks the real error.
  if (requestUrl.origin !== self.location.origin) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(function () {
      return new Response("Hors ligne", { status: 503, statusText: "Offline" });
    })
  );
});
