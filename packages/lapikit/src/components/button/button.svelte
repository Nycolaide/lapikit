<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import { Icon } from '../index.js';
	import type { BtnProps } from './types.js';

	// external
	import LoadingFill from '$lib/assets/icons/loading-fill.svelte';
	import { ripple } from '$lib/internal/ripple.js';

	let {
		children,
		prepend,
		append,
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
		loading,
		rounded,
		icon,
		load,
		...rest
	}: BtnProps = $props();

	const assets = getAssets();

	$effect(() => {
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
		icon && 'kit-btn--icon',
		rest.class
	]}
	tabindex={href && disabled ? -1 : 0}
	disabled={href ? undefined : disabled}
	type={href ? undefined : type}
	use:ripple
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{#if loading}
		<div class="kit-btn-loading">
			{#if load}
				{@render load?.()}
			{:else}
				<Icon class="kit-icon-load">
					<LoadingFill />
				</Icon>
			{/if}
		</div>
	{/if}

	{#if prepend}
		<span class="kit-btn-prepend">
			{@render prepend?.()}
		</span>
	{/if}

	<span class="kit-btn-content">
		{@render children?.()}
	</span>

	{#if append}
		<span class="kit-btn-append">
			{@render append?.()}
		</span>
	{/if}
</svelte:element>
