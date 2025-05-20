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
	import '@fontsource/roboto/100.css';
	import '@fontsource/roboto/200.css';
	import '@fontsource/roboto/300.css';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import '@fontsource/roboto/600.css';
	import '@fontsource/roboto/700.css';
	import '@fontsource/roboto/800.css';
	import '@fontsource/roboto/900.css';
	import '@fontsource/roboto/100-italic.css';
	import '@fontsource/roboto/200-italic.css';
	import '@fontsource/roboto/300-italic.css';
	import '@fontsource/roboto/400-italic.css';
	import '@fontsource/roboto/500-italic.css';
	import '@fontsource/roboto/600-italic.css';
	import '@fontsource/roboto/700-italic.css';
	import '@fontsource/roboto/800-italic.css';
	import '@fontsource/roboto/900-italic.css';

	import '$lib/styles/app.css';
	import { Darkmode, RGPD } from 'site-kit';
	import { App } from 'lapikit/components';
	import { colorScheme, setColorScheme } from 'lapikit/stores';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
	let openModalRPGD = $state(false);
</script>

<svelte:head>
	<title>lapikit</title>
</svelte:head>

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
		<a href="/docs/separator">Separator</a>
		<a href="/docs/modal">Modal</a>
		<a href="/docs/list">List</a>
		<a href="/docs/avatar">Avatar</a>
		<a href="/docs/accordion">Accordion</a>
		<a href="/docs/aspect-ratio">Aspect Ratio</a>
		<a href="/docs/alert">Alert</a>
		<a href="/docs/chip">Chip</a>
		<a href="/docs/card">Card</a>
		<a href="/docs/toolbar">Toolbar</a>
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

<style>
	nav {
		display: flex;
		gap: 10px;
	}
</style>
