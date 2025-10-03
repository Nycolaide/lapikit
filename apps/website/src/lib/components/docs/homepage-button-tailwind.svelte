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
	class="cursor-pointer rounded border-none px-2 py-1 font-medium"
	style="color: var(--kit-label-primary); background-color: {bg};"
	on:mouseover={setHover}
	on:focus={setHover}
	on:mouseout={setDefault}
	on:blur={setDefault}
>
	Hello World
</button>
