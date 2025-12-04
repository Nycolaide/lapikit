import { staticPages } from '$lib/config.js';
import { convertDocsToSitemapPages, generateSitemapXml } from './hook.js';
import type { DocsData } from '$lib/types/sitemap.js';

// api datas
import docsRaw from '$content/data/api/docs.json';

export const prerender = true;

export async function GET() {
	try {
		const docsData = docsRaw as DocsData;
		const docsPages = convertDocsToSitemapPages(docsData);
		const allPages = [...staticPages, ...docsPages];

		const body = generateSitemapXml(allPages);

		return new Response(body, {
			headers: {
				'Content-Type': 'application/xml'
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);

		const fallbackBody = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://lapikit.dev/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;

		return new Response(fallbackBody, {
			headers: {
				'Content-Type': 'application/xml'
			}
		});
	}
}
