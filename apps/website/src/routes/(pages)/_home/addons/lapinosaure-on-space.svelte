<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// assets
	import Rabbit from '$lib/images/lapinosaure/lapinosaure-on-space.webp';

	// states
	let outerContainer: HTMLDivElement;
	let innerContainer: HTMLDivElement;
	let angle = $state(10);
	let duration = $state(4000);
	let isAnimating = false;
	let currentState: 'idle' | 'fly' = 'idle';

	function randomize() {
		duration = 3500 + Math.random() * 1500;
	}

	function initializePosition() {
		if (innerContainer) {
			innerContainer.style.transform = `translate(0,0) scale(0.3) rotate(${angle}deg)`;
		}
	}

	async function initialAnimation() {
		const inner = innerContainer;

		const radians = (angle * Math.PI) / 180;
		const horizontalOffset = Math.sin(radians) * 30;

		await inner.animate(
			[
				{ transform: `translate(0,0) scale(0.3) rotate(${angle}deg)` },
				{ transform: `translate(${horizontalOffset}vh, -30vh) scale(0.8) rotate(${angle}deg)` }
			],
			{ duration: duration / 2, easing: 'ease-in-out', fill: 'forwards' }
		).finished;

		inner.style.transform = `translate(${horizontalOffset}vh, -30vh) scale(0.8) rotate(${angle}deg)`;
		await new Promise((r) => setTimeout(r, 3000));
	}

	async function flyAway() {
		if (isAnimating || currentState === 'fly') return;
		isAnimating = true;
		currentState = 'fly';
		const inner = innerContainer;

		const radians = (angle * Math.PI) / 180;
		const horizontalOffsetStart = Math.sin(radians) * 30;
		const horizontalOffsetEnd = Math.sin(radians) * 150;

		await inner.animate(
			[
				{
					transform: `translate(${horizontalOffsetStart}vh, -30vh) scale(0.8) rotate(${angle}deg)`
				},
				{ transform: `translate(${horizontalOffsetEnd}vh, -150vh) scale(0.5) rotate(${angle}deg)` }
			],
			{ duration: duration, easing: 'ease-in-out', fill: 'forwards' }
		).finished;

		isAnimating = false;
	}

	async function returnToIdle() {
		if (isAnimating || currentState === 'idle') return;
		isAnimating = true;
		currentState = 'idle';
		const inner = innerContainer;

		const radians = (angle * Math.PI) / 180;
		const horizontalOffsetStart = Math.sin(radians) * 150;
		const horizontalOffsetEnd = Math.sin(radians) * 30;

		await inner.animate(
			[
				{
					transform: `translate(${horizontalOffsetStart}vh, -150vh) scale(0.5) rotate(-${angle}deg)`
				},
				{ transform: `translate(${horizontalOffsetEnd}vh, -30vh) scale(0.8) rotate(${angle}deg)` }
			],
			{ duration: duration, easing: 'ease-in-out', fill: 'forwards' }
		).finished;

		isAnimating = false;
	}

	function handleScroll() {
		const scrollY = window.scrollY;
		if (scrollY > 150) {
			flyAway();
		} else {
			returnToIdle();
		}
	}

	onMount(() => {
		randomize();
		initializePosition();
		initialAnimation();

		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<div class="wrapper">
	<div class="outer-container" bind:this={outerContainer}>
		<div class="inner-container" bind:this={innerContainer}>
			<img src={Rabbit} alt="Lapinosaure in space" />
			<div class="flame-left"></div>
			<div class="flame-right"></div>
		</div>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		width: 180px;
		height: calc(100vh - 72px);
		/* overflow: hidden; */
	}

	.outer-container {
		position: absolute;
		bottom: -10%;
		width: 150px;
		animation: floatXY 2s ease-in-out infinite alternate;
	}

	@keyframes floatXY {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(3px, -3px);
		}
		50% {
			transform: translate(-3px, 3px);
		}
		75% {
			transform: translate(2px, -2px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	.inner-container {
		width: 100%;
		transform-origin: center;
		transform: translate(0, 0) scale(0.3) rotate(10deg);
	}

	.inner-container img {
		width: 100%;
		display: block;
	}

	.flame-left,
	.flame-right {
		position: absolute;
		width: 22px;
		height: 40px;
		background: linear-gradient(to bottom, #ffdc73, #ff930f, #ff3c00);
		border-radius: 50% 50% 20% 20%;
		filter: blur(3px);
		transform: translateX(-50%);
		animation: flamePulse 0.5s ease-in-out infinite alternate;
	}
	.flame-left {
		bottom: -48px;
		left: 18%;
	}

	.flame-right {
		left: 53%;
		bottom: -48px;
	}

	@keyframes flamePulse {
		0% {
			transform: translateX(-50%) scaleY(1) scaleX(1);
			opacity: 0.8;
		}
		50% {
			transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
			opacity: 1;
		}
		100% {
			transform: translateX(-50%) scaleY(1) scaleX(1);
			opacity: 0.8;
		}
	}
</style>
