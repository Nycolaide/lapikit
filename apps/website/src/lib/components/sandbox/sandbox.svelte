<script lang="ts">
	import type { SandboxProps } from './types';

	//modules
	import SandboxAction from './action.svelte';
	import SandboxCode from './code.svelte';
	import SandboxComponent from './component.svelte';

	let { name, presentation, component, code }: SandboxProps = $props();

	//state
	let expanded: boolean = $state(false);
	let tab: string = $state('preview');
	let localColorScheme: 'light' | 'dark' | undefined = $state(undefined);
	$effect.pre(() => {
		if (presentation) expanded = true;
	});

	$effect(() => {
		if (!component) tab = 'code-only';
		if (!code) tab = 'preview-only';
	});

	const handleExpand = (value: boolean) => {
		expanded = value;
	};
	const handleTab = (value: string) => {
		tab = value;
	};
</script>

<div id={name} class="lapikit-sandbox relative mt-6 mb-6 overflow-hidden rounded-xl">
	{#if presentation && component}
		<!-- presentation content -->
		{#if component}
			<div>
				<SandboxComponent>
					{@render component?.()}
				</SandboxComponent>
			</div>
		{/if}

		{#if code}
			<SandboxAction {presentation} bind:expanded bind:tab {handleExpand} {handleTab} />

			<div style:height="fit-content" style:max-height={expanded ? 'fit-content' : '300px'}>
				<SandboxCode bind:expanded {code} />
			</div>
		{/if}
	{:else}
		<!-- tab content -->
		<SandboxAction
			{presentation}
			bind:localColorScheme
			bind:expanded
			bind:tab
			{handleExpand}
			{handleTab}
		/>
		<div>
			{#if component && (tab === 'preview' || tab === 'preview-only')}
				<div class:dark={localColorScheme === 'dark'} class:light={localColorScheme === 'light'}>
					<SandboxComponent>
						{@render component?.()}
					</SandboxComponent>
				</div>
			{/if}

			{#if code && (tab === 'code' || tab === 'code-only')}
				<div
					style:height="fit-content"
					style:max-height={expanded ? 'fit-content' : '300px'}
					class="relative"
				>
					<SandboxCode bind:expanded {code} />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.lapikit-sandbox {
		border: 1px solid var(--kit-scrim);
	}

	.lapikit-sandbox :global(p) {
		margin-top: initial !important;
		line-height: initial !important;
	}
</style>
