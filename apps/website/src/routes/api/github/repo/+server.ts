import { json } from '@sveltejs/kit';

async function getGithubDataRepo({ url }: { url: URL }) {
	const name = url.searchParams.get('name');
	if (!name) return json({ error: 'Name parameter is required' }, { status: 400 });

	try {
		const response = await fetch(`https://api.github.com/repos/${name}`);

		if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);

		const data = await response.json();
		return json(data);
	} catch (error) {
		return json({ error: (error as Error).message }, { status: 500 });
	}
}

export async function GET({ url }: { url: URL }) {
	const repo = await getGithubDataRepo({ url });
	return repo;
}
