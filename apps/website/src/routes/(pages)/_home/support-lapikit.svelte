<script lang="ts">
	import { Button, Chip, Icon, Toolbar } from 'lapikit/components';
	import type { UrlInternal } from '$lib/types/internal';

	// assets
	import LapikitLikeYou from '$lib/images/lapinosaure/lapinosaure-like-you.webp?enhanced';

	let { url }: { url: UrlInternal } = $props();
</script>

<div>
	<div
		class="max-w-(--ui-container) mx-auto grid w-full gap-14 px-4 py-16 text-center sm:gap-8 sm:px-6 sm:py-24 md:grid-cols-2 md:text-left lg:px-8 lg:py-32"
	>
		<div>
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">You enjoy Lapikit, and I do, too</h2>
			<p class="text-muted mt-6 text-balance text-center text-base sm:text-lg md:text-left">
				Lapikit is free and open source software distributed under the MIT License. You may help us
				grow by contributing to the project and becoming a sponsor. Every gift actually counts! As a
				Lapikit contributor, you will gain visibility into the roadmap, have a say in the project's
				development, be recognized on our website, and receive priority support
			</p>

			<p class="mt-6 italic opacity-50 sm:text-lg">
				All donations and sponsorships will be utilized solely to support the development and
				maintenance of Lapikit
			</p>
			<Toolbar
				class="mt-10 max-md:mb-4 md:mt-8"
				classContent="max-sm:flex-col! sm:justify-center md:justify-start gap-6 md:gap-3"
				background="transparent"
			>
				<Button
					background="service-github"
					color="service-on-github"
					rounded="full"
					href={url.github.sponsors}
					target="_blank"
					class="px-4!"
					aria-label="Open GitHub Sponsors"
					disabled
				>
					{#snippet prepend()}
						<Icon icon="mgc_github_line" />
					{/snippet}
					Github Sponsors
					{#snippet append()}
						<Icon color="red" icon="mgc_heart_fill" />

						<Chip
							background="accent-primary"
							color="white"
							class="absolute! px-2! bottom-[-16px] right-[10px]"
							density="compact"
							size="sm"
						>
							Coming soon
						</Chip>
					{/snippet}
				</Button>
				<Button
					background="service-buy-me-a-coffee"
					color="service-on-buy-me-a-coffee"
					rounded="full"
					href={url.buymeacoffee.page}
					target="_blank"
					class="px-4!"
				>
					{#snippet prepend()}
						<Icon icon="/icons/buymeacoffee.svg" class="no-select" alt="Buy me a coffee icon" />
					{/snippet}
					Buy me a coffee
				</Button>
			</Toolbar>

			<Button variant="text" href="/docs/roadmap" class="underline! mt-3 opacity-70"
				>Explore Lapikit roadmap 2026</Button
			>
		</div>
		<div class="mx-auto my-auto flex w-full max-w-[200px] justify-center md:max-w-[450px]">
			<enhanced:img src={LapikitLikeYou} alt="lapikit love you" class="no-select scale-x-[-1]" />
		</div>
	</div>
</div>
