<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	import { capitalize } from 'site-kit/actions';
	let { children, title, description, ...rest } = $props();

	$effect(() => {
		console.log('mdsvex props', title, rest);
	});
</script>

{#if title}
	<h1 class="title">{capitalize(title)}</h1>
	<p class="description">{capitalize(description)}</p>
{/if}

{@render children?.()}

<style>
	.title {
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-5xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height));
	}

	.description {
		margin-top: calc(var(--kit-spacing) * 6);
		font-size: 21px;
		line-height: calc(var(--kit-spacing) * 14);
		font-weight: var(--font-weight-semibold);
		text-wrap: balance;
		color: color-mix(in oklab, var(--kit-on-base) 40%, transparent);
	}
</style>
