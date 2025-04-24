<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	let props = $props();
</script>

<span>mdsvex template</span>
{@render props.children?.()}
