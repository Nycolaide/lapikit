<script lang="ts">
	import { page } from '$app/state';
	import type { MarkdownHead, MarkdownWithMetadata, SectionPages } from '$lib';
	import Head from '$lib/components/head.svelte';
	import { Button, Card, Icon } from 'lapikit/components';
	import { Breadcrumbs } from 'site-kit';
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();

	let storesPages = $state<MarkdownWithMetadata[]>([]);

	$effect(() => {
		if (data && data.routes) {
			const list = data.routes.filter((section: SectionPages) => section.key === 'stores');
			storesPages = list[0].pages.sort((a: MarkdownHead, b: MarkdownHead) =>
				a.title.localeCompare(b.title)
			);
		}
	});

	$effect(() => {
		console.log(storesPages);
	});
</script>

<Head title="all stores lapikit" description="Find out more about Lapikit's stores." />

<div
	class="mx-auto grid w-full min-w-0 pt-16 pr-4 pb-6 pl-4 md:max-w-[760px] md:pl-0 xl:max-w-[1024px]"
>
	<Breadcrumbs {page} ld={data?.breadcrumbJsonLd} />
	<div class="mb-16 text-center">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl">
			{capitalize('Discover all stores of Lapikit')}
		</h1>
	</div>

	<div class="grid grid-cols-1 gap-4">
		{#if storesPages.length === 0}
			<p>{capitalize('No stores found')}</p>
		{/if}
		{#each storesPages as page, index (index)}
			<Card href={`/docs${page.metadata.slug}`} class="mb-4 items-start gap-4 ">
				<div class="grid grid-cols-[1fr_auto] gap-4 p-5">
					<div>
						<p class="text-lg font-bold md:text-xl">{capitalize(page.title)}</p>
						<p class="opacity-75">{capitalize(page?.introduction || '')}</p>
					</div>
					<div>
						<Button href={`/docs${page.metadata.slug}`} icon rounded="full">
							<Icon icon="mgc_arrow_right_fill" />
						</Button>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</div>
