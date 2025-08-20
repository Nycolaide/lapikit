import type { RequestHandler } from '@sveltejs/kit';
import search from './manifest.json' with { type: 'json' };

interface SearchItem {
	title?: string;
	description?: string;
	keywords?: string | string[];
}

function scoreItem(
	item: SearchItem,
	terms: string[]
): { score: number; type: 'match' | 'recommandation' } {
	const title = item.title?.toLowerCase() || '';
	const description = item.description?.toLowerCase() || '';
	const rawKeywords = item.keywords;
	const keywords: string[] = Array.isArray(rawKeywords)
		? rawKeywords.map((k) => k.toLowerCase())
		: rawKeywords
			? [rawKeywords.toLowerCase()]
			: [];

	let score = 0;
	let hasMatchInTitle = false;

	for (const term of terms) {
		if (title.includes(term)) {
			score += 100;
			hasMatchInTitle = true;
		}
		if (description.includes(term)) {
			score += 50;
		}
		if (keywords.some((kw) => kw.includes(term))) {
			score += 25;
		}
	}

	const type = hasMatchInTitle ? 'match' : 'recommandation';

	return { score, type };
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
				keywords: item.state.keywords === null ? undefined : item.state.keywords
			};
			const result = scoreItem(normalizedItem, terms);
			return result.score > 0
				? { item: { ...item, type: result.type }, score: result.score }
				: undefined;
		})
		.filter(
			(
				entry
			): entry is {
				item: (typeof search)[0] & { type: 'match' | 'recommandation' };
				score: number;
			} => entry !== undefined
		)
		.sort((a, b) => b.score - a.score)
		.map((entry) => entry.item);
	return Response.json(results);
};
