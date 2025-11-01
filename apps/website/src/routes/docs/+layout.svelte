<script lang="ts">
	import { PageTransition } from '$animations';
	import { Drawer } from 'site-kit';
	import type {
		NavigationLink,
		NavigationData,
		NavigationSectionWithCategories
	} from '$lib/types/navigation';
	import type { DocFile } from '$lib/types/frontmatter';

	//modules
	import { HeaderDocs, NavDocs } from '$components';
	import SubHeader from './_modules/sub-header.svelte';
	import ReturnTopPage from './_modules/return-top-page.svelte';

	let { children, data } = $props();

	// states
	let open = $state(false);
	let currentSection: string = $state('base');

	function getCurrentSectionFromUrl(
		url: string,
		navigation: NavigationData
	): {
		section: string;
		items: Array<{
			key: string;
			title: string;
			order: number;
			style?: {
				color?: string;
				icon?: string;
			};
			items?: DocFile[];
		}>;
	} {
		const urlSegments = url.split('/').filter(Boolean);
		const docsIndex = urlSegments.indexOf('docs');
		if (docsIndex !== -1) {
			urlSegments.splice(docsIndex, 1);
		}

		let detectedSection = 'base';

		if (urlSegments.length > 0) {
			const firstSegment = urlSegments[0];
			if (navigation[firstSegment]) {
				detectedSection = firstSegment;
			}
		}

		const section: NavigationSectionWithCategories = navigation[detectedSection];
		if (!section) {
			return { section: detectedSection, items: [] };
		}
		return { section: detectedSection, items: section.categories || [] };
	}

	$effect(() => {
		const docsNav = data.nav_links?.docs as NavigationLink;
		if (docsNav?.sections && data.url) {
			const result = getCurrentSectionFromUrl(data.url, docsNav.sections);
			currentSection = result.section;
		}
	});
</script>

<HeaderDocs url={data.url_internal} npm={data.npm || undefined} />

<SubHeader
	bind:open
	navigation={data.nav_links}
	url={data.url_internal}
	npm={data.npm || undefined}
/>

<Drawer bind:open>
	{#snippet navigation()}
		<NavDocs bind:open bind:currentSection navigation={data.nav_links} />
	{/snippet}

	<PageTransition url={data.url}>
		{@render children?.()}
	</PageTransition>

	<ReturnTopPage />
</Drawer>
