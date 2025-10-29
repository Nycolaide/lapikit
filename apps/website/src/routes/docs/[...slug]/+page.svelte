<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { Card, Icon, List, ListItem, Separator } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { Breadcrumbs } from 'site-kit';

	let { data } = $props();

	// states
	let activeId: string = $state('');
	let specificPage = $state(['changelog']);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
						break;
					}
				}
			},
			{
				rootMargin: '0px 0px -70% 0px', // start early
				threshold: 0.1
			}
		);

		const elements = data.meta.headings.map((h) => document.getElementById(h.id)).filter(Boolean);
		elements.forEach((el) => observer.observe(el!));

		return () => {
			elements.forEach((el) => observer.unobserve(el!));
		};
	});
</script>

<div class="grid pt-12 pr-4 pb-6 pl-4 md:pl-0 xl:grid-cols-[1fr_220px]">
	<div>
		<div class="markdown mx-auto w-full min-w-0 md:max-w-[760px]">
			<Breadcrumbs {page} ld={data?.breadcrumbJsonLd} />
			<data.content />
		</div>
	</div>
	<aside class="max-xl:hidden">
		<Card class="sticky! top-[4.5rem]">
			<List size="xs" density="compact" variant="text">
				<ListItem>
					{#snippet append()}
						<Icon icon="mgc_tornado_2_line" />
						{capitalize($t('docs.summary.title'))}
					{/snippet}
				</ListItem>

				<Separator class="my-1" />

				{#each data.meta.headings as heading (heading)}
					{#if !specificPage.includes(data.meta.title.toLocaleLowerCase()) && heading.level >= 2 && heading.level <= 4}
						<ListItem
							href={'#' + heading.id}
							class="level-{heading.level}"
							active={heading.id === activeId}
							style={`margin-left: ${(heading.level - 2) * 1.5}rem;`}
						>
							{capitalize(heading.text)}
						</ListItem>
					{:else if heading.level === 2}
						<ListItem
							href={'#' + heading.id}
							class="level-{heading.level}"
							active={heading.id === activeId}
							style={`margin-left: ${(heading.level - 2) * 1.5}rem;`}
						>
							{capitalize(
								data.meta.title.toLocaleLowerCase() === 'changelog'
									? capitalize($t('docs.summary.version')) + ' ' + heading.text.split(' - ')[0]
									: heading.text
							)}
						</ListItem>
					{/if}
				{/each}
			</List>
		</Card>
	</aside>
</div>

<style>
</style>
