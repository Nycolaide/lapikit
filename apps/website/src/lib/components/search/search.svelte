<script lang="ts">
	import { Chip, Icon, List, ListItem, Modal, Textfield } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { useSearch } from './search.svelte.js';
	import { onDestroy } from 'svelte';

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

	$effect(() => {
		if (!open) {
			searchQuery = undefined;
		}
	});

	$effect(() => {
		if (searchQuery === '' || !searchQuery) {
			let storageBrowser = localStorage.getItem('@lapikit/recent-searches');
			historyResults = storageBrowser ? JSON.parse(storageBrowser) : [];
		}
	});

	$effect(() => {
		if (searchQuery !== undefined && searchQuery !== '') {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				callResults(searchQuery!);
			}, 300);
		}
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
		bind:value={searchQuery}
		clearable
		placeholder={capitalize('search...')}
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
						class="cursor-pointer"
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
						class="cursor-pointer"
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
								<span class="text-sm opacity-70">{item.subtitle}</span>
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
