<script lang="ts">
	import { getAssets } from '$lib/internal/assets.svelte.js';
	import { clickOutside } from '$lib/internal/clickOutside.js';
	import { getPositions } from './dropdown.svelte.js';
	import type { DropdownProps, ModelDropdownProps } from './types.js';

	let {
		children,
		activator,
		dark,
		light,
		rounded,
		position,
		closeOnClick,
		openOnHover,
		color,
		background,
		...rest
	}: DropdownProps = $props();

	const positionAxis = getPositions();
	const assets = getAssets();

	let ref: HTMLElement | null = $state(null);
	let refActivator: HTMLElement | PointerEvent | null = $state(null);
	let open = $state(false);
	let axis = $state({ x: 0, y: 0 });
	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let scrollX = $state(0);
	let scrollY = $state(0);
	let timeoutId: ReturnType<typeof setTimeout> | null = $state(null);

	axis = positionAxis?.values;

	let model: ModelDropdownProps = {
		get open() {
			return open;
		},
		close: () => (open = false),
		toggle: (element) => handleToggle(element)
	};

	const handleToggle = (element: HTMLElement | PointerEvent | null) => {
		if (element === null) return;
		refActivator = element;
		open = !open;
	};

	const handleClose = () => {
		if (closeOnClick && open) open = false;
	};

	const handleMouseEvent = (
		state: 'open' | 'close',
		element: HTMLElement | PointerEvent | null
	) => {
		console.log();
		if (openOnHover && state === 'open') {
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
			refActivator = element;
			open = true;
		}

		if (openOnHover && state === 'close') {
			timeoutId = setTimeout(() => {
				open = false;
				timeoutId = null;
			}, 150);
		}
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

	$effect(() => {
		if (scrollX || scrollY) open = false;
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth bind:scrollX bind:scrollY />

{@render activator?.(model, (state, element) => handleMouseEvent(state, element))}

{#if open}
	<div
		bind:this={ref}
		{...rest}
		role="menu"
		class={['kit-dropdown-content', light && 'light', dark && 'dark', rest.class]}
		style={`transform: translate(${axis.x}px, ${axis.y}px);`}
		onmouseover={() => handleMouseEvent('open', refActivator)}
		onmouseleave={() => handleMouseEvent('close', refActivator)}
		onclick={(e) => {
			e.stopPropagation();
			handleClose();
		}}
		style:--base={assets.color(background)}
		style:--on={assets.color(color)}
		style:--shape={assets.shape(rounded)}
		use:clickOutside={{ exclude: [ref, refActivator], onClose: () => (open = false) }}
	>
		{@render children?.()}
	</div>
{/if}

<style>
	@import './dropdown.css';
</style>
