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

<div class="kit-repl--toolbar">
	<div
		class="kit-repl--toolbar-title"
		class:kit-repl--toolbar-title--language={!title && language}
		class:kit-repl--toolbar-title--title={title}
	>
		{#if title}
			<span>{title}</span>
		{:else if language}
			<span>{languageKey}</span>
		{/if}
	</div>

	<div class="kit-repl--toolbar-actions">
		{#if (modeState !== 'code' && viewState === 'preview') || presentation}
			<Button
				aria-label={themeState === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
				aria-pressed={themeState === 'dark'}
				onclick={() => (themeState = themeState === 'light' ? 'dark' : 'light')}
			>
				{#if themeState === 'light'}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</Button>
		{/if}

		{#if modeState === 'mixed' && !presentation}
			<Button
				aria-label={viewState === 'code' ? 'Show preview' : 'Show code'}
				aria-pressed={viewState === 'preview'}
				onclick={() => (viewState = viewState === 'code' ? 'preview' : 'code')}
			>
				{#if viewState === 'code'}
					<Code />
				{:else}
					<Codesandbox />
				{/if}
			</Button>
		{/if}

		{#if modeState !== 'playground'}
			<Button
				aria-label={copyState ? 'Code copied' : 'Copy code'}
				onclick={() => (copyState = true)}
			>
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
	.kit-repl--toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(var(--kit-repl-spacing) * 3);
		padding-left: calc(5 * var(--kit-repl-spacing));
		padding-right: calc(var(--kit-repl-spacing) * 2);
		padding-block: calc(var(--kit-repl-spacing) * 1.5);
		border-top-left-radius: var(--kit-repl-radius);
		border-top-right-radius: var(--kit-repl-radius);
		min-height: 36px;
	}

	.kit-repl--toolbar .kit-repl--toolbar-title {
		display: flex;
		align-items: center;
		gap: calc(var(--kit-repl-spacing) * 2);
		max-width: 80%;
		min-width: 0;
	}

	.kit-repl--toolbar-title--language {
		font-size: 0.875rem;
		line-height: 16px;
		font-weight: 400;
		color: #5d5d5d;
	}

	.kit-repl--toolbar-title--title {
		font-weight: 500;
		font-size: 1rem;
		line-height: 20px;
		color: #8f8f8f;
	}

	.kit-repl--toolbar .kit-repl--toolbar-actions {
		display: flex;
		align-items: center;
		gap: calc(var(--kit-repl-spacing) * 2);
	}
</style>
