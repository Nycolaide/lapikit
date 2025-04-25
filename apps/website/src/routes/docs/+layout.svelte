<script lang="ts">
	import { Drawer } from 'site-kit';
	let { children } = $props();

	let open = $state(false);
</script>

<Drawer bind:open>
	{#snippet navigation()}
		<p>Navigation</p>
	{/snippet}

	<button onclick={() => (open = !open)}>open drawer</button>

	{@render children?.()}
</Drawer>
