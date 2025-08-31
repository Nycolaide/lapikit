import path from 'path';
import fs from 'fs';
import { terminal } from '$lib/internal/terminal.js';

const app = process.cwd();

export async function getLapikitConfig(filePath: string) {
	const pathConfig = path.resolve(app, filePath);

	if (!fs.existsSync(pathConfig)) process.exit(1);

	const code = fs.readFileSync(pathConfig, 'utf-8');
	const match = code.match(/createLapikit\s*\(\s*({[\s\S]*?})\s*\)/);

	let options = {};

	if (match && match[1]) {
		try {
			options = new Function('return ' + match[1])();
		} catch (e) {
			terminal('error', `error parsing lapikit config: ${e}`);
		}
	} else {
		terminal('info', 'lapikit config has loaded successfully!');
	}

	return options;
}
