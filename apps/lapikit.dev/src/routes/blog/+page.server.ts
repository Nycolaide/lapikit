import { loadBlogPosts } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await loadBlogPosts();

	return {
		posts,
		meta: {
			title: 'Blog - All posts',
			description: 'Discover all our blog posts',
			canonical: '/blog'
		}
	};
};
