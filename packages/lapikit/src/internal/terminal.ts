import { ansi } from '$lib/internal/ansi.js';

export const terminal = (type: 'info' | 'error' | 'warn' | 'success' = 'info', msg: string) => {
	const name = ansi.color.cyan('lapikit');

	if (type === 'error') console.error(name, ansi.bold.red('[error]'), msg);
	else if (type === 'warn') console.warn(name, ansi.bold.yellow('[warn]'), msg);
	else if (type === 'success') console.warn(name, ansi.bold.green('[success]'), msg);
	else console.log(name, ansi.bold.blue('[info]'), msg);
};
