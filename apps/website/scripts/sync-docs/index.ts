import fs from 'fs';
import path from 'path';
import { processMarkdownFiles } from './utils.js';

async function syncDocs(): Promise<void> {
	console.log('🔄 Synchronization of documentation files...');

	const sourceDir: string = path.resolve(process.cwd(), '../../docs');
	const destDir: string = path.resolve(process.cwd(), 'src/content');

	try {
		if (!fs.existsSync(sourceDir)) {
			throw new Error(`The source directory does not exist: ${sourceDir}`);
		}

		console.log(`📂 Source: ${sourceDir}`);
		console.log(`📁 Destination: ${destDir}`);

		if (!fs.existsSync(destDir)) {
			fs.mkdirSync(destDir, { recursive: true });
		}

		function copyRecursive(src: string, dest: string): void {
			const stats = fs.statSync(src);

			if (stats.isDirectory()) {
				if (!fs.existsSync(dest)) {
					fs.mkdirSync(dest, { recursive: true });
				}

				const items: string[] = fs.readdirSync(src);

				items.forEach((item: string) => {
					const srcPath: string = path.join(src, item);
					const destPath: string = path.join(dest, item);
					copyRecursive(srcPath, destPath);
				});
			} else {
				fs.copyFileSync(src, dest);
				console.log(`✅ Copy: ${path.relative(sourceDir, src)}`);
			}
		}

		copyRecursive(sourceDir, destDir);

		// Copier les fichiers supplémentaires depuis packages/lapikit
		const lapikitDir: string = path.resolve(process.cwd(), '../../packages/lapikit');
		const additionalFiles: { src: string; dest: string }[] = [
			{ src: 'ROADMAP.md', dest: 'roadmap.md' },
			{ src: 'CHANGELOG.md', dest: 'changelog.md' }
		];

		additionalFiles.forEach(({ src, dest }) => {
			const srcPath: string = path.join(lapikitDir, src);
			const destPath: string = path.join(destDir, dest);

			if (fs.existsSync(srcPath)) {
				fs.copyFileSync(srcPath, destPath);
				console.log(`✅ Copy: ${src} -> ${dest}`);
			} else {
				console.warn(`⚠️ Warning: File not found: ${srcPath}`);
			}
		});

		console.log('✨ Synchronization completed successfully!');
		const navDocsPath = path.resolve(process.cwd(), 'src/data/api/docs.json');
		processMarkdownFiles(destDir, navDocsPath);
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		console.error('❌ Error during synchronization:', errorMessage);
		process.exit(1);
	}
}

syncDocs();
