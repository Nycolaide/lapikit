<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { ToolbarProps } from './types.js';

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
	}: ToolbarProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	role="toolbar"
	class={[
		'kit-toolbar',
		light && 'light',
		dark && 'dark',
		variant && assets.className('toolbar', 'variant', variant),
		density && assets.className('toolbar', 'density', density),
		orientation && assets.className('toolbar', 'orientation', orientation),
		location && assets.className('toolbar', 'location', location),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	<div class={['kit-toolbar--wrapper', classContent]}>
		{@render children?.()}
	</div>
</svelte:element>
