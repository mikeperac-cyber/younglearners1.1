const CACHE = "esl-v3";
const FILES = ["index.html","styles.css","engine.js","data-p1.js","data-p2.js","manifest.json"];
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(FILES);
  })());
});
self.addEventListener("fetch", e => {
  e.respondWith((async () => {
    const c = await caches.match(e.request);
    if (c) return c;
    try {
      const r = await fetch(e.request);
      const cache = await caches.open(CACHE);
      cache.put(e.request, r.clone());
      return r;
    } catch { return new Response("Offline", {status:503}); }
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
});