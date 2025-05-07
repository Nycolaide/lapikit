<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { BtnProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		is = 'button',
		href,
		dark,
		light,
		active,
		variant,
		error,
		info,
		success,
		warning,
		icon,
		density = 'default',
		disabled,
		size = 'md',
		type = 'button',
		background,
		color,
		...rest
	}: BtnProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={href ? 'a' : is}
	bind:this={ref}
	{...rest}
	href={href && !disabled ? href : undefined}
	class={[
		'kit-btn',
		light && 'light',
		dark && 'dark',
		size && assets.className('btn', 'size', size),
		variant && assets.className('btn', 'variant', variant),
		density && assets.className('btn', 'density', density),
		error && 'kit-btn--error',
		info && 'kit-btn--info',
		success && 'kit-btn--success',
		warning && 'kit-btn--warning',
		disabled && 'kit-btn--disabled',
		active && 'kit-btn--active',
		icon && 'kit-btn--icon',
		rest.class
	]}
	tabindex={href && disabled ? -1 : 0}
	aria-disabled={href ? disabled : undefined}
	disabled={href ? undefined : disabled}
	type={href ? undefined : type}
	style:--background-color={assets.color(background)}
	style:--color={assets.color(color)}
>
	{@render children?.()}
</svelte:element>
