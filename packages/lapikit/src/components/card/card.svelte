<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { CardProps } from './types.js';

	// external
	import { ripple } from '$lib/internal/ripple.js';

	let {
		children,
		ref = $bindable(),
		is = 'div',
		href,
		dark,
		light,
		active,
		density = 'default',
		variant = 'filled',
		disabled,
		rounded,
		color,
		background,
		noRipple,
		...rest
	}: CardProps = $props();

	const assets = getAssets();
	let isClickable: boolean = $state(false);

	$effect(() => {
		const refProps = { ...rest };
		if (href) is = 'a';
		if (refProps?.onclick || href || is === 'a') isClickable = true;
		else isClickable = false;
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
		isClickable && 'kit-card--clickable',
		active && 'kit-card--active',
		disabled && 'kit-card--disabled',
		rest.class
	]}
	disabled={href ? undefined : disabled}
	use:ripple={{
		component: 'card',
		disabled: noRipple || disabled || !isClickable
	}}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{@render children?.()}
</svelte:element>

<style>
	@import './card.css';
</style>
