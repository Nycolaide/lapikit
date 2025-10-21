<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { deviceUsed } from '$lib/stores/app.js';

	//components
	import {
		Appbar,
		Button,
		Chip,
		Dropdown,
		Icon,
		List,
		ListItem,
		Tooltip
	} from 'lapikit/components';
	import ThemeToggle from './theme-toggle.svelte';
	import Search from './search/search.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';
	import { githubUrl, navigationMain } from '$lib/config';

	interface Props {
		app?: boolean;
		home?: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
	}

	let { app, home, data, ...rest }: Props = $props();

	// states
	let search: boolean = $state(false);
	let scrolled: boolean = $state(false);
	let dropdownRefs: (HTMLDivElement | null)[] = $state([]);

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('scroll', handleScroll);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('scroll', handleScroll);
		}
	});

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			search = true;
		}
	}

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}
</script>

{#if app}
	<Appbar
		class="sticky top-0 z-100"
		classContent=" mx-auto flex w-full max-w-[90rem] items-center justify-between grid md:grid-cols-3"
		background={scrolled ? 'background-primary' : 'transparent'}
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" />
					<h1 class="text-2xl font-bold">Lapikit</h1>
				</div>
			</a>

			<a href="/docs/changelog" class="text-xs opacity-70 hover:opacity-100">
				{`v${data?.npm?.version || '0.0.0'}`}
			</a>

			{#if $viewport.innerWidth >= $breakpoints.md}
				{#each navigationMain as { key, path, external, items }, index (key)}
					{#if items}
						<Dropdown openOnHover>
							{#snippet activator(model, handleMouseEvent)}
								<Button
									bind:ref={dropdownRefs[index]}
									onclick={() => model.toggle(dropdownRefs[index])}
									onmouseover={() => handleMouseEvent('open', dropdownRefs[index])}
									onmouseleave={() => handleMouseEvent('close', dropdownRefs[index])}
									rounded="full"
									variant="text"
									active={model.open}
								>
									<span class="font-semibold">
										{capitalize(`${key}`)}
									</span>

									{#snippet append()}
										<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
									{/snippet}
								</Button>
							{/snippet}

							<List rounded="xl">
								{#each items as { key, path, external } (key)}
									<ListItem
										href={path}
										target={external ? '_blank' : '_self'}
										variant="text"
										active={page.url.pathname === path}
									>
										{capitalize(`${key}`)}
									</ListItem>
								{/each}
							</List>
						</Dropdown>
					{:else}
						<Button
							href={path}
							target={external && '_blank'}
							active={page.url.pathname === path}
							rounded="full"
							variant="text"
						>
							<span class="font-semibold">
								{capitalize(`${key}`)}
							</span>
						</Button>
					{/if}
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
						<Chip size="sm" density="compact" rounded="full" class="px-2!">
							{#if $deviceUsed === 'apple'}
								⌘ + K
							{:else}
								ctrl + K
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

			{#if !home}
				<ThemeToggle icon class="hidden! md:inline-flex!" />
			{/if}

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

			<ThemeToggle icon />

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
