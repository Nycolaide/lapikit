<script lang="ts">
	import { page } from '$app/state';
	import { Header, Footer } from '$components';

	let { data, children } = $props();
</script>

<Header
	navigation={data.header_links}
	npm={data.npm}
	url={data.url_internal}
	isHome={page.url.pathname === '/'}
/>

<main>
	{@render children()}
</main>

<Footer url={data.url_internal} navigation={data.footer_links} socials={data.social_links} />
