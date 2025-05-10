<script lang="ts">
	import { disabledScroll } from '$lib/internal/index.js';
	import { getAssets } from '$lib/internal/index.js';
	import type { DialogProps } from './types.js';

	let {
		children,
		open = $bindable(),
		dark,
		light,
		classContent,
		color,
		background,
		size = 'md',
		persistent,
		fullscreen,
		position = 'center',
		closeWithEsc,
		rounded,
		...rest
	}: DialogProps = $props();

	const assets = getAssets();

	let ref: HTMLDialogElement;

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
		fullscreen && 'kit-dialog--fullscreen',
		size && assets.className('dialog', 'size', size),
		position && assets.className('dialog', 'position', position),
		rest.class
	]}
	onclose={() => (!persistent ? (open = false) : null)}
	onkeydown={(event: KeyboardEvent) => {
		if (!persistent && event.key === 'Escape' && closeWithEsc) {
			event.preventDefault();
			open = false;
		}
	}}
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
		class={['kit-dialog-container', light && 'light', dark && 'dark', classContent, rest.class]}
		onclick={(event: MouseEvent) => event.stopPropagation()}
		style:--base={assets.color(background)}
		style:--on={assets.color(color)}
		style:--shape={assets.shape(rounded)}
	>
		{@render children?.()}
	</div>
</dialog>
