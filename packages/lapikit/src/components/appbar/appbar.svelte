<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { AppbarProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'header',
		classContent,
		light,
		dark,
		rounded,
		background,
		color,
		density = 'default',
		...rest
	}: AppbarProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-appbar',
		light && 'light',
		dark && 'dark',
		density && assets.className('appbar', 'density', density),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	<div class={['kit-appbar--wrapper', classContent]}>
		{@render children?.()}
	</div>
</svelte:element>
