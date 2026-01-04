import { loadBlogPost, getAdjacentPosts } from '$lib/utils/blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.slug;
	const post = await loadBlogPost(slug);

	if (!post || !post.metadata.published) {
		throw error(404, 'Article not found');
	}

	const { prev, next } = await getAdjacentPosts(slug);

	const slugParts = slug.split('/');
	const breadcrumbs = [
		{ label: 'Homepage', url: '/' },
		{ label: 'Blog', url: '/blog' }
	];

	let currentPath = '';
	for (let i = 0; i < slugParts.length - 1; i++) {
		currentPath += (currentPath ? '/' : '') + slugParts[i];
		breadcrumbs.push({
			label: slugParts[i].charAt(0).toUpperCase() + slugParts[i].slice(1),
			url: `/blog/${currentPath}`
		});
	}

	breadcrumbs.push({
		label: post.metadata.title,
		url: `/blog/${slug}`
	});

	return {
		slug,
		metadata: post.metadata,
		breadcrumbs,
		baseUrl: PUBLIC_BASE_URL,
		prevPost: prev,
		nextPost: next,
		meta: {
			title: post.metadata.title,
			description: post.metadata.description || post.metadata.title,
			canonical: `/blog/${slug}`,
			image: post.metadata.image,
			date: post.metadata.date,
			author: post.metadata.author
		}
	};
};
