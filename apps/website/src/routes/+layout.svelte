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

	import '$lib/styles/app.css';
	import { Darkmode, RGPD } from 'site-kit';
	import { App } from 'lapikit/components';
	import { colorScheme, setColorScheme } from 'lapikit/stores';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
	let openModalRPGD = $state(false);
</script>

<App>
	<nav>
		<a href="/">Home</a>
		<a href="/docs/sample">Sample</a>
		<a href="/docs/button">Button</a>
		<a href="/docs/icon">Icon</a>
		<a href="/docs/dropdown">Dropdown</a>
		<a href="/docs/popover">Popover</a>
		<a href="/docs/tooltip">Tooltip</a>
		<a href="/docs/dialog">Dialog</a>
		<Darkmode scheme={$colorScheme} handle={setColorScheme} />
	</nav>

	<p>{$colorScheme}</p>

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
</App>
