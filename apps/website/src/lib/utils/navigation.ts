import type { DocFile } from '$lib/types/frontmatter';
import type { NavigationData } from '$lib/types/navigation';

type Navigation = NavigationData;

interface CategoryConfig {
	key: string;
	title: string;
	style: {
		color: string;
		icon: string;
	};
}

interface SectionConfig {
	key: string;
	title: string;
	order: number;
	slug: string;
	style: {
		color: string;
		icon: string;
	};
	categories: CategoryConfig[];
}

type CategoryData = Record<string, SectionConfig>;

export function buildNavigationFromDocs(files: DocFile[], categoryData: CategoryData) {
	const navigation: Navigation = {};

	Object.keys(categoryData).forEach((sectionKey) => {
		const sectionConfig = categoryData[sectionKey as keyof typeof categoryData];
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
	});

	Object.keys(navigation).forEach((sectionKey) => {
		const section = navigation[sectionKey];

		files.forEach((file) => {
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

	const sortedNavigationRecord: Navigation = Object.fromEntries(
		sortedNavigation.map((section) => [section.key, section])
	);

	return sortedNavigationRecord;
}
