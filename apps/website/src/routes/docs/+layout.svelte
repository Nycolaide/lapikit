<script lang="ts">
	import { browser } from '$app/environment';
	import { t } from '$lib/i18n';
	import { page as url } from '$app/state';
	import { Button, Chip, Icon, List, ListItem } from 'lapikit/components';
	import { Drawer } from 'site-kit';
	import { capitalize } from 'site-kit/actions';
	import { PageTransition } from '$animations';

	// modules
	import { DocNav } from '$components';
	import ReturnTopPage from './_modules/return-top-page.svelte';

	let { children, data } = $props();

	// states
	let open = $state(false);
	let sizeWidthScreen = $state(0);
	let selectedSection = $state<number | null>(null);
	let navigationRoutes = $state(data.routes || []);

	$effect(() => {
		if (open === false) {
			selectedSection = null;
		}
	});

	$effect(() => {
		if (data.routes) {
			navigationRoutes = data.routes;
		}
	});

	function disabledScroll(state: boolean) {
		if (browser) {
			document.body.style.overflow = state ? 'hidden' : '';
		}
	}

	const handleNavigation = () => {
		if (open) {
			if (sizeWidthScreen < 1024) {
				disabledScroll(true);
			}
		} else {
			if (sizeWidthScreen < 1024) {
				disabledScroll(false);
			}
		}
	};

	$effect(() => {
		handleNavigation();
		if (sizeWidthScreen >= 640) selectedSection = null;
	});
</script>

<svelte:window bind:innerWidth={sizeWidthScreen} />

<DocNav url={data.url_internal} npm={data.npm} />

<Drawer bind:open>
	{#snippet navigation()}
		{#each navigationRoutes as section, index (section.key)}
			<List class="kit-device--oh-mobile" nav density="compact" variant="text">
				{#if section.submenu}
					<ListItem class="font-semibold">
						{capitalize(section.key)}
					</ListItem>
				{/if}

				{#each section.pages as page (page.metadata?.slug)}
					<ListItem
						href={`/docs${page.metadata?.slug}`}
						onclick={() => (open = false)}
						active={url.url.pathname === `/docs${page.metadata?.slug}`}
					>
						{#if page.style?.icon}
							<Icon icon={page.style.icon} />
						{/if}
						{capitalize(page.title)}

						{#if page.state?.status}
							<Chip
								rounded="sm"
								size="xs"
								success={page.state.status === 'new'}
								warning={page.state.status === 'updated'}
								error={page.state.status === 'deprecated'}
								info={page.state.status === 'preview'}
							>
								{capitalize($t(`navigation.state.${page.state.status}`))}
							</Chip>
						{/if}
					</ListItem>
				{/each}
			</List>

			<List class="kit-device--od-mobile" nav>
				{#if selectedSection === null}
					{#if section.submenu}
						<ListItem onclick={() => (selectedSection = index)}>
							{#if section.icon}
								<Icon icon={section.icon} />
							{/if}
							{capitalize(section.key)}
						</ListItem>
					{:else}
						{#each section.pages as page (page.metadata?.slug)}
							<ListItem href={`/docs${page.metadata?.slug}`} onclick={() => (open = false)}>
								{#if page.style?.icon}
									<Icon icon={page.style.icon} />
								{/if}
								{capitalize(page.title)}

								{#if page.state?.status}
									<Chip
										rounded="sm"
										size="xs"
										success={page.state.status === 'new'}
										warning={page.state.status === 'updated'}
										error={page.state.status === 'deprecated'}
										info={page.state.status === 'preview'}
									>
										{capitalize($t(`navigation.state.${page.state.status}`))}
									</Chip>
								{/if}
							</ListItem>
						{/each}
					{/if}
				{:else if section.key === navigationRoutes[selectedSection].key}
					<ListItem onclick={() => (selectedSection = null)}>
						{#snippet append()}
							<Icon icon="mgc_left_line" size="lg" />
						{/snippet}
						{capitalize($t('navigation.back_to_sections'))}
					</ListItem>

					{#each navigationRoutes[selectedSection].pages as page (page.metadata?.slug)}
						<ListItem href={`/docs${page.metadata?.slug}`} onclick={() => (open = false)}>
							{#if page.style?.icon}
								<Icon icon={page.style.icon} />
							{/if}
							{capitalize(page.title)}
						</ListItem>
					{/each}
				{/if}
			</List>
		{/each}
	{/snippet}

	<Button
		onclick={() => (open = !open)}
		size="xl"
		density="comfortable"
		rounded="lg"
		class="kit-device--h-desktop fixed! right-[0.75rem] bottom-[0.75rem] z-1100"
		background="on-container"
		color="container"
	>
		<Icon icon={open ? 'mgc_close_line' : 'mgc_menu_line'} />
		{capitalize(open ? $t('navigation.close') : $t('navigation.open'))}
	</Button>

	<ReturnTopPage />

	<PageTransition url={data.url}>
		{@render children?.()}
	</PageTransition>
</Drawer>
