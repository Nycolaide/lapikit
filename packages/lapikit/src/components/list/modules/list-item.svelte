<script lang="ts">
	import { getAssets } from '$lib/internal/index.js';
	import type { ListItemProps } from '../types.js';

	// external
	import { ripple } from '$lib/internal/ripple.js';

	let {
		children,
		append,
		prepend,
		ref = $bindable(),
		is = 'div',
		dark,
		light,
		background,
		color,
		rounded,
		disabled,
		active,
		href,
		noRipple,
		...rest
	}: ListItemProps = $props();

	const assets = getAssets();

	$effect(() => {
		const refProps = { ...rest };
		if (refProps?.onclick) is = 'button';
	});
</script>

<svelte:element
	this={href ? 'a' : is}
	bind:this={ref}
	{...rest}
	href={href && !disabled ? href : undefined}
	class={[
		'kit-list-item',
		light && 'light',
		dark && 'dark',
		append && 'kit-list-item--append',
		prepend && 'kit-list-item--prepend',
		active && 'kit-list-item--active',
		disabled && 'kit-list-item--disabled',
		rest.class
	]}
	use:ripple={{
		component: 'list-item',
		disabled: noRipple || disabled || is === 'div'
	}}
	role={is === 'button' ? 'listitem' : undefined}
	tabindex={href && disabled ? -2 : 0}
	aria-disabled={href ? disabled : undefined}
	disabled={href ? undefined : disabled}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{#if append}
		<div class="kit-list-item-content--append">
			{@render append?.()}
		</div>
	{/if}

	<div class="kit-list-item-content--content">
		{@render children?.()}
	</div>

	{#if prepend}
		<div class="kit-list-item-content--prepend">
			{@render prepend?.()}
		</div>
	{/if}
</svelte:element>
