<script lang="ts">
	import { scrollAnimation } from '../../animations';

	// Drag and drop functionality
	let isDragging = $state<boolean>(false);
	let dragPosition = $state<number>(50); // position %
	let containerRef = $state<HTMLDivElement>();

	function handleMouseDown(event: MouseEvent): void {
		isDragging = true;
		updatePosition(event);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent): void {
		if (isDragging) {
			updatePosition(event);
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function updatePosition(event: MouseEvent): void {
		if (containerRef) {
			const rect: DOMRect = containerRef.getBoundingClientRect();
			const x: number = event.clientX - rect.left;
			const percentage: number = Math.max(0, Math.min(100, (x / rect.width) * 100));
			dragPosition = percentage;
		}
	}

	// Touch events mobile
	function handleTouchStart(event: TouchEvent): void {
		isDragging = true;
		updateTouchPosition(event);
	}

	function handleTouchMove(event: TouchEvent): void {
		if (isDragging) {
			event.preventDefault();
			updateTouchPosition(event);
		}
	}

	function handleTouchEnd(): void {
		isDragging = false;
	}

	function updateTouchPosition(event: TouchEvent): void {
		if (containerRef) {
			const rect: DOMRect = containerRef.getBoundingClientRect();
			const x: number = event.touches[0].clientX - rect.left;
			const percentage: number = Math.max(0, Math.min(100, (x / rect.width) * 100));
			dragPosition = percentage;
		}
	}

	import CarrotMailLight from '$lib/images/home/compar/carrot-mail-light.webp?enhanced';
	import CarrotMailDark from '$lib/images/home/compar/carrot-mail-dark.webp?enhanced';
</script>

<div id="hero-media-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
	<div
		class="container-drag-drop-hero rounded-lg"
		bind:this={containerRef}
		onmousedown={handleMouseDown}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		role="slider"
		aria-label="Drag to compare images"
		aria-valuemin="0"
		aria-valuemax="100"
		aria-valuenow={dragPosition}
		tabindex="0"
	>
		<div class="image-background">
			<!-- <img src="/images/material-cover.png" alt="Material cover preview" /> -->
			<enhanced:img src={CarrotMailDark} alt="star on lapikit logo" />
		</div>

		<div class="image-overlay" style="clip-path: inset(0 {100 - dragPosition}% 0 0);">
			<enhanced:img src={CarrotMailLight} alt="star on lapikit logo" />
		</div>

		<div class="drag-handle" class:dragging={isDragging} style="left: {dragPosition}%;">
			<div class="drag-handle-line"></div>
			<div class="drag-handle-circle">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<circle cx="10" cy="10" r="8" fill="white" stroke="#666" stroke-width="1" />
					<path
						d="M7 10L10 7L13 10M7 10L10 13L13 10"
						stroke="#666"
						stroke-width="1.5"
						fill="none"
					/>
				</svg>
			</div>
		</div>
	</div>
</div>

<style>
	#hero-media-lapikit {
		display: flex;
		width: 100%;
		max-width: 1272px;
		margin: 0 auto;
		position: relative;
		height: 100%;
		border-radius: 30px;
		overflow: hidden;
	}

	.container-drag-drop-hero {
		position: relative;
		z-index: 1;
		width: 100%;
		height: auto;
		cursor: grab;
		user-select: none;
		overflow: hidden;
		/* border-radius: 30px; */
	}

	.container-drag-drop-hero:active {
		cursor: grabbing;
	}

	.image-background,
	.image-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.image-background {
		z-index: 1;
		/* border: 3px solid var(--kit-background-primary); */
	}

	.image-overlay {
		z-index: 2;
		overflow: hidden;
	}

	.image-background :global(img),
	.image-overlay :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: var(--radius-effect);
		display: block;
	}

	/* first picture */
	.container-drag-drop-hero::before {
		content: '';
		display: block;
		padding-bottom: 56.25%; /* Ratio 16:9*/
		width: 100%;
	}

	.drag-handle {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		z-index: 10;
		pointer-events: none;
		transform: translateX(-50%);
	}

	.drag-handle-line {
		width: 2px;
		height: 100%;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}

	.drag-handle-circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		pointer-events: auto;
		cursor: grab;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.drag-handle-circle:hover {
		transform: translate(-50%, -50%) scale(1.1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}

	.drag-handle.dragging .drag-handle-circle {
		cursor: grabbing;
		transform: translate(-50%, -50%) scale(1.2);
		box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
	}

	@property --gradient-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes rotation {
		0% {
			--gradient-angle: 0deg;
		}
		100% {
			--gradient-angle: 360deg;
		}
	}

	/* animate drag */
	.image-overlay {
		transition: clip-path 0.1s ease;
	}

	.container-drag-drop-hero:not(.dragging) .image-overlay {
		transition: clip-path 0.3s ease;
	}
</style>
