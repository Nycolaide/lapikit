<script lang="ts">
	import '$lib/styles/app.css';

	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/docs/sample">Sample</a>
</nav>

{@render children()}
