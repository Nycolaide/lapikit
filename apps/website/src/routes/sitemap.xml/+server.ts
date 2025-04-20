import { staticPages, url } from '$lib/config';
export const prerender = true;

export async function GET() {
	const pages = [...staticPages];

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
