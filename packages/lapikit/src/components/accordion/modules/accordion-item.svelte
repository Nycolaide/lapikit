<script lang="ts">
	import { getAssets } from '$lib/internal/core/assets.svelte.js';
	import type { AccordionItemProps, ModelAccordionItemProps } from '../types.js';

	// components
	import Icon from '../../icon/icon.svelte';

	//  assets
	import ArrowUp from '../../../assets/icons/arrow-up.svelte';
	import ArrowDown from '../../../assets/icons/arrow-down.svelte';

	let {
		activator,
		children,
		indicator,
		ref = $bindable(),
		text,
		is = 'div',
		dark,
		light,
		rounded,
		color,
		background,
		index,
		open,
		toggle,
		disabled,
		readOnly,
		...rest
	}: AccordionItemProps = $props();

	const assets = getAssets();

	let model: ModelAccordionItemProps = {
		get open() {
			return open !== undefined ? open : false;
		}
	};
</script>

<svelte:element
	this={is}
	bind:this={ref}
	{...rest}
	class={[
		'kit-accordion-item',
		light && 'light',
		dark && 'dark',
		open && 'kit-accordion-item--active',
		rest.class
	]}
	style:--accordion--item-shape={assets.shape(rounded)}
	style:--accordion--item-background={assets.color(background)}
	style:--accordion--item-color={assets.color(color)}
>
	<button
		class={[
			'kit-accordion-item--title',
			disabled && 'kit-accordion-item--disabled',
			dark && 'dark',
			open && 'kit-accordion-item--active',
			rest.class
		]}
		onclick={() => toggle && !readOnly && !disabled && toggle(index)}
		aria-expanded={open}
		type="button"
		{disabled}
	>
		{#if activator}
			{@render activator?.()}
		{:else}
			{text}
		{/if}

		<span class="kit-accordion-item--icon">
			{#if indicator}
				{@render indicator?.(model)}
			{:else if open}
				<Icon>
					<ArrowUp />
				</Icon>
			{:else}
				<Icon>
					<ArrowDown />
				</Icon>
			{/if}
		</span>
	</button>
	<div class="kit-accordion-item--text" style:display={!open ? 'none' : ''}>
		<div class="kit-accordion-item--text-wrapper">
			{@render children?.()}
		</div>
	</div>
</svelte:element>
