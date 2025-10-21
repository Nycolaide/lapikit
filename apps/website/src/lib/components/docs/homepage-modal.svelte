<script>
	let isOpen = false;

	function openModal() {
		isOpen = true;
	}
	function closeModal() {
		isOpen = false;
	}
</script>

<button
	class="modal-trigger-button"
	style="color: var(--kit-label-primary); border-color: var(--kit-label-primary); background-color: var(--kit-background-grouped-primary);"
	on:click={openModal}
	on:focus={openModal}
	aria-haspopup="dialog"
>
	Open Modal
</button>

{#if isOpen}
	<div
		class="modal-overlay"
		on:click={closeModal}
		on:keydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter') closeModal();
		}}
		tabindex="0"
		aria-modal="true"
		role="dialog"
	>
		<div
			class="modal-content"
			style="color: var(--kit-label-primary); background-color: var(--kit-background-grouped-primary);"
			on:click|stopPropagation
			on:keydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
				}
			}}
			role="dialog"
			tabindex="0"
		>
			<h2 class="modal-title">This is a Modal with Pure CSS</h2>
			<p class="modal-description">You can put any content you like here.</p>
			<button
				class="modal-close-button"
				style="color: var(--kit-label-primary); border-color: var(--kit-label-primary); background-color: var(--kit-background-grouped-primary);"
				type="button"
				on:click={closeModal}
				on:focus={closeModal}
				on:keydown={(e) => {
					if (e.key === 'Escape') closeModal();
				}}
			>
				Close
			</button>
		</div>
	</div>
{/if}

<style>
	.modal-trigger-button {
		cursor: pointer;
		border-radius: 0.375rem;
		border: 1px solid;
		padding: 0.5rem 1rem;
		font-weight: 500;
		transition: opacity 0.2s ease-in-out;
	}

	.modal-trigger-button:hover {
		opacity: 0.8;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 40;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal-content {
		z-index: 50;
		max-width: 90vw;
		min-width: 320px;
		border-radius: 0.375rem;
		padding: 1.5rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.modal-title {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 500;
		margin: 0;
	}

	.modal-description {
		margin-top: 0.5rem;
		color: #6b7280;
		margin-bottom: 0;
	}

	.modal-close-button {
		margin-top: 1rem;
		cursor: pointer;
		border-radius: 0.375rem;
		border: 1px solid;
		padding: 0.5rem 1rem;
		font-weight: 500;
		transition: opacity 0.2s ease-in-out;
	}

	.modal-close-button:hover {
		opacity: 0.8;
	}
</style>
