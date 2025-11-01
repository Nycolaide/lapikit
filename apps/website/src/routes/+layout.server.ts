import { PUBLIC_API } from '$env/static/public';
import type { NavigationLinks } from '$lib/types/navigation';
import type { GitHubRepositoryData, NpmPackageData } from '$lib/types/api';

import navRaw from '$data/api/nav-docs.json';
import counterRaw from '$data/api/counter-lapikit.json';
import urlInternal from '$data/url.json';

export const prerender = true;
const authCallAPI = PUBLIC_API === 'true';

const nav_links: NavigationLinks = {
	home: { title: 'home', slug: '/' },
	docs: { title: 'docs', slug: '/docs', sections: navRaw }
};

export async function load({ fetch }) {
	let api: { github?: GitHubRepositoryData | null; npm?: NpmPackageData | null } = {};

	if (authCallAPI) {
		const githubApi = await fetch('/api/github/repository?name=Nycolaide/lapikit');
		const npmApi = await fetch('/api/npm?name=lapikit');

		const [github, npm] = await Promise.all([
			githubApi.ok ? githubApi.json() : null,
			npmApi.ok ? npmApi.json() : null
		]);

		api = {
			github: github as GitHubRepositoryData | null,
			npm: npm as NpmPackageData | null
		};
	}

	return {
		nav_links,
		counter: counterRaw.categories,
		url_internal: urlInternal,
		...api
	};
}
