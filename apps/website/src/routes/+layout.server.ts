export async function load({ fetch }) {
	const res = await fetch(`/api/github/repo?name=Nycolaide/lapikit`);
	const data = await res.json();

	if (res.ok) {
		return { repo: data };
	} else {
		return { error: data.error };
	}
}
