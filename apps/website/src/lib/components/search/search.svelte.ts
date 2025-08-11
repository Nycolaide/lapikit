import { writable, derived } from 'svelte/store';
import { sectionDocs } from '$lib/config.js';
import type { MarkdownHeadWithMetadata } from '$lib';

export function useSearch() {
	const results = writable<MarkdownHeadWithMetadata[]>([]);
	const resultsRecommandation = writable<MarkdownHeadWithMetadata[]>([]);
	const loading = writable(false);

	const availableSections = derived(results, ($results) => {
		const resultSections = $results
			.map((result) => result.state?.section as string)
			.filter((section) => section);

		const uniqueSections = [...new Set(resultSections)];
		return sectionDocs.filter((sectionDoc) => uniqueSections.includes(sectionDoc.key));
	});

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

	async function callRecommendation() {
		loading.set(true);
		const res = await fetch(`/api/search/recommendation`);
		resultsRecommandation.set(await res.json());
		loading.set(false);
	}

	return {
		results,
		loading,
		callResults,
		availableSections,
		resultsRecommandation,
		callRecommendation
	};
}
