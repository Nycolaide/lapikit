<script lang="ts">
	import { Button, Card, Modal, Textfield } from 'lapikit/components';
	import { onDestroy, onMount } from 'svelte';
	import { useSearch } from './search.svelte.js';

	let { app }: { app?: boolean } = $props();

	// states
	let open: boolean = $state(false);
	let searchQuery: string = $state('');
	let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

	const { results, loading, call } = useSearch();

	$effect(() => {
		if (searchQuery !== undefined) {
			if (debounceTimeout) clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				call(searchQuery);
			}, 300);
		}
	});

	onDestroy(() => {
		if (debounceTimeout) clearTimeout(debounceTimeout);
	});

	onMount(() => {
		open = true;
	});
</script>

{#if app}
	<Button onclick={() => (open = true)}>Search</Button>
{/if}

<Modal bind:open>
	<Card color="on-container" background="container" rounded="xl">
		<div class="mx-auto w-[95%]">
			<p>Search</p>
			<div id="search-bar" class="relative flex items-center gap-2">
				<div class="effect-animation--focus"></div>
				<Textfield variant="outline" bind:value={searchQuery} />
			</div>

			<div>
				<p>results</p>

				{#if $loading}
					<p>Searching...</p>
				{:else if $results.length > 0}
					<ul>
						{#each $results as item (item.title)}
							<li>{item.title}</li>
						{/each}
					</ul>
				{:else if searchQuery.trim()}
					<p>No results found</p>
				{/if}
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
