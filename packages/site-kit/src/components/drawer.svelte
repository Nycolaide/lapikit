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
		display: grid;
		grid-template-columns: 1fr;
	}

	#drawer .drawer-navigation {
		height: 100dvh;
		position: fixed;
		z-index: 1000;
		display: none;
	}

	#drawer .drawer-navigation > div {
		position: fixed;
		z-index: 2;
		height: fit-content;
		max-height: 80dvh;
		overflow-y: auto;
		width: 100%;
		bottom: 0;
	}

	#drawer .drawer-navigation .backdrop {
		width: 100%;
		height: 100%;
		position: fixed;
		color: transparent;
		z-index: 1;
	}

	@media screen and (min-width: 480px) {
		#drawer .drawer-navigation > div {
			width: 300px;
			height: 100dvh;
			max-height: 100%;
		}
	}

	@media screen and (min-width: 780px) {
		#drawer {
			grid-template-columns: max-content 1fr;
		}

		#drawer .drawer-navigation {
			display: block !important;
			position: sticky;
			top: 0;
		}

		#drawer .drawer-navigation > div {
			position: relative;
		}

		#drawer .backdrop {
			display: none;
		}
	}
</style>
