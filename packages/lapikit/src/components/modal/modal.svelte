<script lang="ts">
	// import { disabledScroll } from '$lib/internal/index.js';
	// import { getAssets } from '$lib/internal/index.js';
	import type { ModalProps } from './types.js';

	let {
		children,
		ref = $bindable(),
		open = $bindable(),
		contain,
		// dark,
		// light,
		// classContent,
		// color,
		// background,
		// size = 'md',
		// persistent,
		// position = 'center',
		// rounded,
		// density = 'default',
		...rest
	}: ModalProps = $props();

	// const assets = getAssets();

	// $effect(() => {
	// 	if (ref && open) ref.showModal();
	// 	if (ref && !open) ref.close();
	// 	disabledScroll(open ? true : false);
	// });
</script>

{#if open}
	<div class={['kit-modal', contain && 'kit-modal--contain', rest.class]}>
		<div class="kit-modal-overlay">overlay</div>
		<div class="kit-modal-container">
			{@render children?.()}
		</div>
		<!-- surcharge-dialog autofocus-action-element -->
		<!-- <button type="button" class="close-dialog">close</button>
	<div
		{...rest}
		class={[
			'kit-modal-container',
			light && 'light',
			dark && 'dark',
			classContent,
			density && assets.className('dialog-container', 'density', density),
			rest.class
		]}
		onclick={(event: MouseEvent) => event.stopPropagation()}
		style:--base={assets.color(background)}
		style:--on={assets.color(color)}
		style:--shape={assets.shape(rounded)}
	>
		{@render children?.()}
	</div> -->
	</div>
{/if}
