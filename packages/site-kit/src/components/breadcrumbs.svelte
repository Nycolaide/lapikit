<script lang="ts">
	import { capitalize } from '$lib/actions/capitalize.js';

	let { page, ld } = $props();

	let segments: string[] = $state([]);
	$effect(() => {
		if (!page?.url?.pathname) return;
		segments = page.url.pathname.split('/').filter(Boolean);
	});

	$effect(() => {
		if (!ld) return;
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = ld;
		document.head.appendChild(script);

		return () => {
			if (document.head.contains(script)) {
				document.head.removeChild(script);
			}
		};
	});
	const getPath = (index: number) => '/' + segments.slice(0, index + 1).join('/');
</script>

<nav
	class="breadcrumbs"
	itemscope
	itemtype="https://schema.org/BreadcrumbList"
	aria-label="breadcrumbs"
>
	<ol class="breadcrumbs-list">
		{#each segments as item, index (item)}
			{#if index === 0}
				<li
					class="breadcrumb-item start-item"
					itemprop="itemListElement"
					itemscope
					itemtype="https://schema.org/ListItem"
				>
					<a href="/" itemprop="item" class="breadcrumb-link"> Home </a>
					<meta itemprop="position" content="1" />
					<span class="breadcrumb-separator" aria-hidden="true">/</span>
				</li>
			{/if}

			<li
				class="breadcrumb-item"
				itemprop="itemListElement"
				itemscope
				itemtype="https://schema.org/ListItem"
			>
				{#if index < segments.length - 1}
					<a href={getPath(index)} itemprop="item" class="breadcrumb-link">
						<span itemprop="name">{capitalize(item.replaceAll('-', ' '))}</span>
					</a>
					<meta itemprop="position" content={(index + 2).toString()} />
					<span class="breadcrumb-separator" aria-hidden="true">/</span>
				{:else}
					<span itemprop="name" class="breadcrumb-current" aria-current="page">
						{capitalize(item.replaceAll('-', ' '))}
					</span>
					<meta itemprop="position" content={(index + 2).toString()} />
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	.breadcrumbs {
		margin: 0;
		padding: 0;
		margin-bottom: 2rem;
		margin-top: -2rem;
	}

	.breadcrumbs-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
		font-size: 0.875rem;
		color: var(--kit-on-surface-variant, #666);
	}

	.breadcrumb-item {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.breadcrumb-link {
		color: var(--kit-on-surface);
		text-decoration: none !important;
		transition: color 0.2s ease;
	}

	.breadcrumb-link:hover {
		color: var(--kit-secondary);
	}

	.breadcrumb-link:focus {
		outline: 2px solid var(--kit-primary);
		outline-offset: 2px;
		border-radius: 2px;
	}

	.breadcrumb-current {
		color: var(--kit-on-surface);
		font-weight: 500;
	}

	.breadcrumb-separator {
		color: var(--kit-on-surface-variant);
		user-select: none;
		margin: 0 0.25rem;
	}

	@media (max-width: 640px) {
		.breadcrumbs-list {
			font-size: 0.8rem;
		}

		.breadcrumb-separator {
			margin: 0 0.125rem;
		}
	}
</style>
