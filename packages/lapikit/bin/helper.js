import { promises as fs } from 'fs';
import path from 'path';

const color = {
	red: (text) => `\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[33m${text}\x1b[0m`,
	blue: (text) => `\x1b[34m${text}\x1b[0m`,
	purple: (text) => `\x1b[35m${text}\x1b[0m`,
	cyan: (text) => `\x1b[36m${text}\x1b[0m`
};

const variant = {
	bold: (text) => `\x1b[1m${text}\x1b[0m`,
	underline: (text) => `\x1b[4m${text}\x1b[0m`,
	inverse: (text) => `\x1b[7m${text}\x1b[0m`
};

const bold = {
	red: (text) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[1m\x1b[33m${text}\x1b[0m`,
	blue: (text) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
	purple: (text) => `\x1b[1m\x1b[35m${text}\x1b[0m`,
	cyan: (text) => `\x1b[1m\x1b[36m${text}\x1b[0m`
};

const inverse = {
	red: (text) => `\x1b[7m\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[7m\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[7m\x1b[33m${text}\x1b[0m`,
	blue: (text) => `\x1b[7m\x1b[34m${text}\x1b[0m`,
	purple: (text) => `\x1b[7m\x1b[35m${text}\x1b[0m`,
	cyan: (text) => `\x1b[7m\x1b[36m${text}\x1b[0m`
};

const underline = {
	red: (text) => `\x1b[4m\x1b[31m${text}\x1b[0m`,
	green: (text) => `\x1b[4m\x1b[32m${text}\x1b[0m`,
	yellow: (text) => `\x1b[4m\x1b[33m${text}\x1b[0m`,
	blue: (text) => `\x1b[4m\x1b[34m${text}\x1b[0m`,
	purple: (text) => `\x1b[4m\x1b[35m${text}\x1b[0m`,
	cyan: (text) => `\x1b[4m\x1b[36m${text}\x1b[0m`
};

export const ansi = {
	color,
	variant,
	bold,
	inverse,
	underline
};

export const terminal = (type = 'info', msg) => {
	const name = ansi.color.cyan('lapikit');

	if (type === 'error') console.error(name, ansi.bold.red('[error]'), msg);
	else if (type === 'warn') console.warn(name, ansi.bold.yellow('[warn]'), msg);
	else if (type === 'success') console.warn(name, ansi.bold.green('[success]'), msg);
	else if (type === 'none') console.log(msg);
	else console.log(name, ansi.bold.blue('[info]'), msg);
};

export function getCssPathFromArgs() {
	const args = process.argv.slice(2);
	return args[1] || 'src/app.css';
}

export function getLapikitPathFromArgs() {
	const args = process.argv.slice(2);
	// Search argument after --plugin-path or -p
	const pluginPathIndex = args.findIndex((arg) => arg === '--plugin-path' || arg === '-p');
	if (pluginPathIndex !== -1 && args[pluginPathIndex + 1]) {
		return args[pluginPathIndex + 1];
	}
	return 'src/plugin';
}

export function validatePluginPath(pluginPath) {
	if (!pluginPath.startsWith('src/')) {
		return {
			valid: false,
			error: 'The path must start with "src/"'
		};
	}
	return { valid: true };
}

export async function envTypescript() {
	const directory = process.cwd();
	try {
		await fs.readFile(path.resolve(directory, 'tsconfig.json'), 'utf-8');
		return true;
	} catch {
		return false;
	}
}
