import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const url = event.url;
	const pathname = url.pathname;

	// Redirect HTTP to HTTPS
	if (
		event.request.headers.get('x-forwarded-proto') === 'http' &&
		!pathname.startsWith('/health')
	) {
		const httpsUrl = `https://${url.host}${url.pathname}${url.search}`;
		return new Response(null, {
			status: 301,
			headers: {
				location: httpsUrl
			}
		});
	}

	// Redirect URLs with .md extension to URLs without extension
	if (pathname.endsWith('.md')) {
		const newPath = pathname.replace(/\.md$/, '');
		// If the path does not start with /docs/, add it
		const redirectPath = newPath.startsWith('/docs/') ? newPath : `/docs${newPath}`;
		return new Response(null, {
			status: 301,
			headers: {
				location: `${redirectPath}${url.search}`
			}
		});
	}

	// Redirect old URLs that do not start with /docs/
	// to new URLs with /docs/
	const docsPatterns = [
		'/getting-started',
		'/migration-guide',
		'/introduction',
		'/breakpoints',
		'/customize'
	];

	const componentPatterns = ['/components/', '/hooks/', '/stores/', '/actions/'];

	// Check if it's an old documentation URL
	if (docsPatterns.some((pattern) => pathname.startsWith(pattern))) {
		const redirectPath = `/docs${pathname}`;
		return new Response(null, {
			status: 301,
			headers: {
				location: `${redirectPath}${url.search}`
			}
		});
	}

	// Check if it's an old component/hook URL without /docs/
	if (componentPatterns.some((pattern) => pathname.startsWith(pattern))) {
		if (!pathname.startsWith('/docs/')) {
			const redirectPath = `/docs${pathname}`;
			return new Response(null, {
				status: 301,
				headers: {
					location: `${redirectPath}${url.search}`
				}
			});
		}
	}

	// Normalize trailing slashes for documentation pages
	if (pathname.startsWith('/docs/') && pathname !== '/docs' && pathname !== '/docs/') {
		// Remove trailing slash if present (except for /docs/ alone)
		if (pathname.endsWith('/') && pathname !== '/docs/') {
			const newPath = pathname.slice(0, -1);
			return new Response(null, {
				status: 301,
				headers: {
					location: `${newPath}${url.search}`
				}
			});
		}
	}

	return resolve(event);
};
