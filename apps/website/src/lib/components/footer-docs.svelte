<script lang="ts">
	import { Button, Icon, Separator, Toolbar } from 'lapikit/components';

	let { url, socials, ...rest } = $props();

	import LapinosaureFace from '$lib/images/lapinosaure/lapinosaure-face.webp?enhanced';

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

	<Toolbar
		class="mt-6"
		classContent="flex-col! md:flex-row! md:justify-between gap-2"
		background="transparent"
	>
		<p class="text-sm">
			Copyright © {year === 2025 ? year : `2025 - ${year}`} Lapikit. -
			<a href={url.package.licence} target="_blank" class="hover:underline">MIT License</a>
		</p>
		<div class="align-center order-first flex gap-2 md:order-last">
			{#each socials as { name, icon, href, color } (name)}
				<Button icon {href} target="_blank" {color} variant="text" size="sm">
					<Icon {icon} class="no-select" style="--icon-multiplier-size: 10;" />
				</Button>
			{/each}

			<Separator orientation="vertical" />
			<span class="flex items-center text-sm">
				Developed by <a
					href={url.nycolaide.website}
					target="_blank"
					style:color="var(--kit-service-svelte)"
					class="ml-1"
				>
					Nycolaide
				</a>
			</span>
		</div>
	</Toolbar>
</footer>
