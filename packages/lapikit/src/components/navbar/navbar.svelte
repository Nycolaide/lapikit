<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { NavbarProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		classContent,
		light,
		dark,
		variant,
		rounded,
		background,
		color,
		density = 'default',
		orientation = 'horizontal',
		location,
		...rest
	}: NavbarProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	role="navigation"
	class={[
		'kit-navbar',
		light && 'light',
		dark && 'dark',
		variant && assets.className('navbar', 'variant', variant),
		density && assets.className('navbar', 'density', density),
		orientation && assets.className('navbar', 'orientation', orientation),
		location && assets.className('navbar', 'location', location),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	<div class={['kit-navbar--wrapper', classContent]}>
		{@render children?.()}
	</div>
</svelte:element>
