<script lang="ts">
	import { Button, Dropdown, Icon, List, ListItem } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import NavList from './nav-list.svelte';
	import type { NavigationLink, NavigationSectionWithCategories } from '$lib/types/navigation';
	import { breakpoints, viewport } from 'lapikit/stores';

	let { open = $bindable(), currentSection = $bindable(), navigation } = $props();

	// states
	let ref = $state(null);
	let elements = $state<NavigationSectionWithCategories | undefined>(undefined);

	$effect(() => {
		const docsNav = navigation['docs'] as NavigationLink;
		if (docsNav?.sections && currentSection) {
			elements = docsNav.sections[currentSection];
		}
	});
</script>

{#if $viewport.innerHeight > 1 && $viewport.innerWidth <= $breakpoints.lg}
	<Dropdown closeOnClick>
		{#snippet activator(model)}
			<Button
				bind:ref
				onclick={() => model.toggle(ref)}
				variant="outline"
				class="justify-between! m-[10px] w-[calc(100%-20px)]"
			>
				{elements?.title || 'Select Section'}

				{#snippet append()}
					<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
				{/snippet}
			</Button>
		{/snippet}

		<List density="compact" nav class="min-w-[280px]">
			{#each Object.entries((navigation['docs'] as NavigationLink).sections!) as [keyNav, sectionData] (keyNav)}
				<ListItem
					onclick={() => {
						currentSection = keyNav;
					}}
				>
					{sectionData.title}
				</ListItem>
			{/each}
		</List>
	</Dropdown>
{/if}

<List density="compact" variant="text" nav>
	{#if elements?.categories}
		{#each elements.categories as category, index (index)}
			{#if category.title !== 'uncategorized'}
				<ListItem color={category.style?.color} disabled>
					{#snippet append()}
						{#if category.style?.icon}
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
	{/if}
</List>
