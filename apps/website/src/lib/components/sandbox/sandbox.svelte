<script lang="ts">
	import type { SandboxProps } from './types';

	//modules
	import SandboxAction from './action.svelte';
	import SandboxCode from './code.svelte';
	import SandboxComponent from './component.svelte';
	import { theme } from 'lapikit/stores';

	let { name, presentation, component, code, noExpandedButton, noCopy, actions }: SandboxProps =
		$props();

	//state
	let expanded: boolean = $state(false);
	let tab: string = $state('preview');
	let localColorScheme: string = $state($theme);

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
			<SandboxAction
				{presentation}
				bind:expanded
				bind:tab
				{handleExpand}
				{handleTab}
				{noExpandedButton}
				{actions}
			/>

			<div style:height="fit-content" style:max-height={expanded ? 'fit-content' : '300px'}>
				<SandboxCode bind:expanded {code} {noCopy} />
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
			{noExpandedButton}
			{actions}
		/>
		<div>
			{#if code && (tab === 'code' || tab === 'code-only')}
				<div style="background: #121212; position: absolute;height: 100%; width: 100%;"></div>
			{/if}
			{#if component && (tab === 'preview' || tab === 'preview-only')}
				<div
					class:kit-theme--dark={localColorScheme === 'dark'}
					class:kit-theme--light={localColorScheme === 'light'}
				>
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
					<SandboxCode bind:expanded {code} {noCopy} />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.lapikit-sandbox {
		border: 1px solid var(--kit-label-tertiary);
	}

	.lapikit-sandbox :global(p) {
		margin-top: initial !important;
		line-height: initial !important;
	}

	.lapikit-sandbox :global(img) {
		margin: initial !important;
	}

	.lapikit-sandbox :global(a) {
		text-decoration: none !important;
	}
</style>
