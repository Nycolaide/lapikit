<script lang="ts">
	const BROWSER = typeof window !== 'undefined';
	import { useTheme } from '$lib/actions/use-theme.js';
	import { modalOpen, setOpenModal } from '$lib/stores/components.js';

	import { viewport } from '$lib/stores/viewport.js';
	import type { AppProps } from './types.js';

	let {
		ref = $bindable(),
		children,
		themes,
		storageKey = '@lapikit/theme',
		light,
		dark,
		...rest
	}: AppProps = $props();

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

		// Met à jour le store viewport à l'init et sur resize
		function updateViewport() {
			viewport.set({
				innerWidth: window.innerWidth,
				outerWidth: window.outerWidth,
				innerHeight: window.innerHeight,
				outerHeight: window.outerHeight
			});
		}
		updateViewport();
		window.addEventListener('resize', updateViewport);
		return () => {
			window.removeEventListener('resize', updateViewport);
		};
	});
</script>

<div
	id="kit-app"
	bind:this={ref}
	{...rest}
	class={[
		'kit-application',
		light && 'light',
		dark && 'dark',
		light && 'kit-theme--light',
		dark && 'kit-theme--dark',
		rest.class
	]}
>
	{@render children?.()}

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	{#if $modalOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class={['kit-overlay', $modalOpen === 'persistent' && 'kit-overlay--persistent']}
			onclick={() => $modalOpen !== 'persistent' && setOpenModal(false)}
		></div>
	{/if}
</div>
