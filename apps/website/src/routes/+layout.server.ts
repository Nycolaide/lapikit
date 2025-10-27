import { PUBLIC_CALL_API_ENABLED } from '$env/static/public';
import type { NavigationLink, NavDocsData } from '$lib/types';
import { buildNavigationFromDocs } from '$lib/utils/navigation';

// datas
import navDocsRaw from '$lib/data/nav-docs.json';

export const prerender = true;

const navDocs = navDocsRaw as NavDocsData;

const docsNavigation = buildNavigationFromDocs(navDocs.files);

const nav_links: NavigationLink[] = [
	{ title: 'Home', slug: '/' },
	{ title: 'Docs', slug: '/docs', sections: docsNavigation }
];

export async function load({ fetch }) {
	const res = await fetch('/api/content/counter');
	const counter = await res.json();

	let responseExternalAPI = {};

	if (PUBLIC_CALL_API_ENABLED === 'true') {
		const githubRes = await fetch('/api/github/repository?name=Nycolaide/lapikit');
		const npmRes = await fetch('/api/npm?name=lapikit');

		const [github, npm] = await Promise.all([
			githubRes.ok ? githubRes.json() : null,
			npmRes.ok ? npmRes.json() : null
		]);

		responseExternalAPI = {
			github,
			npm
		};
	}

	return {
		nav_links,
		counter,
		...responseExternalAPI
	};
}
