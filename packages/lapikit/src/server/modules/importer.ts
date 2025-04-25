import path from 'path';
import fs from 'fs';
import { ansi } from './ansi.js';

const app = process.cwd();
const pathConfig = path.resolve(app, 'lapikit.config.js');

export const importer = async () => {
	if (!fs.existsSync(pathConfig)) {
		console.error(
			ansi.color.cyan('lapikit'),
			ansi.bold.red('[error]'),
			'config file not found\n',
			ansi.color.yellow(
				'Could not find lapikit.config.js. See https://localhost/docs/kit/vite to learn more about the configuration file.'
			),
			'\n\n',
			ansi.color.blue('for initializing a new lapikit config, run:\n'),
			'     ' + ansi.variant.bold('npx lapikit init') + '  ' + ansi.bold.yellow('(preview)'),
			'\n\n'
		);

		process.exit(1);
	}

	const content = await import(pathConfig);

	return content.default;
};
