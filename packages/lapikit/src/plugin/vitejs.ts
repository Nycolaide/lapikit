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
		const pathConfig = path.resolve(app, config);

		if (!fs.existsSync(pathConfig)) process.exit(1);

		const code = fs.readFileSync(pathConfig, 'utf-8');
		const match = code.match(/createLapikit\s*\(\s*({[\s\S]*?})\s*\)/);

		let lapikitOptions = {};

		if (match && match[1]) {
			try {
				lapikitOptions = new Function('return ' + match[1])();
			} catch (e) {
				console.error('Error parsing lapikit config:', e);
			}
		} else {
			console.error('Lapikit not found');
		}

		console.log('lapikitOptions', lapikitOptions);
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
