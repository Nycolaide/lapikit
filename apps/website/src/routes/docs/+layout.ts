export async function load({ fetch, data }) {
	const response = await fetch('/api/content');
	const pages = await response.json();
	return { pages, ...data };
}
