<script lang="ts">
	import { t } from '$lib/i18n';
	import { filteredPages, rawSearchQuery } from '$lib/stores/app';
	import { isMac } from '$lib/stores/device';
	import {
		groupByRecency,
		recentSearches,
		recentSearchesWithData,
		type RecencyGroups
	} from '$lib/stores/history';
	import { Btn, Chip, Dialog, Icon, List, ListItem } from 'lapikit/components';
	import { onDestroy, onMount } from 'svelte';

	let open: boolean = $state(false);
	let input: string = $state('');
	let historyResult: RecencyGroups | undefined = $state(undefined);

	$effect(() => {
		rawSearchQuery.set(input);
	});

	$effect(() => {
		// reset
		if (!open) input = '';
	});

	$effect(() => {
		const result = groupByRecency($recentSearchesWithData);
		console.log('result', result);
		historyResult = result;
	});

	const handleClick = (page: { title: string }) => {
		recentSearches.add(page.title);
	};

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			open = true;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<Btn class="display-mobile" onclick={() => (open = true)} icon>
	<Icon icon="mgc_search_line" />
</Btn>

<Btn class="hidden-mobile" onclick={() => (open = true)}>
	<Icon icon="mgc_search_line" />

	<span class="pr-[2rem]">
		{$t('search.search-docs')}
	</span>

	<Chip size="sm">
		{$isMac ? '⌘' : 'ctrl'}
	</Chip>
	<Chip size="sm">k</Chip>
</Btn>

<Dialog bind:open position="top" classContent="mt-[2rem] md:mt-[5rem]">
	<input
		type="text"
		placeholder={$t('search.search-for-something')}
		bind:value={input}
		class="w-full rounded border p-2"
	/>

	<div class="size-min max-h-[290px] w-full overflow-auto">
		{#if input !== ''}
			{#if $filteredPages.length === 0 && input}
				<p>{$t('search.no-result', { key: input })}</p>
			{/if}
			<List>
				{#each $filteredPages as page (page.title)}
					<ListItem href={`/${page.slug}`} onclick={() => handleClick(page)}>
						<div>
							<p>{page.title}</p>
							<p>{page.description}</p>
						</div>
					</ListItem>
				{/each}
			</List>
		{:else if historyResult && (historyResult?.today?.length > 0 || historyResult?.thisWeek?.length > 0 || historyResult?.thisMonth?.length > 0 || historyResult?.older?.length > 0)}
			{#each Object.entries(historyResult) as [key, pages] (key)}
				{#if pages.length > 0}
					<p>{$t(`search.period.${key}`)}</p>
					<List>
						{#each pages as page (page.title)}
							<ListItem href={`/${page.slug}`}>
								<div>
									<p>{page.title}</p>
									<p>{page.description}</p>
								</div>
							</ListItem>
						{/each}
					</List>
				{/if}
			{/each}
		{/if}
	</div>
</Dialog>
