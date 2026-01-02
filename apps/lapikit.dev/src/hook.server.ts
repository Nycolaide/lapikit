import type { Handle } from '@sveltejs/kit';

// selectively preload fonts
const fonts: string[] = ['roboto-latin-400-normal'];

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		preload: ({ type, path }) => {
			if (type === 'font') {
				if (!path.endsWith('.woff2')) return false;
				return fonts.some((font) => path.includes(font));
			}

			return type === 'js' || type === 'css'; // future-proof, if we add `assets` later
		}
	});

	return response;
};
