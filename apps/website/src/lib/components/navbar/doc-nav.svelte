<script lang="ts">
	import { deviceUsed, search } from '$lib/stores/app';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		Appbar,
		Button,
		Chip,
		Icon,
		List,
		ListItem,
		Separator,
		Spacer,
		Toolbar,
		Tooltip
	} from 'lapikit/components';

	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { navigationMain } from '$lib/config';
	import { DrawerNavigation } from 'site-kit';
	import type { DocNavProps } from '$lib/types/navigation';

	// modules
	import ThemeToggle from '$components/theme-toggle.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';

	let { url, npm, navigation, ...rest }: DocNavProps = $props();

	// states
	let open: boolean = $state(false);

	function handleDrawerToggle() {
		open = !open;
		if (browser) {
			document.body.style.overflow = open ? 'hidden' : '';
		}
	}

	$effect(() => {
		if ($viewport.innerWidth >= $breakpoints.md) {
			if (browser && open) {
				document.body.style.overflow = '';
			}

			open = false;
		}
	});

	$effect(() => {
		console.log('Available sections:', navigation);
	});
</script>

<Appbar
	class="z-100 sticky top-0"
	classContent="mx-auto flex w-full  items-center justify-between grid md:grid-cols-3"
	background="background-primary"
	{...rest}
>
	<div class="flex items-center justify-start gap-2">
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img
					id="lapikit-logo"
					src={LapikitLogo}
					alt="Lapikit logo"
					class="no-select w-[38px] min-w-[38px]"
				/>
				<h1 class="text-2xl font-bold">Lapikit</h1>
			</div>
		</a>

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

		<Button href={url.github.repository} target="_blank" aria-label="GitHub">
			<Icon icon="mgc_github_line" />
			{formatNumber(npm?.downloads || 0)}
		</Button>

		<Button class="md:hidden!" onclick={() => handleDrawerToggle()} icon>
			<Icon icon="mgc_menu_line" />
		</Button>
	</div>
</Appbar>
<Toolbar
	class="z-95 hidden! lg:flex! sticky top-[64px]"
	classContent="mx-auto mx-1! gap-2"
	rounded="0"
	background="background-primary"
>
	{#if $viewport.innerWidth >= $breakpoints.md}
		{#each Object.entries(navigation) as [keyNav, sectionData] (keyNav)}
			<Button href={`${sectionData.slug}`} variant="text" class="capitalize">
				{sectionData.title}
			</Button>
		{/each}
	{/if}

	<Spacer />

	<Button href={url.github.discussions} target="_blank" variant="text">
		Feedback
		{#snippet prepend()}
			<Icon icon="mgc_light_line" class="rotate-180" />
		{/snippet}
	</Button>
</Toolbar>

<DrawerNavigation bind:open>
	<Toolbar background="transparent" density="comfortable" classContent="justify-between gap-4">
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img src={LapikitLogo} alt="Lapikit logo" class="no-select w-[30px]" />
				<h1 class="text-1xl font-bold">Lapikit</h1>
			</div>
		</a>

		<div>
			<Button icon onclick={() => (open = false)}>
				<Icon icon="mgc_close_line" />
			</Button>
		</div>
	</Toolbar>
	<Separator />
	<div>
		{#each navigationMain as { key, path, external, items } (key)}
			{#if items}
				<List nav density="compact" variant="text">
					<ListItem class="font-semibold">
						{capitalize(`${key}`)}
					</ListItem>

					{#each items as { key, path, external } (key)}
						<ListItem
							href={path}
							target={external ? '_blank' : ''}
							onclick={() => handleDrawerToggle()}
							active={page.url.pathname === path}
						>
							{capitalize(`${key}`)}
						</ListItem>
					{/each}
				</List>
			{:else}
				<List nav density="compact" variant="text">
					<ListItem
						href={path}
						target={external ? '_blank' : ''}
						onclick={() => handleDrawerToggle()}
						active={page.url.pathname === path}
					>
						{capitalize(`${key}`)}
					</ListItem>
				</List>
			{/if}
		{/each}
	</div>
</DrawerNavigation>
