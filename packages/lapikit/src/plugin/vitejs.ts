import type { ViteDevServer } from 'vite';
import { importer } from '$lib/plugin/modules/importer.js';
import { processCSS } from '$lib/style/css.js';
import { parseConfig } from '$lib/plugin/modules/config.js';
import { terminal } from '$lib/internal/terminal.js';
import path from 'path';
import fs from 'fs';

type Lapikit = {
	minify?: boolean;
	config?: string;
};

const app = process.cwd();

export async function lapikit({ minify = false, config }: Lapikit = {}) {
	if (config) {
		try {
			const pathConfig = path.resolve(app, config);
			console.log('pathConfig:', pathConfig);
		} catch (e) {
			console.log('Error resolving config path:', e);
		}
	}

	return {
		name: 'lapikit/vite.js',
		async configResolved() {
			const importedConfig = await importer();
			const result = await parseConfig(importedConfig);
			await processCSS(result);
			terminal('info', 'lapikit is up!');
		},
		async configureServer(server: ViteDevServer) {
			server.watcher.add(config);
			server.watcher.on('change', async (filePath: string) => {
				if (String(filePath).includes(config)) {
					const importedConfig = await importer();
					const result = await parseConfig(importedConfig);
					await processCSS(result);
					terminal('info', 'lapikit config reloaded');
				}
			});
		}
	};
}
