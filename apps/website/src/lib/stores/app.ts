//environment
import { PUBLIC_DEV_MODE } from '$env/static/public';

// config
import { sectionDocs, type MetaDataPages } from '$lib/config';
import { useDebounced } from '$lib/use-debounce';
import { writable, derived, type Writable, readable } from 'svelte/store';

// internal
export const developmentMode = writable(PUBLIC_DEV_MODE == 'true' ? true : false);

// user device
export const deviceUsed = readable('other', (set) => {
	if (typeof navigator !== 'undefined') {
		set(navigator.platform.toUpperCase().includes('MAC') ? 'apple' : 'other');
	}
});

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

function sortPages(pages: MetaDataPages[]): MetaDataPages[] {
	return pages.sort((a, b) => {
		const aOrder = a.order;
		const bOrder = b.order;

		// Si les deux ont un order >= 0, trier par order
		if (aOrder !== undefined && aOrder >= 0 && bOrder !== undefined && bOrder >= 0) {
			return aOrder - bOrder;
		}

		// Si a a un order >= 0 et b n'en a pas ou b = -1, a vient avant
		if (aOrder !== undefined && aOrder >= 0 && (bOrder === undefined || bOrder === -1)) {
			return -1;
		}

		// Si b a un order >= 0 et a n'en a pas ou a = -1, b vient avant
		if (bOrder !== undefined && bOrder >= 0 && (aOrder === undefined || aOrder === -1)) {
			return 1;
		}

		// Si les deux sont -1, garder l'ordre actuel
		if (aOrder === -1 && bOrder === -1) {
			return 0;
		}

		// Si a est -1 et b est undefined, a va à la fin
		if (aOrder === -1 && bOrder === undefined) {
			return 1;
		}

		// Si b est -1 et a est undefined, b va à la fin
		if (bOrder === -1 && aOrder === undefined) {
			return -1;
		}

		// Si les deux sont undefined, tri alphabétique par titre
		if (aOrder === undefined && bOrder === undefined) {
			return a.title.localeCompare(b.title);
		}

		return 0;
	});
}

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

	// Trier les pages de chaque section
	for (const [, section] of sectionMap) {
		section.pages = sortPages(section.pages);
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
