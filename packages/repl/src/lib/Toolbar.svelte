<script lang="ts">
	import type { ToolbarProps } from '$lib/types.js';
	import Button from '$lib/Button.svelte';
	import { dictionary } from '$lib/utils.js';
	import { Copy, Check, Code, Codesandbox, Moon, Sun } from '@lucide/svelte';

	let {
		title,
		language,
		presentation,
		copyState = $bindable(),
		viewState = $bindable(),
		themeState = $bindable(),
		modeState = $bindable()
	}: ToolbarProps = $props();

	let languageKey = $derived(
		Object.entries(dictionary).find(([, values]) => values.includes(language))?.[0] || language
	);
</script>

<div class="lpk-repl--toolbar">
	<div
		class="lpk-repl--toolbar-title"
		class:lpk-repl--toolbar-title--language={!title && language}
		class:lpk-repl--toolbar-title--title={title}
	>
		{#if title}
			<span>{title}</span>
		{:else if language}
			<span>{languageKey}</span>
		{/if}
	</div>

	<div class="lpk-repl--toolbar-actions">
		{#if (modeState !== 'code' && viewState === 'preview') || presentation}
			<Button onclick={() => (themeState = themeState === 'light' ? 'dark' : 'light')}>
				{#if themeState === 'light'}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</Button>
		{/if}

		{#if modeState === 'mixed' && !presentation}
			<Button onclick={() => (viewState = viewState === 'code' ? 'preview' : 'code')}>
				{#if viewState === 'code'}
					<Code />
				{:else}
					<Codesandbox />
				{/if}
			</Button>
		{/if}

		{#if modeState !== 'playground'}
			<Button onclick={() => (copyState = true)}>
				{#if copyState}
					<Check />
				{:else}
					<Copy />
				{/if}
			</Button>
		{/if}
	</div>
</div>

<style>
	.lpk-repl--toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(var(--repl-spacing) * 3);
		padding-left: calc(5 * var(--repl-spacing));
		padding-right: calc(var(--repl-spacing) * 2);
		padding-block: calc(var(--repl-spacing) * 1.5);
		border-top-left-radius: var(--repl-radius);
		border-top-right-radius: var(--repl-radius);
		min-height: 36px;
	}

	.lpk-repl--toolbar .lpk-repl--toolbar-title {
		display: flex;
		align-items: center;
		gap: calc(var(--repl-spacing) * 2);
		max-width: 80%;
		min-width: 0;
	}

	.lpk-repl--toolbar-title--language {
		font-size: 0.875rem;
		line-height: 16px;
		font-weight: 400;
		color: #5d5d5d;
	}

	.lpk-repl--toolbar-title--title {
		font-weight: 500;
		font-size: 1rem;
		line-height: 20px;
		color: #8f8f8f;
	}

	.lpk-repl--toolbar .lpk-repl--toolbar-actions {
		display: flex;
		align-items: center;
		gap: calc(var(--repl-spacing) * 2);
	}
</style>
