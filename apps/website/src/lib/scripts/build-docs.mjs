import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cp } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the root directory of the project
const rootDir = path.resolve(__dirname, '../../../../../');
const sourceDir = path.join(rootDir, 'docs');
const packageDir = path.join(rootDir, 'packages', 'lapikit');
const destDir = path.join(rootDir, 'apps', 'website', 'src', 'content');

async function copyDocs() {
	try {
		const filesToCopy = ['CHANGELOG.md', 'ROADMAP.md'];

		if (!fs.existsSync(sourceDir)) {
			console.error(`The source folder does not exist: ${sourceDir}`);
			process.exit(1);
		}

		await cp(sourceDir, destDir, { recursive: true });
		console.log(`Successfully copied "docs" folder into "apps/website/content"`);

		for (const file of filesToCopy) {
			const src = path.join(packageDir, file);
			const dest = path.join(destDir, file.toLowerCase());

			if (fs.existsSync(src)) {
				await cp(src, dest);
			}
		}
		console.log(`Successfully copied "specific" files into "apps/website/content"`);
	} catch (err) {
		console.error('Error copying files:', err);
		process.exit(1);
	}
}

copyDocs();
