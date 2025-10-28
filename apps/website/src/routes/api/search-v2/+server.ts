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

	// Title match: +10 points
	if (item.title.toLowerCase().includes(queryLower)) {
		score += 10;
	}

	// Subtitle match: +5 points
	if (item.subtitle && item.subtitle.toLowerCase().includes(queryLower)) {
		score += 5;
	}

	// Description match: +1 point
	if (item.description && item.description.toLowerCase().includes(queryLower)) {
		score += 1;
	}

	// Keywords match: +2 points per keyword found
	if (item.keywords) {
		for (const keyword of item.keywords) {
			if (keyword.toLowerCase().includes(queryLower)) {
				score += 2;
			}
		}
	}

	// Section match: +3 points
	if (item.section.toLowerCase().includes(queryLower)) {
		score += 3;
	}

	return score;
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Récupérer le paramètre de recherche
		const query = url.searchParams.get('q');

		if (!query || query.trim() === '') {
			return json(
				{
					error: 'Le paramètre de recherche "q" est requis',
					results: [],
					total: 0
				},
				{ status: 400 }
			);
		}

		// Chemin vers le fichier search.json
		const searchFilePath = join(process.cwd(), 'src/lib/data/search.json');

		// Vérifier si le fichier existe
		if (!existsSync(searchFilePath)) {
			return json(
				{
					error:
						"Le fichier search.json n'a pas été trouvé. Veuillez d'abord générer les données de recherche.",
					results: [],
					total: 0
				},
				{ status: 404 }
			);
		}

		// Lire et parser le fichier search.json
		const searchContent = readFileSync(searchFilePath, 'utf-8');
		const searchData: SearchItem[] = JSON.parse(searchContent);

		// Calculer les scores et filtrer les résultats
		const results: SearchResult[] = searchData
			.map((item) => ({
				...item,
				score: calculateScore(item, query.trim())
			}))
			.filter((result) => result.score > 0) // Retirer les résultats avec 0 point
			.sort((a, b) => b.score - a.score); // Trier par score décroissant

		return json({
			query: query.trim(),
			results,
			total: results.length
		});
	} catch (error) {
		console.error('Erreur lors de la recherche:', error);
		return json(
			{
				error: 'Erreur interne du serveur lors de la recherche',
				results: [],
				total: 0
			},
			{ status: 500 }
		);
	}
};
