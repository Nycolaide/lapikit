export async function load({ fetch }) {
	const githubRes = await fetch('/api/github/repository?name=Nycolaide/lapikit');
	const npmRes = await fetch('/api/npm?name=lapikit');

	const [github, npm] = await Promise.all([
		githubRes.ok ? githubRes.json() : null,
		npmRes.ok ? npmRes.json() : null
	]);

	return {
		github,
		npm
	};
}
