<script lang="ts">
	import { browser } from '$app/environment';
	let { children, open = $bindable(), ...rest } = $props();

	function handleClose() {
		open = false;
		if (browser) {
			document.body.style.overflow = '';
		}
	}
</script>

{#if open}
	<div {...rest} id="drawer-navigation">
		<button class="backdrop" onclick={() => handleClose()}> // backdrop </button>
		<aside>
			{@render children?.()}
		</aside>
	</div>
{/if}

<style>
	#drawer-navigation .backdrop {
		top: 0;
		width: 100%;
		height: 100%;
		position: relative;
		color: transparent;
		background-color: color-mix(in oklab, black 45%, transparent);
		z-index: 201;
		user-select: none;
	}

	#drawer-navigation {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 200;
	}

	#drawer-navigation aside {
		position: fixed;
		top: 0;
		right: 0;
		width: 320px;
		height: 100%;
		background-color: var(--kit-background-secondary);
		z-index: 202;
	}
</style>
