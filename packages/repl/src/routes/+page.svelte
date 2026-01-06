<script lang="ts">
	import Repl from '$lib/Repl.svelte';
	import sample from './sample.json?raw';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Repl content={sample} />
