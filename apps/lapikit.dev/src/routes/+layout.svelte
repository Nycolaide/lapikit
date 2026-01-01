<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
			navigator.serviceWorker
				.register(swUrl)
				.catch((error) => console.error('Service worker registration failed', error));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lapikit</title>
</svelte:head>

<main>
	{@render children()}
</main>
