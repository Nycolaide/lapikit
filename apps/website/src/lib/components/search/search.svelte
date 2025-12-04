<script lang="ts">
	import { Chip, Icon, List, ListItem, Modal, Textfield } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { useSearch } from './search.svelte.js';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';

	const { results, callResults } = useSearch();

	let {
		open = $bindable(false)
	}: {
		open?: boolean;
	} = $props();

	// states
	let searchQuery: string | undefined = $state(undefined);
	let historyResults: { title: string; slug: string; date: string }[] = $state([]);
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
	let textfieldElement = $state<HTMLElement>();
	let selectedIndex = $state(-1);

	$effect(() => {
		if (open && textfieldElement) {
			setTimeout(() => {
				const input = textfieldElement?.querySelector('input') as HTMLInputElement;
				input?.focus();
			}, 100);
		}
	});

	// Load history when modal opens or search is cleared
	$effect(() => {
		if (open) {
			if (!searchQuery || searchQuery === '') {
				let storageBrowser = localStorage.getItem('@lapikit/recent-searches');
				const newHistoryResults = storageBrowser ? JSON.parse(storageBrowser) : [];
				historyResults = newHistoryResults;
			}
		}
	});

	// Handle search with debounce
	$effect(() => {
		if (searchQuery && searchQuery !== '') {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				callResults(searchQuery!);
			}, 300);
		}
	});

	// Set selected index based on current mode and available results
	$effect(() => {
		const isSearchMode = searchQuery && searchQuery !== '';
		const currentResults = isSearchMode ? $results : historyResults;
		selectedIndex = currentResults.length > 0 ? 0 : -1;
	});

	function saveOnHistory(search: { title: string; slug?: string }) {
		if (typeof window === 'undefined') return;

		let storageBrowser = localStorage.getItem('@lapikit/recent-searches');
		let searches: { title: string; slug: string; date: string }[] = storageBrowser
			? JSON.parse(storageBrowser)
			: [];

		const searchWithDate = {
			title: search.title,
			slug: search.slug || '',
			date: new Date().toISOString()
		};

		const existingIndex = searches.findIndex((item) => item.title === search.title);

		if (existingIndex !== -1) {
			searches.splice(existingIndex, 1);
		}

		searches.unshift(searchWithDate);

		if (searches.length > 50) {
			searches = searches.slice(0, 50);
		}

		localStorage.setItem('@lapikit/recent-searches', JSON.stringify(searches));
	}

	function clearHistory() {
		localStorage.removeItem('@lapikit/recent-searches');
		historyResults = [];
	}

	function handleKeydown(event: KeyboardEvent) {
		const currentResults = searchQuery === '' || !searchQuery ? historyResults : $results;
		const maxIndex = currentResults.length - 1;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = selectedIndex < maxIndex ? selectedIndex + 1 : 0;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : maxIndex;
		} else if (
			event.key === 'Enter' &&
			selectedIndex >= 0 &&
			selectedIndex < currentResults.length
		) {
			event.preventDefault();
			const selectedItem = currentResults[selectedIndex];
			if (selectedItem) {
				saveOnHistory({ title: selectedItem.title, slug: selectedItem.slug });
				// eslint-disable-next-line svelte/no-navigation-without-resolve
				goto(`${selectedItem.slug}`);
				open = false;
			}
		}
	}

	onDestroy(() => {
		if (debounceTimeout) clearTimeout(debounceTimeout);
	});
</script>

<Modal
	bind:open
	closeWithEsc
	position="top"
	rounded="xl"
	classContent="top-8! sm:top-16! min-h-[72px]!"
>
	<Textfield
		id="search-input"
		bind:ref={textfieldElement}
		bind:value={searchQuery}
		clearable
		placeholder={capitalize('search...')}
		onkeydown={handleKeydown}
	>
		{#snippet appendInner()}
			<Icon icon="mgc_search_line" />
		{/snippet}
	</Textfield>

	{#if searchQuery || historyResults.length > 0}
		<div class="mb-2 flex items-center justify-between">
			<div class="ml-2 text-sm opacity-50">
				{#if searchQuery !== '' && searchQuery}
					{$results.length} results
				{/if}
			</div>

			{#if historyResults.length > 0 && (searchQuery === '' || !searchQuery)}
				<Chip onclick={() => clearHistory()} size="sm" class="px-2!">
					{#snippet prepend()}
						<Icon icon="mgc_delete_3_line" />
					{/snippet}
					Clear
				</Chip>
			{/if}
		</div>
	{/if}

	<div class="max-h-[40vh] w-full overflow-y-auto">
		<List>
			{#if searchQuery === '' || !searchQuery}
				{#each historyResults as item, index (index)}
					<ListItem
						onclick={() => {
							open = false;
							saveOnHistory({ title: item.title, slug: item.slug });
						}}
						href={`${item.slug}`}
						class="rounded-sm! cursor-pointer"
						style={`${selectedIndex === index ? 'background:var(--kit-background-tertiary);' : ''}`}
					>
						{#snippet prepend()}
							<Icon icon="mgc_history_line" />
						{/snippet}
						{capitalize(item.title)}
					</ListItem>
				{/each}
			{:else}
				{#each $results as item, index (index)}
					<ListItem
						onclick={() => {
							open = false;
							saveOnHistory({ title: item.title, slug: item.slug });
						}}
						href={`${item.slug}`}
						class="rounded-sm! cursor-pointer"
						style={`${selectedIndex === index ? 'background:var(--kit-background-tertiary);' : ''}`}
					>
						{#snippet prepend()}
							{#if item.style?.icon}
								<Icon icon={item.style.icon} />
							{:else}
								<Icon icon="mgc_file_line" />
							{/if}
						{/snippet}
						<div class="flex flex-col">
							<span>{capitalize(item.title)}</span>
							{#if item.subtitle}
								<span class="text-sm opacity-70">{capitalize(item.subtitle)}</span>
							{/if}
						</div>
					</ListItem>
				{/each}
			{/if}
		</List>
	</div>
</Modal>

<style>
	:global(#search-input .kit-textfield-message) {
		display: none;
	}
</style>
