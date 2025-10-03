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

<div
	class="cursor-pointer rounded border-none px-2 py-4 font-medium"
	style="
		color: var(--kit-label-primary);
		background-color: var(--kit-background-grouped-primary);
	"
>
	<h2 class="mb-2 text-lg font-medium">Welcome to Lapikit!</h2>
	<p class="mb-4 text-gray-600">This is a simple card component using TailwindCSS.</p>

	<button
		class="cursor-pointer rounded border px-2 py-1 font-medium"
		style="
			color: var(--kit-label-primary);
			background-color: {bg};
			border-color: var(--kit-label-primary);
		"
		on:mouseover={setHover}
		on:focus={setHover}
		on:mouseout={setDefault}
		on:blur={setDefault}
	>
		Get Started
	</button>
</div>
