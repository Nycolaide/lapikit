import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvexOptions } from './mdsvex.config.js';
import { lili } from 'lapikit/labs/preprocess';

const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions), lili()],
	onwarn: (warning, handler) => {
		const { code } = warning;
		if (code === 'css_unused_selector') return;
		if (code === 'a11y_invalid_attribute') return;
		handler(warning);
	},
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		alias: {
			$animations: 'src/lib/animations',
			$components: 'src/lib/components',
			$content: 'src/content',
			$examples: 'src/content/examples'
		}
	},
	extensions: ['.svelte', '.md']
};

export default config;
