<script lang="ts">
	import { Button, Chip, Icon } from 'lapikit/components';
	import { copyToClipboard } from 'site-kit/actions';
	import { BackgroundAnimationStars } from '$animations';

	// modules
	import LapinosaureOnSpace from './addons/lapinosaure-on-space.svelte';
	import EarthMoonLapikit from './addons/earth-moon-lapikit.svelte';

	// assets
	import LapinosaureExpertLapikit from '$lib/images/lapinosaure/lapinosaure-expert-lapikit.webp?enhanced';
	import StarMedium from '$lib/images/assets/star-medium.webp?enhanced';
</script>

<div class="flex h-[calc(100vh-72px-30px)] flex-col md:h-[calc(100vh-100px-72px)]">
	<BackgroundAnimationStars />

	<div
		class="z-1 relative mx-auto my-auto flex w-full max-w-[90rem] flex-col justify-center gap-8 px-4 text-center sm:gap-16 lg:grid lg:px-8"
	>
		<div class="no-select absolute top-0 mx-auto w-full max-w-[85rem] max-lg:hidden">
			<LapinosaureOnSpace />
		</div>

		<div class="no-select absolute right-0 mr-20 mt-[130px] h-fit w-[115px] max-lg:hidden">
			<enhanced:img
				class="no-select -rotate-15 absolute"
				src={LapinosaureExpertLapikit}
				alt="lapinosaure expert lapikit"
			/>
			<enhanced:img
				class="animate-star-yolo no-select -rotate-30 absolute -right-[15px] top-[80px] w-[40px]"
				src={StarMedium}
				alt="star medium"
			/>
		</div>

		<div>
			<Chip href="/docs/changelog" variant="outline" density="comfortable" size="lg">
				{#snippet prepend()}
					<Chip background="accent-success" density="compact" color="white"
						><span class="px-2">New 🎉</span></Chip
					>
				{/snippet}
				Lapikit v0.4 is ready
				{#snippet append()}
					<Icon size="xl" icon="mgc_arrow_right_line" />
				{/snippet}
			</Chip>
		</div>

		<div class="grid gap-4">
			<h1 class="text-balance text-4xl font-semibold leading-[102%] lg:max-w-4xl lg:text-7xl">
				Simple, optimized components for <span style="color: var(--kit-service-svelte);">
					Svelte
				</span>
			</h1>
			<p class="mx-auto font-medium leading-[144%] sm:max-w-2xl md:w-9/12 md:max-w-2xl md:text-lg">
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
				class="px-2! mt-2"
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

	<EarthMoonLapikit />
</div>

<style>
	:global(#install-lapikit-command-line .copy-icon) {
		visibility: hidden;
	}

	:global(#install-lapikit-command-line:hover .copy-icon) {
		visibility: visible;
	}
</style>
