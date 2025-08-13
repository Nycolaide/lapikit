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
			terminal('info', `Le dossier ${pluginPath} existe déjà.`);
		} catch {
			await fs.mkdir(resolvedPluginPath, { recursive: true });
			terminal('success', `Dossier ${pluginPath} créé avec succès.`);
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
