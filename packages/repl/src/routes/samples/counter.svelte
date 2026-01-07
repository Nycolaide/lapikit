<script lang="ts">
	let count: number = 0;

	function increment() {
		count += 1;
	}

	function decrement() {
		count -= 1;
	}
</script>

<main>
	<h1>Counter : {count}</h1>
	<button on:click={decrement}>-</button>
	<button on:click={increment}>+</button>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	button {
		font-size: 1.5rem;
		margin: 0 0.5rem;
		width: 2.5rem;
		height: 2.5rem;
	}
</style>
