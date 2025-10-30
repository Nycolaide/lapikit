<script lang="ts">
	import { Chip, Icon, List, ListItem } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	let { items, open = $bindable() } = $props();
</script>

<List density="compact" variant="text" nav>
	{#each items as item (item?.path || item?.key)}
		<ListItem key={item.slug} href={item.slug} onclick={() => (open = false)}>
			{#snippet append()}
				{#if item.metadata?.style?.icon}
					<Icon icon={item.metadata.style.icon} />
				{/if}
			{/snippet}

			{capitalize(item.metadata?.title || '')}

			{#snippet prepend()}
				{#if item.metadata?.state?.status}
					<Chip
						rounded="full"
						size="xs"
						color="white"
						class="px-2!"
						density="compact"
						success={item.metadata?.state.status === 'new'}
						warning={item.metadata?.state.status === 'update'}
						error={item.metadata?.state.status === 'deprecate'}
						info={item.metadata?.state.status === 'preview'}
					>
						{capitalize(item.metadata?.state.status)}
					</Chip>
				{/if}
			{/snippet}
		</ListItem>
	{/each}
</List>
