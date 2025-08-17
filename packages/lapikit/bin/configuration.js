#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import presets from './presets.js';

export async function initConfiguration(options) {
	console.log('initConfiguration called with:', options);
	const { typescript, pathConfig, formatCSS } = options;
	const ext = typescript ? 'ts' : 'js';
	const targetDir = path.resolve(process.cwd(), pathConfig);
	const targetFile = path.join(targetDir, `lapikit.${ext}`);

	await fs.mkdir(targetDir, { recursive: true });

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
	}
}
