<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { ListProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		dark,
		light,
		background,
		color,
		rounded,
		size = 'md',
		density = 'default',
		variant = 'filled',
		nav,
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
		size && assets.className('list', 'size', size),
		variant && assets.className('list', 'variant', variant),
		density && assets.className('list', 'density', density),
		nav && 'kit-list--nav',
		rest.class
	]}
	role="listbox"
	style:--list-background={assets.color(background)}
	style:--list-color={assets.color(color)}
	style:--list-shape={assets.shape(rounded)}
>
	{@render children?.()}
</svelte:element>
