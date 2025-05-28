<script lang="ts">
	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';
	// css
	import '$lib/styles/app.css';

	import { App } from 'lapikit/components';

	let { children } = $props();
</script>

<svelte:head>
	<title>lapikit</title>
</svelte:head>

<App>
	{@render children()}
</App>
