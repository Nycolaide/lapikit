#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { terminal } from './helper.js';
import presets from './presets.js';

async function findReferenceFile(projectPath) {
	const routesPath = path.join(projectPath, 'src', 'routes');

	try {
		await fs.access(routesPath);
	} catch {
		terminal('error', `Lapikit cannot find the routes/ directory.`);
		// throw new Error('Lapikit cannot find the routes/ directory.');
	}

	const layoutFile = path.join(routesPath, '+layout.svelte');
	try {
		await fs.access(layoutFile);
		return layoutFile;
	} catch {
		// +layout.svelte not found in routes/
	}

	const pageFile = path.join(routesPath, '+page.svelte');
	try {
		await fs.access(pageFile);
		return pageFile;
	} catch {
		// +page.svelte not found in routes/
	}

	try {
		const entries = await fs.readdir(routesPath, { withFileTypes: true });
		const subDirectories = entries.filter((entry) => entry.isDirectory());

		for (const dir of subDirectories) {
			const subDirPath = path.join(routesPath, dir.name);

			const subLayoutFile = path.join(subDirPath, '+layout.svelte');
			try {
				await fs.access(subLayoutFile);
				return subLayoutFile;
			} catch {
				// +layout.svelte not found in subdirectory
			}

			const subPageFile = path.join(subDirPath, '+page.svelte');
			try {
				await fs.access(subPageFile);
				return subPageFile;
			} catch {
				// +page.svelte not found in subdirectory
			}
		}
	} catch {
		// Error reading routes directory
	}

	throw new Error('Not found +layout or +page main on your project.');
}

async function addImportToReferenceFile(targetFile, referenceFile) {
	try {
		const content = await fs.readFile(referenceFile, 'utf-8');
		const relativePath = path.relative(path.dirname(referenceFile), targetFile);
		const importStatement = `import "${relativePath.startsWith('.') ? relativePath : './' + relativePath}";\n`;

		if (content.includes(`import "${relativePath}"`)) {
			terminal('info', `Import statement already exists in ${referenceFile}`);
			return;
		}

		const lines = content.split('\n');
		let insertIndex = -1;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line.startsWith('<script>') || line.startsWith('<script lang="ts">')) {
				insertIndex = i + 1;
				break;
			}
		}

		if (insertIndex === -1) {
			throw new Error(`No found balise <script> ou <script lang="ts"> ${referenceFile}`);
		}

		let finalInsertIndex = insertIndex;
		for (let i = insertIndex; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line === '</script>') {
				break;
			}

			if (line === '' || line.startsWith('import ') || line.startsWith('//')) {
				finalInsertIndex = i + 1;
			} else {
				break;
			}
		}

		lines.splice(finalInsertIndex, 0, `\t${importStatement.trim()}`);
		const newContent = lines.join('\n');

		await fs.writeFile(referenceFile, newContent);
		terminal('info', `Import has been added to ${referenceFile}`);
	} catch (error) {
		terminal('error', `Error adding import: ${error.message}`);
		throw error;
	}
}

async function findViteConfigFile(projectPath, typescript) {
	const ext = typescript ? 'ts' : 'js';
	const viteConfigFile = path.join(projectPath, `vite.config.${ext}`);

	try {
		await fs.access(viteConfigFile);
		return viteConfigFile;
	} catch {
		// Try the other extension if the preferred one doesn't exist
		const alternativeExt = typescript ? 'js' : 'ts';
		const alternativeFile = path.join(projectPath, `vite.config.${alternativeExt}`);

		try {
			await fs.access(alternativeFile);
			return alternativeFile;
		} catch {
			throw new Error(`No vite.config.js or vite.config.ts file found in ${projectPath}`);
		}
	}
}

