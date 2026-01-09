<script lang="ts">
	import type { FilesProps } from '$lib/types.js';
	import { dictionaryIcons } from '$lib/utils.js';

	let { files, activeIndex = $bindable(), modeState, viewState }: FilesProps = $props();
</script>

{#if modeState !== 'playground' && viewState === 'code' && files && files.length > 1}
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
		font-size: 0.875rem;
		transition: all 0.2s ease;
		border: 0;
		white-space: nowrap;
		background-color: transparent;
		border-bottom: 2px solid transparent;
		cursor: pointer;
	}

	button img {
		width: 16px;
		height: 16px;
	}

	button:hover {
		border-color: #cfcfcf;
	}

	button.active {
		border-color: #000000;
	}
</style>
