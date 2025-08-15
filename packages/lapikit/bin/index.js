#!/usr/bin/env node
import prompts from 'prompts';
import { ansi, terminal } from './helper.js';
import { legacyConfiguration } from './legacy.js';

async function main() {
	console.log('  _                 _ _    _ _   ');
	console.log(' | |               (_) |  (_) |  ');
	console.log(' | |     __ _ _ __  _| | ___| |_ ');
	console.log(" | |    / _` | '_ \\| | |/ / | __|");
	console.log(' | |___| (_| | |_) | |   <| | |_ ');
	console.log(' |______\\__,_| .__/|_|_|\\_\\_|\\__|');
	console.log('             | |                 ');
	console.log('             |_|                 \n');

	terminal('none', `${ansi.bold.blue('Lapikit')} - Component Library for Svelte\n\n`);

	const { confirm } = await prompts({
		type: 'toggle',
		name: 'confirm',
		message: 'Start install Lapikit on your app?',
		initial: true,
		active: 'Yes',
		inactive: 'No'
	});

	if (!confirm) {
		console.log('❌ Installation canceled. See you soon.');
		process.exit(0);
	}
	// temps with legacy and new process install
	const { type } = await prompts({
		type: 'select',
		name: 'type',
		message: 'Select installation type:',
		choices: [
			{ title: 'Classic install with lapikit.config.js', value: 'current' },
			{
				title: 'Preview install with new plugin/lapikit.(js|ts) <experimental>',
				value: 'experimental'
			}
		]
	});

	if (type === 'current') {
		// Classic install
		const settings = await prompts([
			{
				type: 'text',
				name: 'pathCSS',
				message: 'Where would you like to import the lapikit CSS files?',
				initial: 'src/app.css',
				validate: (value) =>
					value.startsWith('src/') ? true : 'Please provide a valid path starting with src/'
			}
		]);

		await legacyConfiguration(settings);
	} else if (type === 'experimental') {
		// Preview install
	}

	// const settings = await prompts([
	// 	{
	// 		type: 'text',
	// 		name: 'pathConfig',
	// 		message: 'Where would you like to install the lapikit configuration files?',
	// 		initial: 'src/plugins',
	// 		validate: (value) =>
	// 			value.startsWith('src/') ? true : 'Please provide a valid path starting with src/'
	// 	},
	// 	{
	// 		type: 'toggle',
	// 		name: 'typescript',
	// 		message: 'Use TypeScript?',
	// 		initial: true,
	// 		active: 'Yes',
	// 		inactive: 'No'
	// 	}
	// ]);

	// const response = await prompts([
	// 	{
	// 		type: 'text',
	// 		name: 'projectName',
	// 		message: 'Project name ?',
	// 		initial: 'lapikit-app'
	// 	},
	// 	{
	// 		type: 'select',
	// 		name: 'theme',
	// 		message: 'Choice theme :',
	// 		choices: [
	// 			{ title: 'Light', value: 'light' },
	// 			{ title: 'Dark', value: 'dark' },
	// 			{ title: 'Auto', value: 'auto' }
	// 		],
	// 		initial: 0
	// 	},
	// 	{
	// 		type: 'toggle',
	// 		name: 'typescript',
	// 		message: 'Use TypeScript ?',
	// 		initial: true,
	// 		active: 'Yes',
	// 		inactive: 'No'
	// 	}
	// ]);

	// console.log('\n Resume :');
	// console.log(JSON.stringify(response, null, 2));

	// console.log(`Config : ${configFile}`);
}

main();
