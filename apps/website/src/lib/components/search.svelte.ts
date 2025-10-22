import { writable } from 'svelte/store';

import type { MarkdownHeadWithMetadata } from '$lib';

export function useSearch() {
	const results = writable<MarkdownHeadWithMetadata[]>([]);
	const loading = writable(false);

	async function callResults(query: string) {
		if (!query.trim()) {
			results.set([]);
			return;
		}
		loading.set(true);
		const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
		results.set(await res.json());
		loading.set(false);
	}

	return {
		results,
		loading,
		callResults
	};
}
