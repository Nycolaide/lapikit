<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lapikit</title>
</svelte:head>


<main>
	<p>{PUBLIC_BASE_URL}</p>
	{@render children()}
</main>
