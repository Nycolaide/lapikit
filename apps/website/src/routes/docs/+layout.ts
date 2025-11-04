export async function load({ url, fetch }) {
	console.log('Layout docs load called with url:', url);

	const summaries = await fetch(`/api/summaries?slug=${url.pathname}`);

	return {
		url: url.pathname,
		summary: await summaries.json()
	};
}
