<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import type { AvatarProps } from './types.js';
	let {
		children,
		ref = $bindable(),
		light,
		dark,
		size = 'md',
		rounded,
		alt,
		background,
		color,
		image,
		variant,
		density = 'default',
		...rest
	}: AvatarProps = $props();

	const assets = getAssets();
</script>

<svelte:element
	this={'div'}
	bind:this={ref}
	{...rest}
	class={[
		'kit-avatar',
		light && 'light',
		dark && 'dark',
		image && 'kit-avatar--image',
		size && assets.className('avatar', 'size', size),
		variant && assets.className('avatar', 'variant', variant),
		density && assets.className('avatar', 'density', density),
		rest.class
	]}
	style:--base={assets.color(background)}
	style:--on={assets.color(color)}
	style:--shape={assets.shape(rounded)}
>
	{#if image}
		<img src={image} {alt} />
	{:else}
		{@render children?.()}
	{/if}
</svelte:element>
