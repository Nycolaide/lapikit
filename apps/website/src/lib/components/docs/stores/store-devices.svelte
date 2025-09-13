<script lang="ts">
	import { devices } from 'lapikit/stores';

	let innerWidth = $state(0);
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > $devices.desktop}
	<p>Desktop</p>
{/if}
