<script lang="ts">
	import { Button, Icon, Toolbar } from 'lapikit/components';
	import { Spring } from 'svelte/motion';

	const count = new Spring(0);
	const offset = $derived(modulo(count.current, 1));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<Toolbar class="w-fit">
	<Button icon onclick={() => (count.target -= 1)} aria-label="Decrease the counter by one">
		<Icon icon="mgc_minimize_fill" />
	</Button>
	<div class="counter-wrapper">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor(count.current + 1)}</strong>
			<strong>{Math.floor(count.current)}</strong>
		</div>
	</div>
	<Button icon onclick={() => (count.target += 1)} aria-label="Increase the counter by one">
		<Icon icon="mgc_add_fill" />
	</Button>
</Toolbar>

<style>
	.counter-wrapper {
		width: 6em;
		height: 2.75em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-wrapper strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		font-size: 3rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
