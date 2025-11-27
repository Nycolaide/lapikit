#!/usr/bin/env node
import prompts from 'prompts';
import { terminal } from './helper.js';

export async function initPrompts() {
	const { confirm } = await prompts({
		type: 'toggle',
		name: 'confirm',
		message: 'Launch install Lapikit on your project?',
		initial: true,
		active: 'Yes',
		inactive: 'No'
	});

	if (!confirm) {
		terminal('warn', `installation canceled.`);
		process.exit(0);
	}

	// Preview install
	const settings = await prompts([
		{
			type: 'text',
			name: 'pathConfig',
			message: 'Where would you like to install the lapikit configuration files?',
			initial: 'src/plugins',
			validate: (value) =>
				value.startsWith('src/') ? true : 'Please provide a valid path starting with src/'
		},
		{
			type: 'toggle',
			name: 'typescript',
			message: 'Use TypeScript?',
			initial: true,
			active: 'Yes',
			inactive: 'No'
		},
		{
			type: 'select',
			name: 'formatCSS',
			message: 'What is your CSS format used on your app?',
			choices: [
				{ title: 'Basic (classic import)', value: 'css' },
				{
					title: 'TailwindCSS (v4)',
					value: 'tailwind-v4'
				},
				{
					title: 'UnoCSS',
					value: 'unocss'
				}
			]
		},
		{
			type: (prev) => (prev !== 'css' ? 'text' : null),
			name: 'pathCSS',
			message: 'Where would you like to import the lapikit CSS files?',
			initial: 'src/app.css',
			validate: (value) =>
				value.startsWith('src/') ? true : 'Please provide a valid path starting with src/'
		}
	]);

	return {
		...settings
	};
}
