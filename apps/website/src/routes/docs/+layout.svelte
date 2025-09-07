<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { t } from '$lib/i18n';
	import { page as url } from '$app/state';
	import { Appbar, Button, Chip, Icon, List, ListItem, Spacer } from 'lapikit/components';
	import { Drawer } from 'site-kit';
	import { capitalize } from 'site-kit/actions';

	// modules
	import { SearchBar, Search, ThemeToggle, ReturnTopPage } from '$lib/components/index.js';
	import { PageTransition } from '../../animations/index.js';

	let { children, data } = $props();

	// states
	let open = $state(false);
	let openSearch = $state(false);
	let sizeWidthScreen = $state(0);
	let selectedSection = $state<number | null>(null);
	let navigationRoutes = $state(data.routes || []);

	$effect(() => {
		if (open === false) {
			selectedSection = null;
		}
	});

	$effect(() => {
		if (data.routes) {
			navigationRoutes = data.routes;
		}
	});

	function disabledScroll(state: boolean) {
		if (BROWSER) {
			document.body.style.overflow = state ? 'hidden' : '';
		}
	}

	const handleNavigation = () => {
		if (open) {
			if (sizeWidthScreen < 1024) {
				disabledScroll(true);
			}
		} else {
			if (sizeWidthScreen < 1024) {
				disabledScroll(false);
			}
		}
	};

	$effect(() => {
		handleNavigation();
		if (sizeWidthScreen >= 640) selectedSection = null;
	});
</script>

<svelte:window bind:innerWidth={sizeWidthScreen} />

<Appbar density={{ base: 'default', md: 'comfortable' }} class="sticky top-0 z-100 w-full">
	<a href="/">
		<p class="text-2xl font-bold">Lapikit</p>
	</a>

	<Spacer />

	<div>
		<SearchBar bind:open={openSearch} />
		<ThemeToggle />
		<Button
			icon
			background="github"
			color="on-github"
			href="https://github.com/Nycolaide/lapikit"
			target="_blank"
		>
			<Icon icon="mgc_github_line" />
		</Button>
	</div>
</Appbar>

<Search bind:open={openSearch} />

<Drawer bind:open>
	{#snippet navigation()}
		{#each navigationRoutes as section, index (section.key)}
			<List class="kit-device--oh-mobile" nav density="compact" variant="text">
				{#if section.submenu}
					<ListItem class="font-semibold">
						{capitalize(section.key)}
					</ListItem>
				{/if}

				{#each section.pages as page (page.metadata?.slug)}
					<ListItem
						href={`/docs${page.metadata?.slug}`}
						onclick={() => (open = false)}
						active={url.url.pathname === `/docs${page.metadata?.slug}`}
					>
						{#if page.style?.icon}
							<Icon icon={page.style.icon} />
						{/if}
						{capitalize(page.title)}

						{#if page.state?.status}
							<Chip
								rounded="sm"
								size="xs"
								success={page.state.status === 'new'}
								warning={page.state.status === 'updated'}
								error={page.state.status === 'deprecated'}
								info={page.state.status === 'preview'}
							>
								{capitalize($t(`navigation.state.${page.state.status}`))}
							</Chip>
						{/if}
					</ListItem>
				{/each}
			</List>

			<List class="kit-device--od-mobile" nav>
				{#if selectedSection === null}
					{#if section.submenu}
						<ListItem onclick={() => (selectedSection = index)}>
							{#if section.icon}
								<Icon icon={section.icon} />
							{/if}
							{capitalize(section.key)}
						</ListItem>
					{:else}
						{#each section.pages as page (page.metadata?.slug)}
							<ListItem href={`/docs${page.metadata?.slug}`} onclick={() => (open = false)}>
								{#if page.style?.icon}
									<Icon icon={page.style.icon} />
								{/if}
								{capitalize(page.title)}

								{#if page.state?.status}
									<Chip
										rounded="sm"
										size="xs"
										success={page.state.status === 'new'}
										warning={page.state.status === 'updated'}
										error={page.state.status === 'deprecated'}
										info={page.state.status === 'preview'}
									>
										{capitalize($t(`navigation.state.${page.state.status}`))}
									</Chip>
								{/if}
							</ListItem>
						{/each}
					{/if}
				{:else if section.key === navigationRoutes[selectedSection].key}
					<ListItem onclick={() => (selectedSection = null)}>
						{#snippet append()}
							<Icon icon="mgc_left_line" size="lg" />
						{/snippet}
						{capitalize($t('navigation.back_to_sections'))}
					</ListItem>

					{#each navigationRoutes[selectedSection].pages as page (page.metadata?.slug)}
						<ListItem href={`/docs${page.metadata?.slug}`} onclick={() => (open = false)}>
							{#if page.style?.icon}
								<Icon icon={page.style.icon} />
							{/if}
							{capitalize(page.title)}
						</ListItem>
					{/each}
				{/if}
			</List>
		{/each}
	{/snippet}

	<Button
		onclick={() => (open = !open)}
		size="xl"
		density="comfortable"
		rounded="lg"
		class="kit-device--h-desktop fixed! right-[0.75rem] bottom-[0.75rem] z-1100"
		background="on-container"
		color="container"
	>
		<Icon icon={open ? 'mgc_close_line' : 'mgc_menu_line'} />
		{capitalize(open ? $t('navigation.close') : $t('navigation.open'))}
	</Button>

	<ReturnTopPage />

	<PageTransition url={data.url}>
		{@render children?.()}
	</PageTransition>
</Drawer>
