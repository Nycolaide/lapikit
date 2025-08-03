<script lang="ts">
	import {
		Button,
		Card,
		Chip,
		Icon,
		List,
		ListItem,
		Modal,
		Spacer,
		Textfield
	} from 'lapikit/components';
	import { onDestroy, onMount } from 'svelte';
	import { useSearch } from './search.svelte.js';

	let { app }: { app?: boolean } = $props();

	// states
	let open: boolean = $state(false);
	let searchQuery: string = $state('');
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
	let selectedIndex: number = $state(0);

	const { results, loading, call } = useSearch();

	$effect(() => {
		if (searchQuery !== undefined) {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				call(searchQuery);
			}, 300);
		}
	});

	$effect(() => {
		if ($results.length > 0) {
			selectedIndex = 0;
		}
	});

	// Handle keyboard navigation
	function handleKeydown(event: KeyboardEvent) {
		if (!open || $results.length === 0) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, $results.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
				break;
			case 'Enter':
				event.preventDefault();
				if ($results[selectedIndex]) {
					window.location.href = `/docs${$results[selectedIndex].slug}`;
				}
				break;
			case 'Escape':
				event.preventDefault();
				open = false;
				break;
		}
	}

	onDestroy(() => {
		if (debounceTimeout) clearTimeout(debounceTimeout);
	});

	onMount(() => {
		open = true;

		setTimeout(() => {
			const input = document.querySelector('#search-bar input') as HTMLInputElement;
			input?.focus();
		}, 100);

		// Add keyboard event listener
		const handleGlobalKeydown = (event: KeyboardEvent) => {
			handleKeydown(event);
		};

		document.addEventListener('keydown', handleGlobalKeydown);

		return () => {
			document.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

{#if app}
	<Button onclick={() => (open = true)}>Search</Button>
{/if}

<Modal bind:open>
	<Card color="on-container" background="container" rounded="xl">
		<div class="mx-auto w-[95%]">
			<div class="flex">
				<Spacer />
				<Button size="sm" onclick={() => (open = false)} rounded="full">close</Button>
			</div>

			<div id="search-bar" class="relative flex items-center gap-2">
				<div class="effect-animation--focus"></div>
				<Textfield variant="outline" bind:value={searchQuery} />
			</div>

			<div>
				<button>All</button>
				<button>Components</button>
			</div>

			<div>History: <button>clear</button></div>

			<!-- <div class="w-full text-center">
				<Icon icon="mgc_history_line" style="font-size: 5rem" class="opacity-30" />

				<p>No recent history</p>
			</div> -->

			<!-- <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{#each [1, 2, 3, 4, 5, 6, 7] as item (item)}
					<div>
						<Card class="flex aspect-square w-full items-center justify-center" background="red">
							{item}
						</Card>
						<p class="text-sm opacity-50">Item {item}</p>
					</div>
				{/each}
			</div> -->

			<div>
				<p>nb results: {$results.length}</p>

				<div class="w-full">
					{#if $loading}
						<p>Searching...</p>
					{:else if $results.length > 0}
						<List>
							{#each $results as item, index (item.title)}
								<ListItem
									href={`/docs${item.slug}`}
									class={selectedIndex === index ? 'bg-primary/10 ring-primary/20 ring-1' : ''}
								>
									{item.title}

									<Chip
										size="xs"
										success={item.type === 'match'}
										info={item.type === 'recommandation'}
									>
										{item?.type}
									</Chip>

									{#snippet prepend()}
										<Icon icon="mgc_right_line" />
									{/snippet}
								</ListItem>
							{/each}
						</List>
					{:else if searchQuery.trim()}
						<p>No results found</p>
					{/if}
				</div>
			</div>
		</div>
	</Card>
</Modal>

<style>
	.effect-animation--focus {
		width: 100%;
		filter: blur(0.3rem);
		background: linear-gradient(var(--gradient-angle), blue, purple, red, orange);
		animation: rotation 5s linear infinite;
		position: absolute;
		z-index: 0;
		height: 70%;
		border-radius: var(--radius-effect);
		top: -1px;
	}

	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotation {
		0% {
			--gradient-angle: 0deg;
		}
		100% {
			--gradient-angle: 360deg;
		}
	}
</style>
