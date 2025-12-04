<script lang="ts">
	import { deviceUsed, search } from '$lib/stores/app';
	import { Appbar, Button, Chip, Icon, Tooltip } from 'lapikit/components';

	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import type { DocNavProps } from '$lib/types/navigation';

	// modules
	import ThemeToggle from '$components/theme-toggle.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';

	let { url, npm, ...rest }: DocNavProps = $props();
</script>

<Appbar
	class="z-100 sticky top-0"
	classContent="mx-auto flex w-full  items-center justify-between grid md:grid-cols-3"
	background="background-primary"
	{...rest}
>
	<div class="flex items-center justify-start gap-2">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img
					id="lapikit-logo"
					src={LapikitLogo}
					alt="Lapikit logo"
					class="no-select w-[38px] min-w-[38px]"
				/>
				<p class="text-2xl font-bold">Lapikit</p>
			</div>
		</a>

		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="/docs/changelog" class="text-xs opacity-70 hover:opacity-100">
			{`v${npm?.version || '0.0.0'}`}
		</a>
	</div>

	<div>
		{#if $viewport.innerWidth >= $breakpoints.lg}
			<Button
				onclick={() => search.set(!$search)}
				aria-label="Search"
				background="background-tertiary"
				rounded="full"
				class="grid! min-w-[320px] grid-cols-[auto_1fr_auto] gap-2"
			>
				{#snippet prepend()}
					<Icon icon="mgc_search_line" />

					{capitalize('search...')}
				{/snippet}

				{#snippet append()}
					<Chip size="sm" density="compact" rounded="full" class="px-2!">
						{#if $deviceUsed === 'apple'}
							⌘ + K
						{:else}
							ctrl + K
						{/if}
					</Chip>
				{/snippet}
			</Button>
		{/if}
	</div>

	<div class="flex items-center justify-end gap-2">
		{#if $viewport.innerWidth < $breakpoints.lg}
			<Tooltip
				label={capitalize('open search') + ($deviceUsed === 'apple' ? ' (⌘ + K)' : ' (ctrl + K)')}
				placement="bottom"
			>
				<Button icon onclick={() => search.set(!$search)} aria-label="Search">
					<Icon icon="mgc_search_line" />
				</Button>
			</Tooltip>
		{/if}

		<ThemeToggle icon class="hidden! md:inline-flex!" />

		<Button href={url.github.repository} target="_blank" aria-label="GitHub Counter">
			<Icon icon="mgc_github_line" />
			{formatNumber(npm?.downloads || 0)}
		</Button>
	</div>
</Appbar>
