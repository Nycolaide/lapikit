import { BROWSER } from 'esm-env';
import { writable, derived } from 'svelte/store';
import { pages } from './app';

const storage_key = 'recent_searches';
const max_items = 20;

// types
type RecentSearch = {
	title: string;
	timestamp: number; // Date.now()
};

export type RecentPage = {
	title: string;
	description: string;
	slug?: string;
	section?: string;
	timestamp: number;
	[key: string]: unknown;
};

export type RecencyGroups = {
	today: RecentPage[];
	thisWeek: RecentPage[];
	thisMonth: RecentPage[];
	older: RecentPage[];
};

// helpers
function createRecentSearches() {
	const stored = BROWSER && localStorage.getItem(storage_key);
	const initial: RecentSearch[] = stored ? JSON.parse(stored) : [];

	const { subscribe, set, update } = writable<RecentSearch[]>(initial);

	function add(title: string) {
		update((current) => {
			const now = Date.now();
			const withoutDupes = current.filter((item) => item.title !== title);
			const newList: RecentSearch[] = [{ title, timestamp: now }, ...withoutDupes].slice(
				0,
				max_items
			);
			localStorage.setItem(storage_key, JSON.stringify(newList));
			return newList;
		});
	}

	function clear() {
		localStorage.removeItem(storage_key);
		set([]);
	}

	return {
		subscribe,
		add,
		clear
	};
}

export const recentSearches = createRecentSearches();

export const recentSearchesWithData = derived(
	[recentSearches, pages],
	([$recentSearches, $pages]) =>
		$recentSearches
			.map(({ title, timestamp }) => {
				const match = $pages.find((p) => p.title === title);
				return match ? { ...match, timestamp } : undefined;
			})
			.filter((item) => item !== undefined)
);

export function groupByRecency(pages: RecentPage[]): RecencyGroups {
	const now = Date.now();
	const oneDay = 1000 * 60 * 60 * 24;
	const sevenDays = oneDay * 7;
	const thirtyDays = oneDay * 30;
	return pages.reduce<RecencyGroups>(
		(acc, page) => {
			const age = now - page.timestamp;

			if (age < oneDay) acc.today.push(page);
			else if (age < sevenDays) acc.thisWeek.push(page);
			else if (age < thirtyDays) acc.thisMonth.push(page);
			else acc.older.push(page);

			return acc;
		},
		{
			today: [],
			thisWeek: [],
			thisMonth: [],
			older: []
		}
	);
}
