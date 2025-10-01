import { PUBLIC_CALL_API_ENABLED } from '$env/static/public';

export async function load({ fetch }) {
	const res = await fetch('/api/content/counter');
	const counter = await res.json();

	let responseExternalAPI = {};

	if (PUBLIC_CALL_API_ENABLED === 'true') {
		const githubRes = await fetch('/api/github/repository?name=Nycolaide/lapikit');
		const npmRes = await fetch('/api/npm?name=lapikit');

		const [github, npm] = await Promise.all([
			githubRes.ok ? githubRes.json() : null,
			npmRes.ok ? npmRes.json() : null
		]);

		responseExternalAPI = {
			github,
			npm
		};
	}

	return {
		counter,
		...responseExternalAPI
	};
}
