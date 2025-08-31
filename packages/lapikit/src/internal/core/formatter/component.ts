import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function componentFormatter() {
	// Format component styles
	function loadCSSFiles(directory: string) {
		fs.readdirSync(directory).forEach((File) => {
			const absolutePath = path.join(directory, File);
			if (fs.statSync(absolutePath).isDirectory()) return loadCSSFiles(absolutePath);
			else if (absolutePath.endsWith('.css') && !absolutePath.includes('/_')) {
				console.log(absolutePath);
			}
		});
	}
	loadCSSFiles(path.resolve(__dirname, '../../../components'));
}
