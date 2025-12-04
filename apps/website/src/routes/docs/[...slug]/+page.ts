import type { MarkdownModule } from '$lib/types/frontmatter';
import { error } from '@sveltejs/kit';

const pages = import.meta.glob('../../../content/docs/**/*.md', { eager: true });

export async function load({ params }) {
	try {
		const slug = params.slug;
		const matchingPath = Object.keys(pages).find((path) => path.includes(`${slug}.md`));

		if (!matchingPath) {
			throw error(404, `Could not find ${slug}`);
		}

		const post = pages[matchingPath] as MarkdownModule;

		return {
			page: {
				content: post.default,
				meta: post.metadata,
				headings: post.metadata.headings
			}
		};
	} catch {
		error(404, `Could not find ${params.slug}`);
	}
}
