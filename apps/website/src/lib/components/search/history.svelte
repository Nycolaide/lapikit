<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n';

	import { useSearch } from './search.svelte.js';
	import type { RecentSearch } from './helper';
	import { Button, Card, Icon, Spacer, Toolbar } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	const { resultsRecommandation, callRecommendation } = useSearch();

	// states
	let typeDisplay: 'recommended' | 'history' = $state('recommended');
	let recentSearches: RecentSearch[] = $state([]);
	let selectedIndex: number = $state(0);

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
		const storage = loadRecentSearches();
		if (storage.length > 0) {
			recentSearches = [...storage];
			typeDisplay = 'history';
		} else {
			callRecommendation();
			typeDisplay = 'recommended';
		}
	});

	$effect(() => {
		if (recentSearches.length > 0) {
			selectedIndex = 0;
		}
	});

	$effect(() => {
		if ($resultsRecommandation && typeDisplay === 'recommended') {
			recentSearches = $resultsRecommandation.map((result) => ({
				title: String(result.title ?? ''),
				slug: String(result.metadata.slug ?? ''),
				timestamp: Date.now(),
				cover: result.style?.cover ? String(result.style.cover) : undefined,
				icon: result.style?.icon ? String(result.style.icon) : undefined,
				color: result.style?.color ? String(result.style.color) : undefined
			}));
		}
	});

	function loadRecentSearches(): RecentSearch[] {
		if (typeof window === 'undefined') return [];
		try {
			const stored = localStorage.getItem('@lapikit/recent-searches');
			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (recentSearches.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, recentSearches.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if (recentSearches[selectedIndex]) {
					const selectedItem = recentSearches[selectedIndex];
					goto(`/docs${selectedItem.slug}`);
				}
				break;
		}
	}

	function clearRecentSearches() {
		recentSearches = [];
		callRecommendation();
		typeDisplay = 'recommended';
		if (typeof window !== 'undefined') localStorage.removeItem('@lapikit/recent-searches');
	}
</script>

<Toolbar density="compact">
	{#if typeDisplay === 'recommended'}
		<Icon icon="mgc_bling_line" />
		<p class="sm:text-md ml-2 text-sm">
			{capitalize($t('navigation.search_bar.recommendation.title'))}
		</p>
	{:else}
		<Icon icon="mgc_history_line" />
		<p class="sm:text-md ml-2 text-sm">{capitalize($t('navigation.search_bar.history.title'))}</p>
		<Spacer />
		{#if recentSearches.length > 0}
			<Button
				onclick={clearRecentSearches}
				size="sm"
				class="opacity-70"
				aria-label={capitalize($t('navigation.search_bar.history.clear'))}
			>
				{capitalize($t('navigation.search_bar.history.clear'))}
				{#snippet append()}
					<Icon icon="mgc_delete_2_line" />
				{/snippet}
			</Button>
		{/if}
	{/if}
</Toolbar>

<div class="grid h-[41.9vh] grid-cols-4 gap-4 overflow-auto sm:grid-cols-5">
	{#each recentSearches as search, index (index)}
		<div class="text-center">
			<Card
				class="flex aspect-square w-full items-center justify-center"
				background="surface"
				href={`/docs${search.slug}`}
				active={selectedIndex === index}
			>
				<div
					class="flex aspect-square w-full items-center justify-center rounded-lg"
					style:background={search.color ? search.color : 'background'}
				>
					{#if search.cover && search.cover !== 'null' && search.cover !== '' && search.cover !== 'undefined'}
						<img class="" src={`/images/${search.cover}`} alt="test" />
					{:else if search.icon && search.icon !== 'null' && search.icon !== '' && search.icon !== 'undefined'}
						<Icon icon={search.icon} class="text-[2.5rem] sm:text-[3rem] md:text-[4rem]" />
					{:else}
						<span class="text-3xl">{capitalize(search.title.substring(0, 1))}</span>
					{/if}
				</div>
			</Card>
			<p
				class="text-overflow-ellipsis overflow-hidden text-[0.75rem] text-nowrap whitespace-nowrap opacity-50"
			>
				{capitalize(search.title)}
			</p>
		</div>
	{/each}
</div>
