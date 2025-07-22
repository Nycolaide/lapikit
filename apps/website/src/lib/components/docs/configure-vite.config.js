import { sveltekit } from '@sveltejs/kit/vite';
import { lapikit } from 'lapikit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), lapikit()]
});
