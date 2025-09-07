<script lang="ts">
	import type { SandboxComponentProps } from './types';

	let { children }: SandboxComponentProps = $props();
</script>

<div class="relative flex min-h-[150px] items-center justify-center gap-2 overflow-auto p-2">
	{@render children?.()}
</div>

<style>
	div {
		--pattern-fg: color-mix(in oklab, var(--kit-label) 12%, transparent);
		--opacity-pattern: 50%;
		background-image: repeating-linear-gradient(
			315deg,
			var(--pattern-fg) 0,
			var(--pattern-fg) 1px,
			transparent 0,
			transparent var(--opacity-pattern)
		);
		background-size: 16px 16px;
		background-repeat: repeat;
		background-color: var(--kit-background);
	}
</style>
