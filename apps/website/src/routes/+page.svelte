<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Button, Appbar, Icon, Chip, Separator, Card, Toolbar } from 'lapikit/components';
	import {
		enableFeatures,
		githubContributingUrl,
		githubSponsorsUrl,
		githubUrl,
		navigationMain,
		stepperToUseComponent
	} from '$lib/config';
	import { page } from '$app/state';
	import { capitalize, copyToClipboard, formatNumber } from 'site-kit/actions';

	let { data } = $props();

	$effect(() => {
		console.log('GW12 data', data);
	});

	// states
	let openSearch: boolean = $state(false);
	let stepTimeline: number = $state(0);
	let stepCode: number = $state(0);
	let displayCode: string = $state('lapikit');

	// components
	import Head from '$lib/components/head.svelte';
	import { Sandbox, ThemeToggle, Footer } from '$lib/components/index.js';
	import Search from '$lib/components/search/search.svelte';

	// sample
	import CounterLapikit from '$lib/components/counter-lapikit.svelte';
	import CounterLapikitCode from '$lib/components/counter-lapikit.svelte?raw';
	import { PUBLIC_DEV_MODE } from '$env/static/public';
	import HomePreview from '$lib/components/home-preview.svelte';

	import HomepageButtonLapikit from '$lib/components/docs/homepage-button.svelte?raw';
	import HomepageButtonTailwind from '$lib/components/docs/homepage-button-tailwind.svelte?raw';
	import HomepageCardLapikit from '$lib/components/docs/homepage-card.svelte?raw';
	import HomepageCardTailwind from '$lib/components/docs/homepage-card-tailwind.svelte?raw';
	import HomepageModalLapikit from '$lib/components/docs/homepage-modal.svelte?raw';
	import HomepageModalTailwind from '$lib/components/docs/homepage-modal-tailwind.svelte?raw';

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
		classContent="flex items-center justify-between lg:grid! lg:grid-cols-3!"
		density={{ base: 'default', md: 'comfortable' }}
		background="transparent"
	>
		<p class="text-2xl font-bold">Lapikit</p>
		<div class="kit-device--h-mobile mr-0 ml-auto flex gap-2 lg:mr-auto">
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
	<Card class="p-4 text-center!">
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
{#if PUBLIC_DEV_MODE == 'true'}
	<section>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 py-16 text-center sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div>
				<Chip href="/docs/changelog" variant="outline" density="comfortable" size="lg">
					{#snippet prepend()}
						<Chip background="accent-success" density="compact" color="white"
							><span class="px-2">New 🎉</span></Chip
						>
					{/snippet}
					Lapikit v0.2 is launch
					{#snippet append()}
						<Icon size="xl" icon="mgc_arrow_right_line" />
					{/snippet}
				</Chip>
			</div>
			<div class="grid gap-4">
				<h1 class="text-4xl leading-[102%] font-semibold text-balance lg:max-w-4xl lg:text-7xl">
					Simple, optimized components for <span style="color: var(--kit-service-svelte);">
						Svelte
					</span>
				</h1>
				<p
					class="mx-auto leading-[144%] font-medium sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg"
				>
					A library of accessible, high-performance, versatile components that let you develop fast,
					fully customizable interfaces.
				</p>
			</div>
			<div>
				<div>
					<Button
						href="/docs/getting-started"
						background="accent-primary"
						color="white"
						size={{ base: 'md', md: 'lg' }}
					>
						Get Started
					</Button>
					<Button
						href="/docs/components"
						variant="outline"
						color="accent-primary"
						size={{ base: 'md', md: 'lg' }}
					>
						Browse Components
					</Button>
				</div>
				<Button
					id="install-lapikit-command-line"
					class="mt-2 px-2!"
					variant="text"
					density="compact"
					size={{ base: 'sm', md: 'md' }}
					onclick={() => copyToClipboard('npm install -D lapikit')}
				>
					{#snippet prepend()}
						<span>~ </span>
					{/snippet}
					<span> npm install -D lapikit </span>
					{#snippet append()}
						<Icon class="copy-icon" icon="mgc_copy_2_line" />
					{/snippet}
				</Button>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="lapikit-contains">
		<div>
			<div class="mx-auto grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card variant="outline">
					<div class="justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
						<span class="text-xl font-bold">{formatNumber(data.counter?.components || 0)}</span>
						<div class="grid grid-cols-[1fr_auto] gap-2 text-xl font-light">
							<p>Components</p>
							<Button icon>
								<Icon icon="mgc_arrow_right_line" />
							</Button>
						</div>
					</div>
				</Card>
				<Card variant="outline">
					<div class="justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
						<span class="text-xl font-bold">{formatNumber(data.counter?.stores || 0)}</span>
						<div class="grid grid-cols-[1fr_auto] gap-2 text-xl font-light">
							<p>Stores</p>
							<Button icon>
								<Icon icon="mgc_arrow_right_line" />
							</Button>
						</div>
					</div>
				</Card>
				<Card variant="outline">
					<div class="justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
						<span class="text-xl font-bold">{formatNumber(data.counter?.actions || 0)}</span>
						<div class="grid grid-cols-[1fr_auto] gap-2 text-xl font-light">
							<p>Actions</p>
							<Button icon>
								<Icon icon="mgc_arrow_right_line" />
							</Button>
						</div>
					</div>
				</Card>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="lapikit-possibility">
		<div>
			<div>
				<h2>Save time and simplify your code</h2>
				<p>
					With Lapikit, you can easily create and manage your components, making your development
					process more efficient.
				</p>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-[45%_1fr] lg:grid-cols-[35%_1fr]">
					<div>
						<p>
							Why reinvent the wheel for every component? With raw TailwindCSS, every button, every
							card, every modal translates into repetitive lines of classes that are difficult to
							maintain and often copied and pasted
						</p>
						<p>With Lapikit, you write less but build more:</p>
						<ul>
							<li>
								<Icon icon="mgc_check_circle_line" color="accent-success" /> Clearer, because your code
								breathes
							</li>
							<li>
								<Icon icon="mgc_check_circle_line" color="accent-success" /> Faster, because you save
								time
							</li>
							<li>
								<Icon icon="mgc_check_circle_line" color="accent-success" /> More reliable, because styles
								are consistent from one component to another
							</li>
						</ul>
						<p class="italic">
							Instead of struggling with redundancy, you focus on the experience you want to offer
						</p>
						<Toolbar>
							<Button onclick={() => (stepCode = 0)} active={stepCode === 0}>Button</Button>
							<Button onclick={() => (stepCode = 1)} active={stepCode === 1}>Card</Button>
							<Button onclick={() => (stepCode = 2)} active={stepCode === 2}>Modal</Button>
						</Toolbar>
					</div>
					<div>
						<Sandbox
							name="preview-lapikit"
							code={displayCode === 'lapikit'
								? stepCode === 2
									? HomepageModalLapikit
									: stepCode === 1
										? HomepageCardLapikit
										: HomepageButtonLapikit
								: stepCode === 2
									? HomepageModalTailwind
									: stepCode === 1
										? HomepageCardTailwind
										: HomepageButtonTailwind}
							noExpandedButton
							noCopy
						>
							{#snippet actions()}
								<Button
									onclick={() => (displayCode = 'lapikit')}
									active={displayCode === 'lapikit'}
								>
									Lapikit + Svelte
								</Button>
								<Button onclick={() => (displayCode = 'svelte')} active={displayCode === 'svelte'}>
									Svelte only
								</Button>
							{/snippet}
						</Sandbox>
					</div>
				</div>
			</div>
			<div>
				<h3>Unlimited themes with one configuration</h3>
				<p>
					Lapikit supports multiple themes out of the box, allowing you to easily switch between
					theming options with minimal configuration. Light and dark mode are both supported.
				</p>
				<div>
					<HomePreview />
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="overview-components">
		<div class="grid gap-6">
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
				One library for your entire Svelte project
			</h2>

			<div
				class="grid grid-cols-1 grid-rows-[1fr_100px_max-content] gap-4 lg:grid-cols-[55%_100px_1fr] lg:grid-rows-1"
			>
				<div>
					<div class="mx-auto my-0 max-w-[650px]">
						{#if stepTimeline === 0}
							<img src="/images/material-cover.png" alt="Material Cover" />
						{/if}
						{#if stepTimeline === 1}
							<img src="/images/open-source.webp" alt="Open Source" />
						{/if}
						{#if stepTimeline === 2}
							<img src="/images/preview-component.webp" alt="Preview Component" />
						{/if}
					</div>
				</div>
				<div class="timeline flex items-center justify-center">
					<Separator orientation={{ base: 'horizontal', lg: 'vertical' }} color="red" />

					<div class="absolute flex gap-7 lg:hidden">
						{#each stepperToUseComponent as step, index (step)}
							<Button
								variant="outline"
								rounded="full"
								active={stepTimeline === index}
								onclick={() => (stepTimeline = index)}
								background={step.color}
								icon
							>
								<Icon icon={step.icon} />
							</Button>
						{/each}
					</div>
				</div>
				<ul class="align-items-center flex justify-center lg:flex-col lg:gap-14">
					{#each stepperToUseComponent as step, index (step)}
						<li class="align-center flex justify-center lg:flex-col">
							<Button
								class="absolute! -mt-[85px]! hidden! lg:mt-0! lg:-ml-[85px]! lg:inline-flex!"
								variant="outline"
								rounded="full"
								active={stepTimeline === index}
								onclick={() => (stepTimeline = index)}
								background={step.color}
								icon
							>
								<Icon icon={step.icon} />
							</Button>
							<p
								class="absolute hidden w-[50vw] sm:text-lg lg:relative lg:block! lg:w-auto"
								class:display-element={stepTimeline === index}
							>
								<strong class="font-semibold">{step.title}</strong>
								{step.description}
							</p>
						</li>
					{/each}
				</ul>
			</div>
			<div class="mt-23 grid lg:mt-0 lg:grid-cols-[55%_100px_1fr]">
				<div></div>
				<div></div>
				<div>
					<Button density="comfortable" size="lg" href="/docs/components" rounded="full">
						Start Building with Lapikit

						{#snippet append()}
							<Chip class="!px-2" background="accent-info" size="sm" density="compact">
								{data.counter?.components || 0} components
							</Chip>
						{/snippet}
					</Button>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="discover-features">
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div>
				<div>
					<h2 class="text-left text-3xl font-bold sm:text-4xl lg:text-5xl">
						Discover the features available for your applications
					</h2>
					<p class="text-muted mt-6 text-left text-base text-balance sm:text-lg">
						Lapikit is a component library that offers a wide range of features to help you build
						beautiful and functional web applications. Here are some of the features you can take
						advantage of:
					</p>
				</div>
				<div class="mt-16">
					<ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
						{#each enableFeatures as { title, description, icon } (title)}
							<li>
								<div>
									<div>
										<Icon {icon} size="xl" color="accent-primary" />
									</div>
									<div>
										<p class="font-semibold">{title[$locale as 'en']}</p>
										<p>{description[$locale as 'en']}</p>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					<div class="mt-16 flex justify-center">
						<Button href="/docs" size="lg" color="white" background="accent-primary">
							{capitalize(`It's not over yet!`)}

							{#snippet append()}
								<Icon size="xl" icon="mgc_arrow_right_line" />
							{/snippet}
						</Button>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="creator-lapikit">
		<div class="grid items-center justify-center gap-4">
			<div class="flex items-center gap-4">
				<div>
					<Icon icon="mgc_quote_left_line" style="--icon-multiplier-size: 16" />
				</div>
				<p class="max-w-[780px] text-center md:text-lg">
					Lapikit is designed to simplify and streamline the work of front-end developers by
					limiting code redundancy, leaving more time for the development of advanced and complex
					features.
				</p>
				<div>
					<Icon icon="mgc_quote_right_line" style="--icon-multiplier-size: 16" />
				</div>
			</div>

			<div class="flex items-center justify-center gap-4">
				<img
					src="/images/cover-250x250.png"
					alt="Creator Lapikit"
					width="40"
					class="rounded-full"
				/>
				<div>
					<span>Nycolaide</span>
					<p class="text-sm">Creator of Lapikit</p>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="open-source-project">
		<div>
			<div class="flex flex-col gap-4 md:flex-row">
				<div class="flex flex-col gap-4 md:w-1/4">
					<Card variant="outline">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon
								icon="/icons/npm.svg"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="red"
							/>
							<div>
								<span class="text-highlighted text-xl font-semibold">
									{formatNumber(data?.npm?.downloads || 0)}
								</span>
								<p class="text-sm">Monthly downloads</p>
							</div>
						</div>
					</Card>
					<Card variant="outline">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon icon="mgc_github_line" size="xl" style="--icon-multiplier-size: 16" />
							<div>
								<span class="text-highlighted text-xl font-semibold">
									{formatNumber(data?.github?.stargazers_count || 0)}
								</span>
								<p class="text-sm">GitHub Stars</p>
							</div>
						</div>
					</Card>
				</div>
				<div class="md:w-1/2">
					<Card variant="outline" class="flex h-full flex-col items-center justify-around">
						<p class="text-xl font-semibold">Open source</p>
						<p class="text-center">
							Lapikit is 100% open source. You can find the source code on GitHub, contribute to the
							project, and report issues. We welcome contributions from the community to help us
							make Lapikit even better.
						</p>
						<Button href={githubUrl} target="_blank">
							Start contributing
							{#snippet append()}
								<Icon icon="mgc_github_line" />
							{/snippet}
						</Button>
					</Card>
				</div>
				<div class="flex flex-col gap-4 md:w-1/4">
					<Card variant="outline">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon icon="mgc_github_line" size="xl" style="--icon-multiplier-size: 16" />
							<div>
								<span class="text-highlighted text-xl font-semibold">0K</span>
								<p class="text-sm">Followers</p>
							</div>
						</div>
					</Card>
					<Card variant="outline">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon icon="mgc_github_line" size="xl" style="--icon-multiplier-size: 16" />
							<div>
								<span class="text-highlighted text-xl font-semibold">0K</span>
								<p class="text-sm">Members</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="go-to-use-lapikit">
		<div>
			<div class="grid justify-center gap-4 text-center">
				<h2>Go further</h2>
				<p>Explore our different starters with different presets.</p>

				<div class="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
					<Card href="/docs">
						<div class="flex justify-between">
							<div>
								<span>Docs</span>
								<p>Find out how to install and use Lapikit in your SvelteKit project.</p>
							</div>
							<div>
								<Icon icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
					<Card href={githubContributingUrl} target="_blank">
						<div class="flex justify-between">
							<div>
								<span>Contribute</span>
								<p>
									Want to contribute to Lapikit? We provide a Contributor Guide to help you get
									started.
								</p>
							</div>
							<div>
								<Icon icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
					<Card href={githubSponsorsUrl} target="_blank">
						<div class="flex justify-between">
							<div>
								<span>Sponsorship</span>
								<p>Support the development of Lapikit by becoming a sponsor.</p>
							</div>
							<div>
								<Icon icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="support-lapikit">
		<div>
			<div class="grid gap-8 text-center md:grid-cols-2 md:text-left">
				<div>
					<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
						You like <span>Lapikit</span>
					</h2>
					<p class="text-muted mt-6 text-left text-base text-balance sm:text-lg">
						Lapikit is Free and Open Source under MIT License. You can help us develop Lapikit by
						supporting us and becoming a sponsor of the project. Every contribution counts!
					</p>
					<p class="sm:text-lg">Become a Lapikit contributor:</p>
					<ul class="sm:text-lg">
						<li>
							<Icon icon="mgc_check_circle_line" color="accent-success" /> Visibility into the roadmap
						</li>
						<li>
							<Icon icon="mgc_check_circle_line" color="accent-success" /> Influence over the direction
							of the project
						</li>
						<li>
							<Icon icon="mgc_check_circle_line" color="accent-success" /> Recognition on the website
						</li>
						<li>
							<Icon icon="mgc_check_circle_line" color="accent-success" /> Priority support
						</li>
					</ul>
					<p class="italic sm:text-lg">
						All donations and sponsorships will be used exclusively for the development and
						maintenance of Lapikit.
					</p>
					<div>
						<Button>
							{#snippet prepend()}
								<Icon icon="mgc_github_line" />
							{/snippet}
							Github Sponsor
							{#snippet append()}
								<Icon icon="mgc_heart_line" />
							{/snippet}
						</Button>
						<Button>
							{#snippet prepend()}
								<Icon icon="/icons/buymeacoffee.svg" />
							{/snippet}
							Buy me a coffee
						</Button>
					</div>
				</div>
				<div>
					<img src="/images/material-cover.png" alt="Material Cover" />
				</div>
			</div>
		</div>
	</section>
{/if}

{#if PUBLIC_DEV_MODE == 'true'}
	<section id="lapikit-is-lapikit">
		<div>
			<div class="grid gap-4 text-center">
				<p>It's not magic, it's Lapikit</p>
			</div>
		</div>
	</section>
{/if}

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
		--pattern: color-mix(in oklab, var(--kit-label-primary) var(--opacity-pattern), transparent);
		background-image: radial-gradient(var(--pattern) 1px, transparent 0);
		background-size: 16px 16px;
		background-repeat: repeat;
		width: 100%;
		min-height: 90vh;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	:global(#install-lapikit-command-line .copy-icon) {
		visibility: hidden;
	}

	:global(#install-lapikit-command-line:hover .copy-icon) {
		visibility: visible;
	}

	#overview-components {
		text-align: center;
		margin-bottom: 48px;
		height: fit-content !important;
	}

	.display-element {
		display: initial;
	}
</style>
