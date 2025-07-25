<script lang="ts">
	import { page } from '$app/state';
	import Head from '$lib/components/head.svelte';
	import { t } from '$lib/i18n';
	import { Card } from 'lapikit/components';
	import { Breadcrumbs } from 'site-kit';
	import { capitalize } from 'site-kit/actions';

	interface Page {
		title: string;
		slug: string;
		subtitle?: string;
		section: string;
		cover?: string;
		introduction?: string;
	}

	let { data } = $props();

	let componentPages = $state<Page[]>([]);

	$effect.pre(() => {
		if (data && data.pages) {
			componentPages = data.pages
				.filter((page: Page) => page.section === 'components')
				.sort((a: Page, b: Page) => a.title.localeCompare(b.title));
		}
	});
</script>

<Head title="all components" description="Find out more about Lapikit's Svelte composents." />

<div
	class="mx-auto grid w-full min-w-0 pt-16 pr-4 pb-6 pl-4 md:max-w-[760px] md:pl-0 xl:max-w-[1024px]"
>
	<Breadcrumbs {page} ld={data?.breadcrumbJsonLd} />
	<div class="mb-16 text-center">
		<h1 class="text-xl font-bold md:text-2xl lg:text-3xl">
			{capitalize($t('docs.landing-page.components.title'))}
		</h1>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4">
		{#if componentPages.length === 0}
			<p>{capitalize($t('docs.landing-page.components.no-pages'))}</p>
		{/if}
		{#each componentPages as { title, slug, cover, introduction } (slug)}
			<Card
				href={`/${slug}`}
				class="mb-4 grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-1"
			>
				<img
					src={cover ? `/images/${cover}?v=1` : '/images/preview-component.webp?v=1'}
					alt={`${title} cover`}
					class="max-sm:max-h-38"
				/>
				<div>
					<p class="text-lg font-bold md:text-xl">{capitalize(title)}</p>
					<p class="opacity-75">{capitalize(introduction || '')}</p>
				</div>
			</Card>
		{/each}
	</div>
</div>
