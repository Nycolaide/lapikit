<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { browser } from '$app/environment';
	import { breakpoints, viewport } from 'lapikit/stores';
	import { capitalize, formatNumber } from 'site-kit/actions';
	import { deviceUsed, packageManager } from '$lib/stores/app.js';

	//components
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
	import ThemeToggle from './theme-toggle.svelte';
	import Search from './search.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapinosaure/lapinosaure.webp?enhanced';
	import { githubUrl, navigationMain, packageManagers } from '$lib/config';
	import { DrawerNavigation } from 'site-kit';

	interface Props {
		app?: boolean;
		home?: boolean;
		docs?: boolean;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data?: any;
	}

	let { app, home, data, docs, ...rest }: Props = $props();

	// states
	let openDrawer: boolean = $state(false);
	let search: boolean = $state(false);
	let scrolled: boolean = $state(false);
	let dropdownRefs: (HTMLDivElement | null)[] = $state([]);

	let settingsDropdownRef: HTMLDivElement | null = $state(null);
	let settingsDropdownOpen: boolean = $state(false);
	let settingsDropdownSection: string | undefined = $state(undefined);

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

	function handleDrawerToggle() {
		openDrawer = !openDrawer;
		if (browser) {
			document.body.style.overflow = openDrawer ? 'hidden' : '';
		}
	}

	$effect(() => {
		if ($viewport.innerWidth >= $breakpoints.md) {
			if (browser && openDrawer) {
				document.body.style.overflow = '';
			}

			openDrawer = false;
		}
	});

	$effect(() => {
		if (settingsDropdownOpen === false) {
			settingsDropdownSection = undefined;
		}
	});
</script>

{#if app && !docs}
	<Appbar
		class="sticky top-0 z-100"
		classContent={`mx-auto flex w-full  items-center justify-between grid md:grid-cols-3 ${!docs && 'max-w-[95%]'}`}
		background={scrolled ? 'background-primary' : 'transparent'}
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" class="no-select" />
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

			<Button class="md:hidden!" onclick={() => handleDrawerToggle()} icon>
				<Icon icon="mgc_menu_line" />
			</Button>
		</div>
	</Appbar>
{:else if docs}
	<Appbar
		class="sticky top-0 z-100"
		classContent={`mx-auto flex w-full  items-center justify-between grid md:grid-cols-3 ${!docs && 'max-w-[95%]'}`}
		background={scrolled ? 'background-primary' : 'transparent'}
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" class="no-select" />
					<h1 class="text-2xl font-bold">Lapikit</h1>
				</div>
			</a>

			<a href="/docs/changelog" class="text-xs opacity-70 hover:opacity-100">
				{`v${data?.npm?.version || '0.0.0'}`}
			</a>
		</div>

		<div>
			{#if $viewport.innerWidth >= $breakpoints.lg}
				<Button
					onclick={() => (search = !search)}
					aria-label="Search"
					background="background-tertiary"
					rounded="full"
					class="grid! min-w-[320px] grid-cols-[auto_1fr_auto] gap-2"
				>
					{#snippet prepend()}
						<Icon icon="mgc_search_line" />

						{capitalize($t('navigation.search_bar.button'))}
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
					label={capitalize($t('navigation.open-search')) +
						($deviceUsed === 'apple' ? ' (⌘ + K)' : ' (ctrl + K)')}
					placement="bottom"
				>
					<Button icon onclick={() => (search = !search)} aria-label="Search">
						<Icon icon="mgc_search_line" />
					</Button>
				</Tooltip>
			{/if}

			<ThemeToggle icon class="hidden! md:inline-flex!" />

			<Dropdown open={settingsDropdownOpen}>
				{#snippet activator(model)}
					<Button
						bind:ref={settingsDropdownRef}
						onclick={() => model.toggle(settingsDropdownRef)}
						icon
					>
						<Icon icon={model.open ? 'mgc_settings_3_fill' : 'mgc_settings_3_line'} />
					</Button>
				{/snippet}
				<List>
					{#if settingsDropdownSection === 'packageManager'}
						{#each packageManagers as pm (pm.name)}
							<ListItem
								onclick={() => {
									packageManager.set(pm.name);
									settingsDropdownSection = undefined;
								}}
							>
								{capitalize(pm.name)}

								{#snippet prepend()}
									{#if $packageManager === pm.name}
										<Icon icon="mgc_round_fill" color="accent-success" />
									{:else}
										<Icon icon="mgc_round_line" />
									{/if}
								{/snippet}

								{#snippet append()}
									<Icon icon={pm.icon} />
								{/snippet}
							</ListItem>
						{/each}
					{:else}
						<ListItem onclick={() => (settingsDropdownSection = 'packageManager')}>
							{#snippet append()}
								{#each packageManagers as pm (pm.name)}
									{#if $packageManager === pm.name}
										<Icon icon={pm.icon} />
									{/if}
								{/each}
							{/snippet}
							{#each packageManagers as pm (pm.name)}
								{#if $packageManager === pm.name}
									{capitalize(pm.name)}
								{/if}
							{/each}
							{#snippet prepend()}
								<Icon icon="mgc_right_line" />
							{/snippet}
						</ListItem>
					{/if}
				</List>
			</Dropdown>

			<Button href={githubUrl} target="_blank" aria-label="GitHub">
				<Icon icon="mgc_github_line" />
				{formatNumber(data?.npm?.downloads || 0)}
			</Button>

			<Button class="md:hidden!" onclick={() => handleDrawerToggle()} icon>
				<Icon icon="mgc_menu_line" />
			</Button>
		</div>
	</Appbar>
	<Toolbar
		class="sticky top-[64px] z-100 hidden! lg:flex!"
		classContent="mx-auto mx-1! gap-2"
		rounded="0"
	>
		{#if $viewport.innerWidth >= $breakpoints.md}
			{#each navigationMain as { key, path, external, icon } (key)}
				<Button
					href={path}
					target={external && '_blank'}
					active={page.url.pathname === path}
					variant="text"
				>
					{#snippet prepend()}
						<Icon {icon} />
					{/snippet}
					<span>
						{capitalize(`${key}`)}
					</span>
				</Button>
			{/each}
		{/if}
	</Toolbar>
{:else}
	<Appbar
		class="sticky top-0 z-100"
		classContent="items-center justify-between grid grid-cols-[auto_auto]"
		{...rest}
	>
		<div class="flex items-center justify-start gap-2">
			<a href="/">
				<div class="flex items-center gap-2">
					<enhanced:img id="lapikit-logo" src={LapikitLogo} alt="Lapikit logo" class="no-select" />
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

<DrawerNavigation bind:open={openDrawer}>
	<Toolbar background="transparent" density="comfortable" classContent="justify-between gap-4">
		<a href="/">
			<div class="flex items-center gap-2">
				<enhanced:img src={LapikitLogo} alt="Lapikit logo" class="no-select w-[30px]" />
				<h1 class="text-1xl font-bold">Lapikit</h1>
			</div>
		</a>

		<div>
			<Button icon onclick={() => (openDrawer = false)}>
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

<style>
	#lapikit-logo {
		width: 38px;
		min-width: 38px;
	}
</style>
