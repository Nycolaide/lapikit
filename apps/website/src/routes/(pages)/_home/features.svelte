<script lang="ts">
	import { Button, Icon } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';

	const enableFeatures = [
		{
			icon: 'mgc_sparkles_line',
			title: {
				en: 'Lightweight and fast'
			},
			description: {
				en: 'Lapikit is designed to be lightweight and fast, ensuring optimal performance for your applications'
			}
		},
		{
			icon: 'mgc_ease_in_out_control_point_line',
			title: {
				en: 'Transition and animations'
			},
			description: {
				en: 'You can easily add transitions and animations to your components thanks to built-in support for major animation libraries'
			}
		},
		{
			icon: 'mgc_pic_ai_line',
			title: {
				en: 'Scoped styles'
			},
			description: {
				en: 'All styles are scoped to their specific components, preventing style leakage and maintaining consistent design throughout the application'
			}
		},
		{
			icon: 'mgc_package_2_line',
			title: {
				en: 'Reusable components'
			},
			description: {
				en: 'A comprehensive library of pre-built, accessible, and customisable UI components to accelerate your development process'
			}
		},
		{
			icon: 'mgc_palette_2_line',
			title: {
				en: 'Customizable themes'
			},
			description: {
				en: "Includes light and dark themes that may be easily customized to match your brand's colors"
			}
		},
		{
			icon: '/icons/typescript-primary.svg',
			altIcon: 'TypeScript Logo',
			title: {
				en: 'Typescript support'
			},
			description: {
				en: 'Lapikit, which is written in TypeScript, comes pre-loaded with type definitions for a better developer experience'
			}
		},
		{
			icon: '/icons/svelte-primary.svg',
			altIcon: 'Svelte Logo',
			title: {
				en: 'SvelteKit friendly'
			},
			description: {
				en: 'Lapikit is built on SvelteKit and fully supports it’s capabilities such as routing, server-side rendering, and static site generation'
			}
		}
	];
</script>

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div>
		<div>
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
				Discover what functionalities are available for your application
			</h2>
			<p class="text-muted mt-6 text-left text-base text-balance sm:text-lg">
				Lapikit is a component library with a variety of features to help you create beautiful and
				functional web applications. Here are some of the features you can make use of:
			</p>
		</div>
		<div class="mt-16">
			<ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
				{#each enableFeatures as { title, description, icon, altIcon } (title)}
					<li>
						<div>
							<div>
								<Icon {icon} size="xl" color="accent-primary" class="no-select" alt={altIcon} />
							</div>
							<div>
								<p class="my-1 font-semibold">{title['en']}</p>
								<p>{description['en']}</p>
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

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
