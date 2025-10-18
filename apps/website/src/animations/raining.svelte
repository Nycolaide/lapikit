<script>
	import { breakpoints, viewport } from 'lapikit/stores';

	// assets
	import Cloud from '$lib/images/assets/cloud-tempest.webp?enhanced';
	import Rain from '$lib/images/assets/rain.webp?enhanced';

	let { ...rest } = $props();

	// states
	let dropCount = $state(5);
	let fallHeight = $state(150);

	let drops = $derived(
		Array.from({ length: dropCount }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 2,
			duration: 1.5 + Math.random() * 1.5
		}))
	);

	$effect(() => {
		if ($viewport.innerWidth >= $breakpoints.lg) {
			fallHeight = 300;
			dropCount = 15;
		} else if ($viewport.innerWidth >= $breakpoints.sm) {
			fallHeight = 250;
			dropCount = 10;
		} else {
			fallHeight = 150;
			dropCount = 5;
		}
	});
</script>

<div style={`--fall-height: ${fallHeight}px`} {...rest}>
	<enhanced:img src={Cloud} alt="cloud" class="relative z-[1] w-full" />
	{#each drops as drop (drop.id)}
		<enhanced:img
			src={Rain}
			alt="raindrop"
			class="raindrop absolute top-[60px] h-auto w-[5px] opacity-0 sm:w-[10px]"
			style="
				left: {drop.left}%;
				animation-delay: {drop.delay}s;
				animation-duration: {drop.duration}s;
			"
		/>
	{/each}
</div>

<style>
	.raindrop {
		animation-name: fall;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	@keyframes fall {
		0% {
			transform: translateY(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(var(--fall-height));
			opacity: 0;
		}
	}
</style>
