<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import { Icon } from '../index.js';
	import type { ChipProps } from './types.js';

	// external
	import LoadingFill from '$lib/assets/icons/loading-fill.svelte';
	import Close from '../../assets/icons/close-fill.svelte';
	import { ripple } from '$lib/internal/ripple.js';

	let {
		children,
		load,
		close,
		append,
		prepend,
		ref = $bindable(),
		open = $bindable(true),
		is = 'div',
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
		type,
		background,
		color,
		label,
		loading,
		rounded,
		closable,
		noRipple,
		...rest
	}: ChipProps = $props();

	const assets = getAssets();

	$effect(() => {
		const refProps = { ...rest };
		if (refProps?.onclick) is = 'button';
	});
</script>

{#if !closable || (open && closable)}
	<svelte:element
		this={href ? 'a' : is}
		bind:this={ref}
		{...rest}
		href={href && !disabled ? href : undefined}
		class={[
			'kit-chip',
			light && 'light',
			dark && 'dark',
			size && assets.className('chip', 'size', size),
			variant && assets.className('chip', 'variant', variant),
			density && assets.className('chip', 'density', density),
			error && 'kit-chip--error',
			info && 'kit-chip--info',
			success && 'kit-chip--success',
			warning && 'kit-chip--warning',
			disabled && 'kit-chip--disabled',
			active && 'kit-chip--active',
			loading && 'kit-chip--loading',
			rest.class
		]}
		tabindex={href && disabled ? -1 : 0}
		aria-disabled={href ? disabled : undefined}
		aria-label={type !== 'button' ? label : undefined}
		disabled={href ? undefined : disabled}
		type={href ? undefined : type}
		use:ripple={{
			component: 'chip',
			disabled: noRipple || disabled || is === 'div' || is === 'span'
		}}
		style:--base={assets.color(background)}
		style:--on={assets.color(color)}
		style:--shape={assets.shape(rounded)}
	>
		{#if loading}
			<div class="kit-chip-loading">
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
			<div class="kit-chip-prepend">
				{@render prepend?.()}
			</div>
		{/if}
		<div class="kit-chip-content">
			{@render children?.()}
		</div>
		{#if append}
			<div class="kit-chip-append">
				{@render append?.()}
			</div>
		{/if}

		{#if closable}
			<button
				class="kit-chip--close"
				type="button"
				aria-label="close"
				onclick={() => (open = false)}
			>
				{#if close}
					{@render close?.()}
				{:else}
					<Icon>
						<Close />
					</Icon>
				{/if}
			</button>
		{/if}
	</svelte:element>
{/if}
