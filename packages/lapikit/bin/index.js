#!/usr/bin/env node
import prompts from 'prompts';

async function main() {
	console.log('  _                 _ _    _ _   ');
	console.log(' | |               (_) |  (_) |  ');
	console.log(' | |     __ _ _ __  _| | ___| |_ ');
	console.log(" | |    / _` | '_ \\| | |/ / | __|");
	console.log(' | |___| (_| | |_) | |   <| | |_ ');
	console.log(' |______\\__,_| .__/|_|_|\\_\\_|\\__|');
	console.log('             | |                 ');
	console.log('             |_|                 \n');

	terminal('none', `${ansi.bold.blue('LAPIKIT')} - Component Library for Svelte\n\n`);

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

	const response = await prompts([
		{
			type: 'text',
			name: 'projectName',
			message: 'Project name ?',
			initial: 'lapikit-app'
		},
		{
			type: 'select',
			name: 'theme',
			message: 'Choice theme :',
			choices: [
				{ title: 'Light', value: 'light' },
				{ title: 'Dark', value: 'dark' },
				{ title: 'Auto', value: 'auto' }
			],
			initial: 0
		},
		{
			type: 'toggle',
			name: 'typescript',
			message: 'Use TypeScript ?',
			initial: true,
			active: 'Yes',
			inactive: 'No'
		}
	]);

	console.log('\n Resume :');
	console.log(JSON.stringify(response, null, 2));

	console.log(`Config : ${configFile}`);
}

main();
