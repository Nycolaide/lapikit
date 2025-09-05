<script lang="ts">
	import { t } from '$lib/i18n';
	import { BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Button, Appbar, Icon, Chip, Separator, Card } from 'lapikit/components';
	import { navigationMain } from '$lib/config';
	import { page } from '$app/state';
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();

	// states
	let openSearch: boolean = $state(false);

	// components
	import Head from '$lib/components/head.svelte';
	import { Sandbox, ThemeToggle, Footer } from '$lib/components/index.js';
	import Search from '$lib/components/search/search.svelte';

	// sample
	import CounterLapikit from '$lib/components/counter-lapikit.svelte';
	import CounterLapikitCode from '$lib/components/counter-lapikit.svelte?raw';

	const advantageLapikit = $state([
		{
			title: $t('homepage.dev_with_lapikit.card1.title'),
			paragraph: $t('homepage.dev_with_lapikit.card1.paragraph'),
			image: '/images/open-source.webp?enhanced',
			customClass: 'col-span-2 lg:col-span-1'
		},
		{
			title: $t('homepage.dev_with_lapikit.card2.title'),
			paragraph: $t('homepage.dev_with_lapikit.card2.paragraph'),
			image: '/images/styles.webp?enhanced'
		},
		{
			title: $t('homepage.dev_with_lapikit.card3.title'),
			paragraph: $t('homepage.dev_with_lapikit.card3.paragraph'),
			image: '/images/components.webp?enhanced'
		}
	]);

	const toolsLapikit = $state([
		{
			title: $t('homepage.lapikit_the_best.card.changelog'),
			href: '/docs/changelog'
		},
		{
			title: $t('homepage.lapikit_the_best.card.roadmap'),
			href: 'https://github.com/Nycolaide/lapikit/blob/main/packages/lapikit/ROADMAP.md',
			external: true
		},
		{
			title: $t('homepage.lapikit_the_best.card.install', {
				version: data?.npm?.version || '0.0.0'
			}),
			href: '/docs/getting-started'
		}
	]);
</script>

<Head
	title="Lapikit"
	description="Discover Lapikit, a component library optimized for Svelte. Quick to integrate, simple to style, and designed for front-end developers."
/>

