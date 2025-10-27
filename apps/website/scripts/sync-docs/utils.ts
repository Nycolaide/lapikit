import fs from 'fs';
import path from 'path';
import type { FrontMatterData, Manifest, ManifestEntry } from './types';

export function extractFrontMatter(filePath: string): FrontMatterData | null {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');

		if (!content.startsWith('---')) {
			return null;
		}

		const endIndex = content.indexOf('---', 3);
		if (endIndex === -1) {
			return null;
		}

		const yamlContent = content.substring(3, endIndex).trim();

		const frontMatter: Record<string, unknown> = {};
		const lines = yamlContent.split('\n');

		let currentSection: string | null = null;
		let currentArray: string | null = null;

		for (const line of lines) {
			const trimmedLine = line.trim();
			if (!trimmedLine || trimmedLine.startsWith('#')) continue;

			const indentLevel = line.length - line.trimStart().length;

			if (trimmedLine.includes(':') && indentLevel === 0) {
				const colonIndex = trimmedLine.indexOf(':');
				const key = trimmedLine.substring(0, colonIndex).trim();
				const value = trimmedLine.substring(colonIndex + 1).trim();

				if (value) {
					frontMatter[key] = parseValue(value);
				} else {
					frontMatter[key] = {};
					currentSection = key;
				}
				currentArray = null;
			} else if (trimmedLine.includes(':') && indentLevel > 0 && currentSection) {
				const colonIndex = trimmedLine.indexOf(':');
				const key = trimmedLine.substring(0, colonIndex).trim();
				const value = trimmedLine.substring(colonIndex + 1).trim();

				const sectionObj = frontMatter[currentSection] as Record<string, unknown>;
				sectionObj[key] = parseValue(value);
			} else if (trimmedLine.startsWith('-') && indentLevel > 0) {
				const item = trimmedLine.substring(1).trim();

				if (currentSection && !currentArray) {
					const sectionObj = frontMatter[currentSection] as Record<string, unknown>;
					for (const [key, val] of Object.entries(sectionObj)) {
						if (Array.isArray(val)) {
							currentArray = key;
							break;
						}
					}
				}

				if (currentSection === 'keywords' || currentArray === 'keywords') {
					if (!Array.isArray(frontMatter.keywords)) {
						frontMatter.keywords = [];
					}
					(frontMatter.keywords as string[]).push(item);
				}
			}
		}

		return frontMatter as FrontMatterData;
	} catch (error) {
		console.error(`❌ Error to read ${filePath}:`, error);
		return null;
	}
}

function parseValue(value: string): unknown {
	if (value.startsWith('"') && value.endsWith('"')) {
		return value.slice(1, -1);
	} else if (value === 'true') {
		return true;
	} else if (value === 'false') {
		return false;
	} else if (!isNaN(Number(value)) && value !== '') {
		return Number(value);
	} else {
		return value;
	}
}

export function processMarkdownFiles(dirPath: string, manifestOutputPath: string): void {
	console.log('\n📖 Extracting metadata from Markdown files...');

	const manifestEntries: ManifestEntry[] = [];

	function processDirectory(currentPath: string): void {
		const items = fs.readdirSync(currentPath);

		for (const item of items) {
			const fullPath = path.join(currentPath, item);
			const stat = fs.statSync(fullPath);

			if (stat.isDirectory()) {
				processDirectory(fullPath);
			} else if (path.extname(item) === '.md') {
				const relativePath = path.relative(dirPath, fullPath);
				const frontMatter = extractFrontMatter(fullPath);

				const docsPath = `/docs/${relativePath}`;
				const slug = docsPath.replace(/\.md$/, '');

				const pathSegments = relativePath.split(path.sep);
				const breadcrumbs = ['docs', ...pathSegments.slice(0, -1)];

				const fileName = pathSegments[pathSegments.length - 1];
				if (fileName) {
					const fileNameWithoutExt = fileName.replace(/\.md$/, '');
					breadcrumbs.push(fileNameWithoutExt);
				}

				manifestEntries.push({
					path: docsPath,
					slug: slug,
					breadcrumbs: breadcrumbs,
					metadata: frontMatter
				});

				if (frontMatter) {
					console.log(`\n📄 File: ${relativePath} ✅`);
				} else {
					console.log(`\n📄 File: ${relativePath} (no front matter)`);
				}
			}
		}
	}

	processDirectory(dirPath);

	const manifest: Manifest = {
		generatedAt: new Date().toISOString(),
		totalFiles: manifestEntries.length,
		files: manifestEntries
	};

	const outputDir = path.dirname(manifestOutputPath);
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	// Write the manifest.json file
	fs.writeFileSync(manifestOutputPath, JSON.stringify(manifest, null, 2), 'utf-8');

	console.log(`\n📦 Navigation docs file created: ${manifestOutputPath}`);
	console.log(`📊 Total files processed: ${manifest.totalFiles}`);
	console.log('✨ Metadata extraction completed!');
}
