<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { BottomNavigation, BottomNavigationItem } from 'site-kit';
	import { Button, Icon, Chip, Separator, Card, Toolbar } from 'lapikit/components';
	import {
		buyMeACoffeeUrl,
		discordUrl,
		enableFeatures,
		githubContributingUrl,
		githubSponsorsUrl,
		githubUrl,
		navigationMain,
		npmUrl,
		stepperToUseComponent,
		xUrl
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
	import { Sandbox, Footer } from '$lib/components/index.js';

	// sample
	import { PUBLIC_DEV_MODE } from '$env/static/public';
	import HomePreview from '$lib/components/home-preview.svelte';

	import HomepageButtonLapikit from '$lib/components/docs/homepage-button.svelte?raw';
	import HomepageButtonTailwind from '$lib/components/docs/homepage-button-tailwind.svelte?raw';
	import HomepageCardLapikit from '$lib/components/docs/homepage-card.svelte?raw';
	import HomepageCardTailwind from '$lib/components/docs/homepage-card-tailwind.svelte?raw';
	import HomepageModalLapikit from '$lib/components/docs/homepage-modal.svelte?raw';
	import HomepageModalTailwind from '$lib/components/docs/homepage-modal-tailwind.svelte?raw';
	import Legacy from './(pages)/legacy.svelte';
	import { BackgroundAnimationStars, scrollAnimation } from '../animations';
	import LapikitYoloLogo from '$lib/images/lapikit-yolo.webp?enhanced';
	import NycolaideAvatar from '$lib/images/nycolaide.png?enhanced';
	import Rabbit from '../animations/rabbit.svelte';
	import LapinosaureFace from '$lib/images/lapinosaure/lapinosaure-face.webp?enhanced';
	import StarMedium from '$lib/images/assets/star-medium.webp?enhanced';
	import LapinosaureFirstOnTheMoon from '$lib/images/lapinosaure/lapinosaure-first-on-the-moon.webp?enhanced';
</script>

<Head
	title="Lapikit"
	description="Discover Lapikit, a component library optimized for Svelte. Quick to integrate, simple to style, and designed for front-end developers."
/>

{#if PUBLIC_DEV_MODE != 'true'}
	<Legacy {data} />
{:else}
	<section>
		<div class="flex h-[100vh] flex-col">
			<!-- <BackgroundAnimationStars /> -->

			<div
				class="relative mx-auto my-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 py-16 text-center sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
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
						A library of accessible, high-performance, versatile components that let you develop
						fast, fully customizable interfaces.
					</p>
				</div>
				<div>
					<div class="flex justify-center gap-3 sm:gap-6">
						<Button
							href="/docs/getting-started"
							background="accent-primary"
							color="white"
							size={{ base: 'md', md: 'lg' }}
							rounded="full"
						>
							Get Started
						</Button>
						<Button
							href="/docs/components"
							variant="outline"
							color="accent-primary"
							size={{ base: 'md', md: 'lg' }}
							rounded="full"
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
			<div class="planet-container">
				<div class="halo" aria-hidden="true"></div>
				<div class="planet" aria-hidden="true"></div>
				<div class="planet-content" aria-hidden="true"></div>
				<!-- <div
					id="lapinosaur-to-the-moon"
					class="absolute top-[40px] left-[80vw] z-3 h-fit w-[25px] sm:top-[40px] sm:w-[35px] lg:top-[40px] lg:w-[65px]"
				>
					<enhanced:img
						class="absolute rotate-10 sm:rotate-7 lg:rotate-5"
						id="lapikit-on-the-moon"
						src={LapinosaureFirstOnTheMoon}
						alt="Lapikit logo on the moon"
					/>
				</div> -->
			</div>
		</div>
	</section>
	<section use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="relative mx-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 py-16 text-center sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="absolute bottom-[2%] left-[5%] z-0 overflow-visible max-lg:hidden">
				<Rabbit />
			</div>
			<div
				id="lapinosaure-yolo"
				class="absolute right-0 mt-[130px] mr-20 h-fit w-[115px] max-lg:hidden"
			>
				<!-- <enhanced:img
					class="absolute -scale-x-[1] rotate-15"
					id="lapikit-logo"
					src={LapikitYoloLogo}
					alt="Lapikit logo"
				/> -->
				<enhanced:img
					class="absolute rotate-15"
					id="lapikit-face-star"
					src={LapinosaureFace}
					alt="star on lapikit logo"
				/>
				<enhanced:img
					class="animate-star-yolo absolute top-[80px] -right-[15px] w-[40px] -scale-x-[1] rotate-15"
					src={StarMedium}
					alt="star on lapikit logo"
				/>
				<!-- <Icon class="animate-star-yolo absolute  mt-[70px] mr-[55px] " icon="mgc_sparkles_fill" /> -->
			</div>

			<!-- <div
				class="absolute top-0 left-0 mt-[150px] ml-[20px] max-sm:hidden lg:mt-[262px] xl:ml-[104px]"
			>
				<Icon class="animate-cursor absolute -scale-x-[1] text-[2rem]!" icon="mgc_cursor_fill" />
			</div> -->

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
				<div class="flex justify-center gap-3 sm:gap-6">
					<Button
						href="/docs/getting-started"
						background="accent-primary"
						color="white"
						size={{ base: 'md', md: 'lg' }}
						rounded="full"
					>
						Get Started
					</Button>
					<Button
						href="/docs/components"
						variant="outline"
						color="accent-primary"
						size={{ base: 'md', md: 'lg' }}
						rounded="full"
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

		<!-- <div class="scene">
			<div class="planet" aria-hidden="true"></div>
			<div class="moon" aria-hidden="true"></div>
			<div
				id="lapinosaur-to-the-moon"
				class="absolute top-[40px] left-[80vw] z-3 h-fit w-[25px] sm:top-[40px] sm:w-[35px] lg:top-[40px] lg:w-[65px]"
			>
				<enhanced:img
					class="absolute rotate-10 sm:rotate-7 lg:rotate-5"
					id="lapikit-on-the-moon"
					src={LapinosaureFirstOnTheMoon}
					alt="Lapikit logo on the moon"
				/>
			</div>
		</div> -->
	</section>

	<section id="lapikit-contains" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 sm:gap-16 sm:px-6 lg:grid lg:px-8"
		>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

	<section id="lapikit-possibility" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div>
				<h2 class="text-2xl font-semibold lg:text-4xl">Save time and simplify your code</h2>
				<p class="mt-6 text-left sm:text-lg">
					With Lapikit, you can easily create and manage your components, making your development
					process more efficient.
				</p>
				<div
					class="mt-16 grid grid-cols-1 gap-4 md:grid-cols-[45%_1fr] lg:grid-cols-[35%_1fr] lg:items-stretch"
				>
					<div class="sm:text-lg">
						<p>
							Why reinvent the wheel for every component? With raw TailwindCSS, every button, every
							card, every modal translates into repetitive lines of classes that are difficult to
							maintain and often copied and pasted
						</p>
						<p class="mt-6">With Lapikit, you write less but build more:</p>
						<ul class="mt-6!">
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
						<p class="mt-6 italic">
							Instead of struggling with redundancy, you focus on the experience you want to offer
						</p>
						<Toolbar
							class="mt-4"
							classContent="lg:justify-start justify-center gap-3"
							background="transparent"
						>
							<Button
								onclick={() => (stepCode = 0)}
								active={stepCode === 0}
								rounded="full"
								background="background-grouped-tertiary"
							>
								Button
							</Button>
							<Button
								onclick={() => (stepCode = 1)}
								active={stepCode === 1}
								rounded="full"
								background="background-grouped-tertiary"
							>
								Card
							</Button>
							<Button
								onclick={() => (stepCode = 2)}
								active={stepCode === 2}
								rounded="full"
								background="background-grouped-tertiary"
							>
								Modal
							</Button>
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
			<div class="mt-16 text-center">
				<h3 class="text-xl font-semibold lg:text-3xl">Unlimited themes with one configuration</h3>
				<p class="mx-auto mt-6 max-w-4xl text-center sm:text-lg">
					Lapikit supports multiple themes out of the box, allowing you to easily switch between
					theming options with minimal configuration. Light and dark mode are both supported.
				</p>
				<div class="mt-16">
					<HomePreview />
				</div>
			</div>
		</div>
	</section>

	<section id="overview-components" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<h2 class="text-2xl font-semibold lg:text-4xl">One library for your entire Svelte project</h2>

			<div
				class="mt-8 grid grid-cols-1 grid-rows-[1fr_100px_max-content] gap-4 lg:grid-cols-[55%_100px_1fr] lg:grid-rows-1"
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

	<section id="discover-features" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div>
				<div>
					<h2 class="text-2xl font-semibold lg:text-4xl">
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
										<Icon {icon} size="xl" color="accent-primary" class="no-select" />
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
						<Button
							href="/docs"
							size="lg"
							class="px-4!"
							color="white"
							background="accent-primary"
							rounded="full"
						>
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

	<section id="creator-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto grid w-full max-w-[90rem] items-center justify-center gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
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
				<enhanced:img
					src={NycolaideAvatar}
					alt="Creator Lapikit"
					width="40"
					class="no-select rounded-full"
				/>
				<div>
					<span>Nycolaide</span>
					<p class="text-sm">Creator of Lapikit</p>
				</div>
			</div>
		</div>
	</section>

	<section id="open-source-project" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
				<!-- Colonne gauche -->
				<div class="flex flex-col gap-4 md:w-1/4">
					<Card href={npmUrl} target="_blank" background="background-tertiary" class="flex-1">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon
								icon="/icons/npm-color.svg"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="red"
								class="no-select"
							/>
							<div>
								<span class="text-highlighted text-xl font-semibold"
									>{formatNumber(data?.npm?.downloads || 0)}</span
								>
								<p class="text-sm">Monthly downloads</p>
							</div>
						</div>
					</Card>

					<Card href={githubUrl} target="_blank" background="background-tertiary" class="flex-1">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon
								icon="mgc_github_line"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="service-github"
							/>
							<div>
								<span class="text-highlighted text-xl font-semibold"
									>{formatNumber(data?.github?.stargazers_count || 0)}</span
								>
								<p class="text-sm">GitHub Stars</p>
							</div>
						</div>
					</Card>
				</div>

				<!-- Colonne centrale -->
				<div class="flex md:w-1/2">
					<Card class="flex-1" background="background-tertiary">
						<div class="flex h-full flex-col items-center justify-around gap-y-4 p-4 sm:p-6">
							<p class="text-xl font-semibold">Open source</p>
							<p class="text-center">
								Lapikit is 100% open source. You can find the source code on GitHub, contribute to
								the project, and report issues. We welcome contributions from the community to help
								us make Lapikit even better.
							</p>
							<Button
								href={githubUrl}
								target="_blank"
								rounded="full"
								class="px-4!"
								color="service-on-github"
								background="service-github"
							>
								Start contributing
								{#snippet append()}
									<Icon icon="mgc_github_line" />
								{/snippet}
							</Button>
						</div>
					</Card>
				</div>

				<!-- Colonne droite -->
				<div class="flex flex-col gap-4 md:w-1/4">
					<Card href={xUrl} target="_blank" background="background-tertiary" class="flex-1">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon
								icon="mgc_social_x_line"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="service-x"
							/>
							<div>
								<span class="text-highlighted text-xl font-semibold">0</span>
								<p class="text-sm">Followers</p>
							</div>
						</div>
					</Card>

					<Card href={discordUrl} target="_blank" background="background-tertiary" class="flex-1">
						<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
							<Icon
								icon="mgc_discord_fill"
								size="xl"
								style="--icon-multiplier-size: 16"
								color="service-discord"
							/>
							<div>
								<span class="text-highlighted text-xl font-semibold">0</span>
								<p class="text-sm">Members</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<section id="go-to-use-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div
			class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
		>
			<div class="grid justify-center gap-4 text-center">
				<h2 class="text-2xl font-semibold lg:text-4xl">Go further</h2>
				<p class="sm:text-lg">Explore our different starters with different presets.</p>

				<div class="mt-8 grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
					<Card href="/docs">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Docs</span>
								<p>Find out how to install and use Lapikit in your SvelteKit project.</p>
							</div>
							<div>
								<Icon size="xl" icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
					<Card href={githubContributingUrl} target="_blank">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Contribute</span>
								<p>
									Want to contribute to Lapikit? We provide a Contributor Guide to help you get
									started.
								</p>
							</div>
							<div>
								<Icon size="xl" icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
					<Card href={githubSponsorsUrl} target="_blank">
						<div class="flex justify-between px-4 py-3">
							<div>
								<span class="font-semibold sm:text-lg">Sponsorship</span>
								<p>Support the development of Lapikit by becoming a sponsor.</p>
							</div>
							<div>
								<Icon size="xl" icon="mgc_arrow_right_line" />
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	</section>

	<section id="support-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div
				class="mx-auto grid w-full max-w-(--ui-container) gap-8 px-4 py-16 text-center sm:px-6 sm:py-24 md:grid-cols-2 md:text-left lg:px-8 lg:py-32"
			>
				<div>
					<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
						You like <span>Lapikit</span>
					</h2>
					<p class="text-muted mt-6 text-left text-base text-balance sm:text-lg">
						Lapikit is Free and Open Source under the MIT License. You can help us grow by
						supporting the project and becoming a sponsor. Every contribution truly makes a
						difference! As a Lapikit contributor, you’ll gain visibility into the roadmap, have a
						voice in shaping the project’s direction, be recognized on our website, and enjoy
						priority support.
					</p>

					<p class="mt-6 italic opacity-50 sm:text-lg">
						All donations and sponsorships will be used exclusively for the development and
						maintenance of Lapikit.
					</p>
					<Toolbar class="mt-8" classContent="justify-start gap-3" background="transparent">
						<Button
							background="service-github"
							color="service-on-github"
							rounded="full"
							href={githubSponsorsUrl}
							target="_blank"
							class="px-4!"
						>
							{#snippet prepend()}
								<Icon icon="mgc_github_line" />
							{/snippet}
							Github Sponsors
							{#snippet append()}
								<Icon color="red" icon="mgc_heart_fill" />
							{/snippet}
						</Button>
						<Button
							background="service-buy-me-a-coffee"
							color="service-on-buy-me-a-coffee"
							rounded="full"
							href={buyMeACoffeeUrl}
							target="_blank"
							class="px-4!"
						>
							{#snippet prepend()}
								<Icon icon="/icons/buymeacoffee.svg" class="no-select" />
							{/snippet}
							Buy me a coffee
						</Button>
					</Toolbar>
				</div>
				<div>
					<img src="/images/material-cover.png" alt="Material Cover" />
				</div>
			</div>
		</div>
	</section>

	<section id="lapikit-is-lapikit" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div class="grid gap-4 text-center">
				<p class="text-[1.75rem] font-bold opacity-15">It's not magic, it's Lapikit</p>
			</div>
		</div>
	</section>

	<section id="lets-go-explore" use:scrollAnimation={{ animation: 'fade-up', delay: 100 }}>
		<div>
			<div
				class="mx-auto w-full max-w-(--ui-container) px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-32"
			>
				<p class="text-2xl font-bold sm:text-3xl lg:text-4xl">Start exploring Lapikit</p>
				<p class="mt-6 sm:text-lg">Design system, themes, components, all in one lib</p>
				<Button
					class="mt-8"
					href="/docs/components"
					rounded="full"
					density="comfortable"
					background="accent-primary"
					color="white"
				>
					Discover the components
					{#snippet append()}
						<Icon size="xl" icon="mgc_arrow_right_fill" />
					{/snippet}
				</Button>
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

	/* #space-fuse {
		position: absolute;
		overflow: visible;
		z-index: 0;
		bottom: -8%;
		width: 140px;
		left: -100px;
		width: 100px;
	} */

	/* overcharge css for preview code */
	@media (min-width: 768px) {
		:global(#preview-lapikit) {
			margin: 0;
		}
		:global(#preview-lapikit > div:last-child > div:last-child),
		:global(#preview-lapikit > div:last-child > div:last-child > div) {
			max-height: 400px !important;
			min-height: 400px;
		}
	}

	:global(.animate-star-yolo) {
		color: yellow;
		/* filter: drop-shadow(0 0 2px #000000); */
		rotate: 15deg;
		animation: star-yolo 1.5s infinite;
	}

	:global(.animate-cursor) {
		animation: moveCursor 15s ease-in-out infinite;
	}

	@keyframes moveCursor {
		0% {
			transform: translate(0, 0);
		}
		20% {
			transform: translate(0, 350px);
		}
		40% {
			transform: translate(-90px, 260px);
		}
		60% {
			transform: translate(-210px, 320px);
		}
		80% {
			transform: translate(-30px, 190px);
		}
		100% {
			transform: translate(0, 0);
		}
	}

	@keyframes star-yolo {
		0%,
		100% {
			transform: scale(0.9);
		}
		50% {
			transform: scale(1.5);
		}
	}

	.planet-container {
		position: relative;
		height: 80px;
		background: transparent;
		/* overflow: hidden; */
	}

	/* .halo {
		position: absolute;
		border-radius: 50%;
		background-color: var(--kit-accent-primary);
		filter: blur(40px);
		opacity: 1;
		pointer-events: none;
		aspect-ratio: 12 / 1;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		aspect-ratio: 12 / 1;
	} */

	.planet {
		position: relative;
		top: 0px;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}

	.planet::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		aspect-ratio: 12 / 1;
		background: var(--kit-background-primary);
		mask: url('data:image/svg+xml;utf8,\<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">\<path d="M0,10 C25,0 75,0 100,10 Z" fill="white"/>\</svg>')
			no-repeat center / cover;
	}

	.planet::before {
		content: '';
		position: absolute;
		border-radius: 50%;
		background-color: var(--kit-accent-primary);
		filter: blur(40px);

		opacity: 0.5;
		pointer-events: none;
		bottom: 0;
		left: 0;
		width: 100%;
		aspect-ratio: 12 / 1;
	}

	.planet-content {
		background-color: var(--kit-background-primary);
		width: 100%;
		height: 100vh;
		min-height: 200px;
		position: relative;
	}
</style>
