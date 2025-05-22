<script lang="ts">
	let { children, ...rest } = $props();
</script>

<div {...rest} id="bottom-navigation" class="display-mobile">
	<div>
		{@render children?.()}
	</div>
</div>

<style>
	#bottom-navigation {
		background-color: var(--kit-surface-container);
		height: 5rem;
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	#bottom-navigation > :global(div) {
		display: grid;
		grid-auto-flow: column;
		justify-content: center;
		gap: 10px;
		font-size: 0.8rem;
		max-width: 40rem;
		margin: 0 auto;
		padding-top: 0.5rem;
	}
</style>
