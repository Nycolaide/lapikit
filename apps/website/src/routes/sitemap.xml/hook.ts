import type { SitemapPage, DocsData, DocFile } from '$lib/types/sitemap.js';
import { sitemapConfig } from '$lib/config.js';

/**
 * Generates a sitemap URL entry
 */
export function generateSitemapUrl(
	page: SitemapPage,
	baseUrl: string = sitemapConfig.baseUrl
): string {
	const url = `${baseUrl}${page.url}`;
	const lastmod = page.lastmod || new Date().toISOString().split('T')[0];
	const changefreq = page.changefreq || sitemapConfig.defaultChangefreq;
	const priority = page.priority || sitemapConfig.defaultPriority;

	return `    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
}

/**
 * Generates the complete sitemap XML
 */
export function generateSitemapXml(pages: SitemapPage[]): string {
	const urls = pages.map((page) => generateSitemapUrl(page)).join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Converts documentation data to sitemap pages
 */
export function convertDocsToSitemapPages(docsData: DocsData): SitemapPage[] {
	if (!docsData?.files || !Array.isArray(docsData.files)) {
		return [];
	}

	return docsData.files
		.filter((file: DocFile) => file?.metadata?.state?.published !== false)
		.map((file: DocFile) => ({
			url: file.slug || `/docs/${file.path?.replace(/^\/docs\//, '').replace(/\.md$/, '')}`,
			changefreq: 'monthly' as const,
			priority: getPriorityForDocPage(file)
		}));
}

/**
 * Determines priority for documentation pages
 */
function getPriorityForDocPage(file: DocFile): number {
	const metadata = file.metadata;

	// Pages recommandées ont une priorité plus élevée
	if (metadata?.state?.recommended) {
		return 0.9;
	}

	// Pages de base (getting-started, introduction, etc.) ont une priorité élevée
	if (metadata?.state?.section === 'base') {
		return 0.8;
	}

	// Composants ont une priorité moyenne-haute
	if (metadata?.state?.section === 'components') {
		return 0.7;
	}

	// Actions et stores ont une priorité moyenne
	if (
		metadata?.state?.section === 'actions' ||
		metadata?.state?.section === 'hooks' ||
		metadata?.state?.section === 'stores'
	) {
		return 0.6;
	}

	// Priorité par défaut
	return 0.5;
}
