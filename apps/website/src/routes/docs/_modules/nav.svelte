<script lang="ts">
	import { Icon, List, ListItem } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import NavList from './nav-list.svelte';

	let { items, open = $bindable() } = $props();
</script>

<List density="compact" variant="text" nav>
	{#each items as category, index (index)}
		{#if category.title !== 'uncategorized'}
			<ListItem color={category.style.color} disabled>
				{#snippet append()}
					{#if category.style.icon}
						<Icon icon={category.style.icon} />
					{/if}
				{/snippet}

				{capitalize(category.title || '')}
			</ListItem>

			<NavList elements={category.items || []} bind:open />
		{:else}
			<NavList elements={category.items || []} bind:open />
		{/if}
	{/each}
</List>
