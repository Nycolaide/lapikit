<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Icon, Separator } from 'lapikit/components';
	import type { SandboxActionsProps } from './types';
	import ThemeToggleComponent from './theme-toggle-component.svelte';
	import { capitalize } from 'site-kit/actions';

	let {
		presentation,
		tab = $bindable(),
		expanded = $bindable(),
		localColorScheme = $bindable(),
		handleTab,
		handleExpand
	}: SandboxActionsProps = $props();
</script>

{#if presentation}
	<Separator />
{/if}

<div class="flex justify-between gap-2">
	<div>
		{#if !presentation && !tab?.includes('only')}
			<Button onclick={() => handleTab('preview')} active={tab === 'preview'}>
				<Icon icon="mgc_eye_2_line" />
				{capitalize($t('docs.sandbox.actions.preview'))}
			</Button>

			<Button onclick={() => handleTab('code')} active={tab === 'code'}>
				<Icon icon="mgc_code_line" />
				{capitalize($t('docs.sandbox.actions.code'))}
			</Button>
		{/if}
	</div>

	<div>
		{#if presentation || tab === 'code' || tab === 'code-only'}
			<Button onclick={() => handleExpand(expanded ? false : true)} active={expanded}>
				{#if !expanded}
					<Icon icon="mgc_down_line" />
					{capitalize($t('docs.sandbox.actions.expand'))}
				{:else}
					<Icon icon="mgc_up_line" />
					{capitalize($t('docs.sandbox.actions.collapse'))}
				{/if}
			</Button>
		{/if}
		{#if !presentation && tab !== 'code' && tab !== 'code-only'}
			<ThemeToggleComponent bind:scheme={localColorScheme} />
		{/if}
	</div>
</div>

<Separator />
