// This file is intentionally minimal.
// In production, vite-plugin-pwa replaces this with a full Workbox service worker.
// In development, this file exists only to prevent 404 errors from browsers that
// check for a registered sw.js.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {}); // Pass-through — no caching in dev
