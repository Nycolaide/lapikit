import path from 'path';
import fs from 'fs';

const app = process.cwd();

async function detectFileTypeAndContent(
	configPath: string
): Promise<{ filePath: string; content: string }> {
	const hasExtension = /\.(ts|js)$/.test(configPath);

	if (hasExtension) {
		const isTypeScript = configPath.endsWith('.ts');
		const content = isTypeScript
			? `// Configuration lapikit
export default {
	// Your configuration here
};
`
			: `// Configuration lapikit
module.exports = {
	// Your configuration here
};
`;
		return { filePath: configPath, content };
	}

	const tsconfigPath = path.join(app, 'tsconfig.json');

	try {
		await fs.promises.access(tsconfigPath, fs.constants.F_OK);

		return {
			filePath: `${configPath}.ts`,
			content: `// Configuration lapikit
export default {
	// Your configuration here
};
`
		};
	} catch {
		return {
			filePath: `${configPath}.js`,
			content: `// Configuration lapikit
module.exports = {
	// Your configuration here
};
`
		};
	}
}

export async function new_config({ configPath }: { configPath: string }) {
	const { filePath: resolvedPath, content } = await detectFileTypeAndContent(configPath);

	if (resolvedPath && !resolvedPath.startsWith('src/')) {
		throw new Error('Custom path must start with "src/"');
	}

	const fullPath = path.join(app, resolvedPath);

	try {
		await fs.promises.access(fullPath, fs.constants.F_OK);
		console.log(`Configuration found: ${resolvedPath}`);
		return fullPath;
	} catch {
		console.warn(`No configuration found at ${resolvedPath}, creating it...`);

		// create folder
		const dirPath = path.dirname(fullPath);
		try {
			await fs.promises.access(dirPath, fs.constants.F_OK);
			console.log(`Directory exists: ${path.dirname(resolvedPath)}`);
		} catch {
			console.log(`Creating directory: ${path.dirname(resolvedPath)}`);
			await fs.promises.mkdir(dirPath, { recursive: true });
		}

		// Create the lapikit file with detected content
		await fs.promises.writeFile(fullPath, content, 'utf8');
		console.log(`Configuration file created: ${resolvedPath}`);

		return fullPath;
	}
}
