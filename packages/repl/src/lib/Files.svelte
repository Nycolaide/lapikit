<script lang="ts">
	import type { FilesProps } from '$lib/types.js';
	import { dictionaryIcons } from '$lib/utils.js';

	let { files, activeIndex = $bindable() }: FilesProps = $props();
</script>

{#if files && files.length > 1}
	<div>
		{#each files as file, index (index)}
			<button class:active={activeIndex === index} onclick={() => (activeIndex = index)}>
				{#if file.lang && dictionaryIcons[file.lang]}
					<img src={dictionaryIcons[file.lang]} alt="{file.lang} icon" />
				{/if}
				<span>{file.name}</span>
			</button>
		{/each}
	</div>

	<hr />
{/if}

<style>
	div {
		display: flex;
		gap: calc(var(--repl-spacing) * 2);
		padding-left: calc(5 * var(--repl-spacing));
		padding-right: calc(5 * var(--repl-spacing));
		padding-block: calc(var(--repl-spacing) * 2);
		overflow-x: auto;
	}

	button {
		display: flex;
		align-items: center;
		gap: calc(var(--repl-spacing) * 2);
		padding: calc(var(--repl-spacing) * 2) calc(var(--repl-spacing) * 3);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		border: 1px solid transparent;
		white-space: nowrap;
	}

	button img {
		width: 16px;
		height: 16px;
	}

	button:hover {
		background-color: #f5f5f5;
	}

	button.active {
		background-color: #f0f0f0;
		border-color: #d0d0d0;
	}

	hr {
		max-width: calc(100% - 4.5rem);
		margin-inline-start: calc(4.5rem / 2);
		display: block;
		border: thin solid var(--repl-border-color);
		margin-top: 0;
		margin-bottom: 0;
	}
</style>
