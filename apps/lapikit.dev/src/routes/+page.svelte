<script lang="ts">
    let { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/ping">Ping</a></li>
</ul>

<h2>Stats Lapikit</h2>
<ul>
	<li>Downloads : {data.stats.downloads.toLocaleString()}</li>
</ul>
