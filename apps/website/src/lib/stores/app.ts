//environment
import { PUBLIC_DEV_MODE } from '$env/static/public';

// config
import { type MetaDataPages } from '$lib/config';
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

// Navigation API helper
export const loadNavigation = async (): Promise<PageNavigation[]> => {
	try {
		const response = await fetch('/api/content/navigation');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const navigation = await response.json();
		pagesNavigation.set(navigation);
		return navigation;
	} catch (error) {
		console.error('Failed to load navigation:', error);
		return [];
	}
};

rawSearchQuery.subscribe((val) => searchQuery.set(val));

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
