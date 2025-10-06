<script lang="ts">
	const DOT_COUNT = 100;

	interface Dot {
		top: number;
		left: number;
		size: number;
		delay: number;
		duration: number;
	}

	const dots: Dot[] = Array.from({ length: DOT_COUNT }, () => ({
		top: Math.random() * 100,
		left: Math.random() * 100,
		size: 2 + Math.random() * 3,
		delay: Math.random() * 5,
		duration: 2 + Math.random() * 4
	}));
</script>

<div class="animated-dots">
	{#each dots as dot (dot)}
		<div
			class="dot"
			style="
        top: {dot.top}%;
        left: {dot.left}%;
        width: {dot.size}px;
        height: {dot.size}px;
        animation-delay: {dot.delay}s;
        animation-duration: {dot.duration}s;
      "
		></div>
	{/each}
</div>

<style>
	.animated-dots {
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: 0;
		pointer-events: none;
	}

	.dot {
		position: absolute;
		background: color-mix(in oklab, var(--kit-accent-primary) 80%, transparent);
		border-radius: 50%;
		opacity: 0;
		box-shadow: 0 0 6px color-mix(in oklab, var(--kit-accent-primary) 80%, transparent);
		animation-name: blink;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 0;
			transform: scale(0.8);
		}
		50% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
