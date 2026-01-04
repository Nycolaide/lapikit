import { PUBLIC_BASE_URL } from '$env/static/public';
import { loadBlogPosts } from '$lib/utils/blog';

export const prerender = true;

export async function GET() {
	const posts = await loadBlogPosts();

	const blogUrls = posts
		.map(
			(post) => `
                <url>
                    <loc>${PUBLIC_BASE_URL}/blog/${post.slug}</loc>
                    <lastmod>${post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.8</priority>
                </url>`
		)
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${PUBLIC_BASE_URL}</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>1.0</priority>
                </url>
                <url>
                    <loc>${PUBLIC_BASE_URL}/blog</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.9</priority>
                </url>
                <url>
                    <loc>${PUBLIC_BASE_URL}/blog/city</loc>
                    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.85</priority>
                </url>${blogUrls}
</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}
