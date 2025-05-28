<script lang="ts">
	import { filteredPages, rawSearchQuery } from '$lib/stores/app';
	import { Btn, Dialog } from 'lapikit/components';

	let open: boolean = $state(false);
	let input: string = $state('');

	$effect(() => {
		rawSearchQuery.set(input);
	});

	$effect(() => {
		// reset
		if (!open) input = '';
	});
</script>

<Btn onclick={() => (open = true)}>Search</Btn>

<Dialog bind:open position="top">
	<p>Search Dialog</p>

	<Btn onclick={() => (open = false)}>close</Btn>

	<input type="text" placeholder="Search…" bind:value={input} class="w-full rounded border p-2" />

	<div>
		{#if $filteredPages.length === 0 && input}
			<p>No result for « {input} »</p>
		{/if}
		<ul>
			{#each $filteredPages as page (page.title)}
				<li>
					<p>{page.title}</p>
					<p>{page.description}</p>
				</li>
			{/each}
		</ul>
	</div>
</Dialog>
