import type { RequestHandler } from '@sveltejs/kit';
import data from './manifest.json' with { type: 'json' };

export const GET: RequestHandler = async () => {
	return Response.json(data);
};
