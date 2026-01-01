<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let offline = $state(typeof navigator !== 'undefined' ? !navigator.onLine : false);

	onMount(() => {
		if ('serviceWorker' in navigator) {
			const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
			navigator.serviceWorker
				.register(swUrl)
				.catch((error) => console.error('Service worker registration failed', error));
		}

		const updateStatus = () => {
			console.log('Network status changed:', navigator.onLine);
			offline = !navigator.onLine;
		};

		window.addEventListener('online', updateStatus);
		window.addEventListener('offline', updateStatus);

		return () => {
			window.removeEventListener('online', updateStatus);
			window.removeEventListener('offline', updateStatus);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lapikit</title>
</svelte:head>

{#if offline}
	<div class="offline-banner">You are offline. The application is available from cache.</div>
{/if}

<main>
	{@render children()}
</main>

<style>
	.offline-banner {
		position: sticky;
		top: 0;
		z-index: 50;
		padding: 0.75rem 1rem;
		text-align: center;
		font-weight: 600;
		background: #f97316;
		color: #0f172a;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 640px) {
		.offline-banner {
			padding: 0.65rem 0.75rem;
			font-size: 0.95rem;
		}
	}
</style>
