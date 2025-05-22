<script lang="ts">
	let { children, ...rest } = $props();
</script>

<div {...rest} id="bottom-navigation">
	{@render children?.()}
</div>

<style>
	#bottom-navigation {
		background-color: red;
	}
</style>
