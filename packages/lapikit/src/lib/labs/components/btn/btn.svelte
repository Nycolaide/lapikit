<script lang="ts">
	let { children, ...rest } = $props();
</script>

<button class="kit-btn" {...rest}>
	{@render children()}
</button>

<style>
	.kit-btn {
		border: 1px solid rgb(0, 0, 0);
	}
</style>
