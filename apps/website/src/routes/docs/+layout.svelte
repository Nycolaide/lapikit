<script lang="ts">
	import { PageTransition } from '$animations';
	//modules
	import { DocNav } from '$components';
	import { Drawer } from 'site-kit';
	import Nav from './_modules/nav.svelte';

	let { children, data } = $props();

	// states
	let open = $state(false);

	$effect(() => {
		console.log('Routes:', data);
	});
</script>

<DocNav sections={{}} url={data.url_internal} npm={data.npm} /><Drawer bind:open>
	{#snippet navigation()}
		<Nav items={[]} bind:open />
	{/snippet}

	<PageTransition url={data.url}>
		{@render children?.()}
	</PageTransition>
</Drawer>
