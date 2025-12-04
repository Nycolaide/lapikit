import { writable } from 'svelte/store';

interface SearchItem {
	slug: string;
	path: string;
	title: string;
	subtitle?: string;
	description?: string;
	section: string;
	style?: {
		icon?: string;
		cover?: string;
	};
	keywords?: string[];
	score: number;
}

interface SearchResponse {
	query: string;
	results: SearchItem[];
	total: number;
}

export function useSearch() {
	const results = writable<SearchItem[]>([]);
	const loading = writable(false);

	async function callResults(query: string) {
		if (!query.trim()) {
			results.set([]);
			return;
		}
		loading.set(true);
		try {
			const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
			const data: SearchResponse = await res.json();
			results.set(data.results);
		} catch (error) {
			console.error('Erreur lors de la recherche:', error);
			results.set([]);
		}
		loading.set(false);
	}

	return {
		results,
		loading,
		callResults
	};
}
