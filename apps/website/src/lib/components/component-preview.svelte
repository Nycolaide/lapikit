<script lang="ts">
	import { t } from '$lib/i18n';
	import type { Snippet } from 'svelte';
	import { copyToClipboard } from 'site-kit/actions';
	import { getHighlighterSingleton } from '$lib/shiki';
	import { Button, Icon, Separator } from 'lapikit/components';

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

<div id={name} class="component-preview--wrapper rounded-xl">
	{#if !header}
		<div class="mx-2 flex items-center gap-2 py-2">
			<p>{name}</p>
		</div>

		<div class="flex items-center gap-2 md:justify-between">
			<div>
				<Button onclick={() => (tab = 'preview')} active={tab === 'preview'}>
					{$t('sandbox.preview')}
				</Button>
				<Button onclick={() => (tab = 'code')} active={tab === 'code'}>
					{$t('sandbox.code')}
				</Button>
			</div>
			<div>
				{#if header || tab === 'code'}
					<Button onclick={() => (expanded = !expanded)} active={expanded}>
						{#if expanded}
							{$t('sandbox.collapse_editor')}
						{:else}
							{$t('sandbox.expand_editor')}
						{/if}
					</Button>
				{/if}
			</div>
		</div>
	{/if}
	<Separator />

	<div class="relative">
		{#if header || tab === 'preview'}
			<div
				class="preview-component rounded-b-xl"
				style:display="flex"
				style:align-items="center"
				style:justify-content="center"
				style:max-width="100%"
				style:min-height="280px"
			>
				{@render component?.()}
			</div>
		{/if}
		{#if header || tab === 'code'}
			<div
				class="rounded-b-xl"
				style:height={expanded ? '' : '280px'}
				style:overflow="auto"
				style:position="relative"
				style:width="100%"
			>
				<Button
					class="sticky top-[10px] float-right mt-[10px] mr-[10px]"
					icon
					onclick={() => (copy = true)}
					active={copy}
				>
					<Icon icon={copy ? 'mgc_task_line' : 'mgc_clipboard_line'} />
				</Button>

				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<div bind:this={ref}>{@html codeHTML}</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.component-preview--wrapper {
		border: 1px solid var(--kit-state-shadow);
	}
	.preview-component {
		--pattern-fg: color-mix(in oklab, var(--kit-label-primary) 5%, transparent);
		--opacity-pattern: 50%;
		background-image: repeating-linear-gradient(
			315deg,
			var(--pattern-fg) 0,
			var(--pattern-fg) 1px,
			transparent 0,
			transparent var(--opacity-pattern)
		);
		background-size: 16px 16px;
		background-repeat: repeat;
	}
</style>
