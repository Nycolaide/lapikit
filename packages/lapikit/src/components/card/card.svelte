<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { CardProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		href,
		dark,
		light,
		active,
		density = 'default',
		variant,
		disabled,
		rounded,
		color,
		background,
		...rest
	}: CardProps = $props();

	const assets = getAssets();

	$effect(() => {
		if (href) is = 'a';
	});
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	href={href && !disabled ? href : undefined}
	class={[
		'kit-card',
		light && 'light',
		dark && 'dark',
		variant && assets.className('card', 'variant', variant),
		density && assets.className('card', 'density', density),
		active && 'kit-card--active',
		disabled && 'kit-card--disabled',
		rest.class
	]}
	disabled={href ? undefined : disabled}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{@render children?.()}
</svelte:element>
