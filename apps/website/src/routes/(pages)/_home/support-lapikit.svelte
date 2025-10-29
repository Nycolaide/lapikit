<script lang="ts">
	import { Button, Icon, Toolbar } from 'lapikit/components';
	import type { UrlInternal } from '$lib/types/internal';

	// assets
	import LapikitLikeYou from '$lib/images/lapinosaure/lapinosaure-like-you.webp?enhanced';

	let { url }: { url: UrlInternal } = $props();
</script>

<div>
	<div
		class="mx-auto grid w-full max-w-(--ui-container) gap-14 px-4 py-16 text-center sm:gap-8 sm:px-6 sm:py-24 md:grid-cols-2 md:text-left lg:px-8 lg:py-32"
	>
		<div>
			<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">
				You like <span>Lapikit</span>
			</h2>
			<p class="text-muted mt-6 text-center text-base text-balance sm:text-lg md:text-left">
				Lapikit is Free and Open Source under the MIT License. You can help us grow by supporting
				the project and becoming a sponsor. Every contribution truly makes a difference! As a
				Lapikit contributor, you’ll gain visibility into the roadmap, have a voice in shaping the
				project’s direction, be recognized on our website, and enjoy priority support.
			</p>

			<p class="mt-6 italic opacity-50 sm:text-lg">
				All donations and sponsorships will be used exclusively for the development and maintenance
				of Lapikit.
			</p>
			<Toolbar
				class="mt-8"
				classContent="max-sm:flex-col! sm:justify-center md:justify-start gap-3"
				background="transparent"
			>
				<Button
					background="service-github"
					color="service-on-github"
					rounded="full"
					href={url.github.sponsors}
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
					href={url.buymeacoffee.page}
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
		<div class="mx-auto my-auto flex w-full max-w-[200px] justify-center md:max-w-[450px]">
			<enhanced:img src={LapikitLikeYou} alt="lapikit love you" class="no-select scale-x-[-1]" />
		</div>
	</div>
</div>
