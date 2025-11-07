import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';

import { defineConfig } from 'vitest/config';

// plugins
import { lapikit } from 'lapikit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		// @ts-expect-error - Plugin type mismatch due to multiple Vite versions in monorepo
		tailwindcss(),
		// @ts-expect-error - Plugin type mismatch due to multiple Vite versions in monorepo
		enhancedImages(),
		// @ts-expect-error - Plugin type mismatch due to multiple Vite versions in monorepo
		sveltekit(),
		lapikit({ config: 'src/plugins/lapikit.ts' })
	],
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [
					// @ts-expect-error - Plugin type mismatch due to multiple Vite versions in monorepo
					svelteTesting()
				],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
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
