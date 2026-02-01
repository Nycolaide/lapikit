<script lang="ts">
	let { data } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h2>Stats Lapikit</h2>
<ul>
	<li>Downloads : {data.stats.downloads.toLocaleString()}</li>
</ul>

<h2>Components Lab</h2>

<kit:repl>demo</kit:repl>

<h3>Labs merge Class and Styles Core</h3>
<kit:sheet
	id="demo-sheet"
	class="my-custom-class"
	style="color: red;"
	s-class="additional-class"
	s-class_new-additional-class={true}>Demo</kit:sheet
>
