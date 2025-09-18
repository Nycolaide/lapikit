<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement | null = null;
	let pulseEl: HTMLDivElement | null = null;

	let x = 0,
		y = 0;
	let targetX = 0,
		targetY = 0;

	let isPointer = false;
	let pulsePlaying = false;
	let color = 'black';

	function isClickable(el: Element | null) {
		if (!el) return false;
		const tag = el.tagName.toLowerCase();
		if (['a', 'button', 'input', 'select', 'textarea'].includes(tag)) return true;
		if (el.getAttribute('role') === 'button') return true;
		if (el.closest('a,button,[role="button"],[onclick],input,select,textarea')) return true;
		return false;
		// const style = getComputedStyle(el as Element);
		// return style.cursor === 'none';
	}

	function isDark(rgb: string) {
		const match = rgb.match(/\d+/g);
		if (!match) return false;
		const [r, g, b] = match.map(Number);
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		return luminance < 128;
	}

	function handlePointerMove(e: PointerEvent) {
		targetX = e.clientX;
		targetY = e.clientY;

		const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
		const newIsPointer = isClickable(el);

		if (newIsPointer) {
			if (!isPointer || el !== pulseEl) {
				pulsePlaying = false;
				void pulseEl?.offsetWidth;
				pulsePlaying = true;
			}
			cursor?.style.setProperty('--dot-size', '22px');
			cursor?.style.setProperty('cursor', 'none');
		} else {
			cursor?.style.setProperty('--dot-size', '12px');
			cursor?.style.setProperty('cursor', 'none');
		}
		isPointer = newIsPointer;

		if (el) {
			const style = getComputedStyle(el);
			const bg = style.backgroundColor;
			if (bg) {
				color = isDark(bg) ? 'white' : 'black';
				cursor?.style.setProperty('--c', color);
			}
		}
	}

	onMount(() => {
		window.addEventListener('pointermove', handlePointerMove, { passive: true });

		const animate = () => {
			x += (targetX - x) * 0.18;
			y += (targetY - y) * 0.18;
			if (cursor) {
				cursor.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) translate(-50%, -50%)`;
			}
			requestAnimationFrame(animate);
		};
		animate();

		return () => {
			window.removeEventListener('pointermove', handlePointerMove);
		};
	});
</script>

<div class="cursor" bind:this={cursor} style="--c: {color};">
	<div class="cursor__dot"></div>
	<div class="cursor__pulse" class:play={pulsePlaying} bind:this={pulseEl}></div>
</div>

<style>
	:global(html, body, *) {
		cursor: none !important;
	}

	:root {
		--c: black;
		--dot-size: 12px;
	}

	.cursor {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--dot-size);
		height: var(--dot-size);
		pointer-events: none;
		z-index: 99999;
		mix-blend-mode: difference;
		transform: translate(-50%, -50%);
		will-change: transform;
		cursor: none !important;
	}

	.cursor__dot {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: var(--c);
		transition:
			background-color 160ms linear,
			width 120ms ease,
			height 120ms ease;
	}

	.cursor__pulse {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(var(--dot-size) * 2.6);
		height: calc(var(--dot-size) * 2.6);
		transform: translate(-50%, -50%) scale(0.9);
		border-radius: 50%;
		background: var(--c);
		opacity: 0;
		pointer-events: none;
	}

	.cursor__pulse.play {
		animation: pulse 420ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
	}

	@keyframes pulse {
		0% {
			opacity: 0.32;
			transform: translate(-50%, -50%) scale(0.6);
		}
		50% {
			opacity: 0.16;
			transform: translate(-50%, -50%) scale(1.45);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(1.9);
		}
	}
</style>
