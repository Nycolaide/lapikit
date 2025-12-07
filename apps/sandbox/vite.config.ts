import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { lapikit } from 'lapikit/vite';

export default defineConfig({
	plugins: [sveltekit(), lapikit({ config: 'src/plugins/lapikit.ts' })]
});
