import { PUBLIC_API } from '$env/static/public';
import type { NavigationLinks } from '$lib/types/navigation';
import type { GitHubRepositoryData, NpmPackageData } from '$lib/types/api';

import navRaw from '$content/data/api/nav-docs.json';
import categoriesRaw from '$content/data/category.json';
import counterRaw from '$content/data/api/counter-lapikit.json';
import urlInternal from '$content/data/url.json';

export const prerender = false;
const authCallAPI = PUBLIC_API === 'true';

const nav_links: NavigationLinks = {
	home: { title: 'home', slug: '/' },
	docs: {
		title: 'docs',
		slug: '/docs',
		sections: navRaw
	}
};

const header_links = {
	...categoriesRaw
};

const footer_links = {
	docs: {
		title: 'product',
		items: { ...categoriesRaw }
	},
	policies: {
		title: 'policies',
		items: [
			{
				key: 'terms_and_privacy',
				title: 'terms & privacy',
				slug: '/terms'
			},
			{
				key: 'cookie',
				title: 'cookie consent',
				custom: 'cookie-consent'
			}
		]
	}
};

const social_links = [
	{
		title: 'gitHub',
		href: urlInternal.github.repository,
		icon: 'mgc_github_fill',
		color: 'service-github'
	},
	{
		name: 'discord',
		icon: 'mgc_discord_fill',
		color: 'service-discord',
		href: urlInternal.discord.invite,
		footer: true
	},
	{
		name: 'NPM',
		icon: '/icons/npm-color.svg',
		color: 'service-npm',
		href: urlInternal.npm.package,
		footer: true
	}
];

const banner = {
	id: 'lapikit-v0.3-update',
	start: new Date('31 November, 2025 00:00:00 UTC'),
	end: new Date('15 December, 2025 23:59:59 UTC'),
	arrow: true,
	content: {
		lg: 'Discover the new Lapikit v0.3 with exciting features and improvements!',
		sm: 'New Lapikit v0.3 is here!'
	},
	href: '/docs/changelog'
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
		header_links,
		footer_links,
		social_links,
		counter: counterRaw.categories,
		url_internal: urlInternal,
		banner,
		...api
	};
}
