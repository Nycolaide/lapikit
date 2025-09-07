<script lang="ts">
	import { getAssets } from '$lib/internal/core/assets.svelte.js';
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
		rounded,
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
	style:--accordion-shape={assets.shape(rounded)}
	style:--accordion-background={assets.color(background)}
	style:--accordion-color={assets.color(color)}
>
	{@render children?.()}
</svelte:element>
