<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { SeparatorProps } from './types.js';

	let {
		is = 'hr',
		light,
		dark,
		inset,
		thickness,
		orientation = 'horizontal',
		opacity,
		color,
		...rest
	}: SeparatorProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	{...rest}
	class={[
		'kit-separator',
		light && 'light',
		dark && 'dark',
		inset && 'kit-separator--inset',
		orientation && assets.className('separator', 'orientation', orientation),
		rest.class
	]}
	aria-orientation={orientation}
	role="separator"
	style:--base={assets.color(color)}
	style:--opacity={opacity}
	style:--border-top-width={orientation === 'horizontal' ? assets.unit(thickness) : undefined}
	style:--border-right-width={orientation === 'vertical' ? assets.unit(thickness) : undefined}
/>

<style>
	@import './separator.css';
</style>
