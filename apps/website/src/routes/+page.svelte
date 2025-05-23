<script lang="ts">
	import { t, locale, locales } from '$lib/i18n';
	import { Component, BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Btn, List, ListItem, Appbar, Icon, Chip, Separator } from 'lapikit/components';
	import { navigationMain } from '$lib/config';
	import { page } from '$app/state';
	import CardContact from '$lib/components/card-contact.svelte';
	import CardGame from '$lib/components/card-game.svelte';

	let time: string = $state('');
	let search = $state('');
	let results = $state<{ title: string; description: string }[]>([]);
	let timeout: NodeJS.Timeout;

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
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
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

<h2>Btn</h2>

<Btn>button default</Btn>
<br />
<Btn size="sm">button sm</Btn>
<br />
<Btn size={{ xs: 'sm', md: 'lg', xl: 'xs' }} class="demo">button media</Btn>

<div class="flex lg:flex">demo</div>

<Appbar
	classContent="flex lg:grid lg:grid-cols-[auto_auto_auto] max-lg:justify-between"
	density={{ _default: 'default', md: 'comfortable' }}
>
	<p class="text-2xl font-bold">Lapikit</p>
	<List
		orientation="horizontal"
		rounded="full"
		class="hidden-mobile mr-0 ml-auto gap-2 lg:mr-auto "
	>
		{#each navigationMain as { key, path, external } (key)}
			<ListItem href={path} target={external && '_blank'} active={page.url.pathname === path}>
				{$t(`navigation.${key}`)}
			</ListItem>
		{/each}
	</List>
	<div class="justify-end gap-3 lg:flex">
		<Btn density="comfortable">Get started</Btn>
	</div>
</Appbar>

<section
	class="desktop:max-h-[900px] flex flex-col justify-between overflow-hidden pt-20 lg:pt-[7em]"
>
	<div class="mx-7 text-center lg:mx-auto lg:w-7/12">
		<Chip href="/" variant="outline">
			<Icon icon="mgc_box_2_line" />
			<Separator orientation="vertical" />
			{$t('homepage.new_stable_version', { version: '0.0.0' })}
		</Chip>
		<h1
			class="mx-auto mt-[0.2em] mb-[0.35em] pb-[0.1em] text-4xl leading-[102%] font-semibold text-balance lg:max-w-3xl lg:text-7xl"
		>
			{$t('homepage.main_title')}
		</h1>
		<p
			class="mx-auto mb-[2em] max-w-sm text-sm leading-[144%] font-medium sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg"
		>
			{$t('homepage.main_introduction')}
		</p>
		<div>
			<Btn size="lg" href="/docs">
				{$t('homepage.main_cta')}
			</Btn>
		</div>
	</div>
</section>

<CardContact />
<CardGame />

<BottomNavigation>
	{#each navigationMain as { key, path, external, icon } (key)}
		<BottomNavigationItem
			is="a"
			active={page.url.pathname === path}
			href={path}
			target={external && '_blank'}
		>
			<Icon {icon} size="xl" {path} target={external && '_blank'} />
			{$t(`navigation.${key}`)}
		</BottomNavigationItem>
	{/each}
</BottomNavigation>
