<script lang="ts">
	import Repl from '$lib/Repl.svelte';

	// sample code to show in the REPL
	import sampleJson from './samples/json.json?raw';
	import sampleCounter from './samples/counter.svelte?raw';
	import sampleCss from './samples/css.css?raw';

	// sample component
	import Counter from './samples/counter.svelte';
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<!-- <Repl title="Sample code" content={sampleJson} /> -->
<!-- <Repl content={{ lang: 'svelte', code: 'console.log("hello")' }} /> -->

<Repl content="console.log('hello')" />

<Repl presentation content={sampleCounter}>
	<Counter />
</Repl>

<Repl
	presentation
	content={{
		'Counter.svelte': { code: sampleCounter, lang: 'svelte' },
		'file.json': { code: sampleJson, lang: 'json' },
		'Styles.css': { code: sampleCss, lang: 'css' },
		'file.json content': { code: sampleJson, lang: 'json' },
		'Counter.svelte dsqd': { code: sampleCounter, lang: 'svelte' },
		'Styles.css sqd sq': { code: sampleCss, lang: 'css' }
	}}
>
	<Counter />
</Repl>

<Repl
	title="Multi sample extra long title REPL for testing large titles on toolbar ! it's working or not working? it's a very long title"
	content={{
		'file.json': { code: sampleJson, lang: 'json' },
		'Counter.svelte': { code: sampleCounter, lang: 'svelte' },
		'Styles.css': { code: sampleCss, lang: 'css' },
		'file.json content': { code: sampleJson, lang: 'json' },
		'Counter.svelte dsqd': { code: sampleCounter, lang: 'svelte' },
		'Styles.css sqd sq': { code: sampleCss, lang: 'css' }
	}}
>
	<Counter />
</Repl>
