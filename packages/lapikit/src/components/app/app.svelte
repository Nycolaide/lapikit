<script lang="ts">
	import { BROWSER } from 'esm-env';
	import {
		colorSchemeSystem,
		modalOpen,
		setOpenModal,
		updateThemeStore,
		viewportWidth
	} from '$lib/stores/index.js';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();

	// states
	let innerWidth = $state(0);

	$effect(() => {
		if (BROWSER) {
			viewportWidth.set(innerWidth);
		}
	});

	$effect.pre(() => {
		if (!BROWSER) return;
		// system
		if (window.matchMedia) {
			colorSchemeSystem.set(
				window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
			);
		}

		// listener
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (event: MediaQueryListEvent) => {
				colorSchemeSystem.set(event.matches ? 'dark' : 'light');
			});

		// local
		const local = localStorage.getItem('@lapikit/theme');
		if (local !== null) updateThemeStore(local as 'dark' | 'light' | 'system');
	});
</script>

<svelte:window bind:innerWidth />

{@render children?.()}

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if $modalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class={['kit-overlay', $modalOpen === 'persistent' && 'kit-overlay--persistent']}
		onclick={() => $modalOpen !== 'persistent' && setOpenModal(false)}
	></div>
{/if}
