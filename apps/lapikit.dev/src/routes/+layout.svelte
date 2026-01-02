<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lapikit</title>
	<link rel="preconnect" href={PUBLIC_BASE_URL} crossorigin="anonymous">
</svelte:head>


<main>
	{@render children()}
</main>
