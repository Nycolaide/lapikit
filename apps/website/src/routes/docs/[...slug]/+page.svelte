<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { Card, Icon, List, ListItem, Separator } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { Footer } from '$lib/components/index.js';

	let { data } = $props();

	// states
	let activeId: string = $state('');
	let specificPage = $state(['changelog']);

	$effect(() => {
		console.log('data', data);
	});

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

<div class="grid pt-16 pr-4 pb-6 pl-4 md:pl-0 xl:grid-cols-[1fr_220px]">
	<div>
		<div class="markdown mx-auto w-full min-w-0 md:max-w-[760px]">
			<data.content />
		</div>

		<Footer />
	</div>
	<aside class="max-xl:hidden">
		<Card class="sticky top-[4.5rem]">
			<List size="xs" density="compact">
				<ListItem>
					{#snippet append()}
						<Icon icon="mgc_tornado_2_line" />
						{capitalize($t('docs.summary.title'))}
					{/snippet}
				</ListItem>

				<Separator class="my-1" />

				{#each data.meta.headings as heading (heading)}
					{#if !specificPage.includes(data.meta.title) && heading.level >= 2 && heading.level <= 4}
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
							{capitalize(heading.text)}
						</ListItem>
					{/if}
				{/each}
			</List>
		</Card>
	</aside>
</div>

<style>
	.markdown {
		:global(h2) {
			margin-top: calc(var(--kit-spacing) * 24);
			font-size: 27px;
			font-weight: var(--font-weight-semibold);
		}

		:global(h3) {
			margin-top: calc(var(--kit-spacing) * 24);
			font-size: var(--text-xl);
			font-weight: var(--font-weight-semibold);
		}

		:global(p) {
			margin-top: calc(var(--kit-spacing) * 12);
			line-height: calc(var(--kit-spacing) * 14);
		}

		:global(img) {
			margin-top: calc(var(--kit-spacing) * 12);
			margin-bottom: calc(var(--kit-spacing) * -12);
		}

		:global(ul) {
			list-style-type: disc;
			margin-left: calc(var(--kit-spacing) * 12);
			margin-block: calc(var(--kit-spacing) * 8);
		}

		:global(ul > li) {
			line-height: calc(var(--kit-spacing) * 14);
			margin-top: calc(var(--kit-spacing) * 5);
		}

		:global(a) {
			text-underline-offset: 4px;
			text-decoration-line: underline;
			font-weight: 500;
		}
	}
</style>
