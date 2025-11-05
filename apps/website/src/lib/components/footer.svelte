<script lang="ts">
	import { page } from '$app/state';
	import { capitalize } from 'site-kit/actions';
	import { consentManaged } from '$lib/stores/app';
	import type { FooterNavigation, SocialLink, UrlInternal } from '$lib/types/footer';

	// components
	import { Button, Card, Icon, Separator, Toolbar } from 'lapikit/components';
	import ThemeToggle from './theme-toggle.svelte';

	// assets
	import Lapikit from '$lib/images/lapikit.webp?enhanced';
	import LapinosaureFace from '$lib/images/lapinosaure/lapinosaure-face.webp?enhanced';

	interface Props {
		url: UrlInternal;
		navigation: FooterNavigation;
		socials: SocialLink[];
		class?: string;
		[key: string]: unknown;
	}

	let { url, navigation, socials, ...rest }: Props = $props();

	// states
	let year: number = new Date().getFullYear();
</script>

<footer {...rest}>
	<div class="align-center flex h-px w-full flex-row items-center text-center">
		<Separator opacity="0.2" />
		<div class="mx-4 flex items-center gap-2">
			<enhanced:img class="no-select w-[3rem]" src={LapinosaureFace} alt="Lapikit logo icon" />
		</div>
		<Separator opacity="0.2" />
	</div>

	<div class="mx-auto flex w-full max-w-[90rem] flex-col px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
		<div class="mb-6 grid gap-3 sm:grid-cols-2 sm:gap-6">
			<a href="/" class="order-first">
				<div class="flex items-center gap-4">
					<enhanced:img
						src={Lapikit}
						alt="Lapikit logo icon"
						class="no-select w-[40px] md:w-[70px]"
					/>
					<span class="mt-5 text-[2rem] font-semibold">Lapikit</span>
				</div>
			</a>

			<div class="order-last flex items-center gap-2 sm:order-none sm:mt-5 sm:justify-end">
				{#each socials as { name, icon, href, color } (name)}
					<Button icon {href} target="_blank" {color} variant="text">
						<Icon {icon} class="no-select" style="--icon-multiplier-size: 14;" />
					</Button>
				{/each}
			</div>

			<div>
				<ThemeToggle />
			</div>
		</div>
		<div class="grid gap-8 md:grid-cols-[1fr_auto]">
			<div class="grid gap-8 text-sm sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-8 lg:gap-16">
				{#each Object.entries(navigation) as [sectionKey, sectionValue] (sectionKey)}
					<ul>
						<li class="mt-4 text-lg font-semibold">{capitalize(`${sectionValue.title}`)}</li>
						{#if Array.isArray(sectionValue.items)}
							{#each sectionValue.items as { key, title, slug, custom, external } (key)}
								{#if !custom}
									<li>
										<Button
											href={slug}
											target={external ? '_blank' : '_self'}
											rounded="full"
											variant="text"
											active={page.url.pathname === slug}
										>
											{capitalize(`${title}`)}
										</Button>
									</li>
								{:else if custom === 'cookie-consent'}
									<li>
										<Button onclick={() => consentManaged.set(true)} rounded="full" variant="text">
											{capitalize(`${title}`)}
										</Button>
									</li>
								{/if}
							{/each}
						{:else}
							{#each Object.entries(sectionValue.items) as [key, { title, slug, external }] (key)}
								<li>
									<Button
										href={slug}
										target={external ? '_blank' : '_self'}
										rounded="full"
										variant="text"
										active={page.url.pathname === slug}
									>
										{capitalize(`${title}`)}
									</Button>
								</li>
							{/each}
						{/if}
					</ul>
				{/each}
			</div>

			<Card
				background="service-discord"
				color="service-on-discord"
				class="mt-6 rounded-lg! p-6! text-center! sm:mx-auto sm:max-w-[350px] md:text-start!"
			>
				<p class="text-xl font-semibold">Join our community on Discord</p>
				<p class="my-2 sm:text-lg">News, updates, and discussions await you!</p>
				<div>
					<Button
						href={url.discord.invite}
						target="_blank"
						size={{ base: 'md', sm: 'lg' }}
						rounded="full"
						class="px-5!"
					>
						Chat with us
						{#snippet append()}
							<Icon size="lg" icon="mgc_chat_1_line" />
						{/snippet}
					</Button>
				</div>
			</Card>
		</div>

		<Toolbar
			class="mt-6"
			classContent="flex-col! md:flex-row! md:justify-between gap-2"
			background="transparent"
		>
			<p>
				Copyright © {year === 2025 ? year : `2025 - ${year}`} Lapikit. -
				<a href={url.package.licence} target="_blank" class="hover:underline">MIT License</a>
			</p>
			<div class="order-first flex gap-2 md:order-last">
				<span class="text-sm">
					Developed by <a
						href={url.nycolaide.website}
						target="_blank"
						style:color="var(--kit-service-svelte)"
					>
						Nycolaide
					</a>
				</span>
			</div>
		</Toolbar>
	</div>
</footer>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.secondary {
		color: var(--kit-label-secondary);
	}
</style>