<div id="head-lapikit">
	<Appbar
		classContent="flex items-center justify-between lg:grid lg:grid-cols-3"
		density={{ _default: 'default', md: 'comfortable' }}
	>
		<p class="text-2xl font-bold">Lapikit</p>
		<div class="hidden-mobile mr-0 ml-auto flex gap-2 lg:mr-auto">
			{#each navigationMain as { key, path, external } (key)}
				<Button
					href={path}
					target={external && '_blank'}
					active={page.url.pathname === path}
					rounded="full"
				>
					{capitalize($t(`navigation.${key}`))}
				</Button>
			{/each}
		</div>
		<div class="flex justify-end gap-3">
			<ThemeToggle app />

			<Button href="/docs/getting-started" density="comfortable" id="btn-getstarted-lapikit">
				{capitalize($t('homepage.top_cta'))}
			</Button>
		</div>
	</Appbar>

	<Search bind:open={openSearch} />

	<section
		class="desktop:max-h-[900px] flex h-[82vh] flex-col items-center justify-between justify-center overflow-hidden"
	>
		<div class="mx-7 text-center lg:mx-auto lg:w-7/12">
			<Chip href="/docs/changelog" variant="outline">
				<Icon icon="mgc_box_2_line" />
				<Separator orientation="vertical" />
				{capitalize(
					$t('homepage.version_lapikit_package', { version: data?.npm?.version || '0.0.0' })
				)}
			</Chip>
			<h1
				class="mx-auto mt-[0.2em] mb-[0.35em] pb-[0.1em] text-4xl leading-[102%] font-semibold text-balance lg:max-w-4xl lg:text-7xl"
			>
				{capitalize($t('homepage.main_title'))}
			</h1>
			<p
				class="mx-auto mb-[2em] max-w-sm text-sm leading-[144%] font-medium sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg"
			>
				{capitalize($t('homepage.main_introduction'))}
			</p>
			<div>
				<Button size="lg" href="/docs/components">
					{capitalize($t('homepage.main_cta'))}
				</Button>
			</div>
		</div>
	</section>
</div>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[700px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid gap-4">
		<div class="text-start">
			<h2 class="text-2xl font-semibold md:text-3xl">
				{capitalize($t('homepage.dev_with_lapikit.title'))}
			</h2>
		</div>

		<div class="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-x-[15px]">
			{#each advantageLapikit as { title, paragraph, image, customClass } (title)}
				<Card class={customClass ? `text-start ${customClass}` : 'text-start'}>
					<p class="px-[14px] pt-4 text-base leading-none font-semibold lg:pt-5 lg:text-[17px]">
						{title}
					</p>
					<div class="pt-8 pb-10 lg:pt-9 lg:pb-16">
						{#if image}
							<img
								src={image}
								alt={title}
								loading="lazy"
								class="relative mx-auto aspect-354/259 w-10/12 overflow-hidden bg-transparent lg:left-12 lg:ml-auto lg:w-full"
							/>
						{/if}
					</div>

					<p
						class="text-muted-foreground px-[14px] pb-4 text-[11px] font-medium opacity-75 lg:text-sm"
					>
						{paragraph}
					</p>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[700px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid gap-4">
		<div class="text-center">
			<p class="text-2xl font-semibold md:text-3xl">
				{capitalize($t('homepage.component_lapikit.title'))}
			</p>
			<p>{capitalize($t('homepage.component_lapikit.paragraph'))}</p>
		</div>

		<Sandbox name="counter-lapikit" code={CounterLapikitCode}>
			{#snippet component()}
				<CounterLapikit />
			{/snippet}
		</Sandbox>
	</div>
</section>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[700px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-[45%_1fr]">
		<div class="text-center lg:text-start">
			<h2 class="text-2xl font-semibold md:text-3xl">
				{capitalize($t('homepage.lapikit_the_best.title'))}
			</h2>
			<p>{capitalize($t('homepage.lapikit_the_best.paragraph'))}</p>
		</div>
		<div class="flex flex-col flex-wrap gap-5 text-start sm:flex-row">
			{#each toolsLapikit as { title, href, external } (title)}
				<Card
					class="min-w-[40%] flex-1 text-start"
					variant="outline"
					{href}
					target={external && '_blank'}
				>
					<div class="p-5">
						<p class="mb-4 flex-1 text-xl font-semibold">
							{title}
						</p>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[700px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<Card class="p-4 text-center">
		<div class="mb-6">
			<p class="text-2xl font-semibold md:text-3xl">
				{capitalize($t('homepage.lapikit_discover.title'))}
			</p>
			<p>{capitalize($t('homepage.lapikit_discover.paragraph'))}</p>
		</div>
		<div>
			<Button color="container" href="/docs/components">
				{capitalize($t('homepage.lapikit_discover.cta'))}
			</Button>
		</div>
	</Card>
</section>

<Footer />

<BottomNavigation>
	{#each navigationMain as { key, path, external, icon } (key)}
		<BottomNavigationItem
			is="a"
			active={page.url.pathname === path && !openSearch}
			href={path}
			onclick={() => (openSearch = false)}
			target={external && '_blank'}
		>
			<Icon {icon} size="xl" {path} target={external && '_blank'} />
			{capitalize($t(`navigation.${key}`))}
		</BottomNavigationItem>
	{/each}

	<BottomNavigationItem is="button" onclick={() => (openSearch = true)} active={openSearch}>
		<Icon icon="mgc_search_2_line" size="xl" />
		{capitalize($t('navigation.search_bar.button'))}
	</BottomNavigationItem>
</BottomNavigation>

<style>
	#head-lapikit {
		--opacity-pattern: 35%;
		--pattern: color-mix(in oklab, var(--kit-on-surface) var(--opacity-pattern), transparent);
		background-image: radial-gradient(var(--pattern) 1px, transparent 0);
		background-size: 16px 16px;
		background-repeat: repeat;
		width: 100%;
		min-height: 90vh;
	}
</style>
