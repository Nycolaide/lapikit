#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import {
	ansi,
	terminal,
	envTypescript,
	getLapikitPathFromArgs,
	validatePluginPath
} from './helper.js';
import { preset } from './modules/preset.js';
import { adapterCSSConfig, adapterViteConfig } from './modules/adapter.js';
import { createPluginStructure, setupSvelteKitIntegration } from './modules/plugin.js';

const [, , command] = process.argv;
const typescriptEnabled = envTypescript();

if (process.argv.includes('--help') || process.argv.includes('-h')) {
	terminal(
		'info',
		`usage: ${ansi.color.yellow('npx lapikit init {cssPath} [--plugin-path {pluginPath}]')}\n\n ${ansi.variant.bold('options:')}\n
        - {cssPath}: (${ansi.color.cyan('src/app.css')}) customize path on your origin css file.
        - --plugin-path, -p: (${ansi.color.cyan('src/plugin')}) customize path for the plugin directory.\n\n`
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
	console.log('             |_|                 \n');

	terminal('none', `${ansi.bold.blue('LAPIKIT')} - Component Library for Svelte\n\n`);

	// Get Path
	const pluginPath = getLapikitPathFromArgs();
	const pathValidation = validatePluginPath(pluginPath);

	if (!pathValidation.valid) {
		terminal('error', `Invalid path: ${pathValidation.error}`);
		process.exit(1);
	}

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

	// Create plugin structure
	try {
		await createPluginStructure(pluginPath, typescriptEnabled);
	} catch (error) {
		terminal('error', `Create plugin structure not working : ${error.message}`);
	}

	// Setup SvelteKit integration
	try {
		await setupSvelteKitIntegration(pluginPath, typescriptEnabled);
	} catch (error) {
		terminal('error', `SvelteKit integration setup failed: ${error.message}`);
	}

	await adapterViteConfig(typescriptEnabled);
	await adapterCSSConfig();

	terminal(
		'info',
		`${ansi.bold.blue('Thank to use lapikit, discover all posibility with lapikit on https://lapikit.dev')}\n\n`
	);

	console.log('Website: https://lapikit.dev');
	console.log('Github: https://github.com/nycolaide/lapikit');
	console.log('Support the developement: https://buymeacoffee.com/nycolaide');
} else {
	terminal('error', `Command not recognized. Try 'npx lapikit -h'`);
}
