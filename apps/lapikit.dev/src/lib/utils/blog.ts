import type { BlogPost } from '$lib/types/blog';

export async function loadBlogPosts(): Promise<BlogPost[]> {
	const modules = import.meta.glob('/src/content/pages/**/*.md');

	const posts: BlogPost[] = [];

	for (const [filepath, loader] of Object.entries(modules)) {
		const slug = filepath
			.replace('/src/content/pages/', '')
			.replace('.md', '')
			.replace(/\/index$/, '');

		try {
			const module = (await loader()) as any;
			const metadata = module.metadata || {};

			const published = metadata?.published !== false;

			if (published) {
				posts.push({
					slug,
					title: metadata?.title || slug,
					description: metadata?.description,
					date: metadata?.date,
					author: metadata?.author,
					tags: metadata?.tags,
					image: metadata?.image,
					published
				});
			}
		} catch (error) {
			console.error(`Error loading ${filepath}:`, error);
		}
	}

	return posts.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export async function loadBlogPost(slug: string): Promise<{
	component: any;
	metadata: BlogPost;
} | null> {
	try {
		const modules = import.meta.glob('/src/content/pages/**/*.md');

		for (const [filepath, loader] of Object.entries(modules)) {
			const postSlug = filepath
				.replace('/src/content/pages/', '')
				.replace('.md', '')
				.replace(/\/index$/, '');

			if (postSlug === slug) {
				const module = (await loader()) as any;
				const metadata = module.metadata || {};

				return {
					component: module.default,
					metadata: {
						slug,
						title: metadata?.title || slug,
						description: metadata?.description,
						date: metadata?.date,
						author: metadata?.author,
						tags: metadata?.tags,
						image: metadata?.image,
						published: metadata?.published !== false
					}
				};
			}
		}

		return null;
	} catch (error) {
		console.error('Error loading blog post:', error);
		return null;
	}
}

export async function getAdjacentPosts(currentSlug: string): Promise<{
	prev: BlogPost | null;
	next: BlogPost | null;
}> {
	const allPosts = await loadBlogPosts();

	const category = currentSlug.includes('/') ? currentSlug.split('/')[0] : null;

	const posts = category
		? allPosts.filter((post) => post.slug.startsWith(category + '/'))
		: allPosts;

	const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

	if (currentIndex === -1) {
		return { prev: null, next: null };
	}

	return {
		prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
		next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
	};
}
