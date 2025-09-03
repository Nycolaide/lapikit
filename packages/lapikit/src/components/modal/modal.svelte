<script lang="ts">
	// import { disabledScroll } from '$lib/internal/index.js';
	import { getAssets } from '$lib/internal/index.js';
	import { modalOpen, modalStack, popModal, pushModal, setOpenModal } from '$lib/stores/index.js';
	import { onDestroy } from 'svelte';
	import type { ModalProps } from './types.js';
	import { get } from 'svelte/store';

	const modalId = crypto.randomUUID();
	let wasPushed = $state(false);

	let {
		children,
		ref = $bindable(),
		open = $bindable(),
		contain,
		size = 'md',
		persistent,
		dark,
		light,
		classContent,
		color,
		background,
		position = 'center',
		rounded,
		density = 'default',
		closeWithEsc,
		...rest
	}: ModalProps = $props();

	const assets = getAssets();

	$effect(() => {
		if (open && !wasPushed) {
			pushModal(modalId);
			wasPushed = true;
		} else if (!open && wasPushed) {
			popModal(modalId);
			wasPushed = false;
		}
	});

	onDestroy(() => {
		if (wasPushed) popModal(modalId);
	});

	$effect(() => {
		if (open !== undefined && !contain)
			setOpenModal(open ? (persistent ? 'persistent' : open) : open);
	});

	$effect(() => {
		if ($modalOpen === false && !contain) open = false;
	});

	$effect(() => {
		if (!closeWithEsc || persistent || !open) return;

		const onKeyDown = (event: KeyboardEvent) => {
			const stack = get(modalStack);
			const isTop = stack[stack.length - 1] === modalId;

			if (event.key === 'Escape' && isTop) {
				event.preventDefault();
				open = false;
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	});

	const handleClose = () => {
		if (!persistent) open = false;
	};
</script>

{#if open}
	<div
		bind:this={ref}
		{...rest}
		class={['kit-modal', contain && 'kit-modal--contain', rest.class]}
		role="dialog"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		{#if contain}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class={['kit-overlay', persistent && 'kit-overlay--persistent']}
				onclick={() => handleClose()}
			></div>
		{/if}

		<div
			class={[
				'kit-modal-container',
				classContent,
				light && 'light',
				dark && 'dark',
				size && assets.className('modal-container', 'size', size),
				density && assets.className('modal-container', 'density', density),
				position && assets.className('modal-container', 'position', position)
			]}
			style:--base={assets.color(background)}
			style:--on={assets.color(color)}
			style:--shape={assets.shape(rounded)}
		>
			{@render children?.()}
		</div>
	</div>
{/if}

<style>
	@import './modal.css';
</style>
