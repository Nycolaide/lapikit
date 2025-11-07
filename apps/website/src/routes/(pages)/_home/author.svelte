<script lang="ts">
	import { Icon } from 'lapikit/components';
	import type { UrlInternal } from '$lib/types/internal';

	// assets
	import NycolaideAvatar from '$lib/images/nycolaide.webp?enhanced';

	let { url }: { url: UrlInternal } = $props();
</script>

<div
	class="pb-10! mx-auto grid w-full max-w-[90rem] items-center justify-center gap-8 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div class="flex items-center gap-4">
		<div>
			<Icon icon="mgc_quote_left_fill" style="--icon-multiplier-size: 16" color="accent-primary" />
		</div>
		<p class="max-w-[780px] text-center md:text-lg">
			Lapikit is designed to simplify and streamline the work of front-end developers by limiting
			code redundancy, leaving more time for the development of advanced and complex features.
		</p>
		<div>
			<Icon icon="mgc_quote_right_fill" style="--icon-multiplier-size: 16" color="accent-primary" />
		</div>
	</div>

	<div class="flex items-center justify-center gap-4">
		<enhanced:img
			src={NycolaideAvatar}
			alt="Creator Lapikit"
			width="40"
			height="40"
			class="no-select rounded-full"
		/>
		<div>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href={url.nycolaide.website} target="_blank"><span>Nycolaide</span></a>
			<p class="text-sm">Creator of Lapikit</p>
		</div>
	</div>
</div>
