<script lang="ts">
	let { children, ...rest } = $props();
</script>

<button {...rest}>
	{@render children?.()}
</button>

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-self: center;
		justify-content: center;
		font-size: 0.875rem;
		border-radius: 0.375rem;
		transition: background-color 0.2s ease;
		padding: 8px;
		color: var(--repl-secondary);
	}

	button:hover {
		color: var(--repl-primary);
	}

	button :global(svg) {
		height: 20px;
		width: 20px;
	}
</style>
