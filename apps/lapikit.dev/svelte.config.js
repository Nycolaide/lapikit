import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { lapikitPreprocess } from 'lapikit/labs/preprocess';
import { replPreprocess } from '@lapikit/repl';
import { mdsvexOptions } from './mdsvex.config.js';

// Env
const prerenderOrigin = process.env.VITE_PRERENDER_ORIGIN || 'http://localhost:5173';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions), lapikitPreprocess(), replPreprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			out: 'build',
			//envPrefix: '',
			precompress: true,
			polyfill: true
		}),
		inlineStyleThreshold: 1000,
		prerender: {
			origin: prerenderOrigin
		}
	},

	extensions: ['.svelte', '.svx', '.md']
};

export default config;
