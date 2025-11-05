import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { DocFile, NavigationData, CategoryConfig } from './types.js';

function generateNavigationDocuments() {
	const dataDir = join(process.cwd(), 'src/content/data');
	const dataDirApi = join(process.cwd(), 'src/content/data/api');
	const rawDocsPath = join(dataDirApi, 'docs.json');
	const categoryDocsPath = join(dataDir, 'category.json');

	const navPath = join(dataDirApi, 'nav-docs.json');

	if (!existsSync(rawDocsPath)) {
		console.error('❌ File docs.json not found in src/content/data/api');
		process.exit(1);
	}

	if (!existsSync(categoryDocsPath)) {
		console.error('❌ File category.json not found in src/content/data');
		process.exit(1);
	}

	console.log('✅ Files docs.json and category.json found, generating nav-docs.json...');

	try {
		const rawDocsContent = readFileSync(rawDocsPath, 'utf-8');
		const categoryDocsContent = readFileSync(categoryDocsPath, 'utf-8');

		const rawDocs: { files: DocFile[] } = JSON.parse(rawDocsContent);
		const categoryDocs: Record<
			string,
			{
				key: string;
				title: string;
				order: number;
				slug: string;
				style: { color: string; icon: string };
				categories: CategoryConfig[];
			}
		> = JSON.parse(categoryDocsContent);

		const navigation: NavigationData = {};

		Object.keys(categoryDocs).forEach((sectionKey) => {
			const sectionConfig = categoryDocs[sectionKey];
			if (sectionConfig) {
				navigation[sectionKey] = {
					key: sectionConfig.key,
					title: sectionConfig.title,
					order: sectionConfig.order,
					style: sectionConfig.style,
					slug: sectionConfig.slug,
					categories: sectionConfig.categories.map((category: CategoryConfig) => ({
						...category,
						order: 0,
						items: []
					}))
				};
			}
		});

		Object.keys(navigation).forEach((sectionKey) => {
			const section = navigation[sectionKey];
			if (!section) return;

			rawDocs.files.forEach((file: DocFile) => {
				const fileSection = file.metadata?.state?.section || 'base';
				const fileCategory = file.metadata?.state?.category || 'uncategorized';

				if (fileSection === sectionKey) {
					const hasCategory = section.categories.some((item) => item.key === fileCategory);

					if (hasCategory) {
						const categoryItem = section.categories.find((item) => item.key === fileCategory);
						if (categoryItem) {
							if (!categoryItem.items) {
								categoryItem.items = [];
							}
							categoryItem.items.push(file);
						}
					} else {
						let uncategorizedCategory = section.categories.find(
							(item) => item.key === 'uncategorized'
						);

						if (!uncategorizedCategory) {
							uncategorizedCategory = {
								key: 'uncategorized',
								title: 'uncategorized',
								order: 999,
								style: {
									color: 'gray',
									icon: 'mgc_folder_line'
								},
								items: []
							};
							section.categories.push(uncategorizedCategory);
						}

						if (!uncategorizedCategory.items) {
							uncategorizedCategory.items = [];
						}

						uncategorizedCategory.items.push(file);
					}
				}
			});
		});

		Object.keys(navigation).forEach((sectionKey) => {
			const section = navigation[sectionKey];
			if (!section) return;

			section.categories.forEach((category) => {
				if (category.items && category.items.length > 0) {
					category.items.sort((a: DocFile, b: DocFile) => {
						const orderA = a.metadata?.state?.order;
						const orderB = b.metadata?.state?.order;

						if (orderA === -1 && orderB === -1) return 0;
						if (orderA === -1 && orderB !== -1) return 1;
						if (orderB === -1 && orderA !== -1) return -1;
						if (orderA === undefined && orderB === undefined) return 0;
						if (orderA === undefined && orderB !== undefined) return 1;
						if (orderB === undefined && orderA !== undefined) return -1;
						return (orderA as number) - (orderB as number);
					});
				}
			});
		});

		const sortedNavigation = Object.values(navigation).sort((a, b) => a.order - b.order);

		const sortedNavigationRecord: NavigationData = Object.fromEntries(
			sortedNavigation.map((section) => [section.key, section])
		);

		writeFileSync(navPath, JSON.stringify(sortedNavigationRecord, null, 2), 'utf-8');

		console.log(`✅ File api-nav-docs.json generated successfully!`);
		console.log(`   📊 ${Object.keys(sortedNavigationRecord).length} items processed`);
		console.log(`   📁 File created: ${navPath}`);

		if (existsSync(navPath)) {
			console.log('   ♻️  Existing file has been replaced');
		}
	} catch (error) {
		console.error('❌ Error generating api-nav-docs.json file:', error);
		process.exit(1);
	}
}

generateNavigationDocuments();
