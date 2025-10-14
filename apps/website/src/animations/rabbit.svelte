<script lang="ts">
	import { onMount } from 'svelte';
	import RocketRabbit from '$lib/images/lapikit-yolo.webp';
	import Bulle from '$lib/images/assets/bulle.webp';

	let outerContainer: HTMLDivElement;
	let innerContainer: HTMLDivElement;
	let angle = 0;
	let duration = 4000;
	let showBubble = false;

	function randomize() {
		//angle = 25 + Math.random() * 10;
		duration = 3500 + Math.random() * 1500;
	}

	async function animate() {
		const inner = innerContainer;

		await inner.animate(
			[
				{ transform: `translate(0,0) scale(0.3) rotate(${angle}deg)` },
				{ transform: `translate(0, -30vh) scale(0.8) rotate(${angle}deg)` }
			],
			{ duration: duration / 2, easing: 'ease-in-out', fill: 'forwards' }
		).finished;

		inner.style.transform = `translate(°, -30vh) scale(0.8) rotate(0deg)`;
		showBubble = true;
		await new Promise((r) => setTimeout(r, 3000));
		showBubble = false;

		await inner.animate(
			[
				{ transform: `translate(0, -30vh) scale(0.8) rotate(0deg)` },
				{ transform: `translate(0, -150vh) scale(0.5) rotate(0deg)` }
			],
			{ duration: duration / 2, easing: 'ease-in-out', fill: 'forwards' }
		).finished;

		setTimeout(() => {
			randomize();
			animate();
		}, 500);
	}

	onMount(() => {
		randomize();
		animate();
	});
</script>

<div class="wrapper">
	<div class="outer-container" bind:this={outerContainer}>
		<div class="inner-container" bind:this={innerContainer}>
			<img src={RocketRabbit} alt="Lapin fusée Lapikit" />
			<div class="trail"></div>
			<div class="flame"></div>
			{#if showBubble}
				<img src={Bulle} alt="Bulle Hello World" class="bubble" />
			{/if}
		</div>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		width: 100vw;
		height: 100vh;
		/* height: 100%;
        width: 100%; */
		overflow: hidden;
		/* background: radial-gradient(ellipse at bottom, #0d1b2a 0%, #000 100%); */
	}

	.outer-container {
		position: absolute;
		bottom: -10%;
		/* left: 10%; */
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
	}

	.inner-container img {
		width: 100%;
		display: block;
	}

	.flame {
		position: absolute;
		bottom: -20px;
		left: 50%;
		width: 12px;
		height: 40px;
		background: linear-gradient(to bottom, #ffdc73, #ff930f, #ff3c00);
		border-radius: 50% 50% 20% 20%;
		filter: blur(3px);
		transform: translateX(-50%);
		animation: flamePulse 0.5s ease-in-out infinite alternate;
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

	.trail {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 2px;
		height: 150px;
		background: linear-gradient(to top, rgba(255, 255, 255, 0.4), transparent);
		filter: blur(1px);
		transform: translateX(-50%);
	}

	.bubble {
		position: absolute;
		top: -50px;
		left: 50%;
		transform: translateX(-50%);
		width: 120px;
		pointer-events: none;
	}
</style>
