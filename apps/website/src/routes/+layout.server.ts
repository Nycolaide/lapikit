import { PUBLIC_API } from '$env/static/public';
import { buildNavigationFromDocs } from '$lib/utils/navigation';
import type { NavigationLink, NavDocsData } from '$lib/types/navigation';
import type { GitHubRepositoryData, NpmPackageData } from '$lib/types/api';

import navRaw from '$lib/data/api-nav-docs.json';
import counterRaw from '$lib/data/api-counter-lapikit.json';
import urlInternal from '$lib/data/url.json';

export const prerender = true;
const authCallAPI = PUBLIC_API === 'true';

const navDocs = navRaw as NavDocsData;
const docsNavigation = buildNavigationFromDocs(navDocs.files);

const nav_links: NavigationLink[] = [
	{ title: 'Home', slug: '/' },
	{ title: 'Docs', slug: '/docs', sections: docsNavigation }
];

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
