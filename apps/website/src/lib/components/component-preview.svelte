<script lang="ts">
	import type { Snippet } from 'svelte';
	import { copyToClipboard } from 'site-kit/actions';
	import { getHighlighterSingleton } from '$lib/shiki';

	type Props = {
		name: string;
		header?: boolean;
		component?: Snippet;
		code?: string;
	};

	let { name, header, component, code }: Props = $props();
	let ref: null | HTMLElement = $state(null);
	let tab = $state('preview');
	let codeHTML = $state('');
	let expanded = $state(false);
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

<div id={name}>
	{#if !header}
		<nav>
			<button onclick={() => (tab = 'preview')}>preview</button>
			<button onclick={() => (tab = 'code')}>code</button>
		</nav>
	{/if}

	<div>
		{#if header || tab === 'preview'}
			<div>{@render component?.()}</div>
		{/if}
		{#if header || tab === 'code'}
			<nav>
				<button onclick={() => (expanded = !expanded)}>
					{#if expanded}
						collapse code
					{:else}
						expand code
					{/if}
				</button>
				<button onclick={() => (copy = true)}>
					{#if copy}
						copied
					{:else}
						copy code
					{/if}
				</button>
			</nav>
			<div style:height={expanded ? '' : '320px'}>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div bind:this={ref}>{@html codeHTML}</div>
			</div>
		{/if}
	</div>
</div>
