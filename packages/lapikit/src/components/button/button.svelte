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
		density = 'default',
		disabled,
		size = 'md',
		type = 'button',
		background,
		color,
		label,
		loading,
		rounded,
		...rest
	}: BtnProps = $props();

	const assets = getAssets();

	$effect(() => {
		if (type === 'radio') is = 'input';
		if (type === 'checkbox') is = 'input';
		if (type === 'submit') is = 'input';
		if (type === 'reset') is = 'input';
	});
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
		loading && 'kit-btn--loading',
		rest.class
	]}
	tabindex={href && disabled ? -1 : 0}
	aria-disabled={href ? disabled : undefined}
	aria-label={type !== 'button' ? label : undefined}
	disabled={href ? undefined : disabled}
	type={href ? undefined : type}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{#if loading}
		<div class="kit-btn-loading">
			<div>loading ...</div>
		</div>
	{/if}

	{#if !label}
		<span class="kit-btn-content">
			{@render children?.()}
		</span>
	{/if}
</svelte:element>
