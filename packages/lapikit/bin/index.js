#!/usr/bin/env node
import { initConfiguration } from './configuration.js';
import { ansi, terminal } from './helper.js';
import { legacyConfiguration } from './legacy.js';
import { initPrompts } from './prompts.js';

async function run() {
	console.log('  _                 _ _    _ _   ');
	console.log(' | |               (_) |  (_) |  ');
	console.log(' | |     __ _ _ __  _| | ___| |_ ');
	console.log(" | |    / _` | '_ \\| | |/ / | __|");
	console.log(' | |___| (_| | |_) | |   <| | |_ ');
	console.log(' |______\\__,_| .__/|_|_|\\_\\_|\\__|');
	console.log('             | |                 ');
	console.log('             |_|                 \n');

	terminal('none', `${ansi.bold.blue('Lapikit')} - Component Library for Svelte\n\n`);

	const promptsConfig = await initPrompts();

	if (promptsConfig.env === 'current') {
		await legacyConfiguration(promptsConfig);
	}

	if (promptsConfig.env === 'experimental') {
		terminal('warn', `Experimental mode is not yet implemented.`);
		await initConfiguration(promptsConfig);
	}
}

run()
	.then(() => {
		terminal('info', `Website: https://lapikit.dev`);
		terminal('info', `Github: https://github.com/nycolaide/lapikit`);
		terminal('info', `Support the developement: https://buymeacoffee.com/nycolaide`);
		process.exit(0);
	})
	.catch((error) => {
		terminal('error', `Error: ${error}`);
		process.exit(1);
	});
