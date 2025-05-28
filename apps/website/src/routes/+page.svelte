<script lang="ts">
	import { t } from '$lib/i18n';
	import { BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Btn, List, ListItem, Appbar, Icon, Chip, Separator, Card } from 'lapikit/components';
	import { navigationMain } from '$lib/config';
	import { page } from '$app/state';

	// demo code
	import { Sandbox, Counter } from '$lib/components/index.js';
	import CounterCode from '$lib/components/counter.svelte?raw';
	import Footer from '$lib/components/footer.svelte';
</script>

<div id="head-lapikit">
	<Appbar
		classContent="flex lg:grid lg:grid-cols-[auto_auto_auto] max-lg:justify-between"
		density={{ _default: 'default', md: 'comfortable' }}
		style="background: transparent;"
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
			<Btn density="comfortable">{$t('homepage.top_cta')}</Btn>
		</div>
	</Appbar>

	<section
		class="desktop:max-h-[900px] flex h-[82vh] flex-col items-center justify-between justify-center overflow-hidden"
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
</div>

<section
	class="mx-2.5 mt-11 mb-20 sm:mx-auto sm:max-w-[500px] lg:mt-24 lg:mb-40 lg:w-10/12 lg:max-w-[1036px]"
>
	<div class="grid gap-4">
		<div class="text-center">
			<h2>{$t('homepage.dev_with_lapikit.title')}</h2>
			<p>{$t('homepage.dev_with_lapikit.paragraph1')}</p>
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
			{$t(`navigation.${key}`)}
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
