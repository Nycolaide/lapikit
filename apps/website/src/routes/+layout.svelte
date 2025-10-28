<script lang="ts">
	import '../styles/app.css';
	import '../plugins/lapikit.ts';
	import 'mingcute_icon/font/Mingcute.css';
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';
	import { PUBLIC_ENV } from '$env/static/public';
	import { page } from '$app/state';
	import { mode, search } from '$lib/stores/app';
	import { App } from 'lapikit/components';
	import { Header, Footer, Search } from '$lib/components';

	mode.set(PUBLIC_ENV);

	let { data, children } = $props();
</script>

<svelte:head>
	<meta name="robots" content={$mode === 'production' ? 'index,follow' : 'noindex,nofollow'} />
	<meta name="author" content="Nycolaide" />
	<link rel="canonical" href={page.url.href} />
	<link rel="alternate" hreflang="x-default" href={page.url.href} />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<App dark={page.url.pathname === '/'}>
	<Header
		{data}
		app
		home={page.url.pathname === '/'}
		docs={page.url.pathname.startsWith('/docs/')}
	/>

	{@render children()}

	<Footer />

	{#if $search}
		<Search bind:open={$search} />
	{/if}
</App>
