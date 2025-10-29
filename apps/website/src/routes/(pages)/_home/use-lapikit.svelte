<script lang="ts">
	import { Card, Icon } from 'lapikit/components';
	import type { UrlInternal } from '$lib/types/internal';

	let { url }: { url: UrlInternal } = $props();
</script>

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div class="grid justify-center gap-4 text-center">
		<h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl">Go further</h2>
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
			<Card href={url.github.contributing} target="_blank">
				<div class="flex justify-between px-4 py-3">
					<div>
						<span class="font-semibold sm:text-lg">Contribute</span>
						<p>
							Want to contribute to Lapikit? We provide a Contributor Guide to help you get started.
						</p>
					</div>
					<div>
						<Icon size="xl" icon="mgc_arrow_right_line" />
					</div>
				</div>
			</Card>
			<Card href={url.github.sponsors} target="_blank">
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
