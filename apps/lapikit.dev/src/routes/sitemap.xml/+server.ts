import { PUBLIC_BASE_URL } from '$env/static/public';

export const prerender = true;

export async function GET() {
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${PUBLIC_BASE_URL}</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>1.0</priority>
                </url>
</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
