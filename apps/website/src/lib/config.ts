import type { SitemapPage } from '$lib/types/sitemap.js';

export const sitemapConfig = {
	baseUrl: 'https://lapikit.dev',
	defaultChangefreq: 'weekly' as const,
	defaultPriority: 0.5
};

export const staticPages: SitemapPage[] = [
	{
		url: '/',
		changefreq: 'weekly',
		priority: 1.0
	},
	{
		url: '/terms',
		changefreq: 'yearly',
		priority: 0.3
	}
];

export const packageManagers: { name: string; icon: string }[] = [
	{
		name: 'npm',
		icon: '/icons/npm-color.svg'
	},
	{
		name: 'yarn',
		icon: '/icons/yarn-color.svg'
	},
	{
		name: 'bun',
		icon: '/icons/bun-color.svg'
	}
];
