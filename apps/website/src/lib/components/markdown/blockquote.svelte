<script lang="ts">
	let props = $props();
</script>

<span>mdsvex blockquote</span>
<blockquote>
	{@render props.children?.()}
</blockquote>
