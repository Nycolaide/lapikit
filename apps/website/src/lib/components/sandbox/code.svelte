<script lang="ts">
	import type { SandboxCodeProps } from './types';
	import { getHighlighterSingleton } from '$lib/shiki';
	import { copyToClipboard } from 'site-kit/actions';
	import { Btn, Icon } from 'lapikit/components';

	let { code, expanded = $bindable() }: SandboxCodeProps = $props();

	let ref: null | HTMLElement = $state(null);
	let codeHTML = $state('');
	let copy = $state(false);

	$effect(() => {
		if (code) {
			(async () => {
				const highlighter = await getHighlighterSingleton();

				const html = highlighter.codeToHtml(code!, {
					theme: 'vitesse-dark',
					lang: 'typescript'
				});

				codeHTML = html;
			})();
		}
	});

	$effect(() => {
		if (copy) {
			if (ref?.textContent) {
				copyToClipboard(ref?.textContent);
				copy = true;

				setTimeout(() => {
					copy = false;
				}, 1500);
			}
		}
	});
</script>

<Btn
	class="absolute right-[0.5rem] z-2 mt-[0.5rem]"
	icon
	onclick={() => (copy = true)}
	active={copy}
>
	<Icon icon={copy ? 'mgc_task_line' : 'mgc_clipboard_line'} />
</Btn>

<div class="lapikit-sandbox--code overflow-auto" style:height={expanded}>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="sm:text-md text-sm" bind:this={ref}>{@html codeHTML}</div>
</div>

<style>
	.lapikit-sandbox--code > div {
		position: relative;
		background-color: var(--vp-code-block-bg);
		overflow: auto;
	}

	.lapikit-sandbox--code > div > :global(pre) {
		position: relative;
		margin: 0;
		background: transparent;
		overflow: auto;
	}
</style>
