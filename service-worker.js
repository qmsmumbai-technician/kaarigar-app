const CACHE = "kaarigar-merged-v70";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./splash.jpg", "./company-footer.jpg", "./tech-explainer-voice.mp3", "./trade.photos/garden_care.jpg", "./trade.photos/private_chef.jpg", "./trade.photos/trip_driver.jpg", "./trade.photos/post_pregnancy_massage.jpg", "./trade.photos/ac_technician.jpg", "./trade.photos/carpentry.jpg", "./trade.photos/computer_repair.jpg", "./trade.photos/electrical.jpg", "./trade.photos/fabrication.jpg", "./trade.photos/home_cleaning.jpg", "./trade.photos/kabadi_wala.jpg", "./trade.photos/kadiya_mason.jpg", "./trade.photos/key_maker.jpg", "./trade.photos/marriage_photography.jpg", "./trade.photos/painter.jpg", "./trade.photos/pest_control.jpg", "./trade.photos/plumbing.jpg", "./trade.photos/pooja_pandit.jpg", "./trade.photos/refrigerator.jpg", "./trade.photos/ro_water.jpg", "./trade.photos/tv_repair.jpg", "./trade.photos/washing_machine.jpg", "./trade.photos/water_supplier.jpg", "./trade.photos/vastu_consultant.jpg", "./trade.photos/interior_decorator.jpg", "./trade.photos/upholstery_repair.jpg", "./trade.photos/window_sliding.jpg", "./trade.photos/inverter_battery.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Network-first: always try to fetch the latest version. Only fall back
// to the cached copy if there's no internet connection.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

// ---- Morning "Go Online" reminder (push) ----
// The scheduled sender delivers a data message; we show it ourselves.
self.addEventListener("push", (e) => {
  let j = {};
  try { j = e.data ? e.data.json() : {}; } catch (err) {}
  const p = (j && j.data) || j || {};
  const n = (j && j.notification) || {};
  const title = p.title || n.title || "My Kaarigar";
  const body = p.body || n.body || "";
  e.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: "./icon-192.png",
    badge: "./icon-192.png",
    tag: "kaarigar-morning"
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const target = new URL("./?online=1", self.registration.scope).href;
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.indexOf(self.registration.scope) === 0) {
          c.postMessage({ type: "GO_ONLINE" });
          return c.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
