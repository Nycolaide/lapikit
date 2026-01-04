import { loadBlogPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async () => {
	const allPosts = await loadBlogPosts();

	const cityPosts = allPosts.filter((post) => post.slug.startsWith('city/'));

	const breadcrumbs = [
		{ label: 'Homepage', url: '/' },
		{ label: 'Blog', url: '/blog' },
		{ label: 'Cities', url: '/blog/city' }
	];

	return {
		posts: cityPosts,
		breadcrumbs,
		baseUrl: PUBLIC_BASE_URL,
		meta: {
			title: 'Cities - Blog',
			description: 'Discover all our articles about cities around the world',
			canonical: '/blog/city'
		}
	};
};
