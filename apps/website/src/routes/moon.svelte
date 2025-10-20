<script>
	import LapinosaureFirstOnTheMoon from '$lib/images/lapinosaure/lapinosaure-first-on-the-moon.webp?enhanced';

	let path;
</script>

<div id="moon-section"></div>

<div class="planet-container">
	<!-- SVG Planète -->
	<div class="wrapper">
		<svg
			class="planet-svg"
			viewBox="0 0 100 10"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="1.5" result="blur" />
					<feFlood flood-color="rgba(0,150,255,0.5)" />
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

	<!-- Lapinosaur -->
	<div id="lapinosaur-to-the-moon">
		<!-- style={`transform: translate(${lapinX}px, ${lapinY}px) rotate(${lapinAngle}deg);`} -->
		<enhanced:img
			class="lapin"
			id="lapikit-on-the-moon"
			src={LapinosaureFirstOnTheMoon}
			alt="Lapinosaur on the moon"
		/>
	</div>
</div>

<style>
	.wrapper {
		/* width: 100vw; */
		overflow: hidden;
	}

	.planet-container {
		position: relative;
		width: 100%;
		height: 100px;
	}

	.planet-svg {
		width: 110%;
		min-width: 1024px;
		height: 100px; /* ou 100% du parent */
		position: relative; /* plus absolute */
		display: block; /* évite les marges inline */
		transform: translateX(-50%);
		left: 50%;
	}

	.planet-svg path {
		fill: var(--kit-background-secondary); /* ta couleur de planète */
	}

	#lapinosaur-to-the-moon {
		position: absolute;
		top: 0;
		left: 65vw;
		transform-origin: center bottom;
		/* transition: left 0.2s ease-out; */
	}

	@media (min-width: 1440px) {
		#lapinosaur-to-the-moon {
			left: 70vw;
		}
	}

	.lapin {
		width: 60px;
		height: auto;
		/* filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3)); */
	}
</style>
