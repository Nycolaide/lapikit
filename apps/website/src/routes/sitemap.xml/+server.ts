import { staticPages, url } from '$lib/config';
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

export async function GET({ fetch }) {
	const contents = await fetch('api/content');
	const responseApiContent: Post[] = await contents.json();
	const pages = [...staticPages, ...responseApiContent.map((page) => page.slug)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
					.map(
						(page) => `
            <url>
                <loc>${url}/${page}</loc>
            </url>`
					)
					.join('')}
    </urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
