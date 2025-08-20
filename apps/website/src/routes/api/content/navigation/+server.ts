import type { RequestHandler } from '@sveltejs/kit';
import data from './manifest.json' with { type: 'json' };
import { sectionDocs } from '$lib/config.js';
import { PUBLIC_DEV_MODE } from '$env/static/public';
import type { MarkdownWithMetadata } from '$lib';

interface StructuredNavigation {
	key: string;
	icon?: string;
	submenu?: boolean;
	pages: MarkdownWithMetadata[];
}

export const GET: RequestHandler = async () => {
	try {
		// Filtrer les pages selon le mode de développement
		const isDevMode = PUBLIC_DEV_MODE === 'true';
		const filteredPages = isDevMode
			? (data as MarkdownWithMetadata[]) // En mode dev, retourner toutes les pages
			: (data as MarkdownWithMetadata[]).filter((page) => page.state?.published === true); // En prod, uniquement les pages publiées

		// Créer une map des sections connues
		const knownKeys = new Set(sectionDocs.map((s) => s.key));
		const sectionMap = new Map<string, StructuredNavigation>();

		// Initialiser chaque section avec ses métadonnées
		for (const section of sectionDocs) {
			sectionMap.set(section.key, {
				...section,
				pages: []
			});
		}

		// Grouper les pages par section
		for (const page of filteredPages) {
			const section = page.state?.section;
			const key = section && knownKeys.has(section) ? section : 'undefined';

			// Transformer la page pour correspondre au format attendu
			const transformedPage: MarkdownWithMetadata = {
				...page,
				metadata: {
					slug: page.metadata?.slug || page.slug || '',
					date: page.metadata?.date || '',
					filename: page.metadata?.filename || ''
				}
			};

			sectionMap.get(key)?.pages.push(transformedPage);
		}

		// Trier les pages dans chaque section par ordre
		for (const section of sectionMap.values()) {
			section.pages.sort((a, b) => {
				// Récupérer l'ordre depuis les données originales
				const originalPageA = filteredPages.find(
					(p) => p.metadata?.filename === a.metadata?.filename || p.title === a.title
				);
				const originalPageB = filteredPages.find(
					(p) => p.metadata?.filename === b.metadata?.filename || p.title === b.title
				);

				const orderA = originalPageA?.state?.order
					? parseInt(originalPageA.state.order, 10)
					: Number.MAX_SAFE_INTEGER;
				const orderB = originalPageB?.state?.order
					? parseInt(originalPageB.state.order, 10)
					: Number.MAX_SAFE_INTEGER;

				// Si a a order -1, il va à la fin
				if (orderA === -1 && orderB !== -1) {
					return 1;
				}

				// Si b a order -1, il va à la fin
				if (orderB === -1 && orderA !== -1) {
					return -1;
				}

				// Si les deux ont order -1, trier par titre
				if (orderA === -1 && orderB === -1) {
					return a.title.localeCompare(b.title);
				}

				// Pour les ordres normaux (>= 0)
				if (orderA !== orderB) {
					return orderA - orderB;
				}

				// Si même ordre ou pas d'ordre, trier par titre
				return a.title.localeCompare(b.title);
			});
		}

		// Convertir la map en array dans l'ordre de sectionDocs
		const structuredNavigation = sectionDocs.map((s) => sectionMap.get(s.key)!);

		return Response.json(structuredNavigation);
	} catch (error) {
		console.error('Error processing navigation data:', error);
		return Response.json({ error: 'Failed to process navigation data' }, { status: 500 });
	}
};
