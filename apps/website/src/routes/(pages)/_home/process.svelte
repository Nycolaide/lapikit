<script lang="ts">
	// assets
	import StepperInstallLapikit from '$lib/images/home/stepper/install-lapikit.webp?enhanced';
	import StepperImportsComponents from '$lib/images/home/stepper/imports-components.webp?enhanced';
	import StepperCustomizeYourApp from '$lib/images/home/stepper/customize-your-app.webp?enhanced';
	import { Button, Chip, Icon, Separator } from 'lapikit/components';

	let { counter } = $props();

	// states
	let stepTimeline: number = $state(0);

	const stepperToUseComponent = [
		{
			title: 'Install Lapikit.',
			description:
				'Add Lapikit to your SvelteKit project in minutes. Read the <a href="/docs/getting-started">Getting Started</a> guide',
			icon: 'mgc_rocket_line'
		},
		{
			title: 'Add components.',
			description:
				'Choose from around {{componentCount}} components in an accessible and customizable Svelte library',
			icon: 'mgc_package_line'
		},
		{
			title: 'Adapt to your design.',
			description:
				'Adjust spacing, colors, variants, or density to match your brand. Lapikit is fully style-aware',
			icon: 'mgc_paint_brush_ai_line'
		}
	];
</script>

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
		One library for your entire Svelte project
	</h2>

	<div
		class="mt-8 grid grid-cols-1 grid-rows-[1fr_100px_max-content] gap-4 lg:grid-cols-[55%_100px_1fr] lg:grid-rows-1"
	>
		<div>
			<div class="mx-auto my-0 max-w-[650px] rounded-lg">
				{#if stepTimeline === 0}
					<enhanced:img
						src={StepperInstallLapikit}
						alt="Install lapikit"
						class="no-select rounded-xl"
					/>
				{/if}
				{#if stepTimeline === 1}
					<enhanced:img
						src={StepperImportsComponents}
						alt="Imports Components"
						class="no-select rounded-xl"
					/>
				{/if}
				{#if stepTimeline === 2}
					<enhanced:img
						src={StepperCustomizeYourApp}
						alt="Customize Your App"
						class="no-select rounded-xl"
					/>
				{/if}
			</div>
		</div>
		<div class="timeline flex items-center justify-center">
			<Separator orientation={{ base: 'horizontal', lg: 'vertical' }} color="red" />

			<div class="absolute flex gap-7 lg:hidden">
				{#each stepperToUseComponent as step, index (step)}
					<Button
						rounded="full"
						active={stepTimeline === index}
						onclick={() => (stepTimeline = index)}
						background="accent-primary"
						color="white"
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
						rounded="full"
						active={stepTimeline === index}
						onclick={() => (stepTimeline = index)}
						background={stepTimeline === index ? 'accent-primary' : 'label-secondary'}
						color="white"
						icon
					>
						<Icon icon={step.icon} />
					</Button>
					<p
						class="absolute hidden w-[50vw] sm:text-lg lg:relative lg:block! lg:w-auto lg:text-start"
						class:display-element={stepTimeline === index}
					>
						<strong class="font-semibold" style="color: var(--kit-accent-primary)">
							{step.title}
						</strong>

						{#if index === 0}
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html step.description}
						{:else if index === 1}
							{step.description.replace(
								'{{componentCount}}',
								counter?.components ? counter.components.toString() : '0'
							)}
						{:else}
							{step.description}
						{/if}
					</p>
				</li>
			{/each}
		</ul>
	</div>
	<div class="mt-23 grid lg:mt-0 lg:grid-cols-[55%_100px_1fr]">
		<div></div>
		<div></div>
		<div>
			<Button
				density="comfortable"
				size={{ base: 'sm', sm: 'md', md: 'lg' }}
				href="/docs/components"
				rounded="full"
				background="accent-primary"
				color="white"
				class="max-sm:flex-col max-sm:p-[36px_29px]!"
			>
				Start Building with Lapikit

				{#snippet append()}
					<Chip
						class="!px-2 "
						size={{ base: 'xs', md: 'sm' }}
						density="compact"
						background="white"
						color="black"
					>
						{counter?.components || 0} components
					</Chip>
				{/snippet}
			</Button>
		</div>
	</div>
</div>

<style>
	.display-element {
		display: initial;
	}
</style>
