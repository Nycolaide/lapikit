import { sectionDocs, type MetaDataPages } from '$lib/config';
import { useDebounced } from '$lib/use-debounce';
import { writable, derived, type Writable } from 'svelte/store';

// types
type PageNavigation = {
	key: string;
	icon?: string;
	submenu?: boolean;
	pages: MetaDataPages[];
};

type Page = {
	icon?: string;
	title: string;
	description: string;
	date: string;
	section?: string;
	slug?: string;
	categories?: Array<string>;
	published: boolean;
	keywords?: Array<string> | string;
};

// states
export const pages: Writable<Page[]> = writable([]);
export const pagesNavigation = writable<PageNavigation[]>([]);
export const rawSearchQuery = writable('');

export const searchQuery = useDebounced('', 300);

// helpers
export const setPages = (list: Page[]) => pages.set(list);

rawSearchQuery.subscribe((val) => searchQuery.set(val));

pages.subscribe(($pages) => {
	const knownKeys = new Set(sectionDocs.map((s) => s.key));
	const sectionMap = new Map<string, { key: string; icon?: string; pages: MetaDataPages[] }>();
	for (const section of sectionDocs) {
		sectionMap.set(section.key, {
			...section,
			pages: []
		});
	}

	for (const page of $pages) {
		const section = typeof page.section === 'string' ? page.section : undefined;
		const key = section && knownKeys.has(section) ? section : 'undefined';

		sectionMap.get(key)?.pages.push(page);
	}
	pagesNavigation.set(sectionDocs.map((s) => sectionMap.get(s.key)!));
});

export const filteredPages = derived([pages, searchQuery], ([$pages, $searchQuery]) => {
	const query = $searchQuery.trim().toLowerCase();

	if (!query) return [];

	const terms = query.split(/\s+/).filter(Boolean);

	const scoredResults = $pages
		.map((item) => {
			const title = item.title?.toLowerCase() || '';
			const description = item.description?.toLowerCase() || '';
			const rawKeywords = item.keywords;
			const keywords = Array.isArray(rawKeywords)
				? rawKeywords.map((k) => k.toLowerCase())
				: rawKeywords
					? [rawKeywords.toLowerCase()]
					: [];

			let score = 0;

			for (const term of terms) {
				if (title.includes(term)) score += 100;
				if (description.includes(term)) score += 50;
				if (keywords.some((kw) => kw.includes(term))) score += 25;
			}

			if (score === 0) return null;

			return { item, score };
		})
		.filter(Boolean)
		.sort((a, b) => b!.score - a!.score)
		.map((entry) => entry!.item);

	return scoredResults;
});
