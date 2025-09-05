<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import type { IconProps } from './types.js';
	let {
		children,
		ref = $bindable(),
		is = 'i',
		light,
		dark,
		icon,
		size = 'md',
		error,
		info,
		success,
		warning,
		disabled,
		alt,
		color,
		...rest
	}: IconProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={icon && icon.includes('/') ? 'div' : is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-icon',
		icon && !icon.includes('/') && icon,
		light && 'light',
		dark && 'dark',
		info && 'kit-icon--info',
		success && 'kit-icon--success',
		warning && 'kit-icon--warning',
		error && 'kit-icon--error',
		disabled && 'kit-icon--disabled',
		size && assets.className('icon', 'size', size),
		rest.class
	]}
	style:--icon-color={assets.color(color)}
>
	{#if icon && icon.includes('/')}
		<img src={icon} {alt} />
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>
