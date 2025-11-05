export async function load({ url, fetch }) {
	const summaries = await fetch(`/api/summaries?slug=${url.pathname}`);

	return {
		url: url.pathname,
		summary: await summaries.json()
	};
}
