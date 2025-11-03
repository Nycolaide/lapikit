import { json } from '@sveltejs/kit';
import docsData from '../../../data/api/docs.json';

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
};

export async function GET() {
	try {
		// Transform the docs data to match the expected Post format
		const posts: Post[] = docsData.files
			.filter(file => file.metadata.state?.published !== false)
			.map(file => ({
				title: file.metadata.title,
				slug: file.slug,
				description: file.metadata.head?.description || file.metadata.subtitle || '',
				date: file.metadata.state?.order?.toString() || '0',
				categories: [file.metadata.state?.section || 'docs'],
				published: file.metadata.state?.published !== false
			}));

		return json(posts);
	} catch (error) {
		console.error('Error loading content:', error);
		return json({ error: 'Failed to load content' }, { status: 500 });
	}
}