<script lang="ts">
	import { getAssets } from '$lib/internal/core/actions/assets.svelte.js';
	import type { ButtonProps } from './types.js';

	// external
	import { Icon } from '../index.js';
	import LoadingFill from '$lib/assets/icons/loading-fill.svelte';
	import { ripple } from '$lib/internal/core/animations/ripple.js';

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
		variant = 'filled',
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
		noRipple,
		...rest
	}: ButtonProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={href ? 'a' : is}
	bind:this={ref}
	{...rest}
	href={href && !disabled ? href : undefined}
	class={[
		'kit-button',
		light && 'light',
		dark && 'dark',
		size && assets.className('button', 'size', size),
		variant && assets.className('button', 'variant', variant),
		density && assets.className('button', 'density', density),
		error && 'kit-button--error',
		info && 'kit-button--info',
		success && 'kit-button--success',
		warning && 'kit-button--warning',
		disabled && 'kit-button--disabled',
		active && 'kit-button--active',
		loading && 'kit-button--loading',
		icon && 'kit-button--icon',
		rest.class
	]}
	tabindex={href && disabled ? -1 : 0}
	disabled={href ? undefined : disabled}
	type={href ? undefined : type}
	use:ripple={{
		component: 'button',
		disabled: noRipple || disabled
	}}
	style:--button-background={assets.color(background)}
	style:--button-color={assets.color(color)}
	style:--button-shape={assets.shape(rounded)}
>
	{#if loading}
		<div class="kit-button-loading">
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
		<div class="kit-button-prepend">
			{@render prepend?.()}
		</div>
	{/if}

	<div class="kit-button-content">
		{@render children?.()}
	</div>

	{#if append}
		<div class="kit-button-append">
			{@render append?.()}
		</div>
	{/if}
</svelte:element>
