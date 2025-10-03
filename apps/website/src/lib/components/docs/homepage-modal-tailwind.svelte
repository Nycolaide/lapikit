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
	class="cursor-pointer rounded border px-4 py-2 font-medium"
	style="color: var(--kit-label-primary); border-color: var(--kit-label-primary); background-color: var(--kit-background-grouped-primary);"
	on:click={openModal}
	on:focus={openModal}
	aria-haspopup="dialog"
>
	Open Modal
</button>

{#if isOpen}
	<div
		class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
		on:click={closeModal}
		on:keydown={(e) => {
			if (e.key === 'Escape' || e.key === 'Enter') closeModal();
		}}
		tabindex="0"
		aria-modal="true"
		role="dialog"
	>
		<div
			class="z-50 max-w-[90vw] min-w-[320px] rounded bg-white p-6 shadow-lg"
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
			<h2 class="text-lg font-medium">This is a Modal Tailwind</h2>
			<p class="mt-2 text-gray-600">You can put any content you like here.</p>
			<button
				class="mt-4 cursor-pointer rounded border px-4 py-2 font-medium"
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
