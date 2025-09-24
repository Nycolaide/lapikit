<script lang="ts">
	// css
	import '../styles/app.css';

	// //plugins
	import '../plugins/lapikit.ts';

	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';

	import { App } from 'lapikit/components';
	import { DevelopmentBar } from '$lib/components';
	import Header from '$lib/components/header.svelte';
	import { PUBLIC_DEV_MODE } from '$env/static/public';

	let { data, children } = $props();

	$effect(() => {
		console.log('API data', data);
	});
</script>

<App>
	<DevelopmentBar />

	{#if PUBLIC_DEV_MODE == 'true'}
		<Header {data} app />
	{/if}

	{@render children()}
</App>
