#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

export async function initConfiguration(options) {
	const { typescript, pathConfig } = options;
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
		await fs.writeFile(targetFile, '// lapikit entry file');
		console.log(`File created : ${targetFile}`);
	}
}
