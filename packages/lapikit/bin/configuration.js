#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import presets from './presets.js';

async function findReferenceFile(projectPath) {
	const routesPath = path.join(projectPath, 'src', 'routes');

	try {
		await fs.access(routesPath);
	} catch {
		throw new Error('Lapikit cannot find the routes/ directory.');
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
			console.log(`Import déjà présent dans ${referenceFile}`);
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
		console.log(`Import has added on ${referenceFile}`);
	} catch (error) {
		console.error(`Error adding import: ${error.message}`);
		throw error;
	}
}

export async function initConfiguration(options) {
	console.log('initConfiguration called with:', options);
	const { typescript, pathConfig, formatCSS } = options;
	const ext = typescript ? 'ts' : 'js';
	const targetDir = path.resolve(process.cwd(), pathConfig);
	const targetFile = path.join(targetDir, `lapikit.${ext}`);

	await fs.mkdir(targetDir, { recursive: true });

	let fileCreated = false;
	try {
		console.log(`Trying to access ${targetFile}`);
		await fs.access(targetFile);
		console.log(`File ${targetFile} already exists.`);
	} catch {
		console.log(`Creating file: ${targetFile}`);
		const content = presets({
			classic: formatCSS === 'global'
		});
		await fs.writeFile(targetFile, content);
		console.log(`File created : ${targetFile}`);
		fileCreated = true;
	}
	try {
		const referenceFile = await findReferenceFile(process.cwd());
		await addImportToReferenceFile(targetFile, referenceFile);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		// If the file was just created and we can't add the import, delete it
		if (fileCreated) {
			try {
				await fs.unlink(targetFile);
				console.log(`File ${targetFile} deleted due to error.`);
			} catch {
				// Ignore deletion error
			}
		}
		throw error;
	}
}
