<script lang="ts">
	let { children, accessOnRGPD = $bindable(), ...rest } = $props();
</script>

<footer {...rest}>
	{@render children?.()}
	<button onclick={() => (accessOnRGPD = true)}>cookie settings</button>
</footer>
