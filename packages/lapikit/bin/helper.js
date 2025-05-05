export const color = {
	red: `\x1b[31m${text}\x1b[0m`,
	green: `\x1b[32m${text}\x1b[0m`,
	yellow: `\x1b[33m${text}\x1b[0m`,
	blue: `\x1b[34m${text}\x1b[0m`,
	purple: `\x1b[35m${text}\x1b[0m`,
	cyan: `\x1b[36m${text}\x1b[0m`
};

export const variant = {
	bold: `\x1b[1m${text}\x1b[0m`,
	underline: `\x1b[4m${text}\x1b[0m`,
	inverse: `\x1b[7m${text}\x1b[0m`
};

export const bold = {
	red: `\x1b[1m\x1b[31m${text}\x1b[0m`,
	green: `\x1b[1m\x1b[32m${text}\x1b[0m`,
	yellow: `\x1b[1m\x1b[33m${text}\x1b[0m`,
	blue: `\x1b[1m\x1b[34m${text}\x1b[0m`,
	purple: `\x1b[1m\x1b[35m${text}\x1b[0m`,
	cyan: `\x1b[1m\x1b[36m${text}\x1b[0m`
};

export const inverse = {
	red: `\x1b[7m\x1b[31m${text}\x1b[0m`,
	green: `\x1b[7m\x1b[32m${text}\x1b[0m`,
	yellow: `\x1b[7m\x1b[33m${text}\x1b[0m`,
	blue: `\x1b[7m\x1b[34m${text}\x1b[0m`,
	purple: `\x1b[7m\x1b[35m${text}\x1b[0m`,
	cyan: `\x1b[7m\x1b[36m${text}\x1b[0m`
};

export const underline = {
	red: `\x1b[4m\x1b[31m${text}\x1b[0m`,
	green: `\x1b[4m\x1b[32m${text}\x1b[0m`,
	yellow: `\x1b[4m\x1b[33m${text}\x1b[0m`,
	blue: `\x1b[4m\x1b[34m${text}\x1b[0m`,
	purple: `\x1b[4m\x1b[35m${text}\x1b[0m`,
	cyan: `\x1b[4m\x1b[36m${text}\x1b[0m`
};

export const terminal = (type = 'info', msg) => {
	const name = ansi.color.cyan('lapikit');

	if (type === 'error') console.error(name, ansi.bold.red('[error]'), msg);
	else if (type === 'warn') console.warn(name, ansi.bold.yellow('[warn]'), msg);
	else if (type === 'success') console.warn(name, ansi.bold.green('[success]'), msg);
	else console.log(name, ansi.bold.blue('[info]'), msg);
};

export function getCssPathFromArgs() {
	const args = process.argv.slice(2);
	return args[1] || 'src/app.css';
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
