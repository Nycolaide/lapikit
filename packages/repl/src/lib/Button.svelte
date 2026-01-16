<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, type = 'button', disabled = false, ...rest }: PropsTypeButton = $props();

	type PropsTypeButton = {
		children?: Snippet;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		[rest: string]: unknown;
	};
</script>

<button {type} {disabled} {...rest}>
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
		color: var(--kit-repl-secondary);
	}

	button:hover {
		color: var(--kit-repl-primary);
	}

	button :global(svg) {
		height: 20px;
		width: 20px;
	}
</style>
