export async function load({ fetch }) {
	const response = await fetch('/api/content');
	const pages = await response.json();
	return { pages };
}
