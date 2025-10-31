<script lang="ts">
	import { PageTransition } from '$animations';
	//modules
	import { DocNav } from '$components';
	import { Drawer } from 'site-kit';
	import Nav from './_modules/nav.svelte';
	import type {
		NavigationLink,
		NavigationData,
		NavigationSectionWithCategories
	} from '$lib/types/navigation';
	import type { DocFile } from '$lib/types/frontmatter';

	let { children, data } = $props();

	// states
	let open = $state(false);
	let currentSectionItems = $state<
		Array<{
			key: string;
			title: string;
			order: number;
			style?: {
				color?: string;
				icon?: string;
			};
			items?: DocFile[];
		}>
	>([]);

	function getCurrentSectionFromUrl(url: string, navigation: NavigationData) {
		const urlSegments = url.split('/').filter(Boolean);
		const docsIndex = urlSegments.indexOf('docs');
		if (docsIndex !== -1) {
			urlSegments.splice(docsIndex, 1);
		}

		let currentSection = 'base';

		if (urlSegments.length > 0) {
			const firstSegment = urlSegments[0];
			if (navigation[firstSegment]) {
				currentSection = firstSegment;
			}
		}

		const section: NavigationSectionWithCategories = navigation[currentSection];
		if (!section) {
			return [];
		}
		return section.categories || [];
	}

	$effect(() => {
		const docsNav = data.nav_links?.docs as NavigationLink;
		if (docsNav?.sections && data.url) {
			currentSectionItems = getCurrentSectionFromUrl(data.url, docsNav.sections);
		}
	});
</script>

<DocNav
	navigation={(data.nav_links['docs'] as NavigationLink).sections!}
	url={data.url_internal}
	npm={data.npm || undefined}
/>

<Drawer bind:open>
	{#snippet navigation()}
		<Nav items={currentSectionItems} bind:open />
	{/snippet}

	<PageTransition url={data.url}>
		{@render children?.()}
	</PageTransition>
</Drawer>
