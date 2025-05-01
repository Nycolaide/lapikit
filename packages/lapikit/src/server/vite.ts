import type { ViteDevServer } from 'vite';
import { ansi } from './modules/ansi.js';
import { importer } from './modules/importer.js';
import { processCSS } from './modules/css.js';
import { parseConfig } from './modules/config.js';

interface LapikitPlugin {
	normalize?: boolean;
	minify?: boolean;
}

export async function lapikit(options: LapikitPlugin = {}) {
	return {
		name: 'lapikit/vite.js',
		async configResolved() {
			console.log(ansi.bold.blue('Vite plugin loaded'), options);

			const config = await importer();
			const result = await parseConfig();
			await processCSS(options.minify, options.normalize);

			console.log('config', config, result);
		},
		async configureServer(server: ViteDevServer) {
			console.log(ansi.inverse.red('Vite server configured'), server);
		}
	};
}
