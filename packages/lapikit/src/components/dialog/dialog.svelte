<script lang="ts">
	import { disabledScroll } from '$lib/internal/helpers/scroll.js';
	import { getAssets } from '$lib/internal/core/assets.svelte.js';
	import type { DialogProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		open = $bindable(),
		dark,
		light,
		classContent,
		color,
		background,
		size = 'md',
		persistent,
		position = 'center',
		rounded,
		density = 'default',
		...rest
	}: DialogProps = $props();

	const assets = getAssets();

	$effect(() => {
		if (ref && open) ref.showModal();
		if (ref && !open) ref.close();
		disabledScroll(open ? true : false);
	});
</script>

<dialog
	bind:this={ref}
	class={[
		'kit-dialog',
		persistent && 'kit-dialog--persistent',
		size && assets.className('dialog', 'size', size),
		position && assets.className('dialog', 'position', position),
		rest.class
	]}
	onclose={() => (!persistent ? (open = false) : null)}
	onclick={(event: MouseEvent) => {
		if (event.target === ref) {
			if (!persistent) ref.close();
		}
	}}
>
	<!-- surcharge-dialog autofocus-action-element -->
	<button type="button" class="close-dialog">close</button>
	<div
		{...rest}
		class={[
			'kit-dialog-container',
			light && 'light',
			dark && 'dark',
			classContent,
			density && assets.className('dialog-container', 'density', density),
			rest.class
		]}
		onclick={(event: MouseEvent) => event.stopPropagation()}
		style:--dialog-background={assets.color(background)}
		style:--dialog-color={assets.color(color)}
		style:--dialog-shape={assets.shape(rounded)}
	>
		{@render children?.()}
	</div>
</dialog>
