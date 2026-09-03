const CACHE = "kaarigar-merged-v15";
const ASSETS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./splash.jpg", "./company-footer.jpg", "./trade-photos/ac_technician.jpg", "./trade-photos/carpentry.jpg", "./trade-photos/computer_repair.jpg", "./trade-photos/electrical.jpg", "./trade-photos/fabrication.jpg", "./trade-photos/home_cleaning.jpg", "./trade-photos/kabadi_wala.jpg", "./trade-photos/kadiya_mason.jpg", "./trade-photos/key_maker.jpg", "./trade-photos/marriage_photography.jpg", "./trade-photos/painter.jpg", "./trade-photos/pest_control.jpg", "./trade-photos/plumbing.jpg", "./trade-photos/pooja_pandit.jpg", "./trade-photos/refrigerator.jpg", "./trade-photos/ro_water.jpg", "./trade-photos/tv_repair.jpg", "./trade-photos/washing_machine.jpg", "./trade-photos/water_supplier.jpg", "./trade-photos/window_sliding.jpg"];

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
