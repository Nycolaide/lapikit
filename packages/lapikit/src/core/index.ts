import path from 'path';
import fs from 'fs';

const app = process.cwd();
const defaultPath = 'src/plugin/lapikit.ts';

export async function new_config(customPath?: string) {
	const targetPath = customPath || defaultPath;

	if (customPath && !customPath.startsWith('src/')) {
		throw new Error('Custom path must start with "src/"');
	}

	const fullPath = path.join(app, targetPath);
	try {
		await fs.promises.access(fullPath, fs.constants.F_OK);
		console.log(`Configuration found: ${targetPath}`);
		return fullPath;
	} catch {
		console.warn('No configuration found');
		return null;
	}
}
