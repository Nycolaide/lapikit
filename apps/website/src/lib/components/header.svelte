<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { deviceUsed } from '$lib/stores/app.js';

	//components
	import { Appbar, Button, Chip, Icon, Tooltip } from 'lapikit/components';
	import ThemeToggle from './theme-toggle.svelte';
	import Search from './search/search.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapikit.webp?enhanced';
	import { githubUrl, navigationMain } from '$lib/config';

	interface Props {
		app?: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
	}

	let { app, data, ...rest }: Props = $props();

	// states
	let search: boolean = $state(false);

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			search = true;
		}
	}
</script>

{#if app}
	<Appbar
		class="sticky top-0 z-100"
		classContent=" mx-auto flex w-full max-w-[90rem] items-center justify-between grid md:grid-cols-3"
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" />
					<h1 class="text-2xl font-bold">Lapikit</h1>
				</div>
			</a>

			<Chip variant="outline" size="xs" color="accent-primary" class="px-2!">
				{`v${data?.npm?.version || '0.0.0'}`}
			</Chip>

			{#if $viewport.innerWidth >= $breakpoints.md}
				{#each navigationMain as { key, path, external } (key)}
					<Button
						href={path}
						target={external && '_blank'}
						active={page.url.pathname === path}
						rounded="full"
						variant="text"
					>
						<span class="font-semibold">
							{capitalize($t(`navigation.${key}`))}
						</span>
					</Button>
				{/each}
			{/if}
		</div>

		<div class="flex items-center justify-end gap-2">
			{#if $viewport.innerWidth >= $breakpoints.lg}
				<Button
					onclick={() => (search = !search)}
					aria-label="Search"
					background="background-tertiary"
					rounded="full"
				>
					{#snippet prepend()}
						<Icon icon="mgc_search_line" />
					{/snippet}
					{capitalize($t('navigation.search_bar.button'))}
					{#snippet append()}
						<Chip size="sm" density="compact" rounded="full">
							{#if $deviceUsed === 'apple'}
								(⌘ + K)
							{:else}
								(ctrl + K)
							{/if}
						</Chip>
					{/snippet}
				</Button>
			{:else}
				<Tooltip
					label={capitalize($t('navigation.open-search')) +
						($deviceUsed === 'apple' ? ' (⌘ + K)' : ' (ctrl + K)')}
					placement="bottom"
				>
					<Button icon onclick={() => (search = !search)} aria-label="Search">
						<Icon icon="mgc_search_line" />
					</Button>
				</Tooltip>
			{/if}

			<ThemeToggle />

			<Button href={githubUrl} target="_blank" aria-label="GitHub">
				<Icon icon="mgc_github_line" />
				{formatNumber(data?.npm?.downloads || 0)}
			</Button>
		</div>
	</Appbar>
{:else}
	<Appbar
		class="sticky top-0 z-100"
		classContent="items-center justify-between grid grid-cols-[auto_auto]"
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" />
					<h1 class="text-2xl font-bold">Lapikit</h1>
					<span class="text-2xl font-bold" style="color: var(--kit-accent-primary)">Docs</span>
				</div>
			</a>

			<Chip variant="outline" size="xs" color="accent-primary"
				>{`v${data?.npm?.version || '0.0.0'}`}</Chip
			>
		</div>

		<div class="flex items-center justify-end gap-2">
			<Tooltip
				label={capitalize($t('navigation.open-search')) +
					($deviceUsed === 'apple' ? ' (⌘ + K)' : ' (ctrl + K)')}
				placement="bottom"
			>
				<Button icon onclick={() => (search = !search)} aria-label="Search">
					<Icon icon="mgc_search_line" />
				</Button>
			</Tooltip>

			<ThemeToggle />

			<Button
				href={githubUrl}
				target="_blank"
				aria-label="GitHub"
				background="service-github"
				color="service-on-github"
			>
				<Icon icon="mgc_github_line" />
				{formatNumber(data?.npm?.downloads || 0)}
			</Button>
		</div>
	</Appbar>
{/if}

<Search bind:open={search} />

<style>
	#lapikit-logo {
		width: 38px;
		min-width: 38px;
	}
</style>