async function addLapikitToViteConfig(viteConfigFile, pathConfig, typescript) {
	try {
		const content = await fs.readFile(viteConfigFile, 'utf-8');
		const lapikitImport = `import { lapikit } from 'lapikit/vite';`;
		const configPath = `${pathConfig}/lapikit.${typescript ? 'ts' : 'js'}`;
		const lapikitPlugin = `lapikit({ config: '${configPath}' })`;

		// Check if lapikit import already exists
		if (content.includes(lapikitImport) || content.includes(`from 'lapikit/vite'`)) {
			terminal('info', `Lapikit import already exists in ${viteConfigFile}`);
			return;
		}

		const lines = content.split('\n');
		let importInsertIndex = -1;
		let pluginAdded = false;

		// Find where to insert the import (after other imports)
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line.startsWith('import ') && !line.includes('type ')) {
				importInsertIndex = i + 1;
			} else if (
				line === '' &&
				importInsertIndex !== -1 &&
				lines[i + 1] &&
				!lines[i + 1].trim().startsWith('import ')
			) {
				importInsertIndex = i;
				break;
			}
		}

		// If no imports found, insert at the beginning
		if (importInsertIndex === -1) {
			importInsertIndex = 0;
		}

		// Insert the lapikit import
		lines.splice(importInsertIndex, 0, lapikitImport);

		// Find and update the plugins array
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			if (line.includes('plugins:') && line.includes('[') && line.includes(']')) {
				// Single line plugins array
				if (line.includes('sveltekit()')) {
					const pluginMatch = line.match(/plugins:\s*\[(.*)\]/);
					if (pluginMatch) {
						const pluginsContent = pluginMatch[1];
						if (!pluginsContent.includes('lapikit')) {
							const newPluginsContent = pluginsContent.replace(
								/sveltekit\(\)/,
								`sveltekit(), ${lapikitPlugin}`
							);
							lines[i] = line.replace(pluginsContent, newPluginsContent);
							pluginAdded = true;
						}
					}
				}
				break;
			} else if (line.includes('plugins:') && line.includes('[') && !line.includes(']')) {
				// Multi-line plugins array start
				for (let j = i; j < lines.length; j++) {
					const pluginLine = lines[j].trim();

					if (pluginLine.includes('sveltekit()') && !pluginAdded) {
						// Check if lapikit is not already present
						let hasLapikit = false;
						for (let k = i; k < lines.length && !lines[k].includes(']'); k++) {
							if (lines[k].includes('lapikit')) {
								hasLapikit = true;
								break;
							}
						}

						if (!hasLapikit) {
							// Add lapikit after sveltekit()
							if (pluginLine.includes(',')) {
								lines[j] = lines[j].replace('sveltekit()', `sveltekit(), ${lapikitPlugin}`);
							} else {
								lines[j] = lines[j].replace('sveltekit()', 'sveltekit(),');
								// Insert lapikit on the next line with proper indentation
								const indentation = lines[j].match(/^\s*/)[0];
								lines.splice(j + 1, 0, `${indentation}${lapikitPlugin}`);
							}
							pluginAdded = true;
						}
						break;
					}

					if (pluginLine.includes(']')) {
						break;
					}
				}
				break;
			}
		}

		if (!pluginAdded) {
			terminal('warn', `Could not find sveltekit() in plugins array to add lapikit() after it`);
		}

		const newContent = lines.join('\n');
		await fs.writeFile(viteConfigFile, newContent);
		terminal('info', `Lapikit import and plugin added to ${viteConfigFile}`);
	} catch (error) {
		terminal('error', `Error adding lapikit to vite config: ${error.message}`);
		throw error;
	}
}

export async function initConfiguration(options) {
	const { typescript, pathConfig, formatCSS } = options;
	const ext = typescript ? 'ts' : 'js';
	const targetDir = path.resolve(process.cwd(), pathConfig);
	const targetFile = path.join(targetDir, `lapikit.${ext}`);

	await fs.mkdir(targetDir, { recursive: true });

	let fileCreated = false;

	// Create Lapikit config
	try {
		await fs.access(targetFile);
		terminal('info', `File ${targetFile} already exists.`);
	} catch {
		terminal('info', `Creating file: ${targetFile}`);
		const content = presets({
			adapterCSS: formatCSS
		});
		await fs.writeFile(targetFile, content);
		terminal('info', `File created: ${targetFile}`);
		fileCreated = true;
	}

	// Add Import Lapikit plugin
	try {
		const referenceFile = await findReferenceFile(process.cwd());
		await addImportToReferenceFile(targetFile, referenceFile);
	} catch (error) {
		terminal('error', `Error adding import: ${error.message}`);

		if (fileCreated) {
			try {
				await fs.unlink(targetFile);
				terminal('info', `File ${targetFile} deleted due to error.`);
			} catch {
				// Ignore deletion error
			}
		}
		throw error;
	}

	// Add lapikit to vite.config file
	try {
		const viteConfigFile = await findViteConfigFile(process.cwd(), typescript);
		await addLapikitToViteConfig(viteConfigFile);
	} catch (error) {
		terminal('warn', `Warning: Could not update vite.config file: ${error.message}`);
		terminal('error', `Error adding lapikit to vite config: ${error.message}`);
	}
}
