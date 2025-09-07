<script lang="ts">
	let { is = 'div', children, active, ...rest } = $props();
</script>

<svelte:element
	this={is}
	{...rest}
	class={['bottom-navigation-item', active && 'bottom-navigation--active', rest.class]}
>
	{@render children?.()}
</svelte:element>

<style>
	.bottom-navigation-item {
		display: grid;
		justify-content: center;
		gap: 2px;
		font-size: 0.8rem;
		color: var(--system-label);
		cursor: pointer;
		text-align: center;
	}

	.bottom-navigation-item :global(.kit-icon) {
		width: fit-content;
		margin: 0 auto;
		padding: 4px 12px;
		border-radius: 20px;
	}

	.bottom-navigation-item.bottom-navigation--active {
		color: var(--kit-secondary-label);
	}

	.bottom-navigation-item.bottom-navigation--active :global(.kit-icon) {
		color: var(--kit-secondary-label);
		background-color: var(--system-secondary-background);
	}
</style>
