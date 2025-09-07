<script lang="ts">
	import { getAssets } from '$lib/internal/core/actions/assets.svelte.js';
	import { clickOutside } from '$lib/internal/helpers/outside.js';
	import { getPositions } from '$lib/internal/core/actions/popover.svelte.js';
	import type { PopoverProps, ModelPopoverProps } from './types.js';

	let {
		open = $bindable(),
		children,
		activator,
		dark,
		light,
		rounded,
		position,
		color,
		background,
		...rest
	}: PopoverProps = $props();

	const positionAxis = getPositions();
	const assets = getAssets();

	let ref: HTMLElement | null = $state(null);
	let refActivator: HTMLElement | null = $state(null);
	let axis = $state({ x: 0, y: 0 });
	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let scrollX = $state(0);
	let scrollY = $state(0);

	axis = positionAxis?.values;

	let model: ModelPopoverProps = {
		toggle: (element) => handleToggle(element)
	};

	const handleToggle = (element: HTMLElement | null) => {
		if (element === null) return;
		refActivator = element;
		open = !open;
	};

	$effect(() => {
		if (
			open &&
			ref &&
			refActivator &&
			(scrollX > 0 || scrollY > 0 || innerHeight > 0 || innerWidth > 0)
		) {
			positionAxis.update(refActivator, ref, position);
		}
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollX bind:scrollY />

{@render activator?.(model)}

{#if open}
	<div
		bind:this={ref}
		{...rest}
		role="menu"
		class={['kit-popover-content', light && 'light', dark && 'dark', rest.class]}
		style={`transform: translate(${axis.x}px, ${axis.y}px);`}
		style:--popover-background={assets.color(background)}
		style:--popover-color={assets.color(color)}
		style:--popover-shape={assets.shape(rounded)}
		use:clickOutside={{ exclude: [ref, refActivator], onClose: () => (open = false) }}
	>
		{@render children?.()}
	</div>
{/if}
