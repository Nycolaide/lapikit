export type RecentSearch = {
	title: string;
	slug: string;
	cover?: string | null;
	icon?: string | null;
	timestamp: number;
};

export function saveRecentSearches(searches: RecentSearch[]) {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem('@lapikit/recent-searches', JSON.stringify(searches));
	} catch {
		//  errors
	}
}

export function addToRecentSearches(item: {
	title: string;
	slug: string;
	cover?: string;
	icon?: string;
}) {
	const newSearch: RecentSearch = {
		title: item.title,
		slug: item.slug,
		cover: item?.cover,
		icon: item?.icon,
		timestamp: Date.now()
	};

	let list: RecentSearch[] = [];
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('@lapikit/recent-searches');
		if (stored) {
			list = JSON.parse(stored);
		}
	}

	const filtered = list.filter((search) => search.slug !== item.slug);
	const updated = [newSearch, ...filtered].slice(0, 20);

	saveRecentSearches(updated);
}
