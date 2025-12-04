<script lang="ts">
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
		handleExpand,
		noExpandedButton = false,
		actions
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
				{capitalize('preview')}
			</Button>

			<Button onclick={() => handleTab('code')} active={tab === 'code'}>
				<Icon icon="mgc_code_line" />
				{capitalize('code')}
			</Button>
		{/if}

		{@render actions?.()}
	</div>

	<div>
		{#if (presentation || tab === 'code' || tab === 'code-only') && !noExpandedButton}
			<Button onclick={() => handleExpand(expanded ? false : true)} active={expanded}>
				{#if !expanded}
					<Icon icon="mgc_down_line" />
					{capitalize('expand')}
				{:else}
					<Icon icon="mgc_up_line" />
					{capitalize('collapse')}
				{/if}
			</Button>
		{/if}
		{#if !presentation && tab !== 'code' && tab !== 'code-only'}
			<ThemeToggleComponent bind:scheme={localColorScheme} />
		{/if}
	</div>
</div>

<Separator />
