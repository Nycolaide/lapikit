<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { updateThemeStore } from '$lib/stores/index.js';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	$effect.pre(() => {
		if (!BROWSER) return;
		const local = localStorage.getItem('@lapikit/theme');
		if (local !== null) updateThemeStore(local as 'dark' | 'light' | 'auto');
	});
</script>

{@render children?.()}
