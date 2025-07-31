#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', '..', 'content');
const manifestPath = path.join(__dirname, '..', '..', 'routes', 'api', 'search', 'search.json');

/**
 * Parser YAML for extracting front matter metadata
 * @param {string} yamlContent - The YAML content to parse
 * @returns {object} - The parsed object
 */
function parseYaml(yamlContent) {
	const result = {};
	const lines = yamlContent.split('\n');
	let currentObject = result;
	let currentArray = null;
	let indent = 0;

	for (let line of lines) {
		line = line.trimEnd();
		if (!line || line.startsWith('#')) continue;

		const lineIndent = line.length - line.trimStart().length;
		line = line.trim();

		if (currentArray && lineIndent <= indent) {
			currentArray = null;
		}

		if (line.startsWith('- ')) {
			const value = line.substring(2).trim();
			const cleanValue =
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
					? value.slice(1, -1)
					: value;

			if (currentArray) {
				currentArray.push(cleanValue);
			}
			continue;
		}

		if (line.endsWith(':') && !line.includes(' ')) {
			const key = line.slice(0, -1);

			const nextLineIndex = lines.findIndex((l, i) => i > lines.indexOf(line) && l.trim() !== '');
			const nextLine = nextLineIndex !== -1 ? lines[nextLineIndex] : '';
			const nextLineTrimmed = nextLine.trim();

			if (nextLineTrimmed.startsWith('- ')) {
				currentObject[key] = [];
				currentArray = currentObject[key];
				indent = lineIndent;
				continue;
			}

			if (lineIndent === 0) {
				currentObject = result;
				result[key] = {};
				currentObject = result[key];
				indent = lineIndent;
				currentArray = null;
			} else if (lineIndent > indent) {
				if (!currentObject[key]) {
					currentObject[key] = {};
				}
				currentObject = currentObject[key];
			}
			continue;
		}

		if (lineIndent === 0 && currentObject !== result) {
			currentObject = result;
		}

		const colonIndex = line.indexOf(':');
		if (colonIndex > 0) {
			const key = line.substring(0, colonIndex).trim();
			let value = line.substring(colonIndex + 1).trim();

			if (!value) {
				currentObject[key] = [];
				currentArray = currentObject[key];
				indent = lineIndent;
				continue;
			}

			if (
				(value.startsWith('"') && value.endsWith('"')) ||
				(value.startsWith("'") && value.endsWith("'"))
			) {
				value = value.slice(1, -1);
			}

			if (value === 'true') value = true;
			else if (value === 'false') value = false;
			else if (value === 'null' || value === '') value = null;

			currentObject[key] = value;
		}
	}

	function cleanEmptyObjects(obj) {
		for (const key in obj) {
			if (obj[key] && typeof obj[key] === 'object') {
				if (Array.isArray(obj[key])) {
					if (obj[key].length === 0) {
						obj[key] = null;
					}
				} else {
					cleanEmptyObjects(obj[key]);
					if (Object.keys(obj[key]).length === 0) {
						obj[key] = null;
					}
				}
			}
		}
	}

	cleanEmptyObjects(result);
	return result;
}

/**
 * Extract metadata from the front matter of a markdown file
 * @param {string} content - content of the markdown file
 * @returns {object|null} - Extracted metadata or null if no front matter
 */
function extractFrontMatter(content) {
	const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
	const match = content.match(frontMatterRegex);

	if (!match) {
		return null;
	}

	try {
		return parseYaml(match[1]);
	} catch (error) {
		console.error('Erreur lors du parsing YAML:', error);
		return null;
	}
}

/**
 * Recursively traverses a directory to find all .md files
 * @param {string} dir - The directory to traverse
 * @param {string} baseDir - The base directory to calculate relative paths
 * @returns {Array} - List of .md files with their relative paths
 */
function findMarkdownFiles(dir, baseDir = dir) {
	const files = [];
	const items = fs.readdirSync(dir);

	for (const item of items) {
		const fullPath = path.join(dir, item);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			files.push(...findMarkdownFiles(fullPath, baseDir));
		} else if (stat.isFile() && path.extname(item) === '.md') {
			const relativePath = path.relative(baseDir, fullPath);
			files.push({
				fullPath,
				relativePath: relativePath.replace(/\\/g, '/'),
				fileName: path.basename(item, '.md')
			});
		}
	}

	return files;
}

/**
 * Generate the manifest from the markdown files
 */
function generateManifest() {
	console.log('Searching for markdown files...');

	if (!fs.existsSync(contentDir)) {
		console.error(`The directory ${contentDir} does not exist`);
		process.exit(1);
	}

	const markdownFiles = findMarkdownFiles(contentDir);
	console.log(`📄 ${markdownFiles.length} markdown files found`);

	const manifest = [];

	for (const file of markdownFiles) {
		try {
			const content = fs.readFileSync(file.fullPath, 'utf-8');
			const frontMatter = extractFrontMatter(content);

			if (frontMatter) {
				const slug = '/' + file.relativePath.replace(/\.md$/, '');

				const pageInfo = {
					icon: frontMatter.icon || null,
					title: frontMatter.title || file.fileName,
					description: frontMatter.head?.description || frontMatter.description || '',
					date: frontMatter.date || new Date().toISOString().split('T')[0],
					section: frontMatter.section || null,
					slug: slug,
					categories: frontMatter.categories || null,
					published: frontMatter.published !== false,
					keywords: frontMatter.keywords || null,
					order: frontMatter.order || null,
					subtitle: frontMatter.subtitle || null,
					introduction: frontMatter.introduction || null,
					cover: frontMatter.cover || null
				};

				manifest.push(pageInfo);
			}
		} catch (error) {
			console.error(`❌ Error processing ${file.relativePath}:`, error.message);
		}
	}

	manifest.sort((a, b) => {
		if (a.section !== b.section) {
			return (a.section || '').localeCompare(b.section || '');
		}

		const aOrder = a.order;
		const bOrder = b.order;

		if (aOrder !== undefined && aOrder >= 0 && bOrder !== undefined && bOrder >= 0) {
			return aOrder - bOrder;
		}

		if (aOrder !== undefined && aOrder >= 0 && (bOrder === undefined || bOrder === -1)) {
			return -1;
		}

		if (bOrder !== undefined && bOrder >= 0 && (aOrder === undefined || aOrder === -1)) {
			return 1;
		}

		if (aOrder === -1 && bOrder === -1) {
			return 0;
		}

		if (aOrder === -1 && bOrder === undefined) {
			return 1;
		}

		if (bOrder === -1 && aOrder === undefined) {
			return -1;
		}

		if (aOrder === undefined && bOrder === undefined) {
			return a.title.localeCompare(b.title);
		}

		return 0;
	});

	// Write the manifest to the file
	try {
		fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
		console.log(`\n✨ Manifest generated successfully: ${manifestPath}`);
		console.log(`${manifest.length} pages in the manifest`);

		const sections = manifest.reduce((acc, page) => {
			const section = page.section || 'no-section';
			acc[section] = (acc[section] || 0) + 1;
			return acc;
		}, {});

		console.log('\nList:');
		Object.entries(sections).forEach(([section, count]) => {
			console.log(`  - ${section}: ${count} pages`);
		});
	} catch (error) {
		console.error(`Error writing manifest:`, error.message);
		process.exit(1);
	}
}

generateManifest();
