import { writable } from 'svelte/store';

type SearchResult = { [key: string]: unknown };

export function useSearch() {
	const results = writable<SearchResult[]>([]);
	const loading = writable(false);

	async function call(query: string) {
		if (!query.trim()) {
			results.set([]);
			return;
		}
		loading.set(true);
		const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
		results.set(await res.json());
		loading.set(false);
	}

	return { results, loading, call };
}
