<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	interface SearchResult {
		slug: string;
		title: string;
		description?: string;
		category?: string;
	}

	let searchQuery = $state('');
	let searchResults = $state<SearchResult[]>([]);
	let isSearching = $state(false);
	let showResults = $state(false);
	let allPosts = $state<SearchResult[]>([]);
	let searchInput: HTMLInputElement;

	onMount(async () => {
		try {
			const response = await fetch('/api/search');
			if (response.ok) {
				allPosts = await response.json();
			}
		} catch (error) {
			console.error('Error loading posts for search:', error);
		}
	});

	$effect(() => {
		if (searchQuery.length > 0) {
			isSearching = true;
			const query = searchQuery.toLowerCase();
			
			searchResults = allPosts.filter(post => 
				post.title.toLowerCase().includes(query) ||
				post.description?.toLowerCase().includes(query)
			).slice(0, 5);
			
			showResults = true;
			isSearching = false;
		} else {
			searchResults = [];
			showResults = false;
		}
	});

	function handleResultClick(slug: string) {
		searchQuery = '';
		showResults = false;
		goto(`/blog/${slug}`);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			searchQuery = '';
			showResults = false;
			searchInput?.blur();
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.search-container')) {
			showResults = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="search-container">
	<div class="search-input-wrapper">	
		<input
			bind:this={searchInput}
			bind:value={searchQuery}
			onkeydown={handleKeydown}
			type="text"
			placeholder="Search for an article..."
			class="search-input"
			aria-label="Search for an article"
		/>
		
		{#if searchQuery}
			<button 
				class="clear-button"
				onclick={() => { searchQuery = ''; showResults = false; }}
				aria-label="Clear search"
			>
				✕
			</button>
		{/if}
	</div>

	{#if showResults}
		<div class="search-results">
			{#if isSearching}
				<div class="search-loading">Search...</div>
			{:else if searchResults.length > 0}
				<ul>
					{#each searchResults as result (result.slug)}
						<li>
							<button
								class="result-item"
								onclick={() => handleResultClick(result.slug)}
							>
								<div class="result-title">{result.title}</div>
								{#if result.description}
									<div class="result-description">{result.description}</div>
								{/if}
								{#if result.category}
									<div class="result-category">{result.category}</div>
								{/if}
							</button>
						</li>
					{/each}
				</ul>
			{:else}
				<div class="no-results">No result for "{searchQuery}"</div>
			{/if}
		</div>
	{/if}
</div>
