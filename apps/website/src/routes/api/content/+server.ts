import { json } from '@sveltejs/kit';

export const prerender = true;

export type Categories = 'sveltekit' | 'svelte';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: Categories[];
	published: boolean;
};

async function getPages() {
	let pages: Post[] = [];
	const paths = import.meta.glob('/src/content/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = 'docs' + path.replace('/src/content', '').replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) pages.push(post);
		}
	}

	pages = pages.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);
	return pages;
}

export async function GET() {
	const pages = await getPages();
	return json(pages);
}
