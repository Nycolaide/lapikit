<script>
	let defaultBg = 'var(--kit-background-grouped-primary)';
	let hoverBg = 'color-mix(in oklab, var(--button-background) 90%, var(--kit-state-shadow))';
	let bg = defaultBg;

	function setHover() {
		bg = hoverBg;
	}
	function setDefault() {
		bg = defaultBg;
	}
</script>

<button
	class="homepage-button"
	style="color: var(--kit-label-primary); background-color: {bg};"
	on:mouseover={setHover}
	on:focus={setHover}
	on:mouseout={setDefault}
	on:blur={setDefault}
>
	Hello World
</button>

<style>
	.homepage-button {
		cursor: pointer;
		border-radius: 0.375rem;
		border: none;
		padding: 0.25rem 0.5rem;
		font-weight: 500;
		transition: background-color 0.2s ease-in-out;
	}

	.homepage-button:hover,
	.homepage-button:focus {
		outline: none;
	}
</style>
