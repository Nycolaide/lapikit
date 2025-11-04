<script lang="ts">
	import { Button, Card, Icon } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();
</script>

<svelte:head>
	<title>Lapikit • Hooks</title>
	<meta name="description" content="Find out more about Lapikit's hooks." />
</svelte:head>

<div class="mx-auto grid w-full min-w-0 pr-4 pb-6 pl-4 md:max-w-[760px] md:pl-0 xl:max-w-[1024px]">
	<div class="mb-16 text-center">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl">
			{capitalize('Discover all hooks of Lapikit')}
		</h1>
	</div>

	<div class="grid grid-cols-1 gap-4">
		{#if data.nav_links['docs'].sections['hooks'].categories.length === 0}
			<p>{capitalize('No Hooks found')}</p>
		{:else}
			{#each data.nav_links['docs'].sections['hooks'].categories as category (category.key)}
				{#if category.key === 'stores'}
					{#each category.items as page, index (index)}
						<Card href={`${page.slug}`} class="mb-4 items-start gap-4 ">
							<div class="grid grid-cols-[1fr_auto] gap-4 p-5">
								<div>
									<p class="text-lg font-bold md:text-xl">{capitalize(page.metadata.title)}</p>
									<p class="opacity-75">{capitalize(page?.metadata.introduction || '')}</p>
								</div>
								<div>
									<Button href={`${page.slug}`} icon rounded="full">
										<Icon icon="mgc_arrow_right_fill" />
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				{/if}
			{/each}

			{#each data.nav_links['docs'].sections['hooks'].categories as category (category.key)}
				{#if category.key === 'actions'}
					{#each category.items as page, index (index)}
						<Card href={`/docs${page.metadata.slug}`} class="mb-4 items-start gap-4 ">
							<div class="grid grid-cols-[1fr_auto] gap-4 p-5">
								<div>
									<p class="text-lg font-bold md:text-xl">{capitalize(page.metadata.title)}</p>
									<p class="opacity-75">{capitalize(page?.metadata.introduction || '')}</p>
								</div>
								<div>
									<Button href={`/docs${page.metadata.slug}`} icon rounded="full">
										<Icon icon="mgc_arrow_right_fill" />
									</Button>
								</div>
							</div>
						</Card>
					{/each}
				{/if}
			{/each}
		{/if}
	</div>
</div>
