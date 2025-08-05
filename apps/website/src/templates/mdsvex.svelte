<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	import Head from '$lib/components/head.svelte';
	import { capitalize } from 'site-kit/actions';
	let props = $props();
</script>

<Head
	title={props?.head?.title && capitalize(props.head.title)}
	description={props?.head?.description && capitalize(props.head.description)}
/>

{#if props?.subtitle}
	<h1 class="title">{capitalize(props?.subtitle)}</h1>
{/if}
{#if props?.title}
	<p class="subtitle">{capitalize(props?.title)}</p>
{/if}
{#if props?.description}
	<p class="description">{capitalize(props?.description)}</p>
{/if}

{@render props?.children?.()}

<style>
	h1.title {
		color: color-mix(in oklab, var(--kit-on-base) 40%, transparent);
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.subtitle {
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-5xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.description {
		margin-top: calc(var(--kit-spacing) * 6) !important;
		font-size: 21px;
		line-height: calc(var(--kit-spacing) * 14) !important;
		font-weight: var(--font-weight-semibold);
		text-wrap: balance;
		color: color-mix(in oklab, var(--kit-on-base) 70%, transparent);
	}
</style>
