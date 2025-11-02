<script lang="ts">
	import { page } from '$app/state';
	import { Card } from 'lapikit/components';
	import { Breadcrumbs } from 'site-kit';
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();

	$effect(() => {
		console.log('Data received:', data);
	});
</script>

<svelte:head>
	<title>Lapikit • Components</title>
	<meta name="description" content="Find out more about Lapikit's Svelte components." />
</svelte:head>

<div
	class="mx-auto grid w-full min-w-0 pb-6 pl-4 pr-4 pt-16 md:max-w-[760px] md:pl-0 xl:max-w-[1024px]"
>
	<Breadcrumbs {page} ld={data?.breadcrumbJsonLd} />
	<div class="mb-16 text-center">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl">
			{capitalize('Discover our components Lapikit')}
		</h1>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4">
		{#if data.nav_links['docs'].sections['components'].categories.length === 0}
			<p>{capitalize('No Components found')}</p>
		{:else}
			{#each data.nav_links['docs'].sections['components'].categories as category (category.key)}
				{#if category.title !== 'uncategorized'}
					<p>{capitalize(category.title)}</p>
				{/if}

				{#each category.items as page, index (index)}
					<Card
						href={`${page.slug}`}
						class="mb-4 grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-1"
					>
						<img
							src={page.metadata?.style?.cover
								? `/images/${page.metadata.style.cover}?v=1`
								: '/images/preview-component.webp?v=1'}
							alt={`${page.metadata.title} cover`}
							class="max-sm:max-h-38"
						/>
						<div>
							<p class="text-lg font-bold md:text-xl">{capitalize(page.metadata.title)}</p>
							<p class="opacity-75">{capitalize(page?.metadata.introduction || '')}</p>
						</div>
					</Card>
				{/each}
			{/each}
		{/if}
	</div>
</div>
