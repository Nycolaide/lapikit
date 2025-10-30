import type { DocFile } from '$lib/types/frontmatter';
import type { CategoryWithPages } from '$lib/types/navigation';

type NavigationSection = CategoryWithPages[];
type Navigation = Record<string, NavigationSection>;

interface CategoryConfig {
	key: string;
	title: string;
	style: {
		color: string;
		icon: string;
	};
}

type CategoryData = Record<string, CategoryConfig[]>;

export function buildNavigationFromDocs(files: DocFile[], categoryData: CategoryData) {
	const navigation: Navigation = {};

	Object.keys(categoryData).forEach((sectionKey) => {
		navigation[sectionKey] = categoryData[sectionKey as keyof typeof categoryData].map(
			(category: CategoryConfig) => ({
				...category,
				pages: []
			})
		);
	});

	Object.keys(navigation).forEach((sectionKey) => {
		const section = navigation[sectionKey];

		files.forEach((file) => {
			const fileSection = file.metadata?.state?.section || 'base';
			const fileCategory = file.metadata?.state?.category || 'uncategorized';

			if (fileSection === sectionKey) {
				const hasCategory = section.some((item) => item.key === fileCategory);

				if (hasCategory) {
					const categoryItem = section.find((item) => item.key === fileCategory);
					if (categoryItem) {
						if (!categoryItem.pages) {
							categoryItem.pages = [];
						}
						categoryItem.pages.push(file);
					}
				} else {
					let uncategorizedCategory = section.find((item) => item.key === 'uncategorized');

					if (!uncategorizedCategory) {
						uncategorizedCategory = {
							key: 'uncategorized',
							title: 'uncategorized',
							style: {
								color: 'gray',
								icon: 'mgc_folder_line'
							},
							pages: []
						};
						section.push(uncategorizedCategory);
					}

					if (!uncategorizedCategory.pages) {
						uncategorizedCategory.pages = [];
					}

					uncategorizedCategory.pages.push(file);
				}
			}
		});
	});

	Object.keys(navigation).forEach((sectionKey) => {
		const section = navigation[sectionKey];

		section.forEach((category) => {
			if (category.pages && category.pages.length > 0) {
				category.pages.sort((a: DocFile, b: DocFile) => {
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

	return navigation;
}
