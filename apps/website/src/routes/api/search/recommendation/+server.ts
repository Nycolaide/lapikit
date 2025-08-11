import type { RequestHandler } from '@sveltejs/kit';
import data from '../manifest.json' with { type: 'json' };
import type { MarkdownHead } from '$lib';

export const GET: RequestHandler = async () => {
	const recommendedItems = (data as MarkdownHead[]).filter(
		(item) => item.state?.recommended === true && item.state?.published === true
	);

	const sortedItems = recommendedItems.sort((a, b) => {
		if (a.state?.section === 'base' && b.state?.section !== 'base') {
			return -1;
		}
		if (a.state?.section !== 'base' && b.state?.section === 'base') {
			return 1;
		}
		const orderA = a.state?.order ? parseInt(a.state.order, 10) : Number.MAX_SAFE_INTEGER;
		const orderB = b.state?.order ? parseInt(b.state.order, 10) : Number.MAX_SAFE_INTEGER;

		return orderA - orderB;
	});

	return Response.json(sortedItems);
};
