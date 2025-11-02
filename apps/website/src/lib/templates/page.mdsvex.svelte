<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	let props = $props();

	$effect(() => {
		console.log('Props data:', props);
	});
</script>

{props?.subtitle}
{props?.title}
{props?.description}

{@render props?.children?.()}
