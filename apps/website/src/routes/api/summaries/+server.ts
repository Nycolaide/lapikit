import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// data
import summariesRawData from '../../../data/api/summaries.json';

interface Summary {
	slug: string;
	path: string;
	title: string;
	headings: Array<{
		id: string;
		text: string;
		level: number;
	}>;
}

interface SummariesData {
	generatedAt: string;
	totalPages: number;
	summaries: Summary[];
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const summaries: SummariesData = summariesRawData;

		const slug = url.searchParams.get('slug');

		if (!slug) {
			return json(summaries, {
				headers: {
					'Cache-Control': 'public, max-age=3600'
				}
			});
		}

		const foundSummary = summaries.summaries.find((summary: Summary) => summary.slug === slug);

		if (foundSummary) {
			return json(
				{
					generatedAt: summaries.generatedAt,
					data: foundSummary
				},
				{
					headers: {
						'Cache-Control': 'public, max-age=3600'
					}
				}
			);
		}

		return json(
			{
				generatedAt: summaries.generatedAt,
				data: {}
			},
			{
				headers: {
					'Cache-Control': 'public, max-age=3600'
				}
			}
		);
	} catch (error) {
		console.error('Error loading summaries:', error);
		return json(
			{
				error: 'Failed to load summaries',
				generatedAt: new Date().toISOString(),
				data: {}
			},
			{
				status: 500
			}
		);
	}
};
