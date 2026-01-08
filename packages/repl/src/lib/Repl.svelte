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
	let language = $state('javascript');

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
					lang: content.lang || 'javascript'
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
						: 'javascript'
			}));
		}

		if (Array.isArray(content)) {
			return content.map((item) => ({
				name: item.name,
				content: item.content || item.code || '',
				lang: item.lang || 'javascript'
			}));
		}

		return [{ name: 'code', content: content || '', lang: 'javascript' }];
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

				language = file.lang || 'javascript';
				const html = highlighter.codeToHtml(file.content, {
					theme: theme === 'light' ? 'github-light' : 'github-dark',
					lang: file.lang || language
				});

				codeHTML = html;
			})();
		}
	});
</script>

<div class="repl-container">
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

	{#if presentation}
		<div class="repl-content">
			<div>{@render children?.()}</div>
		</div>

		<hr />
	{/if}

	<Files {files} bind:activeIndex={activeFileIndex} />

	<div class="repl-content">
		{#if viewState === 'code'}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<div class="wrapper-highlight" bind:this={ref}>{@html codeHTML}</div>
		{:else}
			<div>{@render children?.()}</div>
		{/if}
	</div>
</div>

<style>
	div.repl-container {
		--repl-spacing: 0.25rem;
		--repl-radius: 1rem;
		--repl-shiki-size: 1rem;
		--repl-shiki-tab-size: 2;

		--repl-background: #f9f9f9;
		--repl-border-color: #ebebeb;

		--repl-primary: #0d0d34;
		--repl-secondary: #8f8f8f;

		background-color: var(--repl-background);
		border-radius: var(--repl-radius);
		border: 2px solid var(--repl-border-color);
	}

	div.repl-container :global(pre) {
		background-color: var(--repl-background) !important;
	}

	.repl-content {
		display: flow-root;
		margin-top: calc(var(--repl-spacing) * 0);
		padding-right: calc(10 * var(--repl-spacing));
		padding-left: calc(5 * var(--repl-spacing));
		padding-bottom: calc(4 * var(--repl-spacing));
		padding-top: calc(3 * var(--repl-spacing));
		position: relative;
	}

	hr {
		max-width: calc(100% - 4.5rem);
		margin-inline-start: calc(4.5rem / 2);
		display: block;
		border: thin solid var(--repl-border-color);
		margin-top: 0;
		margin-bottom: 0;
	}

	div.repl-container .wrapper-highlight :global(pre code) {
		font-size: var(--repl-shiki-size);
		-moz-tab-size: var(--repl-shiki-tab-size);
		tab-size: var(--repl-shiki-tab-size);
		white-space: pre-wrap;
		word-break: break-word;
	}
</style>
