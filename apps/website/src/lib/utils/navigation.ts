import type { DocFile, NavigationSection } from '$lib/types';

export function buildNavigationFromDocs(files: DocFile[]): NavigationSection[] {
	const sections = new Map<string, DocFile[]>();

	files
		.filter((f) => f.metadata?.state?.published)
		.sort((a, b) => (a.metadata?.state?.order ?? 999) - (b.metadata?.state?.order ?? 999))
		.forEach((file) => {
			const key = (file.metadata?.state?.section || 'other').toLowerCase();
			if (!sections.has(key)) sections.set(key, []);
			sections.get(key)!.push(file);
		});

	return [
		'base',
		'components',
		'actions',
		'stores',
		...Array.from(sections.keys()).filter(
			(k) => !['base', 'components', 'actions', 'stores'].includes(k)
		)
	]
		.filter((key) => sections.has(key))
		.map((key) => ({ key, items: sections.get(key)! }));
}

export function getPublishedDocs(files: DocFile[]): DocFile[] {
	return files
		.filter((file) => file.metadata?.state?.published === true)
		.sort((a, b) => {
			const orderA = a.metadata?.state?.order ?? 999;
			const orderB = b.metadata?.state?.order ?? 999;
			if (orderA !== orderB) return orderA - orderB;

			const titleA = a.metadata?.title || '';
			const titleB = b.metadata?.title || '';
			return titleA.localeCompare(titleB);
		});
}

export function findDocBySlug(files: DocFile[], slug: string): DocFile | undefined {
	return files.find((file) => file.slug === slug);
}

export function getRecommendedDocs(files: DocFile[]): DocFile[] {
	return getPublishedDocs(files).filter((file) => file.metadata?.state?.recommended === true);
}
