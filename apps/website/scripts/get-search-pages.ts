import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { NavDocsStructure, SearchItem } from './types';

function generateSearchData() {
	const dataDir = join(process.cwd(), 'src/data/api');
	const rawDocsPath = join(dataDir, 'docs.json');
	const searchPath = join(dataDir, 'search.json');

	if (!existsSync(rawDocsPath)) {
		console.error('❌ File docs.json not found in src/data/api');
		process.exit(1);
	}

	console.log('✅ File docs.json found, generating search.json...');

	try {
		const rawDocsContent = readFileSync(rawDocsPath, 'utf-8');
		const navDocs: NavDocsStructure = JSON.parse(rawDocsContent);

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
		console.error('❌ Error generating search.json file:', error);
		process.exit(1);
	}
}

generateSearchData();
