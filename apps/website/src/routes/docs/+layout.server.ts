export async function load({ fetch }) {
	const res = await fetch('/api/content/navigation');
	const routes = await res.json();

	return {
		routes
	};
}
