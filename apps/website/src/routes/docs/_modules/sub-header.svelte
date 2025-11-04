<script lang="ts">
	import { Button, Icon, Spacer, Toolbar } from 'lapikit/components';
	import { breakpoints, viewport } from 'lapikit/stores';
	import type { NavigationLink } from '$lib/types/navigation';
	import { capitalize } from 'site-kit/actions';
	import { page } from '$app/state';

	let { sectionActive, url, navigation, open = $bindable(), ...rest } = $props();

	$effect(() => {
		console.log(url);
	});
</script>

<Toolbar classContent="mx-auto mx-1! gap-2" rounded="0" background="background-primary" {...rest}>
	{#if $viewport.innerWidth >= $breakpoints.lg}
		{#each Object.entries((navigation['docs'] as NavigationLink).sections!) as [keyNav, sectionData] (keyNav)}
			<Button
				href={`${sectionData.slug}`}
				variant="text"
				color={page.url.pathname.includes(keyNav)
					? 'accent-primary'
					: sectionActive === keyNav
						? 'accent-primary'
						: ''}
			>
				{#snippet prepend()}
					<Icon icon={sectionData?.style?.icon || 'mgc_folder_line'} />
				{/snippet}
				{capitalize(sectionData.title)}
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
