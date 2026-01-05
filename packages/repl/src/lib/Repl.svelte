<script lang="ts">
	import { copyToClipboard } from '$lib/utils.js';
	import CodeIcon from '$lib/assets/languages/code.svg';
	import JavaScriptIcon from '$lib/assets/languages/javascript.svg';
	import TypeScriptIcon from '$lib/assets/languages/typescript.svg';
	import SvelteIcon from '$lib/assets/languages/svelte.svg';
	import CssIcon from '$lib/assets/languages/css.svg';
	import HtmlIcon from '$lib/assets/languages/html.svg';

	import CopyIcon from '$lib/assets/icons/copy.svg';
	import CheckIcon from '$lib/assets/icons/check.svg';
	import CodeViewIcon from '$lib/assets/icons/code.svg';
	import CodeSandboxIcon from '$lib/assets/icons/codesandbox.svg';

	let copyState = $state(false);
	let viewMode = $state('editor');

	let ref: null | HTMLElement = $state(null);
	let typeContent = $state('code');

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
</script>

<div class="repl-container">
	<div class="repl-toolbar">
		<div class="toolbar-title">
			<img src={currentIcon} alt="{typeContent} icon" class="toolbar-icon" />
			<span>REPL Toolbar</span>
		</div>

		<div>
			<button
				title={viewMode === 'editor' ? 'Code' : 'Playground'}
				onclick={() => (viewMode = viewMode === 'editor' ? 'playground' : 'editor')}
			>
				<img
					src={viewMode === 'editor' ? CodeViewIcon : CodeSandboxIcon}
					alt="View mode icon"
					class="toolbar-icon"
				/>
			</button>
			<button onclick={() => (copyState = true)} title={copyState ? 'Copied!' : 'Copy'}>
				<img src={copyState ? CheckIcon : CopyIcon} alt="Copy icon" class="toolbar-icon" />
			</button>
		</div>
	</div>

	<hr />

	<div class="repl-content">
		{#if viewMode === 'editor'}
			<div bind:this={ref}>This is the Code view.</div>
		{:else}
			<div bind:this={ref}>This is the REPL component.</div>
		{/if}
	</div>
</div>

<style>
	div.repl-container {
		--spacing: 0.25rem;
		--radius: 1rem;
		background-color: #fff;
		border-radius: var(--radius);
		border: 2px solid #ebebeb;
	}

	div.repl-toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(var(--spacing) * 3);
		padding-left: calc(5 * var(--spacing));
		padding-right: calc(var(--spacing) * 2);
		padding-block: calc(var(--spacing) * 1.5);
		border-top-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
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
		gap: calc(var(--spacing) * 2);
	}

	.toolbar-icon {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}

	.repl-content {
		display: flow-root;
		margin-top: calc(var(--spacing) * 0);
		padding-right: calc(10 * var(--spacing));
		padding-left: calc(5 * var(--spacing));
		padding-bottom: calc(4 * var(--spacing));
		padding-top: calc(3 * var(--spacing));
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
</style>
