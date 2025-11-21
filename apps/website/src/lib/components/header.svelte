<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { deviceUsed, search } from '$lib/stores/app';
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
	import type { NavigationData, NpmData, UrlConfig } from '$lib/types/navigation';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';

	// modules
	import ThemeToggle from '$components/theme-toggle.svelte';

	let {
		url,
		npm,
		isHome,
		navigation,
		...rest
	}: {
		url: UrlConfig;
		npm?: NpmData | null;
		isHome: boolean;
		navigation: NavigationData;
		[key: string]: unknown;
	} = $props();

	// states
	let open: boolean = $state(false);
	let scrolled: boolean = $state(false);
	let dropdownRef: HTMLDivElement | null = $state(null);

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});

	$effect(() => {
		if ($viewport.innerWidth >= $breakpoints.md) {
			if (browser && open) {
				document.body.style.overflow = '';
			}

			open = false;
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<Appbar
	class="sticky top-0 z-100"
	classContent="mx-auto flex w-full  items-center justify-between grid md:grid-cols-3 max-w-[95%]"
	background={scrolled ? 'background-primary' : 'transparent'}
	{...rest}
>
	<div class="flex items-center justify-start gap-2">
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img
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

		{#if $viewport.innerWidth >= $breakpoints.md}
			{#each Object.entries(navigation || {}) as [sectionKey, sectionValue] (sectionKey)}
				<Button
					href={sectionValue.slug}
					active={page.url.pathname === sectionValue.slug}
					rounded="full"
					variant="text"
					class="px-3!"
				>
					<span class="font-semibold">
						{capitalize(`${sectionValue.title}`)}
					</span>
				</Button>
			{/each}
		{/if}
	</div>

	<div class="flex items-center justify-end gap-2">
		{#if $viewport.innerWidth >= $breakpoints.lg}
			<Button
				onclick={() => search.set(!$search)}
				aria-label="Search"
				background="background-tertiary"
				rounded="full"
			>
				{#snippet prepend()}
					<Icon icon="mgc_search_line" />
				{/snippet}
				{capitalize('search...')}
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
				label={capitalize('Open search') + ($deviceUsed === 'apple' ? ' (⌘ + K)' : ' (ctrl + K)')}
				placement="bottom"
			>
				<Button icon onclick={() => search.set(!$search)} aria-label="Search">
					<Icon icon="mgc_search_line" />
				</Button>
			</Tooltip>
		{/if}

		{#if !isHome}
			<ThemeToggle icon class="hidden! md:inline-flex!" />
		{/if}

		<Button href={url.github.repository} target="_blank" aria-label="GitHub Counter">
			<Icon icon="mgc_github_line" />
			{formatNumber(npm?.downloads || 0)}
		</Button>

		<Dropdown closeOnClick>
			{#snippet activator(model)}
				<Button
					bind:ref={dropdownRef}
					onclick={() => model.toggle(dropdownRef)}
					class="md:hidden!"
					aria-label="Open navigation menu"
					icon
				>
					<Icon icon={model.open ? 'mgc_close_line' : 'mgc_menu_line'} />
				</Button>
			{/snippet}
			<div>
				<List>
					{#each Object.entries(navigation || {}) as [sectionKey, sectionValue] (sectionKey)}
						<ListItem href={sectionValue.slug} active={page.url.pathname === sectionValue.slug}>
							{capitalize(`${sectionValue.title}`)}
						</ListItem>
					{/each}
				</List>
			</div>
		</Dropdown>
	</div>
</Appbar>
