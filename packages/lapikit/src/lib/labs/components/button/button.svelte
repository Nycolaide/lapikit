<script lang="ts">
	let { children, ...rest } = $props();
</script>

<button {...rest}>
	{@render children()}
</button>

<style>
	button {
		padding: 0.5em 1em;
		border: none;
		border-radius: 4px;
		background-color: #007bff;
		color: white;
		cursor: pointer;
		font-size: 1em;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
