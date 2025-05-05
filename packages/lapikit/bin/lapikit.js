#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { color, bold, variant, terminal, envTypescript } from './helper.js';
import { preset } from './modules/preset.js';
import { adapterCSSConfig, adapterViteConfig } from './modules/adapter.js';

const [, , command] = process.argv;
const typescriptEnabled = envTypescript();

if (process.argv.includes('--help') || process.argv.includes('-h')) {
	terminal(
		'info',
		`usage: ${color.yellow('npx lapikit init {cssPath}')}\n\n ${variant.bold('options:')}\n
        - {cssPath}: (${color.cyan('src/app.css')}) customize path on your origin css file.\n\n`
	);
	process.exit(0);
} else if (command === 'init') {
	console.log('  _                 _ _    _ _   ');
	console.log(' | |               (_) |  (_) |  ');
	console.log(' | |     __ _ _ __  _| | ___| |_ ');
	console.log(" | |    / _` | '_ \\| | |/ / | __|");
	console.log(' | |___| (_| | |_) | |   <| | |_ ');
	console.log(' |______\\__,_| .__/|_|_|\\_\\_|\\__|');
	console.log('             | |                 ');
	console.log('             |_|                 ');

	terminal('info', `${bold.blue('LAPIKIT')} - Component Library for Svelte\n\n`);

	const configPath = path.resolve(process.cwd(), 'lapikit.config.js');
	try {
		await fs.writeFile(configPath, preset.trim() + '\n', 'utf8');
		terminal('success', `has create lapikit.config.js on your project.`);
	} catch (error) {
		terminal('error', `failed to create configuration file:\n\n ${error}`);
		terminal(
			'warn',
			`you can create lapikit.config.js manually, please visite https://localhost:3000/docs for more information`
		);
	}

	await adapterViteConfig(typescriptEnabled);
	await adapterCSSConfig();

	terminal(
		'info',
		`${bold.blue('Thank to use lapikit, discover all posibility with lapikit on https://localhost:3000/docs')}\n\n`
	);

	console.log('Github: https://github.com/nycolaide/lapikit');
	console.log('Support the developement: https://buymeacoffee.com/nycolaide');
} else {
	terminal('error', `Command not recognized. Try 'npx lapikit init'`);
}
