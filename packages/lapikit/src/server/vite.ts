import type { ViteDevServer } from 'vite';
import { ansi } from './modules/ansi.js';
import { importer } from './modules/importer.js';

interface LapikitPlugin {
	extends?: 'tailwindcss';
	minify?: boolean;
}

export async function lapikit(options: LapikitPlugin = {}) {
	return {
		name: 'lapikit/vite.js',
		async configResolved() {
			console.log(ansi.bold.blue('Vite plugin loaded'), options);

			const config = await importer();

			console.log('config', config);
		},
		async configureServer(server: ViteDevServer) {
			console.log(ansi.inverse.red('Vite server configured'), server);
		}
	};
}
