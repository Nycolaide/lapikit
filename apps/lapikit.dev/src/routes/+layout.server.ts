import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const [npmRes] = await Promise.all([
		fetch('https://api.npmjs.org/downloads/point/last-month/lapikit').then((r) => r.json())
	]);

	const data = {
		downloads: npmRes.downloads ?? 0
	};

	return { stats: data };
};
