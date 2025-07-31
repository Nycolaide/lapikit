import type { RequestHandler } from '@sveltejs/kit';
import search from './search.json' with { type: 'json' };

export const prerender = true;

interface SearchItem {
	title?: string;
	description?: string;
	keywords?: string | string[];
}

function scoreItem(item: SearchItem, terms: string[]): number {
	const title = item.title?.toLowerCase() || '';
	const description = item.description?.toLowerCase() || '';
	const rawKeywords = item.keywords;
	const keywords: string[] = Array.isArray(rawKeywords)
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
	return score;
}

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q')?.trim().toLowerCase() || '';
	if (!q) {
		return Response.json([]);
	}
	const terms = q.split(/\s+/).filter(Boolean);
	const results = search
		.map((item) => {
			const normalizedItem = {
				...item,
				keywords: item.keywords === null ? undefined : item.keywords
			};
			const score = scoreItem(normalizedItem, terms);
			return score > 0 ? { item, score } : undefined;
		})
		.filter((entry): entry is { item: (typeof search)[0]; score: number } => entry !== undefined)
		.sort((a, b) => b.score - a.score)
		.map((entry) => entry.item);
	return Response.json(results);
};
