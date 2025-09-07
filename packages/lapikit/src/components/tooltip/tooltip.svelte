<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import { getPositionsTooltip } from './tooltip.svelte.js';
	import type { PositionElement, TooltipProps } from './types.js';

	let {
		children,
		tooltip,
		open = $bindable(),
		label,
		dark,
		light,
		rounded,
		color,
		background,
		location = 'bottom',
		delayDuration = 850,
		density = 'default',
		variant,
		disabled,
		avoidCollisions = true,
		forceMount,
		...rest
	}: TooltipProps = $props();

	const positionAxis = getPositionsTooltip();
	const assets = getAssets();

	let ref: HTMLElement | null = $state(null);
	let refTooltip: HTMLElement | null = $state(null);
	let timer: ReturnType<typeof setTimeout> | null = $state(null);
	let axis: PositionElement = $state({ x: 0, y: 0, location: null });
	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let scrollX = $state(0);
	let scrollY = $state(0);

	axis = positionAxis?.values;

	$effect(() => {
		if (
			open &&
			ref &&
			refTooltip &&
			(scrollX > 0 || scrollY > 0 || innerHeight > 0 || innerWidth > 0)
		) {
			positionAxis.update(ref, refTooltip, location, true, avoidCollisions);
		}
	});

	$effect(() => {
		if (tooltip) forceMount = true;
	});

	const handleMouse = (state: string) => {
		if (disabled) return (open = false);
		if (state === 'enter') {
			timer = setTimeout(() => {
				open = true;
			}, delayDuration);
		} else if (state === 'leave') {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			open = false;
		}
	};
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollX bind:scrollY />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={ref}
	onmouseenter={() => handleMouse('enter')}
	onmouseleave={() => handleMouse('leave')}
	style:display="inline-flex"
>
	{@render children?.()}
</span>

{#if open || forceMount}
	<div
		bind:this={refTooltip}
		class={['kit-tooltip']}
		role="tooltip"
		aria-label={label}
		style={`transform: translate(${axis.x}px, ${axis.y}px);display: ${open ? 'initial' : 'none'}`}
	>
		<div
			class={[
				'kit-tooltip-content animate-in',
				light && 'light',
				dark && 'dark',
				rounded && assets.shape(rounded),
				axis?.location && `kit-tooltip-content--${axis?.location}`,
				variant && `kit-tooltip-content--${variant}`,
				density && assets.className('tooltip-content', 'density', density),
				rest.class
			]}
			style:--tooltip-background={assets.color(background)}
			style:--tooltip-color={assets.color(color)}
			style:--tooltip-shape={assets.shape(rounded)}
		>
			{#if tooltip}
				{@render tooltip?.()}
			{:else}
				{label}
			{/if}
		</div>
	</div>
{/if}
