import { promises as fs } from 'fs';
import path from 'path';
import { terminal } from '../helper.js';

const lapikitTsTemplate = `import type { Config } from 'lapikit';

/**
 * Custom configuration for Lapikit
 * @see https://lapikit.dev/docs/customize
 */
const config: Config = {
	theme: {
		colorScheme: 'light',
		colors: {
			primary: '#3b82f6',
			secondary: '#6b7280'
		}
	}
};

export default config;
`;

const lapikitJsTemplate = `/**
 * Custom configuration for Lapikit
 * @see https://lapikit.dev/docs/customize
 * @type {import('lapikit').Config}
 */
const config = {
	theme: {
		colorScheme: 'light',
		colors: {
			primary: '#3b82f6',
			secondary: '#6b7280'
		}
	}
};

export default config;
`;

export async function createPluginStructure(pluginPath, isTypescript) {
	const resolvedPluginPath = path.resolve(process.cwd(), pluginPath);
	const lapikitFileName = isTypescript ? 'lapikit.ts' : 'lapikit.js';
	const lapikitFilePath = path.join(resolvedPluginPath, lapikitFileName);

	try {
		// Verify plugin directory
		try {
			await fs.access(resolvedPluginPath);
			terminal('info', `The folder ${pluginPath} already exists.`);
		} catch {
			await fs.mkdir(resolvedPluginPath, { recursive: true });
			terminal('success', `Folder ${pluginPath} created successfully.`);
		}

		// Create lapikit.ts or lapikit.js
		const template = isTypescript ? lapikitTsTemplate : lapikitJsTemplate;
		await fs.writeFile(lapikitFilePath, template.trim() + '\n', 'utf8');

		terminal('success', `File ${lapikitFileName} created in ${pluginPath}.`);
	} catch (error) {
		terminal('error', `Error creating plugin structure: ${error.message}`);
		throw error;
	}
}

export async function setupSvelteKitIntegration(pluginPath, isTypescript) {
	const srcRoutesPath = path.resolve(process.cwd(), 'src/routes');

	try {
		// Check if the src/routes directory exists
		await fs.access(srcRoutesPath);
		terminal('info', 'Folder src/routes found, configuring SvelteKit...');
	} catch {
		terminal('info', 'Folder src/routes not found, no SvelteKit configuration needed.');
		return;
	}

	const layoutPath = path.join(srcRoutesPath, '+layout.svelte');
	const pagePath = path.join(srcRoutesPath, '+page.svelte');

	let targetFile = null;
	let targetFileName = '';

	try {
		await fs.access(layoutPath);
		targetFile = layoutPath;
		targetFileName = '+layout.svelte';
	} catch {
		try {
			await fs.access(pagePath);
			targetFile = pagePath;
			targetFileName = '+page.svelte';
		} catch {
			terminal('warn', 'No +layout.svelte or +page.svelte file found in src/routes.');
			return;
		}
	}

	// Read content
	let fileContent = await fs.readFile(targetFile, 'utf8');

	// Get Path
	const relativePath = path.relative(
		path.dirname(targetFile),
		path.resolve(process.cwd(), pluginPath)
	);
	const lapikitFileName = isTypescript ? 'lapikit' : 'lapikit.js';
	const configImportPath = `${relativePath}/${lapikitFileName}`.replace(/\\/g, '/');

	// Imports
	const createLapikitImport = `\n\timport { createLapikit } from 'lapikit';`;
	const configImport = `\timport config from '${configImportPath}';`;

	const scriptLang = isTypescript ? ' lang="ts"' : '';
	const effectCode = `\n\t$effect.pre(() => {\n\t\tcreateLapikit(config);\n\t});`;

	// search balise
	const scriptRegex = /<script(\s+lang="ts")?>([\s\S]*?)<\/script>/;
	const scriptMatch = fileContent.match(scriptRegex);

	if (scriptMatch) {
		// If have script balise , add import
		let scriptContent = scriptMatch[2];

		// Add imports if they don't already exist
		if (!scriptContent.includes('createLapikit')) {
			scriptContent = `${createLapikitImport}\n${configImport}\n${scriptContent}`;
		}

		// Add effect
		if (!scriptContent.includes('createLapikit(config)')) {
			scriptContent += effectCode;
		}

		// Replace script balise
		const newScript = `<script${scriptMatch[1] || scriptLang}>${scriptContent}\n</script>`;
		fileContent = fileContent.replace(scriptRegex, newScript);
	} else {
		// If no script tag exists, create one
		const newScript = `<script${scriptLang}>\n${createLapikitImport}\n${configImport}${effectCode}\n</script>\n\n`;
		fileContent = newScript + fileContent;
	}

	// Write the modified file
	await fs.writeFile(targetFile, fileContent, 'utf8');
	terminal('success', `Config added ${targetFileName}.`);
}

const [, , command] = process.argv;
const typescriptEnabled = envTypescript();
const args = process.argv.slice(2);
const previewMode = args.includes('--preview');

if (process.argv.includes('--help') || process.argv.includes('-h')) {
	terminal(
		'info',
		`usage: ${ansi.color.yellow('npx lapikit init {cssPath} [--plugin-path {pluginPath}] [--preview]')}\n\n ${ansi.variant.bold('options:')}\n
        - {cssPath}: (${ansi.color.cyan('src/app.css')}) customize path on your origin css file.
        - --plugin-path, -p: (${ansi.color.cyan('src/plugin')}) customize path for the plugin directory.
        - --preview: active preview mode (plugin + SvelteKit integration)\n\n`
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

	if (previewMode) {
		// Mode preview
		const pluginPath = getLapikitPathFromArgs();
		const pathValidation = validatePluginPath(pluginPath);
		if (!pathValidation.valid) {
			terminal('error', `Invalid path: ${pathValidation.error}`);
			process.exit(1);
		}
		try {
			await createPluginStructure(pluginPath, typescriptEnabled);
		} catch (error) {
			terminal('error', `Create plugin structure not working : ${error.message}`);
		}
		try {
			await setupSvelteKitIntegration(pluginPath, typescriptEnabled);
		} catch (error) {
			terminal('error', `SvelteKit integration setup failed: ${error.message}`);
		}
	} else {
		// Mode classic
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
		await adapterCSSConfig();
	}

	await adapterViteConfig(typescriptEnabled);

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
