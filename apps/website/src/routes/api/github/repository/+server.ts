import { json } from '@sveltejs/kit';

type RepoData = {
	full_name: string;
	description: string | null;
	stargazers_count: number;
	subscribers_count: number;
	forks_count: number;
	html_url: string;
	homepage: string | null;
	language: string | null;
	license: string | null;
	updated_at: string;
};

type CacheEntry = {
	data: RepoData;
	timestamp: number;
};

const cache: Record<string, CacheEntry> = {};
const TTL = 1000 * 60 * 60; // 1h

async function getGithubDataRepo({ name }: { name: string }) {
	// cached
	const cached = cache[name];
	const now = Date.now();

	if (cached && now - cached.timestamp < TTL) {
		return json(cached.data);
	}

	try {
		const response = await fetch(`https://api.github.com/repos/${name}`);

		if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);

		const json = await response.json();
		const data = {
			full_name: json.full_name,
			description: json.description,
			stargazers_count: json.stargazers_count,
			subscribers_count: json.subscribers_count,
			forks_count: json.forks_count,
			html_url: json.html_url,
			homepage: json.homepage,
			language: json.language,
			license: json.license?.spdx_id ?? null,
			updated_at: json.updated_at
		};

		cache[name] = {
			data,
			timestamp: now
		};

		return json(data);
	} catch (error) {
		return json({ error: (error as Error).message }, { status: 500 });
	}
}

export async function GET({ url }: { url: URL }) {
	const name = url.searchParams.get('name');
	if (!name) return json({ error: 'Name parameter is required' }, { status: 400 });

	return await getGithubDataRepo({ name });
}
