import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { CategoryCounter, CounterData, NavDocsStructure } from './types';

function generateCounterData() {
	const dataDir = join(process.cwd(), 'src/lib/data');
	const navDocsPath = join(dataDir, 'api-nav-docs.json');
	const counterPath = join(dataDir, 'api-counter-lapikit.json');

	if (!existsSync(navDocsPath)) {
		console.error('❌ The file api-nav-docs.json was not found in src/lib/data');
		process.exit(1);
	}

	console.log('✅ The file api-nav-docs.json was found, generating api-counter-lapikit.json...');

	try {
		const navDocsContent = readFileSync(navDocsPath, 'utf-8');
		const navDocs: NavDocsStructure = JSON.parse(navDocsContent);

		const categories: CategoryCounter = {};

		navDocs.files.forEach((file) => {
			const section = file.metadata.state.section;

			if (categories[section]) {
				categories[section]++;
			} else {
				categories[section] = 1;
			}
		});

		const counterData: CounterData = {
			generatedAt: new Date().toISOString(),
			totalElements: navDocs.files.length,
			categories: categories
		};

		writeFileSync(counterPath, JSON.stringify(counterData, null, 2), 'utf-8');

		console.log(`✅ The file counter-lapikit.json was generated successfully!`);
		console.log(`   📊 ${counterData.totalElements} elements in total`);
		console.log(`   📁 File created: ${counterPath}`);

		console.log('   📈 Category distribution:');
		Object.entries(categories)
			.sort(([, a], [, b]) => b - a)
			.forEach(([category, count]) => {
				console.log(`      - ${category}: ${count} element${count > 1 ? 's' : ''}`);
			});

		if (existsSync(counterPath)) {
			console.log('   ♻️  The existing file was replaced');
		}
	} catch (error) {
		console.error('❌ Error generating the api-counter-lapikit.json file:', error);
		process.exit(1);
	}
}

generateCounterData();
