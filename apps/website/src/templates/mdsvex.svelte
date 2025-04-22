<script lang="ts" module>
	import { img } from '$lib/components';
	// eslint-disable-next-line no-import-assign
	export { img };
</script>

<script lang="ts">
	let props = $props();
</script>

<span>mdsvex template</span>
{@render props.children?.()}
