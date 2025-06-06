<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';
	import { filteredPages, rawSearchQuery } from '$lib/stores/app';
	import { isMac } from '$lib/stores/device';
	import {
		groupByRecency,
		recentSearches,
		recentSearchesWithData,
		type RecencyGroups
	} from '$lib/stores/history';
	import { Button, Chip, Dialog, Icon, List, ListItem } from 'lapikit/components';
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
		historyResult = result;
	});

	const handleClick = (page: { title: string; slug?: string }) => {
		recentSearches.add(page.title);
		goto('/' + page.slug!);
		open = false;
	};

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			open = true;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
	});
</script>

<Button class="display-mobile" onclick={() => (open = true)} icon>
	<Icon icon="mgc_search_line" />
</Button>

<Button class="hidden-mobile" onclick={() => (open = true)}>
	<Icon icon="mgc_search_line" />

	<span class="pr-[2rem]">
		{$t('docs.search.title')}
	</span>

	<Chip size="sm">
		{$isMac ? '⌘' : 'ctrl'}
	</Chip>
	<Chip size="sm">k</Chip>
</Button>

<Dialog bind:open position="top" classContent="mt-[2rem] md:mt-[5rem]">
	<input
		type="text"
		placeholder={$t('docs.search.placeholder')}
		bind:value={input}
		class="w-full rounded border p-2"
	/>

	<div class="size-min max-h-[290px] w-full overflow-auto">
		{#if input !== ''}
			{#if $filteredPages.length === 0 && input}
				<p>{$t('docs.search.no_results', { query: input })}</p>
			{/if}
			<List>
				{#each $filteredPages as page (page.title)}
					<ListItem onclick={() => handleClick(page)}>
						<div>
							<p>{page.title}</p>
							<p>{page.description}</p>
						</div>
					</ListItem>
				{/each}
			</List>
		{:else if historyResult && (historyResult?.today?.length > 0 || historyResult?.this_week?.length > 0 || historyResult?.this_month?.length > 0 || historyResult?.older?.length > 0)}
			{#each Object.entries(historyResult) as [key, pages] (key)}
				{#if pages.length > 0}
					<p>{$t(`docs.search.periods.${key}`)}</p>
					<List>
						{#each pages as page (page.title)}
							<ListItem onclick={() => handleClick(page)}>
								{#snippet append()}
									<Icon icon="mgc_history_line" size="lg" />
								{/snippet}

								<div class="grid text-left">
									<p
										class="max-w-[500px] overflow-hidden font-bold text-ellipsis whitespace-nowrap"
									>
										{page.title}
									</p>
									<p
										class="max-w-[500px] overflow-hidden text-sm text-ellipsis whitespace-nowrap opacity-75"
									>
										{page.description}
									</p>
								</div>

								{#snippet prepend()}
									<Icon icon="mgc_right_line" size="lg" />
								{/snippet}
							</ListItem>
						{/each}
					</List>
				{/if}
			{/each}
		{/if}
	</div>
</Dialog>
