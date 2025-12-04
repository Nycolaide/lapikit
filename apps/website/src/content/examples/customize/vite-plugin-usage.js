import { defineConfig } from 'vite';
import { lapikit } from 'lapikit/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit(), lapikit({ config: 'src/plugins/lapikit.ts' })]
});
