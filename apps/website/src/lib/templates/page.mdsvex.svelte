<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	import { capitalize } from 'site-kit/actions';

	let props = $props();
</script>

{#if props?.title}
	<p class="title opacity-75">{capitalize(props?.title)}</p>
{/if}
{#if props?.subtitle}
	<h1 class="subtitle mt-2!">{capitalize(props?.subtitle)}</h1>
{/if}
{#if props?.description}
	<p class="description">{props?.description}</p>
{/if}

{@render props?.children?.()}
