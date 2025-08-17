#!/usr/bin/env node
import prompts from 'prompts';

export async function initPrompts() {
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

		return {
			...settings,
			env: 'current'
		};
	} else if (type === 'experimental') {
		// Preview install
		let settings = await prompts([
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
					{ title: 'Basic (classic import)', value: 'global' },
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
				type: (prev) => (prev !== 'global' ? 'text' : null),
				name: 'pathCSS',
				message: 'Where would you like to import the lapikit CSS files?',
				initial: 'src/app.css',
				validate: (value) =>
					value.startsWith('src/') ? true : 'Please provide a valid path starting with src/'
			}
		]);

		console.log('response config', settings);

		return {
			...settings,
			env: 'experimental'
		};
	}
}
