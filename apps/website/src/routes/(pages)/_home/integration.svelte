<script lang="ts">
	import { Sandbox } from '$lib/components';
	import { Button, Icon, Toolbar } from 'lapikit/components';

	// modules
	import ColorSchemePreview from './addons/color-scheme-preview.svelte';

	// assets
	import SvelteLapikitIcon from '$lib/images/buttons/svelte-lapikit.webp?enhanced';
	import SvelteTailwindIcon from '$lib/images/buttons/svelte-tailwindcss.webp?enhanced';
	import SvelteIcon from '$lib/images/buttons/svelte.webp?enhanced';

	// assets code
	import HomepageButtonSvelte from '$lib/components/docs/homepage-button.svelte?raw';
	import HomepageButtonLapikit from '$lib/components/docs/homepage-button-lapikit.svelte?raw';
	import HomepageButtonTailwind from '$lib/components/docs/homepage-button-tailwind.svelte?raw';
	import HomepageCardSvelte from '$lib/components/docs/homepage-card.svelte?raw';
	import HomepageCardLapikit from '$lib/components/docs/homepage-card-lapikit.svelte?raw';
	import HomepageCardTailwind from '$lib/components/docs/homepage-card-tailwind.svelte?raw';
	import HomepageModalSvelte from '$lib/components/docs/homepage-modal.svelte?raw';
	import HomepageModalLapikit from '$lib/components/docs/homepage-modal-lapikit.svelte?raw';
	import HomepageModalTailwind from '$lib/components/docs/homepage-modal-tailwind.svelte?raw';

	// states
	let stepCode: number = $state(0);
	let displayCode: string = $state('lapikit');
</script>

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div>
		<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Build faster, write cleaner code</h2>
		<p class="mt-6 text-left sm:text-lg">
			With Lapikit, you can easily create and manage your components, making your development
			process more efficient
		</p>
		<div
			class="mt-14 grid grid-cols-1 gap-4 md:grid-cols-[45%_1fr] lg:grid-cols-[45%_1fr] lg:items-stretch"
		>
			<div class="sm:text-lg">
				<p>
					Why waste time developing the same UI components on each project? With raw TailwindCSS,
					every button, card, and modal becomes a collection of repeating class blocks that clutter
					your codebase and complicate maintenance. Lapikit allows you to focus on what matters
					most: developing exceptional user experiences by delivering ready-to-use, customisable,
					and type-safe Svelte components
				</p>
				<p class="mt-6">With Lapikit, you write less but build more:</p>
				<ul class="mt-6!">
					<li>
						<Icon icon="mgc_check_circle_line" color="accent-success" /> Your code will be cleaner, with
						simpler and more legible syntax
					</li>
					<li>
						<Icon icon="mgc_check_circle_line" color="accent-success" /> Faster, thanks to reuse components
						and uniform styling
					</li>
					<li>
						<Icon icon="mgc_check_circle_line" color="accent-success" /> More consistently, with pre-optimized
						Svelte + TypeScript integration
					</li>
					<li>
						<Icon icon="mgc_check_circle_line" color="accent-success" />Stop copying and duplicating
						CSS classes and start shipping better user interfaces
					</li>
				</ul>
				<p class="mt-6 italic md:mb-10">
					Instead of struggling with redundancy, you focus on the experience you want to offer
				</p>
				<Toolbar
					class="mt-4"
					classContent="md:justify-start justify-center gap-3"
					background="transparent"
				>
					<Button
						onclick={() => (stepCode = 0)}
						active={stepCode === 0}
						rounded="full"
						background={stepCode === 0 ? 'accent-primary' : 'label-secondary'}
						color="white"
						size={{ base: 'sm', md: 'md' }}
					>
						View Button
					</Button>
					<Button
						onclick={() => (stepCode = 1)}
						active={stepCode === 1}
						rounded="full"
						background={stepCode === 1 ? 'accent-primary' : 'label-secondary'}
						color="white"
						size={{ base: 'sm', md: 'md' }}
					>
						Discover Card
					</Button>
					<Button
						onclick={() => (stepCode = 2)}
						active={stepCode === 2}
						rounded="full"
						background={stepCode === 2 ? 'accent-primary' : 'label-secondary'}
						color="white"
						size={{ base: 'sm', md: 'md' }}
					>
						Explore Modal
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
						: displayCode === 'tailwindcss'
							? stepCode === 2
								? HomepageModalTailwind
								: stepCode === 1
									? HomepageCardTailwind
									: HomepageButtonTailwind
							: stepCode === 2
								? HomepageModalSvelte
								: stepCode === 1
									? HomepageCardSvelte
									: HomepageButtonSvelte}
					noExpandedButton
					noCopy
				>
					{#snippet actions()}
						<div class="ml-2 flex gap-2">
							<Button onclick={() => (displayCode = 'lapikit')} active={displayCode === 'lapikit'}>
								<enhanced:img
									src={SvelteLapikitIcon}
									alt="Lapikit Logo"
									width="55"
									height="28.51"
									class="no-select"
								/>
							</Button>
							<Button
								onclick={() => (displayCode = 'tailwindcss')}
								active={displayCode === 'tailwindcss'}
							>
								<enhanced:img
									src={SvelteTailwindIcon}
									alt="TailwindCSS Logo"
									width="55"
									height="21.79"
									class="no-select"
								/>
							</Button>
							<Button onclick={() => (displayCode = 'svelte')} active={displayCode === 'svelte'}>
								<enhanced:img
									src={SvelteIcon}
									alt="Svelte Logo"
									width="20"
									height="24"
									class="no-select"
								/>
							</Button>
						</div>
					{/snippet}
				</Sandbox>
			</div>
		</div>
	</div>
	<div class="mt-16 text-center">
		<h3 class="text-xl font-semibold lg:text-3xl">
			There are an infinite amount of themes with just one configuration
		</h3>
		<p class="mx-auto mt-6 max-w-4xl text-center sm:text-lg">
			Lapikit supports several themes out of the box, allowing you to quickly swap between theming
			options with minimal setup.Light and dark modes are also supported. Switching themes or
			changing your design system takes seconds rather than hours
		</p>
		<div class="mt-16">
			<ColorSchemePreview />
		</div>
	</div>
</div>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
