#!/usr/bin/env node
import prompts from 'prompts';

async function main() {
	console.log('🚀 Welcome in Lapikit !');

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
			active: 'Oui',
			inactive: 'Non'
		}
	]);

	console.log('\n Resume :');
	console.log(JSON.stringify(response, null, 2));

	console.log(`Config : ${configFile}`);
}

main();
