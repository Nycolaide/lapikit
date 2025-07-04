<script lang="ts">
	import { t } from '$lib/i18n';
	import { BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Button, Appbar, Icon, Chip, Separator, Card } from 'lapikit/components';
	import { navigationMain } from '$lib/config';
	import { page } from '$app/state';
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();

	// demo code
	import { Sandbox, Counter, ThemeToggle, Footer } from '$lib/components/index.js';
	import CounterCode from '$lib/components/counter.svelte?raw';
	import Head from '$lib/components/head.svelte';
</script>

<Head title="Lapikit" description="" />

<div id="head-lapikit">
	<Appbar
		classContent="flex items-center justify-between lg:grid lg:grid-cols-3"
		density={{ _default: 'default', md: 'comfortable' }}
		background="transparent"
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

			<Button density="comfortable">{capitalize($t('homepage.top_cta'))}</Button>
		</div>
	</Appbar>

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
				class="mx-auto mt-[0.2em] mb-[0.35em] pb-[0.1em] text-4xl leading-[102%] font-semibold text-balance lg:max-w-3xl lg:text-7xl"
			>
				{capitalize($t('homepage.main_title'))}
			</h1>
			<p
				class="mx-auto mb-[2em] max-w-sm text-sm leading-[144%] font-medium sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg"
			>
				{capitalize($t('homepage.main_introduction'))}
			</p>
			<div>
				<Button size="lg" href="/docs/button">
					{capitalize($t('homepage.main_cta'))}
				</Button>
			</div>
		</div>
	</section>
</div>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[500px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid gap-4">
		<div class="text-center">
			<h2>{capitalize($t('homepage.dev_with_lapikit.title'))}</h2>
			<p>{capitalize($t('homepage.dev_with_lapikit.paragraph1'))}</p>
		</div>

		<Sandbox name="counter" code={CounterCode}>
			{#snippet component()}
				<Counter />
			{/snippet}
		</Sandbox>
	</div>
</section>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[500px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<div class="text-center md:text-start">
			<h2>{$t('homepage.lapikit_the_best.title')}</h2>
			<p>{$t('homepage.lapikit_the_best.paragraph1')}</p>
			<p>{$t('homepage.lapikit_the_best.paragraph2')}</p>
		</div>
		<div class="flex flex-col flex-wrap gap-5 text-start sm:flex-row">
			<Card class="min-w-[40%] flex-1 text-start" variant="outline">
				<h2>{$t('homepage.lapikit_the_best.changelog.title')}</h2>
			</Card>
			<Card class="min-w-[40%] flex-1 text-start" variant="outline">
				<h2>{$t('homepage.lapikit_the_best.roadmap.title')}</h2>
			</Card>
			<Card class="min-w-[40%] flex-1 text-start" variant="outline">
				<h2>{$t('homepage.lapikit_the_best.install.title')}</h2>
			</Card>
		</div>
	</div>
</section>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[500px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid gap-4">
		<div class="text-center">
			<h2>{$t('homepage.customize_component.title')}</h2>
			<p>{$t('homepage.customize_component.paragraph1')}</p>
		</div>
		<div class="flex flex-col flex-wrap gap-5 text-start sm:flex-row">
			<Card class="min-w-[40%] flex-1 text-start">
				{$t('homepage.customize_component.themes')}
			</Card>
			<Card class="min-w-[40%] flex-1 text-start">
				{$t('homepage.customize_component.components')}
			</Card>
			<Card class="min-w-[40%] flex-1 text-start">
				{$t('homepage.customize_component.tools')}
			</Card>
		</div>
	</div>
</section>

<Footer />

<BottomNavigation>
	{#each navigationMain as { key, path, external, icon } (key)}
		<BottomNavigationItem
			is="a"
			active={page.url.pathname === path}
			href={path}
			target={external && '_blank'}
		>
			<Icon {icon} size="xl" {path} target={external && '_blank'} />
			{capitalize($t(`navigation.${key}`))}
		</BottomNavigationItem>
	{/each}
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
