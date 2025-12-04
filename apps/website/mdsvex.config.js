import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import extractHeadings from './remark-extract-headings.js';

// node
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Cache pour l'instance Shiki (singleton)
let highlighter;

/** @type {import('mdsvex').MdsvexOptions} */
export const mdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: dirname(fileURLToPath(import.meta.url)) + '/src/lib/templates/page.mdsvex.svelte'
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// Créer l'highlighter une seule fois et le réutiliser
			if (!highlighter) {
				highlighter = await createHighlighter({
					themes: ['poimandres'],
					langs: ['javascript', 'typescript', 'svelte']
				});
			}
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [[remarkToc, { tight: true }], extractHeadings],
	rehypePlugins: [rehypeSlug]
};
