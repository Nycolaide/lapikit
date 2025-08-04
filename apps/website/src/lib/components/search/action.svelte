<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';
	import { t } from '$lib/i18n';

	import { Button, Chip, Icon } from 'lapikit/components';
	import { capitalize } from 'site-kit/actions';
	import { deviceUsed } from '$lib/stores/app.js';

	let {
		app,
		icon,
		onlyLaptop,
		open = $bindable(false)
	}: { app?: boolean; icon?: boolean; open?: boolean; onlyLaptop?: boolean } = $props();

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
			event.preventDefault();
			open = true;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('keydown', handleKeyDown);
		}
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('keydown', handleKeyDown);
		}
	});
</script>

{#if app || onlyLaptop}
	<Button
		class="hidden-mobile"
		variant="outline"
		rounded="full"
		onclick={() => (open = true)}
		aria-label={capitalize($t('navigation.search_bar.button'))}
	>
		{capitalize($t('navigation.search_bar.button'))}

		{#snippet append()}
			<Chip size="sm">
				{$deviceUsed === 'apple' ? '⌘' : 'ctrl'}
			</Chip>
			<Chip size="sm">k</Chip>
			<Icon icon="mgc_search_line" />
		{/snippet}
	</Button>
{/if}

{#if !app && icon}
	<Button
		icon
		aria-label={capitalize($t('navigation.search_bar.button'))}
		onclick={() => (open = true)}
	>
		<Icon icon="mgc_search_line" />
	</Button>
{/if}

{#if !app && !icon && !onlyLaptop}
	<Button
		class="display-mobile"
		icon
		aria-label={capitalize($t('navigation.search_bar.button'))}
		onclick={() => (open = true)}
	>
		<Icon icon="mgc_search_line" />
	</Button>

	<Button
		class="hidden-mobile"
		aria-label={capitalize($t('navigation.search_bar.button'))}
		onclick={() => (open = true)}
	>
		<Icon icon="mgc_search_line" />

		<span class="pr-[2rem]">
			{capitalize($t('docs.search.title'))}
		</span>

		<Chip size="sm">
			{$deviceUsed === 'apple' ? '⌘' : 'ctrl'}
		</Chip>
		<Chip size="sm">k</Chip>
	</Button>
{/if}
