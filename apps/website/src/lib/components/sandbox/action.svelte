<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Separator } from 'lapikit/components';
	import type { SandboxActionsProps } from './types';

	let {
		presentation,
		tab = $bindable(),
		expanded = $bindable(),
		handleTab,
		handleExpand
	}: SandboxActionsProps = $props();
</script>

{#if presentation}
	<Separator />
{/if}

<div>
	{#if !presentation && !tab?.includes('only')}
		<Button onclick={() => handleTab('preview')} active={tab === 'preview'}>
			{$t('sandbox.preview')}
		</Button>

		<Button onclick={() => handleTab('code')} active={tab === 'code'}>
			{$t('sandbox.code')}
		</Button>
	{/if}

	{#if presentation || tab === 'code' || tab === 'code-only'}
		<Button
			onclick={() => handleExpand(expanded !== 'fit-content' ? 'fit-content' : '300px')}
			active={expanded === 'fit-content'}
		>
			{#if expanded !== 'fit-content'}
				{$t('sandbox.collapse_editor')}
			{:else}
				{$t('sandbox.expand_editor')}
			{/if}
		</Button>
	{/if}
</div>

<Separator />
