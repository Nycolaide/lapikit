<script lang="ts">
	import { copyToClipboard } from '$lib/utils.js';

	import { Copy, Check, Code, Codesandbox, Moon, Sun } from '@lucide/svelte';

	import CodeIcon from '$lib/assets/languages/code.svg';
	import JavaScriptIcon from '$lib/assets/languages/javascript.svg';
	import TypeScriptIcon from '$lib/assets/languages/typescript.svg';
	import SvelteIcon from '$lib/assets/languages/svelte.svg';
	import CssIcon from '$lib/assets/languages/css.svg';
	import HtmlIcon from '$lib/assets/languages/html.svg';
	import { getHighlighterSingleton } from '$lib/shiki.js';

	interface FileItem {
		name: string;
		content: string;
		lang?: string;
	}

	let { title, content, children, ...rest } = $props();
	let codeHTML = $state('');
	let copyState = $state(false);
	let viewMode = $state('editor');
	let themeMode = $state('light');

	let ref: null | HTMLElement = $state(null);
	let typeContent = $state('code');

	// multiple content types
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
				content: typeof fileContent === 'string' ? fileContent : (fileContent as any).code || '',
				lang: typeof fileContent === 'object' ? (fileContent as any).lang : 'javascript'
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

	let activeFileIndex = $state(0);
	let activeFile = $derived(files[activeFileIndex]);
	let hasMultipleFiles = $derived(files.length > 1);

	$effect(() => {
		console.log('Props rest', rest);
	});

	let iconMap = {
		code: CodeIcon,
		javascript: JavaScriptIcon,
		typescript: TypeScriptIcon,
		svelte: SvelteIcon,
		css: CssIcon,
		html: HtmlIcon
	} as const;

	let currentIcon = $derived(iconMap[typeContent as keyof typeof iconMap] || CodeIcon);

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
		const theme = themeMode;

		if (file?.content) {
			(async () => {
				console.log('Rendering file:', file);
				const highlighter = await getHighlighterSingleton();

				const html = highlighter.codeToHtml(file.content, {
					theme: theme === 'light' ? 'github-light' : 'github-dark',
					lang: file.lang || 'javascript'
				});

				codeHTML = html;
			})();
		}
	});
</script>

<div class="repl-container">
	<div class="repl-toolbar">
		<div class="toolbar-title">
			<img src={currentIcon} alt="{typeContent} icon" class="toolbar-icon" />
			<span>{title || 'REPL Toolbar'}</span>
		</div>

		<div>
			{#if viewMode !== 'editor'}
				<button
					onclick={() => (themeMode = themeMode === 'light' ? 'dark' : 'light')}
					title="Toggle Theme"
				>
					{#if themeMode === 'light'}
						<Moon class="toolbar-icon" />
					{:else}
						<Sun class="toolbar-icon" />
					{/if}
				</button>
			{/if}
			<button
				title={viewMode === 'editor' ? 'Code' : 'Playground'}
				onclick={() => (viewMode = viewMode === 'editor' ? 'playground' : 'editor')}
			>
				{#if viewMode === 'editor'}
					<Code class="toolbar-icon" />
				{:else}
					<Codesandbox class="toolbar-icon" />
				{/if}
			</button>
			<button onclick={() => (copyState = true)} title={copyState ? 'Copied!' : 'Copy'}>
				{#if copyState}
					<Check class="toolbar-icon" />
				{:else}
					<Copy class="toolbar-icon" />
				{/if}
			</button>
		</div>
	</div>

	<hr />

	{#if hasMultipleFiles && viewMode === 'editor'}
		<div class="sub-toolbar">
			{#each files as file, index (index)}
				<button
					class="file-tab"
					class:active={activeFileIndex === index}
					onclick={() => (activeFileIndex = index)}
					title={file.name}
				>
					<img
						src={iconMap[file.lang as keyof typeof iconMap] || CodeIcon}
						alt="{file.lang} icon"
						class="file-icon"
					/>
					<span>{file.name}</span>
				</button>
			{/each}
		</div>
		<hr />
	{/if}

	<div class="repl-content">
		{#if viewMode === 'editor'}
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

		background-color: #fff;
		border-radius: var(--repl-radius);
		border: 2px solid #ebebeb;
	}

	div.repl-toolbar {
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

	div.repl-container button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 0.875rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		transition: background-color 0.2s ease;
	}

	.toolbar-title {
		display: flex;
		align-items: center;
		gap: calc(var(--repl-spacing) * 2);
	}

	.toolbar-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
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
		border: thin solid #ebebeb;
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

	.sub-toolbar {
		display: flex;
		gap: calc(var(--repl-spacing) * 2);
		padding-left: calc(5 * var(--repl-spacing));
		padding-right: calc(5 * var(--repl-spacing));
		padding-block: calc(var(--repl-spacing) * 2);
		overflow-x: auto;
	}

	.file-tab {
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

	.file-tab:hover {
		background-color: #f5f5f5;
	}

	.file-tab.active {
		background-color: #f0f0f0;
		border-color: #d0d0d0;
	}

	.file-icon {
		width: 16px;
		height: 16px;
		object-fit: contain;
	}
</style>
