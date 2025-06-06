import { json } from '@sveltejs/kit';

type NpmData = {
	name: string;
	version: string;
	description: string;
	homepage?: string;
	license?: string;
	repository?: string;
	lastPublished?: string;
	downloads: number;
};

type CacheEntry = {
	data: NpmData;
	timestamp: number;
};

const cache: Record<string, CacheEntry> = {};
const TTL = 1000 * 60 * 60; // 1h

async function getNpmData(name: string) {
	const now = Date.now();
	const cached = cache[name];

	if (cached && now - cached.timestamp < TTL) {
		return json(cached.data);
	}

	try {
		const date = new Date().toISOString().split('T')[0];

		const [registryRes, downloadsRes] = await Promise.all([
			fetch(`https://registry.npmjs.org/${name}`),
			fetch(`https://api.npmjs.org/downloads/point/2025-04-19:${date}/${name}`)
		]);

		if (!registryRes.ok || !downloadsRes.ok) {
			throw new Error('Error retrieving NPM data');
		}

		const registry = await registryRes.json();
		const downloads = await downloadsRes.json();

		const filtered = {
			name: registry.name,
			version: registry['dist-tags']?.latest,
			description: registry.description,
			homepage: registry.homepage,
			license: registry.license,
			repository: registry.repository?.url,
			lastPublished: registry.time?.[registry['dist-tags']?.latest],
			downloads: downloads.downloads
		};

		cache[name] = {
			data: filtered,
			timestamp: now
		};

		return json(filtered);
	} catch (err) {
		console.error('API NPM error:', err);
		return json({ error: 'Error calling NPM API' }, { status: 500 });
	}
}

export async function GET({ url }: { url: URL }) {
	const name = url.searchParams.get('name');
	if (!name) return json({ error: 'Name parameter is required' }, { status: 400 });

	return await getNpmData(name);
}
