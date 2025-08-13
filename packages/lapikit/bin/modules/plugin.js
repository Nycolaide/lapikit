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
	const configImport = `import config from '${configImportPath}';`;

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
