<script lang="ts">
	import { Button, Card, Icon } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { hasNavSections } from '$lib/types/guards';

	let { data } = $props();

	const docsSection = $derived(data.nav_links['docs']);
	const hooksSection = $derived(hasNavSections(docsSection) ? docsSection.sections['hooks'] : null);
</script>

<svelte:head>
	<title>Lapikit • Hooks</title>
	<meta name="description" content="Find out more about Lapikit's hooks." />
</svelte:head>

<div class="mx-auto grid w-full min-w-0 pr-4 pb-6 pl-4 md:max-w-[760px] md:pl-0 xl:max-w-[1024px]">
	<div class="markdown">
		<h1 class="title opacity-75">Hooks</h1>
		<h2 class="subtitle mt-2!">Explore all Lapikit hooks</h2>

		<p>
			Lapikit hooks integrate additional features directly onto your Svelte workflow. They manage
			internal states and background logic, allowing you to focus on developing important features.
			Instead of juggling event listeners or intricate prop chains, Lapikit hooks keep everything
			responsive and in sync with minimal effort on your part.
		</p>
	</div>

	{#if !hooksSection || hooksSection.categories.length === 0}
		<p>{capitalize('No Hooks found')}</p>
	{:else}
		<div class="markdown mb-3">
			<h3 class="mb-4 text-2xl font-semibold">Stores</h3>

			<p>
				Lapikit provides reactive Svelte stores for managing global state in your application. These
				stores manage critical information such as the active theme (dark/light), screen size, and
				display statuses, keeping everything in sync automatically.
			</p>
		</div>

		<div class="mb-4">
			{#each hooksSection.categories as category (category.key)}
				{#if category.key === 'stores'}
					{#each category.items as page, index (index)}
						<Card href={`${page.slug}`} class="mb-4 items-start gap-4 ">
							<div class="grid w-full grid-cols-[1fr_auto] gap-4 p-2">
								<div>
									<p class="my-0! text-lg font-bold md:text-xl">
										{capitalize(page.metadata?.title || '')}
									</p>
									<p class="my-0! opacity-75">
										{capitalize((page?.metadata?.introduction as string) || '')}
									</p>
								</div>
								<div class="flex items-center justify-center">
									<Button href={`${page.slug}`} icon rounded="full">
										<Icon icon="mgc_arrow_right_fill" />
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				{/if}
			{/each}
		</div>

		<div class="markdown mb-3">
			<h3 class="mb-4 text-2xl font-semibold">Actions</h3>

			<p>
				Lapikit hooks integrate additional features directly onto your Svelte workflow. They manage
				internal states and background logic, allowing you to focus on developing important
				features. Instead of juggling event listeners or intricate prop chains, Lapikit hooks keep
				everything responsive.w
			</p>
		</div>

		<div class="mb-4">
			{#each hooksSection.categories as category (category.key)}
				{#if category.key === 'actions'}
					{#each category.items as page, index (index)}
						<Card href={`${page.slug}`} class="mb-4 items-start gap-4 ">
							<div class="grid w-full grid-cols-[1fr_auto] gap-4 p-2">
								<div>
									<p class="my-0! text-lg font-bold md:text-xl">
										{capitalize(page.metadata?.title || '')}
									</p>
									<p class="my-0! opacity-75">
										{capitalize((page?.metadata?.introduction as string) || '')}
									</p>
								</div>
								<div class="flex items-center justify-center">
									<Button href={`${page.slug}`} icon rounded="full">
										<Icon icon="mgc_arrow_right_fill" />
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				{/if}
			{/each}
		</div>
	{/if}
</div>
