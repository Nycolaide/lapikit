<script lang="ts">
	// assets
	import LapinosaureFirstOnTheEarth from '$lib/images/lapinosaure/lapinosaure-first-on-the-earth.webp?enhanced';

	// states
	let path: SVGPathElement | undefined = $state(undefined);
</script>

<div class="planet-container no-select">
	<div class="wrapper">
		<svg
			class="planet-svg"
			viewBox="0 0 100 10"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="1.8" result="blur" />
					<feFlood flood-color="rgba(0,150,255,0.8)" />
					<feComposite in2="blur" operator="in" />
					<feMerge>
						<feMergeNode />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<path bind:this={path} d="M0,10 C25,0 75,0 100,10 Z" filter="url(#blue-glow)" />
		</svg>
	</div>

	<div class="planet-padding no-select"></div>

	<div id="lapinosaure-to-the-earth">
		<enhanced:img
			class="lapinosaure no-select"
			src={LapinosaureFirstOnTheEarth}
			alt="lapinosaure on the earth"
		/>
	</div>
</div>

<style>
	.wrapper {
		overflow: hidden;
	}

	.planet-container {
		position: absolute;
		width: 100%;
		height: 100px;
		bottom: 0;
	}

	.planet-svg {
		width: 110%;
		min-width: 1024px;
		height: 100px;
		position: relative;
		display: block;
		transform: translateX(-50%);
		left: 50%;
	}

	.planet-svg path {
		fill: var(--kit-background-primary);
	}

	.planet-padding {
		position: relative;
		background-color: var(--kit-background-primary);
		width: 100%;
		height: 100px;
	}

	#lapinosaure-to-the-earth {
		position: absolute;
		top: 0;
		left: 65vw;
		transform-origin: center bottom;
	}

	@media (min-width: 1440px) {
		#lapinosaure-to-the-earth {
			left: 70vw;
		}
	}

	.lapinosaure {
		width: 60px;
		height: auto;
	}
</style>
