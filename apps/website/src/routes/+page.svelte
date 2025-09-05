<script lang="ts">
	let { data } = $props();

	// sample
	// import { developmentMode } from '$lib/stores/app.js';

	// temps
	// import NewPage from './_new.page.svelte';
	import LegacyPage from './_legacy.page.svelte';
</script>

<!-- {#if $developmentMode}
	<NewPage {data} />
{:else} -->
<LegacyPage {data} />
<!-- {/if} -->
