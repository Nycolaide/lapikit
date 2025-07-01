<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { t } from '$lib/i18n';
	import { page as url } from '$app/state';
	import { Appbar, Button, Chip, Icon, List, ListItem, Spacer } from 'lapikit/components';
	import { Drawer } from 'site-kit';
	import { sectionDocs, type MetaDataPages } from '$lib/config.js';
	import { ThemeToggle, SearchBar } from '$lib/components/index.js';
	import { onMount } from 'svelte';
	import { pagesNavigation, setPages } from '$lib/stores/app.js';
	import { capitalize } from 'site-kit/actions';

	let { children, data } = $props();

	type PagesFilter = {
		key: string;
		icon?: string;
		submenu?: boolean;
		pages: MetaDataPages[];
	}[];

	let open = $state(false);

	let sizeWidthScreen = $state(0);
	let selectedSection = $state<number | null>(null);
	let pagesGrouped: PagesFilter = $state([]);

	onMount(() => {
		setPages(data?.pages);
	});

	$effect(() => {
		if (open === false) {
			selectedSection = null;
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

	$effect(() => {
		if (data?.pages) {
			const knownKeys = new Set(sectionDocs.map((s) => s.key));
			const sectionMap = new Map<string, { key: string; icon?: string; pages: MetaDataPages[] }>();
			for (const section of sectionDocs) {
				sectionMap.set(section.key, {
					...section,
					pages: []
				});
			}

			for (const page of data.pages) {
				const section = page.section;
				const key = section && knownKeys.has(section) ? section : 'undefined';

				sectionMap.get(key)?.pages.push(page);
			}

			pagesGrouped = sectionDocs.map((s) => sectionMap.get(s.key)!);
		}
	});
</script>

<svelte:window bind:innerWidth={sizeWidthScreen} />

<Appbar density={{ _default: 'default', md: 'comfortable' }} class="sticky top-0 z-100 w-full">
	<a href="/">
		<p class="text-2xl font-bold">Lapikit</p>
	</a>

	<Spacer />

	<div>
		<SearchBar />
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

<Drawer bind:open>
	{#snippet navigation()}
		{#each $pagesNavigation as section, index (section.key)}
			<List class="hidden-mobile" nav density="compact" variant="text">
				{#if section.submenu}
					<ListItem class="font-semibold">
						{capitalize(section.key)}
					</ListItem>
				{/if}

				{#each section.pages as page (page.slug)}
					<ListItem
						href={`/${page.slug}`}
						onclick={() => (open = false)}
						active={url.url.pathname === '/' + page.slug}
					>
						{#if page.icon}
							<Icon icon={page.icon} />
						{/if}
						{capitalize(page.title)}

						{#if page?.state}
							<Chip
								rounded="sm"
								size="xs"
								success={page.state === 'new'}
								warning={page.state === 'updated'}
								error={page.state === 'deprecated'}
								info={page.state === 'preview'}
							>
								{capitalize($t(`navigation.state.${page.state}`))}
							</Chip>
						{/if}
					</ListItem>
				{/each}
			</List>

			<List class="display-mobile" nav>
				{#if selectedSection === null}
					<!-- {#each pagesGrouped as section, index (section.key)} -->
					{#if section.submenu}
						<ListItem onclick={() => (selectedSection = index)}>
							{#if section.icon}
								<Icon icon={section.icon} />
							{/if}
							{capitalize(section.key)}
						</ListItem>
					{:else}
						{#each section.pages as page (page.slug)}
							<ListItem href={`/${page.slug}`} onclick={() => (open = false)}>
								{#if page.icon}
									<Icon icon={page.icon} />
								{/if}
								{capitalize(page.title)}

								{#if page?.state}
									<Chip
										rounded="sm"
										size="xs"
										success={page.state === 'new'}
										warning={page.state === 'updated'}
										error={page.state === 'deprecated'}
										info={page.state === 'preview'}
									>
										{capitalize($t(`navigation.state.${page.state}`))}
									</Chip>
								{/if}
							</ListItem>
						{/each}
					{/if}
					<!-- {/each} -->
				{:else if section.key === $pagesNavigation[selectedSection].key}
					<ListItem onclick={() => (selectedSection = null)}>
						{#snippet append()}
							<Icon icon="mgc_left_line" size="lg" />
						{/snippet}
						{capitalize($t('navigation.back_to_sections'))}
					</ListItem>

					{#each pagesGrouped[selectedSection].pages as page (page.slug)}
						<ListItem href={`/${page.slug}`} onclick={() => (open = false)}>
							{#if page.icon}
								<Icon icon={page.icon} />
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
		class="hidden-laptop fixed right-[0.75rem] bottom-[0.75rem] z-1100"
		background="on-container"
		color="container"
	>
		<Icon icon={open ? 'mgc_close_line' : 'mgc_menu_line'} />
		{capitalize(open ? $t('navigation.close') : $t('navigation.open'))}
	</Button>

	{@render children?.()}
</Drawer>
