import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { terminal } from '$lib/internal/terminal.js';
import { css } from '$lib/plugin/css.js';
import { parserConfigLapikit } from '../helpers/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fsPromises from 'fs/promises';
import path from 'path';

type Lapikit = {
	config?: string;
};

const app = process.cwd();

export async function lapikitEvol({ config }: Lapikit = {}) {
	return {
		name: 'lapikit/vite',
		async configResolved() {
			if (config) {
				const configuration = await parserConfigLapikit(app, config);

				// generate styles
				const styles = await css(configuration);

				fsPromises.writeFile(path.resolve(__dirname, '../labs.css'), styles?.themes);

				console.log('styles', styles);
			}
			terminal('info', 'lapikit is up!');
		}
	};
}
