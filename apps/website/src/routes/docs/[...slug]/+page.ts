import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';

const pages = import.meta.glob('../../../content/**/*.md', { eager: true });

interface Frontmatter {
	title: string;
	headings: { id: string; text: string; level: number }[];
}

interface MarkdownModule {
	default: typeof SvelteComponent;
	metadata: Frontmatter;
}

export async function load({ data, params }) {
	try {
		const slug = params.slug;
		const matchingPath = Object.keys(pages).find((path) => path.includes(`${slug}.md`));

		if (!matchingPath) {
			throw error(404, `Could not find ${slug}`);
		}

		const post = pages[matchingPath] as MarkdownModule;

		return {
			...data,
			content: post.default,
			meta: post.metadata,
			headings: post.metadata.headings
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}
