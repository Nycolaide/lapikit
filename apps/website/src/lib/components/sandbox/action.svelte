<script lang="ts">
	import { t } from '$lib/i18n';
	import { Btn, Separator } from 'lapikit/components';
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
		<Btn onclick={() => handleTab('preview')} active={tab === 'preview'}>
			{$t('sandbox.preview')}
		</Btn>

		<Btn onclick={() => handleTab('code')} active={tab === 'code'}>
			{$t('sandbox.code')}
		</Btn>
	{/if}

	{#if presentation || tab === 'code' || tab === 'code-only'}
		<Btn
			onclick={() => handleExpand(expanded !== 'fit-content' ? 'fit-content' : '300px')}
			active={expanded === 'fit-content'}
		>
			{#if expanded !== 'fit-content'}
				{$t('sandbox.collapse_editor')}
			{:else}
				{$t('sandbox.expand_editor')}
			{/if}
		</Btn>
	{/if}
</div>

<Separator />
