// Network-first on every request: this is a live quiz and must never reopen a
// stale design after a deployment.  The service worker remains for PWA install.
const C='baran-rekani-v8';self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(key=>caches.delete(key)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});
