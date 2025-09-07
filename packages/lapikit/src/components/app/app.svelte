<script lang="ts">
	import { BROWSER } from 'esm-env';
	import type { Snippet } from 'svelte';
	import { useTheme } from '$lib/stores/themes.js';
	import { modalOpen, setOpenModal } from '$lib/stores/components.js';

	let {
		children,
		themes,
		storageKey = '@lapikit/theme'
	}: { children: Snippet; themes?: string | string[]; storageKey?: string } = $props();

	$effect.pre(() => {
		if (!BROWSER) return;
		const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
		const localTheme = localStorage.getItem(storageKey);

		if (localTheme) {
			useTheme(localTheme);
		} else if (colorScheme) {
			if (typeof themes === 'string') {
				useTheme(themes);
			} else if (typeof themes === 'object' && Array.isArray(themes)) {
				if (colorScheme === 'dark') useTheme(themes[1] ?? themes[0]);
				else useTheme(themes[0]);
			} else {
				useTheme(colorScheme);
			}
		}
	});
</script>

{@render children?.()}

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={['kit-overlay', $modalOpen === 'persistent' && 'kit-overlay--persistent']}
		onclick={() => $modalOpen !== 'persistent' && setOpenModal(false)}
	></div>
{/if}
