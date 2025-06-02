<script lang="ts">
	import { BROWSER } from 'esm-env';
	import { t, locale, locales } from '$lib/i18n';
	import { Appbar, Btn, Icon, List, ListItem, Spacer } from 'lapikit/components';
	import { Drawer, Component, Darkmode } from 'site-kit';
	import { colorScheme, setColorScheme } from 'lapikit/stores';
	import { sectionDocs, type MetaDataPages } from '$lib/config.js';
	import { Footer } from '$lib/components/index.js';
	import { onMount } from 'svelte';
	import { pagesNavigation, setPages } from '$lib/stores/app.js';
	import SearchBar from '$lib/components/search-bar.svelte';
	import DarkmodeV2 from '$lib/components/darkmode-v2.svelte';
	let { children, data } = $props();

	type PagesFilter = {
		key: string;
		icon?: string;
		submenu?: boolean;
		pages: MetaDataPages[];
	}[];

	let open = $state(false);
	let time: string = $state('');
	let search = $state('');
	let results = $state<{ title: string; description: string }[]>([]);
	let timeout: NodeJS.Timeout;

	let sizeWidthScreen = $state(0);
	let selectedSection = $state<number | null>(null);
	let pagesGrouped: PagesFilter = $state([]);

	onMount(() => {
		setPages(data?.pages);
		console.log('data', data);
	});

	$effect(() => {
		const lang = $locale;
		time = new Date().toLocaleDateString(lang, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	function handleInput(event: Event) {
		search = (event.target as HTMLInputElement).value;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fetchResults();
		}, 300);
	}

	async function fetchResults() {
		if (search.trim() === '') {
			results = [];
			return;
		}

		try {
			const res = await fetch('/api/content');
			const data = await res.json();

			if (data.length === 0) {
				results = [];
				return;
			} else {
				results = data.filter(
					(item: { title: string; description: string }) =>
						item.title.toLowerCase().includes(search.toLowerCase()) ||
						item.description.toLowerCase().includes(search.toLowerCase())
				);
			}
		} catch (error) {
			console.error('Error while fetching:', error);
		}
	}

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

<Appbar density={{ _default: 'default', md: 'comfortable' }} class="fixed top-0 z-100 w-full">
	<a href="/">
		<p class="text-2xl font-bold">Lapikit</p>
	</a>

	<Spacer />
	<SearchBar />
	<DarkmodeV2 />
	<Btn icon>
		<Icon icon="mgc_github_line" />
	</Btn>
</Appbar>

<Drawer bind:open>
	{#snippet navigation()}
		<p>Navigation</p>

		{#each $pagesNavigation as section, index (section.key)}
			<List class="hidden-mobile">
				{#if section.submenu}
					<ListItem>
						{section.key}
					</ListItem>
				{/if}

				{#each section.pages as page (page.slug)}
					<ListItem href={`/${page.slug}`} onclick={() => (open = false)}>
						{#if page.icon}
							<Icon icon={page.icon} />
						{/if}
						{page.title}
					</ListItem>
				{/each}
			</List>

			<List class="display-mobile">
				{#if selectedSection === null}
					<!-- {#each pagesGrouped as section, index (section.key)} -->
					{#if section.submenu}
						<ListItem onclick={() => (selectedSection = index)}>
							{#if section.icon}
								<Icon icon={section.icon} />
							{/if}
							{section.key}
						</ListItem>
					{:else}
						{#each section.pages as page (page.slug)}
							<ListItem href={`/${page.slug}`} onclick={() => (open = false)}>
								{#if page.icon}
									<Icon icon={page.icon} />
								{/if}
								{page.title}
							</ListItem>
						{/each}
					{/if}
					<!-- {/each} -->
				{:else}
					<ListItem onclick={() => (selectedSection = null)}>
						{$t('navigation.back_to_sections')}
					</ListItem>

					{#each pagesGrouped[selectedSection].pages as page (page.slug)}
						<ListItem href={`/${page.slug}`} onclick={() => (open = false)}>
							{#if page.icon}
								<Icon icon={page.icon} />
							{/if}
							{page.title}
						</ListItem>
					{/each}
				{/if}
			</List>
		{/each}
	{/snippet}

	<Btn
		onclick={() => (open = !open)}
		size="xl"
		density="comfortable"
		rounded="lg"
		class="hidden-laptop fixed right-[0.75rem] bottom-[0.75rem] z-1100"
	>
		{open ? $t('navigation.close') : $t('navigation.open')}
	</Btn>
	<Darkmode scheme={$colorScheme} handle={setColorScheme} />

	<p>{$colorScheme}</p>

	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
	</p>
	<Component />

	<p>
		<select bind:value={$locale} aria-label="lang">
			{#each locales as l (l)}
				<option value={l}>{l}</option>
			{/each}
		</select>
	</p>

	<h1>{$t('homepage.title')}!</h1>
	<p>{$t('homepage.welcome', { name: 'Jane Doe' })}!</p>
	<p>{$t('homepage.time', { time })}!</p>

	<input placeholder="search" bind:value={search} oninput={handleInput} />
	{#each results as result (result)}
		<div>
			<p>{result?.title}</p>
			<p>{result?.description}</p>
		</div>
	{/each}

	{@render children?.()}

	<Footer />
</Drawer>
