<script lang="ts" module>
	import { img, blockquote } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote };
</script>

<script lang="ts">
	let props = $props();
</script>

<span>mdsvex template</span>
{@render props.children?.()}
