<script lang="ts">
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();
</script>

<svelte:head>
	<title
		>{capitalize(data.page.meta.head?.title || data.page.meta.title || 'Lapikit')} • Lapikit Svelte Components</title
	>
	<meta name="description" content={data.page.meta.head?.description || 'Lapikit documentation'} />
</svelte:head>

<data.page.content />
