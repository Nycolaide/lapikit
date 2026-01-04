import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';

// tailwindcss plugin
import tailwindcss from '@tailwindcss/vite';

// compression plugin
import { enhancedImages } from '@sveltejs/enhanced-img';
import { imagetools } from 'vite-imagetools';

import viteCompression from 'vite-plugin-compression';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

export default defineConfig({
	plugins: [
		enhancedImages(),
		imagetools({
			defaultDirectives: (url) => {
				return new URLSearchParams({
					format: 'webp;jpg',
					w: '320;700;1400',
					as: 'picture'
				});
			}
		}),
		tailwindcss(),
		sveltekit(),
		viteCompression({ algorithm: 'brotliCompress' })
	],

	css: {
		transformer: 'lightningcss',

		lightningcss: {
			targets: browserslistToTargets(browserslist(['>0.2%', 'not dead']))
		}
	},

	build: { cssMinify: 'lightningcss' },

	test: {
		expect: { requireAssertions: true },

		projects: [
			{
				extends: './vite.config.ts',

				test: {
					name: 'client',

					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},

					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',

				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
