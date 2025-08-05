export async function load({ data, url }) {
	return {
		...data,
		url: url.pathname
	};
}
