import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import type { HeadingItem, PageSummary, SummariesData } from './types';

// Whitelist des slugs qui ne doivent afficher que les H2 (niveau 2)
const H2_ONLY_WHITELIST = ['/docs/changelog'];

function extractHeadingsFromMarkdown(content: string, slug?: string): HeadingItem[] {
	const headings: HeadingItem[] = [];
	const lines = content.split('\n');

	// Vérifier si ce slug est dans la whitelist H2 uniquement
	const isH2Only = slug && H2_ONLY_WHITELIST.includes(slug);

	for (const line of lines) {
		const trimmedLine = line.trim();

		const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
		if (headingMatch && headingMatch[1] && headingMatch[2]) {
			const level = headingMatch[1].length;
			const text = headingMatch[2].trim();

			// Si slug est dans la whitelist, ne garder que les H2 (niveau 2)
			if (isH2Only && level !== 2) {
				continue;
			}

			if (text) {
				const id = text
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF-]+/g, '')
					.replace(/^-+|-+$/g, '');

				headings.push({ id, text, level });
			}
		}
	}

	return headings;
}

function extractFrontmatter(content: string): {
	frontmatter: Record<string, string>;
	markdownContent: string;
} {
	const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
	const match = content.match(frontmatterRegex);

	if (!match || !match[1] || !match[2]) {
		return { frontmatter: {}, markdownContent: content };
	}

	const frontmatterText = match[1];
	const markdownContent = match[2];
	const frontmatter: Record<string, string> = {};

	const lines = frontmatterText.split('\n');
	for (const line of lines) {
		const trimmedLine = line.trim();
		if (trimmedLine && !trimmedLine.startsWith('#')) {
			const colonIndex = trimmedLine.indexOf(':');
			if (colonIndex > 0) {
				const key = trimmedLine.substring(0, colonIndex).trim();
				let value = trimmedLine.substring(colonIndex + 1).trim();

				if (value.startsWith('"') && value.endsWith('"')) {
					value = value.slice(1, -1);
				}
				if (value.startsWith("'") && value.endsWith("'")) {
					value = value.slice(1, -1);
				}

				frontmatter[key] = value;
			}
		}
	}

	return { frontmatter, markdownContent };
}

function findMarkdownFiles(dirPath: string): string[] {
	const files: string[] = [];

	if (!existsSync(dirPath)) {
		return files;
	}

	const items = readdirSync(dirPath);

	for (const item of items) {
		const fullPath = join(dirPath, item);
		const stats = statSync(fullPath);

		if (stats.isDirectory()) {
			files.push(...findMarkdownFiles(fullPath));
		} else if (stats.isFile() && extname(item) === '.md') {
			files.push(fullPath);
		}
	}

	return files;
}

function extractSlugFromPath(filePath: string): string {
	const relativePath = filePath.replace(process.cwd(), '');
	const slug = relativePath
		.replace(/^\/src\/content/, '')
		.replace(/\.md$/, '')
		.replace(/^\//, '');

	return `/${slug}`;
}

async function generateSummaries() {
	const dataDir = join(process.cwd(), 'src/content/data/api');
	const summariesPath = join(dataDir, 'summaries.json');

	console.log('🔍 Search markdown files...');

	const contentDir = join(process.cwd(), 'src/content');
	const markdownFiles = findMarkdownFiles(contentDir);

	if (markdownFiles.length === 0) {
		console.warn('⚠️  No markdown files found. Exiting.');
		return;
	}

	console.log(`📄 ${markdownFiles.length} markdown file(s) found`);

	const summaries: PageSummary[] = [];

	for (const filePath of markdownFiles) {
		try {
			console.log(`📖 Processing: ${filePath.replace(process.cwd(), '')}`);

			const fileContent = readFileSync(filePath, 'utf-8');
			const { frontmatter, markdownContent } = extractFrontmatter(fileContent);

			const slug = extractSlugFromPath(filePath);
			const title = frontmatter.title || slug.split('/').pop() || 'Untitled';

			const headings = extractHeadingsFromMarkdown(markdownContent, slug);

			summaries.push({
				slug,
				path: filePath.replace(process.cwd(), ''),
				title,
				headings
			});
		} catch (error) {
			console.error(`❌ Error processing ${filePath}:`, error);
		}
	}
	summaries.sort((a, b) => a.slug.localeCompare(b.slug));

	const summariesData: SummariesData = {
		generatedAt: new Date().toISOString(),
		totalPages: summaries.length,
		summaries
	};

	if (!existsSync(dataDir)) {
		console.log(`📁 Creating directory: ${dataDir}`);
		mkdirSync(dataDir, { recursive: true });
	}

	writeFileSync(summariesPath, JSON.stringify(summariesData, null, 2), 'utf-8');

	console.log('✅ Generation completed successfully!');
	console.log(`📊 ${summaries.length} page(s) processed`);
	console.log(`📁 File created: ${summariesPath}`);

	const totalHeadings = summaries.reduce((sum, page) => sum + page.headings.length, 0);
	console.log(`📋 ${totalHeadings} heading(s) total`);

	const pagesWithHeadings = summaries.filter((page) => page.headings.length > 0).length;
	console.log(`📄 ${pagesWithHeadings} page(s) with headings`);

	if (existsSync(summariesPath)) {
		console.log('♻️  Existing file has been replaced');
	}
}

generateSummaries().catch((error) => {
	console.error('❌ Fatal error:', error);
	process.exit(1);
});

export { generateSummaries };
