const CACHE_NAME = "fitness-hq-v65";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css?v=3.2.8",
  "./app.js?v=3.2.8",
  "./app-hotfix.js?v=3.2.9",
  "./manifest.webmanifest?v=3.2.8",
  "./assets/my-command-center-logo.png?v=3.2.8",
  "./assets/fitness-hq-home-icon.png?v=3.2.8",
  "./assets/ocean-bathymetry.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);

  if (url.pathname.endsWith("/data/ben-hq-latest.enc.json")) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }

  if (url.pathname.endsWith("/app.js")) {
    event.respondWith((async () => {
      const baseResponse = await fetch(event.request).catch(() => caches.match(event.request));
      if (!baseResponse) return Response.error();

      const hotfixRequest = new Request(new URL("./app-hotfix.js?v=3.2.9", self.location.href), { cache: "no-store" });
      const hotfixResponse = await fetch(hotfixRequest).catch(() => caches.match("./app-hotfix.js?v=3.2.9"));
      const baseText = await baseResponse.text();
      const hotfixText = hotfixResponse?.ok ? await hotfixResponse.text() : "";
      const headers = new Headers(baseResponse.headers);
      headers.delete("content-length");
      headers.set("content-type", "text/javascript; charset=utf-8");
      return new Response(`${baseText}\n${hotfixText}`, {
        status: baseResponse.status,
        statusText: baseResponse.statusText,
        headers,
      });
    })());
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && url.origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return event.request.mode === "navigate" ? caches.match("./index.html") : Response.error();
      }))
  );
});
