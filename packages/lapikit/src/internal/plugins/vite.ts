import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { terminal } from '$lib/internal/terminal.js';
import { css } from '$lib/internal/core/formatter/index.js';
import { parserConfigLapikit } from '../helpers/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fsPromises from 'fs/promises';
import path from 'path';
import { processImportStyles } from '../core/css.js';

type Lapikit = {
	config?: string;
};

const app = process.cwd();

export async function lapikit({ config }: Lapikit = {}) {
	return {
		name: 'lapikit/vite',
		async config() {
			if (config) {
				const configuration = await parserConfigLapikit(app, config);

				// generate styles

				const basicStyles = await processImportStyles();

				fsPromises.writeFile(path.resolve(__dirname, '../../styles.css'), basicStyles || '');

				const styles = await css(configuration);

				fsPromises.writeFile(
					path.resolve(__dirname, '../../themes.css'),
					styles?.themes +
						'\n\n' +
						styles?.typography +
						'\n\n' +
						styles?.styles +
						'\n\n' +
						styles?.devices || ''
				);
			}
			terminal('info', 'lapikit is up!');
		}
	};
}
