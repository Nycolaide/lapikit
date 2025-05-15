<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { ListProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		dark,
		light,
		orientation = 'vertical',
		background,
		color,
		rounded,
		size = 'md',
		density = 'default',
		variant,
		...rest
	}: ListProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-list',
		light && 'light',
		dark && 'dark',
		orientation && assets.className('list', 'orientation', orientation),
		size && assets.className('list', 'size', size),
		variant && assets.className('list', 'variant', variant),
		density && assets.className('list', 'density', density),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{@render children?.()}
</svelte:element>
