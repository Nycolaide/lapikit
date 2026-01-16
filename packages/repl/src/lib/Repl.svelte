<script lang="ts">
	import { copyToClipboard } from '$lib/utils.js';
	import { getHighlighterSingleton } from '$lib/shiki.js';
	import type { FileItem, ReplProps } from '$lib/types.js';

	// components
	import Toolbar from '$lib/Toolbar.svelte';
	import Files from '$lib/Files.svelte';

	let { title, content, children, presentation }: ReplProps = $props();

	// refs
	let ref: null | HTMLElement = $state(null);

	// states
	let language = $state('sh');

	let modeState: 'code' | 'playground' | 'mixed' = $state('code');
	let copyState = $state(false);
	let viewState: 'code' | 'preview' = $state('code');
	let themeState: 'light' | 'dark' = $state('light');

	let codeHTML = $state('');
	let activeFileIndex = $state(0);

	let files = $derived.by<FileItem[]>(() => {
		if (typeof content === 'object' && content !== null && 'code' in content) {
			return [
				{
					name: title || 'code',
					content: content.code,
					lang: content.lang || 'sh'
				}
			];
		}

		if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
			return Object.entries(content).map(([name, fileContent]) => ({
				name,
				content:
					typeof fileContent === 'string'
						? fileContent
						: (fileContent as Record<string, unknown>).code || '',
				lang:
					typeof fileContent === 'object'
						? ((fileContent as Record<string, unknown>).lang as string)
						: 'sh'
			}));
		}

		if (Array.isArray(content)) {
			return content.map((item) => ({
				name: item.name,
				content: item.content || item.code || '',
				lang: item.lang || 'sh'
			}));
		}

		return [{ name: 'code', content: content || '', lang: 'sh' }];
	});
	let activeFile = $derived(files[activeFileIndex]);

	$effect.pre(() => {
		if (children && content && !presentation) {
			modeState = 'mixed';
			viewState = 'preview';
		} else if (presentation) {
			modeState = 'mixed';
			viewState = 'code';
		} else if (children && !content) {
			modeState = 'playground';
			viewState = 'preview';
		} else {
			modeState = 'code';
			viewState = 'code';
		}
	});

	$effect(() => {
		if (copyState) {
			if (ref?.textContent) {
				copyToClipboard(ref?.textContent);
				copyState = true;

				setTimeout(() => {
					copyState = false;
				}, 1500);
			}
		}
	});

	$effect(() => {
		const file = activeFile;
		const theme = themeState;

		if (file?.content) {
			(async () => {
				const highlighter = await getHighlighterSingleton();

				language = file.lang || 'sh';
				const html = highlighter.codeToHtml(file.content, {
					theme: theme === 'light' ? 'github-light' : 'github-dark',
					lang: file.lang || language
				});

				codeHTML = html;
			})();
		}
	});
</script>

<div class="kit-repl">
	{#if presentation}
		<div class="kit-repl-content" class:kit-repl-content--playground={presentation}>
			<div
				class="wrapper-playground"
				class:dark={themeState === 'dark'}
				class:light={themeState === 'light'}
			>
				{@render children?.()}
			</div>
		</div>
	{/if}

	<div class="kit-repl-container">
		<Toolbar
			{title}
			{language}
			{presentation}
			bind:copyState
			bind:viewState
			bind:themeState
			bind:modeState
		/>

		{#if modeState !== 'code'}
			<hr />
		{/if}

		<Files {files} bind:activeIndex={activeFileIndex} {modeState} {viewState} />

		<div
			class="kit-repl-content"
			class:kit-repl-content--code={viewState === 'code' && !presentation}
		>
			{#if viewState === 'code'}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div class="kit-repl-wrapper-highlight" bind:this={ref}>{@html codeHTML}</div>
			{:else}
				<div
					class="kit-repl-wrapper-playground"
					class:dark={themeState === 'dark'}
					class:light={themeState === 'light'}
				>
					{@render children?.()}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.kit-repl {
		/* ui */
		--kit-repl-spacing: 0.25rem;
		--kit-repl-radius: 1rem;

		/* shiki override */
		--kit-repl-shiki-size: 0.875rem;
		--kit-repl-shiki-tab-size: 2;

		/* colors */
		--kit-repl-background: #f9f9f9;
		--kit-repl-border-color: #ebebeb;
		--kit-repl-primary: #0d0d34;
		--kit-repl-secondary: #8f8f8f;
	}
	.kit-repl-container {
		background-color: var(--kit-repl-background);
		border-radius: var(--kit-repl-radius);
		border: 2px solid var(--kit-repl-border-color);
	}

	.kit-repl-container :global(pre) {
		background-color: var(--kit-repl-background) !important;
	}

	.kit-repl-content {
		display: flow-root;
		margin-top: calc(var(--kit-repl-spacing) * 0);
		padding-right: calc(10 * var(--kit-repl-spacing));
		padding-left: calc(5 * var(--kit-repl-spacing));
		padding-bottom: calc(4 * var(--kit-repl-spacing));
		padding-top: calc(3 * var(--kit-repl-spacing));
		position: relative;
	}

	.kit-repl-content--code {
		padding-top: 0;
	}

	.kit-repl-content--playground {
		padding-top: calc(4 * var(--kit-repl-spacing));
		padding-bottom: calc(10 * var(--kit-repl-spacing));
	}

	hr {
		max-width: calc(100% - 2.5rem);
		margin-inline-start: calc(2.5rem / 2);
		display: block;
		border: thin solid var(--kit-repl-border-color);
		margin-top: 0;
		margin-bottom: 0;
	}

	div.kit-repl-container .kit-repl-wrapper-highlight :global(pre code) {
		font-size: var(--kit-repl-shiki-size);
		-moz-tab-size: var(--kit-repl-shiki-tab-size);
		tab-size: var(--kit-repl-shiki-tab-size);
		white-space: pre-wrap;
		word-break: break-word;
	}

	div.kit-repl-container .kit-repl-wrapper-playground {
		background-color: var(--kit-repl-background);
		border-radius: var(--kit-repl-radius);
		padding: calc(4 * var(--kit-repl-spacing));
	}
</style>
