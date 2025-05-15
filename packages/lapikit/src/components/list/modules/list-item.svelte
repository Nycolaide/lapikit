<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { ListItemProps } from '../types.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		dark,
		light,
		background,
		color,
		rounded,
		...rest
	}: ListItemProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-list-item',
		light && 'light',
		dark && 'dark',
		// orientation && assets.className('list', 'orientation', orientation),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{@render children?.()}
</svelte:element>
