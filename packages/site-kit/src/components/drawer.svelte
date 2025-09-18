<script lang="ts">
	let { children, navigation, open = $bindable(), ...rest } = $props();
</script>

<div {...rest} id="drawer">
	<div class="drawer-navigation" style:display={!open ? 'none' : 'block'}>
		<div>
			{@render navigation?.()}
		</div>
		<button class="backdrop" onclick={() => (open = false)}> // backdrop </button>
	</div>
	<div style:position="relative">
		{@render children?.()}
	</div>
</div>

<style>
	#drawer {
		--drawer-height: calc(100dvh - 0px - 4.5rem);
		--drawer-top: calc(0px + 4.5rem + 0px);
		display: grid;
		grid-template-columns: 1fr;
		/* position: relative; */
		top: var(--drawer-top);
	}

	#drawer .drawer-navigation {
		height: 100dvh;
		position: fixed;
		z-index: 1000;
		display: none;
	}

	#drawer .drawer-navigation > div {
		position: fixed;
		z-index: 1000;
		height: fit-content;
		max-height: 80dvh;
		overflow-y: auto;
		width: 100%;
		bottom: 0;
		background-color: var(--kit-background-primary);
		color: var(--kit-label-primary);
		padding-bottom: 5.5rem;
	}

	#drawer .drawer-navigation .backdrop {
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		color: transparent;
		background-color: color-mix(in oklab, var(--kit-state-shadow) 45%, transparent);
		z-index: 900;
		user-select: none;
	}

	@media screen and (min-width: 40rem) {
		#drawer .drawer-navigation > div {
			width: 300px;
			height: 100dvh;
			max-height: 100%;
			padding-bottom: 0;
		}
	}

	@media screen and (min-width: 64rem) {
		#drawer {
			grid-template-columns: max-content 1fr;
		}

		#drawer .drawer-navigation {
			height: var(--drawer-height);
			display: block !important;
			position: sticky;
			top: var(--drawer-top);
		}

		#drawer .drawer-navigation > div {
			position: relative;
		}

		#drawer .backdrop {
			display: none;
		}
	}
</style>
