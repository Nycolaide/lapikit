import type { RequestHandler } from '@sveltejs/kit';
import searchData from '../search.json' with { type: 'json' };

interface SearchItem {
	icon: string | null;
	title: string;
	description: string;
	date: string;
	section: string;
	slug: string;
	categories: string[] | null;
	published: boolean;
	keywords: string[] | null;
	order: string | null;
	subtitle: string | null;
	introduction: string | null;
	cover: string | null;
	recommended?: boolean;
}

export const GET: RequestHandler = async () => {
	const recommendedItems = (searchData as SearchItem[]).filter(
		(item) => item.recommended === true && item.published === true
	);

	const sortedItems = recommendedItems.sort((a, b) => {
		if (a.section === 'base' && b.section !== 'base') {
			return -1;
		}
		if (a.section !== 'base' && b.section === 'base') {
			return 1;
		}
		const orderA = a.order ? parseInt(a.order, 10) : Number.MAX_SAFE_INTEGER;
		const orderB = b.order ? parseInt(b.order, 10) : Number.MAX_SAFE_INTEGER;

		return orderA - orderB;
	});

	return Response.json(sortedItems);
};
