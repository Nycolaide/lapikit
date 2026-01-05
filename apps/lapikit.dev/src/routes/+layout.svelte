<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import SearchBar from '$lib/components/SearchBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lapikit</title>
	<link rel="preconnect" href={PUBLIC_BASE_URL} crossorigin="anonymous">
</svelte:head>

<nav>
	<a href="/">Homepage</a>
	<a href="/blog">Blog</a>

	<SearchBar />
</nav>

<main>
	{@render children()}
</main>

