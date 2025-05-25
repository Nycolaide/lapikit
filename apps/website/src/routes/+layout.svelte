<script lang="ts">
	import {
		PUBLIC_BING_WEBMASTER_TOOLS_ENABLED,
		PUBLIC_BING_WEBMASTER_TOOLS_ID,
		PUBLIC_GOOGLE_ANALYTICS_ENABLED,
		PUBLIC_GOOGLE_ANALYTICS_ID,
		PUBLIC_GOOGLE_TAG_MANAGER_ENABLED,
		PUBLIC_GOOGLE_TAG_MANAGER_ID
	} from '$env/static/public';

	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';
	// css
	import '$lib/styles/app.css';

	import { RGPD } from 'site-kit';
	import { App } from 'lapikit/components';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
	let openModalRPGD = $state(false);
</script>

<svelte:head>
	<title>lapikit</title>
</svelte:head>

<App>
	{@render children()}

	<Footer bind:accessOnRGPD={openModalRPGD} />

	<RGPD
		bind:open={openModalRPGD}
		gta={PUBLIC_GOOGLE_ANALYTICS_ENABLED}
		gtaID={PUBLIC_GOOGLE_ANALYTICS_ID}
		gtm={PUBLIC_GOOGLE_TAG_MANAGER_ENABLED}
		gtmID={PUBLIC_GOOGLE_TAG_MANAGER_ID}
		bing={PUBLIC_BING_WEBMASTER_TOOLS_ENABLED}
		bingID={PUBLIC_BING_WEBMASTER_TOOLS_ID}
	/>
</App>
