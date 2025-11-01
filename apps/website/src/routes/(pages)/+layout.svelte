<script lang="ts">
	import { page } from '$app/state';
	import { Header, Footer } from '$components';

	let { data, children } = $props();
</script>

<Header navigation={data.nav_links} npm={data.npm} isHome={page.url.pathname === '/'} />

<main>
	{@render children()}
</main>

<Footer url={data.url_internal} />
