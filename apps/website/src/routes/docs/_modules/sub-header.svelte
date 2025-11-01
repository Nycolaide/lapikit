<script lang="ts">
	import { Button, Icon, Spacer, Toolbar } from 'lapikit/components';

	import { breakpoints, viewport } from 'lapikit/stores';
	import type { NavigationLink } from '$lib/types/navigation';

	let { url, navigation, open = $bindable(), ...rest } = $props();
</script>

<Toolbar
	class="z-95 sticky top-[64px]"
	classContent="mx-auto mx-1! gap-2"
	rounded="0"
	background="background-primary"
	{...rest}
>
	<Button onclick={() => (open = !open)} icon class="lg:hidden!">
		<Icon icon="mgc_menu_line" />
	</Button>

	{#if $viewport.innerWidth >= $breakpoints.lg}
		{#each Object.entries((navigation['docs'] as NavigationLink).sections!) as [keyNav, sectionData] (keyNav)}
			<Button href={`${sectionData.slug}`} variant="text" class="capitalize">
				{sectionData.title}
			</Button>
		{/each}
	{/if}

	<Spacer />

	<Button href={url.github.discussions} target="_blank" variant="text">
		Feedback
		{#snippet prepend()}
			<Icon icon="mgc_light_line" class="rotate-180" />
		{/snippet}
	</Button>
</Toolbar>
