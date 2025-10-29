<script lang="ts">
	import { page } from '$app/state';
	import { Nav, Footer } from '$components';

	let { data, children } = $props();

	$effect(() => {
		console.log(data);
	});
</script>

<Nav npm={data.npm} isHome={page.url.pathname === '/'} />

<main>
	{@render children()}
</main>

<Footer url={data.url_internal} />
