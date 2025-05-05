import path from 'path';
import fs from 'fs';
import { terminal, ansi } from '$lib/internal/index.js';

const app = process.cwd();
const pathConfig = path.resolve(app, 'lapikit.config.js');

export const importer = async () => {
	if (!fs.existsSync(pathConfig)) {
		terminal(
			'error',
			`config file not found\n ${ansi.color.yellow(
				'Could not find lapikit.config.js. See https://localhost/docs/kit/vite to learn more about the configuration file.'
			)}\n\n${ansi.color.blue('for initializing a new lapikit config, run:')}\n        ${ansi.variant.bold('npx lapikit init')}    ${ansi.bold.yellow('(preview)')}\n\n`
		);

		process.exit(1);
	}

	const timestamp = Date.now();
	const fileUrl = `file://${pathConfig}?t=${timestamp}`;
	const content = await import(fileUrl);

	return content.default;
};
