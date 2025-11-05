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
	import TableOfContents from './_modules/table-of-contents.svelte';
	import Breadcrumbs from './_modules/breadcrumbs.svelte';
	import FooterDocs from '$components/footer-docs.svelte';

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
	class="sticky top-[64px] z-95 max-lg:hidden!"
	bind:open
	navigation={data.nav_links}
	url={data.url_internal}
	npm={data.npm || undefined}
	sectionActive={currentSection}
/>

<Drawer bind:open>
	{#snippet navigation()}
		<NavDocs bind:open bind:currentSection navigation={data.nav_links} />
	{/snippet}

	<PageTransition url={data.url}>
		<div
			class={`grid pr-4 pb-6 pl-4 lg:pl-0 ${data.summary?.data?.headings?.length > 0 ? 'xl:grid-cols-[1fr_220px]' : ''} mx-auto w-full min-w-0 gap-8`}
		>
			<div>
				<Breadcrumbs
					url={data.url}
					bind:open
					class="z-95 max-lg:sticky max-lg:top-[64px] max-lg:-ml-[15px] max-lg:w-[calc(100%_+_30px)]! lg:mx-auto lg:max-w-[760px]"
				/>

				<div class="markdown mx-auto w-full min-w-0 pt-8 md:max-w-[760px]">
					{@render children?.()}
				</div>

				<FooterDocs
					class="mx-auto mt-16 md:max-w-[760px]"
					url={data.url_internal}
					socials={data.social_links}
				/>
			</div>
			{#if data.summary?.data?.headings && data.summary?.data?.headings.length > 0}
				<aside class="max-xl:hidden">
					<TableOfContents url={data.url} headings={data.summary?.data?.headings || []} />
				</aside>
			{/if}
		</div>
	</PageTransition>
</Drawer>

<ReturnTopPage />
