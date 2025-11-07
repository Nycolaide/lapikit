<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import 'mingcute_icon/font/Mingcute.css';
	import '../lib/styles/app.css';
	import '../plugins/lapikit.ts';
	import '@fontsource/roboto';
	import { PUBLIC_ENV } from '$env/static/public';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { consentManaged, mode, search } from '$lib/stores/app';
	import { App } from 'lapikit/components';
	import { Search } from '$lib/components';
	import Banner from '$components/banner.svelte';
	import ConsentModal from '$components/consent-modal.svelte';

	mode.set(PUBLIC_ENV);

	let { data, children } = $props();

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			search.set(true);
		}
	}
</script>

<svelte:head>
	<meta name="robots" content={$mode === 'production' ? 'index,follow' : 'noindex,nofollow'} />
	<meta name="author" content="Nycolaide" />
	<link rel="canonical" href={page.url.href} />
	<link rel="alternate" hreflang="x-default" href={page.url.href} />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<App dark={page.url.pathname === '/'}>
	<Banner banner={data.banner} />

	{@render children()}

	<Search bind:open={$search} />

	<ConsentModal bind:open={$consentManaged} />
</App>
