<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import type { AlertProps } from './types.js';

	// components
	import Icon from '../icon/icon.svelte';

	//  assets
	import Close from '../../assets/icons/close-fill.svelte';

	let {
		children,
		append,
		prepend,
		close,
		ref = $bindable(),
		open = $bindable(true),
		is = 'div',
		light,
		dark,
		variant,
		density = 'default',
		rounded,
		warning,
		info,
		success,
		error,
		closable,
		color,
		background,
		...rest
	}: AlertProps = $props();

	const assets = getAssets();
</script>

{#if !closable || (open && closable)}
	<svelte:element
		this={is}
		{...rest}
		class={[
			'kit-alert',
			light && 'light',
			dark && 'dark',
			variant && assets.className('alert', 'variant', variant),
			density && assets.className('alert', 'density', density),
			warning && 'kit-alert--warning',
			info && 'kit-alert--info',
			success && 'kit-alert--success',
			error && 'kit-alert--error',
			rest.class
		]}
		role="alert"
		style:--alert-background={assets.color(background)}
		style:--alert-color={assets.color(color)}
		style:--alert-shape={assets.shape(rounded)}
	>
		{#if prepend}
			<div class="kit-alert--prepend">
				{@render prepend?.()}
			</div>
		{/if}
		<span class="kit-alert--content">
			{@render children?.()}
		</span>
		{#if append}
			<div class="kit-alert--append">
				{@render append?.()}
			</div>
		{/if}

		{#if closable}
			<button
				class="kit-alert--close"
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
