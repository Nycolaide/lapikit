#!/usr/bin/env node
import prompts from 'prompts';

async function main() {
	console.log('🚀 Welcome in Lapikit !');

	const { confirm } = await prompts({
		type: 'toggle',
		name: 'confirm',
		message: 'Are you ready to install Lapikit on your project?',
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
