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
	class="homepage-card"
	style="
		color: var(--kit-label-primary);
		background-color: var(--kit-background-grouped-primary);
	"
>
	<h2 class="card-title">Welcome to Lapikit!</h2>
	<p class="card-description">This is a simple card component using pure CSS.</p>

	<button
		class="card-button"
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

<style>
	.homepage-card {
		cursor: pointer;
		border-radius: 0.375rem;
		border: none;
		padding: 0.5rem 0.5rem 1rem;
		font-weight: 500;
	}

	.card-title {
		margin-bottom: 0.5rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 500;
		margin-top: 0;
	}

	.card-description {
		margin-bottom: 1rem;
		color: #6b7280;
		margin-top: 0;
	}

	.card-button {
		cursor: pointer;
		border-radius: 0.375rem;
		border: 1px solid;
		padding: 0.25rem 0.5rem;
		font-weight: 500;
		transition: background-color 0.2s ease-in-out;
	}

	.card-button:hover,
	.card-button:focus {
		outline: none;
	}
</style>
