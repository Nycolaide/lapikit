<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { modalOpen, setOpenModal, updateThemeStore } from '$lib/stores/index.js';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	$effect.pre(() => {
		if (!BROWSER) return;
		const local = localStorage.getItem('@lapikit/theme');
		if (local !== null) updateThemeStore(local as 'dark' | 'light' | 'auto');
	});
</script>

{@render children?.()}

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={['kit-overlay', $modalOpen !== 'persistent' && 'kit-overlay--persistent']}
		onclick={() => $modalOpen !== 'persistent' && setOpenModal(false)}
	></div>
{/if}
