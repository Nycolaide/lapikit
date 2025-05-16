<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import type { AccordionProps } from './types.js';

	let {
		ref = $bindable(),
		children,
		is = 'div',
		dark,
		light,
		color,
		background,
		spacer,
		hideIcon,
		...rest
	}: AccordionProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-accordion',
		spacer && 'kit-accordion--spacer',
		hideIcon && 'kit-accordion--hide-icon',
		light && 'light',
		dark && 'dark',
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
>
	{@render children?.()}
</svelte:element>
