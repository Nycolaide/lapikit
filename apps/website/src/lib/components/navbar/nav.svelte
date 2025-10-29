<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { breakpoints, viewport } from 'lapikit/stores';
	import { githubUrl, navigationMain } from '$lib/config';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { deviceUsed, search } from '$lib/stores/app';
	import { DrawerNavigation } from 'site-kit';
	import {
		Appbar,
		Button,
		Chip,
		Dropdown,
		Icon,
		List,
		ListItem,
		Separator,
		Toolbar,
		Tooltip
	} from 'lapikit/components';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';

	// modules
	import ThemeToggle from '$components/theme-toggle.svelte';

	let { npm, isHome, ...rest } = $props();

	// states
	let open: boolean = $state(false);
	let scrolled: boolean = $state(false);
	let dropdownRefs: (HTMLDivElement | null)[] = $state([]);

	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	function handleDrawerToggle() {
		open = !open;
		if (browser) {
			document.body.style.overflow = open ? 'hidden' : '';
		}
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
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img
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

		<Button href={githubUrl} target="_blank" aria-label="GitHub">
			<Icon icon="mgc_github_line" />
			{formatNumber(npm?.downloads || 0)}
		</Button>

		<Button class="md:hidden!" onclick={() => handleDrawerToggle()} icon>
			<Icon icon="mgc_menu_line" />
		</Button>
	</div>
</Appbar>

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
