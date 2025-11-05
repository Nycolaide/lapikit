import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { CategoryCounter, CounterData, NavDocsStructure } from './types';

function generateCounterData() {
	const dataDir = join(process.cwd(), 'src/content/data/api');
	const rawDocsPath = join(dataDir, 'docs.json');
	const counterPath = join(dataDir, 'counter-lapikit.json');

	if (!existsSync(rawDocsPath)) {
		console.error('❌ The file docs.json was not found in src/content/data/api');
		process.exit(1);
	}

	console.log('✅ The file docs.json was found, generating counter-lapikit.json...');

	try {
		const rawDocsContent = readFileSync(rawDocsPath, 'utf-8');
		const navDocs: NavDocsStructure = JSON.parse(rawDocsContent);

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
		console.error('❌ Error generating the counter-lapikit.json file:', error);
		process.exit(1);
	}
}

generateCounterData();
