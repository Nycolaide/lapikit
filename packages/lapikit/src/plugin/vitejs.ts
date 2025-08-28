import type { ViteDevServer } from 'vite';
import { importer } from '$lib/plugin/modules/importer.js';
import { processCSS } from '$lib/style/css.js';
import { parseConfig } from '$lib/plugin/modules/config.js';
import { terminal } from '$lib/internal/terminal.js';
import path from 'path';
import fs from 'fs';
import { css } from './css.js';

type Lapikit = {
	config?: string;
};

const app = process.cwd();

async function getLapikitConfig(filePath: string) {
	const pathConfig = path.resolve(app, filePath);

	if (!fs.existsSync(pathConfig)) process.exit(1);

	const code = fs.readFileSync(pathConfig, 'utf-8');
	const match = code.match(/createLapikit\s*\(\s*({[\s\S]*?})\s*\)/);

	let options = {};

	if (match && match[1]) {
		try {
			options = new Function('return ' + match[1])();
		} catch (e) {
			console.error('Error parsing lapikit config:', e);
		}
	} else {
		console.error('Lapikit not found');
	}

	return options;
}

export async function lapikit({ config }: Lapikit = {}) {
	if (config) {
		const value = getLapikitConfig(config);
		console.log(value);

		css(value);
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
			server.watcher.add('./lapikit.config.js');
			server.watcher.on('change', async (filePath: string) => {
				if (String(filePath).includes('lapikit.config.js')) {
					const config = await importer();
					const result = await parseConfig(config);
					await processCSS(result);
					terminal('info', 'lapikit config reloaded');
				}
			});
		}
	};
}
