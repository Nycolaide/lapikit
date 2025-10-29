import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { NavDocsStructure, SearchItem } from './types';

function generateSearchData() {
	const dataDir = join(process.cwd(), 'src/lib/data');
	const navDocsPath = join(dataDir, 'api-nav-docs.json');
	const searchPath = join(dataDir, 'api-search.json');

	if (!existsSync(navDocsPath)) {
		console.error('❌ File api-nav-docs.json not found in src/lib/data');
		process.exit(1);
	}

	console.log('✅ File api-nav-docs.json found, generating api-search.json...');

	try {
		const navDocsContent = readFileSync(navDocsPath, 'utf-8');
		const navDocs: NavDocsStructure = JSON.parse(navDocsContent);

		const searchData: SearchItem[] = navDocs.files.map((file) => ({
			slug: file.slug,
			path: file.path,
			title: file.metadata.title,
			subtitle: file.metadata.subtitle,
			description: file.metadata.description,
			section: file.metadata.state.section,
			style: file.metadata.style
				? {
						icon: file.metadata.style.icon,
						cover: file.metadata.style.cover
					}
				: undefined,
			keywords: file.metadata.keywords
		}));

		writeFileSync(searchPath, JSON.stringify(searchData, null, 2), 'utf-8');

		console.log(`✅ File search.json generated successfully!`);
		console.log(`   📊 ${searchData.length} items processed`);
		console.log(`   📁 File created: ${searchPath}`);

		if (existsSync(searchPath)) {
			console.log('   ♻️  Existing file has been replaced');
		}
	} catch (error) {
		console.error('❌ Error generating api-search.json file:', error);
		process.exit(1);
	}
}

generateSearchData();
