<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	let {
		headings = []
	}: {
		headings?: {
			id: string;
			text: string;
			level: number;
		}[];
	} = $props();

	// states
	let activeId: string = $state('');

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

		const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
		elements.forEach((el) => observer.observe(el!));

		return () => {
			elements.forEach((el) => observer.unobserve(el!));
		};
	});
</script>

<nav class="sticky top-[4rem] p-[1rem]">
	<p>{$t('summary.on-this-page')}</p>
	<ul>
		{#each headings as heading (heading)}
			<li class="level-{heading.level}">
				<a href={'#' + heading.id} class:selected={heading.id === activeId}>{heading.text}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav a.selected {
		font-weight: bold;
		color: var(--kit-primary);
	}
</style>
