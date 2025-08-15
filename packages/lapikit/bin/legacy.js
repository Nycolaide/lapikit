#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { preset } from './modules/preset.js';
import { ansi, terminal, envTypescript } from './helper.js';
import { adapterCSSConfig, adapterViteConfig } from './modules/adapter.js';

export async function legacyConfiguration(options) {
	const typescriptEnabled = envTypescript();
	const configPath = path.resolve(process.cwd(), 'lapikit.config.js');

	try {
		await fs.writeFile(configPath, preset.trim() + '\n', 'utf8');
		terminal('success', `has create lapikit.config.js on your project.`);
	} catch (error) {
		terminal('error', `failed to create configuration file:\n\n ${error}`);
		terminal(
			'warn',
			`you can create lapikit.config.js manually, please visite https://lapikit.dev/docs/getting-started for more information`
		);
	}

	await adapterViteConfig(typescriptEnabled);
	await adapterCSSConfig(options);

	terminal(
		'info',
		`${ansi.bold.blue('Thank to use lapikit, discover all posibility with lapikit on https://lapikit.dev')}\n\n`
	);

	console.log('Website: https://lapikit.dev');
	console.log('Github: https://github.com/nycolaide/lapikit');
	console.log('Support the developement: https://buymeacoffee.com/nycolaide');
}
