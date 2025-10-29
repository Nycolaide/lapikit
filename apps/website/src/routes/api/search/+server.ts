import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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
}

interface SearchResult extends SearchItem {
	score: number;
}

function calculateScore(item: SearchItem, query: string): number {
	const queryLower = query.toLowerCase();
	let score = 0;

	if (item.title.toLowerCase().includes(queryLower)) {
		score += 10;
	}

	if (item.subtitle && item.subtitle.toLowerCase().includes(queryLower)) {
		score += 5;
	}

	if (item.description && item.description.toLowerCase().includes(queryLower)) {
		score += 1;
	}

	if (item.keywords) {
		for (const keyword of item.keywords) {
			if (keyword.toLowerCase().includes(queryLower)) {
				score += 2;
			}
		}
	}

	if (item.section.toLowerCase().includes(queryLower)) {
		score += 3;
	}

	return score;
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const query = url.searchParams.get('q');

		if (!query || query.trim() === '') {
			return json(
				{
					error: 'The search query is missing or empty',
					results: [],
					total: 0
				},
				{ status: 400 }
			);
		}

		const searchFilePath = join(process.cwd(), 'src/lib/data/api-search.json');

		if (!existsSync(searchFilePath)) {
			return json(
				{
					error: 'File api-search.json not found. Please generate it using the appropriate script.',
					results: [],
					total: 0
				},
				{ status: 404 }
			);
		}

		const searchContent = readFileSync(searchFilePath, 'utf-8');
		const searchData: SearchItem[] = JSON.parse(searchContent);

		const results: SearchResult[] = searchData
			.map((item) => ({
				...item,
				score: calculateScore(item, query.trim())
			}))
			.filter((result) => result.score > 0)
			.sort((a, b) => b.score - a.score);
		return json({
			query: query.trim(),
			results,
			total: results.length
		});
	} catch (error) {
		console.error('Error during search:', error);
		return json(
			{
				error: 'Error on server during search processing',
				results: [],
				total: 0
			},
			{ status: 500 }
		);
	}
};
