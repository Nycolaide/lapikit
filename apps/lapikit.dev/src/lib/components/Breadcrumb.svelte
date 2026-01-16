<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		url: string;
	}

	interface Props {
		items: BreadcrumbItem[];
		baseUrl: string;
	}

	let { items, baseUrl }: Props = $props();

	// Schema JSON-LD for Google
	const breadcrumbSchema = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			item: `${baseUrl}${item.url}`
		}))
	});
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}<\/script>`}
</svelte:head>

<nav aria-label="Breadcrumb">
	<ol>
		{#each items as item, index (index)}
			<li>
				{#if index < items.length - 1}
					<a href={item.url}>{item.label}</a>
					<span aria-hidden="true">/</span>
				{:else}
					<span aria-current="page">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>