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
	import { page } from '$app/state';

	let { data, children } = $props();

	let isHome = $state(false);
	let isDocs = $state(false);

	$effect(() => {
		isHome = page.url.pathname === '/';
		isDocs = page.url.pathname.startsWith('/docs/');
	});

	$effect(() => {
		console.log('API data', data);
	});
</script>

<div class:kit-theme--dark={isHome}>
	<App>
		<DevelopmentBar />

		{#if PUBLIC_DEV_MODE == 'true'}
			<Header {data} app home={isHome} docs={isDocs} />
		{/if}

		{@render children()}
	</App>
</div>

<style>
	div {
		background-color: var(--kit-background-primary);
		color: var(--kit-label-primary);
	}
</style>
