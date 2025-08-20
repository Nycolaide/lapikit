<script lang="ts">
	import { t } from '$lib/i18n';
	import { goto } from '$app/navigation';

	import { Toolbar, List, ListItem, Chip, Icon, Button } from 'lapikit/components';
	import { useSearch } from './search.svelte.js';
	import { capitalize } from 'site-kit/actions';
	import { addToRecentSearches } from './helper.js';
	import { onDestroy, onMount } from 'svelte';

	let { searchQuery = $bindable(undefined) }: { searchQuery?: string | undefined } = $props();

	const { results, callResults, availableSections } = useSearch();

	//states
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
	let selectedSection: string | null = $state(null);
	let selectedIndex: number = $state(0);

	const filteredResults = $derived(() => {
		if (!selectedSection) return $results;
		return $results.filter((result) => result.state?.section === selectedSection);
	});

	onMount(() => {
		const handleGlobalKeydown = (event: KeyboardEvent) => {
			handleKeydown(event);
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});

	$effect(() => {
		if (searchQuery !== undefined) {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				callResults(searchQuery);
			}, 300);
		}
	});

	$effect(() => {
		if (filteredResults().length > 0) {
			selectedIndex = 0;
		}
	});

	function handleResultClick(item: {
		title: string;
		slug: string;
		cover?: string;
		icon?: string;
		color?: string;
	}) {
		addToRecentSearches({
			title: item.title,
			slug: item.slug,
			cover: item?.cover,
			icon: item?.icon,
			color: item?.color
		});
		goto(`/docs${item.slug}`);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open || filteredResults().length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, filteredResults().length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (filteredResults()[selectedIndex]) {
					const selectedItem = filteredResults()[selectedIndex];

					handleResultClick({
						title: selectedItem.title as string,
						slug: selectedItem.metadata?.slug as string,
						cover: selectedItem.style?.cover as string,
						icon: selectedItem.style?.icon as string,
						color: selectedItem.style?.color as string
					});
				}
				break;
		}
	}

	onDestroy(() => {
		if (debounceTimeout) clearTimeout(debounceTimeout);
	});
</script>

<Toolbar class="mb-3" classContent="grid">
	<div class="flex flex-wrap gap-2">
		<Button
			onclick={() => (selectedSection = null)}
			active={selectedSection === null}
			size="sm"
			rounded="full"
		>
			{capitalize($t('navigation.search_bar.all'))}
		</Button>

		{#each $availableSections as section (section.key)}
			<Button
				onclick={() => (selectedSection = section.key)}
				active={selectedSection === section.key}
				size="sm"
				rounded="full"
			>
				<Icon icon={section.icon} />
				{capitalize(section.key)}
			</Button>
		{/each}
	</div>
	<div>
		<span class="text-sm opacity-50">
			{capitalize(
				$t('navigation.search_bar.has_results', { query: String(filteredResults().length) })
			)}
		</span>
	</div>
</Toolbar>

<div class="h-[40vh] overflow-y-auto">
	{#if filteredResults().length > 0}
		<List>
			{#each filteredResults() as item, index (index)}
				<ListItem
					active={selectedIndex === index}
					onclick={() =>
						handleResultClick({
							title: String(item.title),
							slug: String(item.metadata.slug),
							cover: String(item.style?.cover),
							icon: String(item.style?.icon),
							color: String(item.style?.color)
						})}
				>
					{capitalize(String(item?.title))}

					{#if item.type === 'match'}
						<Chip size="xs" density="compact" success={item.type === 'match'} rounded="md" readonly>
							{capitalize(String(item?.type))}
						</Chip>
					{/if}

					{#snippet prepend()}
						<Icon icon="mgc_right_line" />
					{/snippet}
				</ListItem>
			{/each}
		</List>
	{/if}
</div>
