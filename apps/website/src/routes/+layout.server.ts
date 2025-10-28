import { PUBLIC_API } from '$env/static/public';
import { buildNavigationFromDocs } from '$lib/utils/navigation';
import type { NavigationLink, NavDocsData } from '$lib/types';

import navRaw from '$lib/data/nav-docs.json';
import counterRaw from '$lib/data/counter-lapikit.json';
import searchRaw from '$lib/data/search.json';

export const prerender = true;
const authCallAPI = PUBLIC_API === 'true';

const navDocs = navRaw as NavDocsData;
const docsNavigation = buildNavigationFromDocs(navDocs.files);

const nav_links: NavigationLink[] = [
	{ title: 'Home', slug: '/' },
	{ title: 'Docs', slug: '/docs', sections: docsNavigation }
];

export async function load({ fetch }) {
	let api = {};

	if (authCallAPI) {
		const githubApi = await fetch('/api/github/repository?name=Nycolaide/lapikit');
		const npmApi = await fetch('/api/npm?name=lapikit');

		const [github, npm] = await Promise.all([
			githubApi.ok ? githubApi.json() : null,
			npmApi.ok ? npmApi.json() : null
		]);

		api = {
			github,
			npm
		};
	}

	return {
		nav_links,
		search_data: searchRaw,
		counter: counterRaw.categories,
		...api
	};
}
