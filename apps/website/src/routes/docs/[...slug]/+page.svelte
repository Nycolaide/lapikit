<script lang="ts">
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();
</script>

<svelte:head>
	<title>{capitalize(data.page.meta.head.title)} • Lapikit</title>
	<meta name="description" content={data.page.meta.head.description} />
</svelte:head>

<data.page.content />
