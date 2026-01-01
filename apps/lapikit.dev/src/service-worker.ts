/// <reference lib="WebWorker" />
/// <reference types="@sveltejs/kit" />

import { build, files, prerendered, version } from '$service-worker';

const sw = self as unknown as ServiceWorkerGlobalScope;

const APP_SHELL = '/';
const OFFLINE_FALLBACK = '/offline.html';
const ASSET_URLS = new Set<string>([
	APP_SHELL,
	OFFLINE_FALLBACK,
	...build,
	...files,
	...prerendered
]);
const CACHE_NAME = `lapikit-dev-${version}`;

const addAssetsToCache = async (): Promise<void> => {
	const cache = await caches.open(CACHE_NAME);
	await cache.addAll([...ASSET_URLS]);
};

const cleanOldCaches = async (): Promise<void> => {
	const keys = await caches.keys();
	await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
};

const cacheFirst = async (request: Request): Promise<Response> => {
	const cached = await caches.match(request);
	if (cached) return cached;

	const response = await fetch(request);
	if (response.ok) {
		const cache = await caches.open(CACHE_NAME);
		cache.put(request, response.clone());
	}
	return response;
};

const networkFirst = async (request: Request): Promise<Response> => {
	try {
		const response = await fetch(request);
		const cache = await caches.open(CACHE_NAME);
		cache.put(request, response.clone());
		return response;
	} catch (error) {
		const cached = await caches.match(request);
		if (cached) return cached;
		if (request.mode === 'navigate') {
			const offlinePage = await caches.match(OFFLINE_FALLBACK);
			if (offlinePage) return offlinePage;
			const fallback = await caches.match(APP_SHELL);
			if (fallback) return fallback;
		}
		throw error;
	}
};

sw.addEventListener('install', (event) => {
	event.waitUntil(addAssetsToCache());
	sw.skipWaiting();
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(cleanOldCaches().then(() => sw.clients.claim()));
});

sw.addEventListener('fetch', (event) => {
	const { request } = event;

	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== sw.location.origin) return;

	const isAsset = ASSET_URLS.has(url.pathname);

	event.respondWith(isAsset ? cacheFirst(request) : networkFirst(request));
});
