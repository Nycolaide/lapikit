import { json } from '@sveltejs/kit';
import { loadBlogPosts } from '$lib/utils/blog';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const posts = await loadBlogPosts();

	const searchData = posts.map((post) => ({
		slug: post.slug,
		title: post.title,
		description: post.description,
		category: post.slug.includes('/') ? post.slug.split('/')[0] : null
	}));

	return json(searchData);
};
