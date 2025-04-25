<script lang="ts">
	import {
		PUBLIC_BING_WEBMASTER_TOOLS_ENABLED,
		PUBLIC_BING_WEBMASTER_TOOLS_ID,
		PUBLIC_GOOGLE_ANALYTICS_ENABLED,
		PUBLIC_GOOGLE_ANALYTICS_ID,
		PUBLIC_GOOGLE_TAG_MANAGER_ENABLED,
		PUBLIC_GOOGLE_TAG_MANAGER_ID
	} from '$env/static/public';

	import '$lib/styles/app.css';
	import { RGPD } from 'site-kit';
	import Footer from '$lib/components/footer.svelte';
	let { children } = $props();
	let openModalRPGD = $state(false);
</script>

<nav>
	<a href="/">Home</a>
	<a href="/docs/sample">Sample</a>
</nav>

{@render children()}

<Footer bind:accessOnRGPD={openModalRPGD}>
	<p>Footer</p>
</Footer>

<RGPD
	bind:open={openModalRPGD}
	gta={PUBLIC_GOOGLE_ANALYTICS_ENABLED}
	gtaID={PUBLIC_GOOGLE_ANALYTICS_ID}
	gtm={PUBLIC_GOOGLE_TAG_MANAGER_ENABLED}
	gtmID={PUBLIC_GOOGLE_TAG_MANAGER_ID}
	bing={PUBLIC_BING_WEBMASTER_TOOLS_ENABLED}
	bingID={PUBLIC_BING_WEBMASTER_TOOLS_ID}
/>
