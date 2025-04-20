<script lang="ts">
	import { Component } from 'site-kit';
	import { helloWorld } from 'lapikit';
	import { onMount } from 'svelte';

	onMount(() => {
		helloWorld();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Component />
