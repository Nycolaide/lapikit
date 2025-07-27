import type { ViteDevServer } from 'vite';
import { importer } from '$lib/plugin/modules/importer.js';
import { processCSS } from '$lib/style/css.js';
import { parseConfig } from '$lib/plugin/modules/config.js';
import { terminal } from '$lib/internal/terminal.js';

// preview
import { new_config } from '$lib/core/index.js';

export async function lapikit() {
	return {
		name: 'lapikit/vite.js',
		async configResolved() {
			//preview
			await new_config();

			const config = await importer();
			const result = await parseConfig(config);
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
